/**
 * CaliGym auth + backend smoke test (run against a Supabase STAGING project
 * before every deploy — never against production, it creates/deletes a user).
 *
 * Flow: register a new user -> confirm a `profiles` row exists -> sign out ->
 * sign back in with the same email+password -> sign in via username ->
 * save a workout -> read it back -> clean up the test user.
 *
 * Requires env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
 *   SUPABASE_SERVICE_ROLE_KEY (for username resolution check + cleanup).
 *
 * Usage: npx tsx scripts/auth-smoke.ts
 * Exit code 0 = pass, 1 = fail (each step prints PASS/FAIL).
 */
import { createClient } from '@supabase/supabase-js';

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!url || !anonKey || !serviceKey) {
  console.error(
    'FAIL: set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY',
  );
  process.exit(1);
}

if (!/^https?:\/\//.test(url) || /your-project|placeholder|example/i.test(url + anonKey)) {
  console.error('FAIL: refusing to run against placeholder Supabase credentials.');
  process.exit(1);
}

const anon = createClient(url, anonKey);
const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const stamp = Date.now().toString(36);
const email = `smoke_${stamp}@example.com`;
const username = `smoke_${stamp}`.slice(0, 20);
const password = `SmokeTest!${stamp}`;
const name = 'Smoke Test';

let failures = 0;
function check(step: string, ok: boolean, detail?: string) {
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${step}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
}

async function main() {
  // 1. Register (mirrors AuthContext.signUp: signUp + profiles upsert).
  const { data: signUpData, error: signUpError } = await anon.auth.signUp({
    email,
    password,
    options: { data: { username, name } },
  });
  check('register via supabase.auth.signUp', !signUpError && !!signUpData.user, signUpError?.message);
  const userId = signUpData.user?.id;
  if (!userId) throw new Error('no user id after signup — aborting');

  const { error: profileError } = await anon.from('profiles').upsert(
    { id: userId, username, email, name, role: 'user' },
    { onConflict: 'id' },
  );
  check('profiles upsert (needs "Users Insert Own Profile" RLS policy)', !profileError, profileError?.message);

  // 2. Profile row exists.
  const { data: profile } = await anon.from('profiles').select('id, username, email, role').eq('id', userId).maybeSingle();
  check('profiles row readable after signup', !!profile && (profile as { username: string }).username === username);

  // 3. Sign out, sign back in with email+password (the re-login regression).
  await anon.auth.signOut();
  const { data: signInData, error: signInError } = await anon.auth.signInWithPassword({ email, password });
  check(
    're-login with same email+password',
    !signInError && !!signInData.user,
    signInError ? `${signInError.message} (if "email not confirmed", disable confirm-email on the staging project)` : undefined,
  );

  // 4. Profile loads post-login (would previously force a sign-out with
  // "profile record is missing").
  const { data: profileAfterLogin } = await anon.from('profiles').select('id').eq('id', userId).maybeSingle();
  check('profile loads after re-login', !!profileAfterLogin);
  await anon.auth.signOut();

  // 5. Username -> email resolution (needs SUPABASE_SERVICE_ROLE_KEY server-side
  // per resolve-username route; here we assert the service client can do it).
  const { data: byUsername } = await admin.from('profiles').select('id').eq('username', username).maybeSingle();
  const resolvedId = (byUsername as { id: string } | null)?.id;
  let resolvedEmail: string | null = null;
  if (resolvedId) {
    const { data: authUser } = await admin.auth.admin.getUserById(resolvedId);
    resolvedEmail = authUser?.user?.email ?? null;
  }
  check('service-role username -> email resolution', resolvedEmail === email);
  if (resolvedEmail) {
    const { error: usernameLoginError } = await anon.auth.signInWithPassword({ email: resolvedEmail, password });
    check('login with username-resolved email', !usernameLoginError, usernameLoginError?.message);
    await anon.auth.signOut();
  }

  // 6. Workout save/load round-trip (needs workout_logs table + RLS policies).
  const { error: reLoginError } = await anon.auth.signInWithPassword({ email, password });
  if (reLoginError) {
    check('workout round-trip (skipped: session login failed)', false, reLoginError.message);
  } else {
    const today = new Date().toISOString().split('T')[0];
    const payload = { title: 'smoke', exercises: [{ name: 'push-up', sets: 3 }] };
    const { error: saveError } = await anon
      .from('workout_logs')
      .upsert({ user_id: userId, date: today, workout_data: payload }, { onConflict: 'user_id,date' });
    check('saveWorkout upsert into workout_logs', !saveError, saveError?.message);
    const { data: loaded } = await anon
      .from('workout_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .maybeSingle();
    const roundTrips =
      !!loaded && JSON.stringify((loaded as { workout_data: unknown }).workout_data) === JSON.stringify(payload);
    check('workout persists across read-back', roundTrips);
    await anon.auth.signOut();
  }

  // 7. Cleanup.
  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  check('cleanup: delete smoke user', !deleteError, deleteError?.message);

  if (failures > 0) {
    console.error(`\n${failures} smoke step(s) FAILED.`);
    process.exit(1);
  }
  console.log('\nAll smoke steps passed.');
}

main().catch((err) => {
  console.error('FAIL: unexpected error', err);
  process.exit(1);
});
