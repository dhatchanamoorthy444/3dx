import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedAdmin() {
  const adminEmail = '3dxzzzzz@gmail.com';
  const adminUsername = 'admin';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin';
  const adminRole = 'admin';
  const adminName = 'Admin';

  console.log('Seeding admin user...');

  // Check if admin user already exists in auth
  const { data: existingAuthUsers, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  const existingAuthUser = existingAuthUsers.users.find(u => u.email === adminEmail);

  let authUserId: string;

  if (existingAuthUser) {
    console.log('Admin user already exists in auth, updating...');
    authUserId = existingAuthUser.id;

    // Update password
    const { error: updateError } = await supabase.auth.admin.updateUserById(authUserId, {
      password: adminPassword,
      email_confirm: true,
    });
    if (updateError) {
      console.error('Error updating auth user:', updateError);
      process.exit(1);
    }
  } else {
    console.log('Creating new admin user in auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        username: adminUsername,
        role: adminRole,
      },
    });
    if (authError || !authData.user) {
      console.error('Error creating auth user:', authError);
      process.exit(1);
    }
    authUserId = authData.user.id;
  }

  // Upsert profile (matches supabase/schema.sql — Supabase Auth owns the
  // password hash; we never store a second one).
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: authUserId,
      username: adminUsername,
      email: adminEmail,
      name: adminName,
      role: adminRole,
    }, {
      onConflict: 'id',
    });

  if (profileError) {
    console.error('Error upserting profile:', profileError);
    process.exit(1);
  }

  console.log('Admin user seeded successfully!');
  console.log(`Email: ${adminEmail}`);
  console.log(`Username: ${adminUsername}`);
  console.log(`Role: ${adminRole}`);

  await backfillMissingProfiles(supabase);
}

/**
 * One-off repair for the broken state described in the auth postmortem:
 * auth users exist but their profiles row was never created (RLS rejected
 * the client-side insert, no trigger existed). Telling those users to
 * "register again" fails because their email is already taken in
 * auth.users — so backfill the missing rows instead.
 */
async function backfillMissingProfiles(
  supabase: SupabaseClient,
) {
  console.log('Checking for auth users missing a profiles row...');

  // Page through auth users (listUsers caps at 1000 per page).
  const missing: { id: string; email?: string; username: string; name: string }[] = [];
  let page = 1;
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      console.error('Error listing users for backfill:', error);
      process.exit(1);
    }
    const users = data?.users ?? [];
    if (users.length === 0) break;

    // Check which of these already have profiles.
    const ids = users.map((u) => u.id);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .in('id', ids);
    if (profilesError) {
      console.error('Error checking profiles for backfill:', profilesError);
      process.exit(1);
    }
    const have = new Set((profiles ?? []).map((p) => (p as { id: string }).id));
    for (const u of users) {
      if (!have.has(u.id)) {
        const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
        const username =
          typeof meta.username === 'string' && meta.username.trim()
            ? meta.username.trim().toLowerCase()
            : (u.email ?? '').split('@')[0].toLowerCase();
        const name =
          typeof meta.name === 'string' && meta.name.trim()
            ? meta.name.trim()
            : username;
        missing.push({ id: u.id, email: u.email, username, name });
      }
    }
    if (users.length < 1000) break;
    page += 1;
  }

  if (missing.length === 0) {
    console.log('No missing profiles — nothing to backfill.');
    return;
  }

  console.log(`Backfilling ${missing.length} missing profile(s)...`);
  for (const m of missing) {
    // Usernames are UNIQUE — if the desired one is taken, suffix it.
    let username = m.username;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data: taken } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .maybeSingle();
      if (!taken) break;
      username = `${m.username}_${Math.random().toString(36).slice(2, 6)}`;
    }
    const { error } = await supabase.from('profiles').insert({
      id: m.id,
      username,
      email: m.email ?? `${username}@placeholder.local`,
      name: m.name,
      role: 'user',
    });
    if (error) {
      console.error(`Failed to backfill profile for ${m.email ?? m.id}:`, error);
    } else {
      console.log(`Backfilled profile for ${m.email ?? m.id} (username: ${username})`);
    }
  }
}

seedAdmin().catch(console.error);