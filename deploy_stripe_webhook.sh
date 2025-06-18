#!/bin/bash
# Deploy Supabase Edge Function: stripe-webhook
# Usage: bash deploy_stripe_webhook.sh

set -e

# Check for supabase CLI
if ! command -v supabase &> /dev/null; then
  echo "Supabase CLI not found. Installing..."
  npm install -g supabase
fi

echo "Logging in to Supabase (if not already logged in)..."
supabase login || true

echo "Deploying stripe-webhook function to Supabase..."
supabase functions deploy stripe-webhook

echo "Deployment complete."
