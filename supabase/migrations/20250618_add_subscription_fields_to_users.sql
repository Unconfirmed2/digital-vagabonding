-- Migration: Add subscription fields to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS subscription_active boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_ends_at timestamp with time zone;
