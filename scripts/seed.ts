import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

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
  const adminPassword = 'admin';
  const adminRole = 'admin';
  const adminStatus = 'active';

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

  // Hash password with bcrypt (salt rounds = 10)
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  console.log('Password hashed with bcrypt (salt rounds: 10)');

  // Upsert profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: authUserId,
      username: adminUsername,
      email: adminEmail,
      role: adminRole,
      status: adminStatus,
      password_hash: passwordHash,
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
  console.log(`Status: ${adminStatus}`);
}

seedAdmin().catch(console.error);