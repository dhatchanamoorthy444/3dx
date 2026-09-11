-- CaliGym Admin Seed Script
-- This file documents the admin seeding process.
-- The actual seeding is done via scripts/seed.ts which uses bcrypt to hash the password.
-- Run: npx tsx scripts/seed.ts
-- Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables

-- Admin user details:
-- username: admin
-- email: 3dxzzzzz@gmail.com
-- password: admin (hashed with bcrypt salt rounds = 10 before saving to password_hash)
-- role: admin
-- status: active

-- The seed script will:
-- 1. Check if auth user exists, create or update
-- 2. Hash password with bcrypt (10 rounds)
-- 3. Upsert profile with password_hash
-- 4. Ensure idempotency - safe to run multiple times