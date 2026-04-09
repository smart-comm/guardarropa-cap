-- Drop tables if they exist (Be careful with this in production!)
-- DROP TABLE IF EXISTS transactions;
-- DROP TABLE IF EXISTS invitations;
-- DROP TABLE IF EXISTS cloakroom_items;

-- Users table is managed by Supabase Auth (auth.users), but we can create a public profile table if needed.
-- For this project, we'll assume basic roles or use a simple custom users table to manage Staff/Admin if we don't want to use Raw App Meta Data.

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'staff' CHECK (role IN ('staff', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cloakroom items table
CREATE TABLE IF NOT EXISTS cloakroom_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- e.g. "A001"
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'deposited', 'retrieved')),
  user_id UUID, -- Optional, if linked to a registered client app user
  is_free BOOLEAN DEFAULT false,
  transaction_id UUID, -- Will be set if paid
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Transactions table (Mock checkouts)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES cloakroom_items(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Invitations table (VIP codes / Free passes)
CREATE TABLE IF NOT EXISTS invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- e.g., "VIP-2026-X"
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Configuration
-- For a fast prototype, we can make tables open for reading/writing, or restrict them.
-- Assuming we want basic security:

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cloakroom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Allow public access for client app (creating pending items, checking code, using invitations)
-- IN A REAL WORLD APP, YOU'D BE MORE RESTRICTIVE.

CREATE POLICY "Public can insert items" ON cloakroom_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can select their items by code" ON cloakroom_items FOR SELECT USING (true);
CREATE POLICY "Public can update pending items" ON cloakroom_items FOR UPDATE USING (status = 'pending');

CREATE POLICY "Public can insert transactions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can select their transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Public can update pending transactions" ON transactions FOR UPDATE USING (payment_status = 'pending');

CREATE POLICY "Public can read invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Public can update invitations" ON invitations FOR UPDATE USING (is_used = false);

-- Staff / Admin policies (Assuming authenticated users can do everything with their API KEY for this rapid buildup)
CREATE POLICY "Auth users full access items" ON cloakroom_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users full access transactions" ON transactions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users full access invitations" ON invitations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users full access profiles" ON user_profiles FOR ALL USING (auth.role() = 'authenticated');

-- Enable Realtime
alter publication supabase_realtime add table cloakroom_items;
alter publication supabase_realtime add table transactions;
alter publication supabase_realtime add table invitations;
