import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';
import { DonateButton } from '@/components/DonateButton';
import { Separator } from '@/components/ui/separator';
import { createStripeCheckoutSession, cancelStripeSubscription } from '@/lib/stripeClient';
import { hasActiveSubscription } from '@/lib/subscriptionAccess';
import { AnalyticsAndConsent } from '@/components/AnalyticsAndConsent';

const Account: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setEmail(data.user?.email || '');
      checkSubscription(data.user?.id);
    });
    // Optionally fetch first/last name from a profile table if you have one
  }, []);

  const checkSubscription = async (userId: string) => {
    const active = await hasActiveSubscription(userId);
    setSubscriptionActive(active);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (password && password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    // Update email
    if (email && email !== user?.email) {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }
    // Update password
    if (password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }
    // Optionally update first/last name in a profile table
    setSuccess('Account updated successfully.');
    setLoading(false);
  };

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    // Supabase does not allow deleting user from client SDK for security. You'd need a secure function or admin panel.
    setError('Account deletion must be handled by an admin or secure backend function.');
  };

  const handleSubscribe = async () => {
    if (!user) return;
    const url = await createStripeCheckoutSession(user.id);
    window.open(url, '_blank');
  };

  const handleCancelSubscription = async () => {
    if (!user) return;
    await cancelStripeSubscription(user.id);
    setSubscriptionActive(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
          <p className="mb-4">You must be signed in to view your account.</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] p-4">
      {/* Main header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fbf5f7]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between h-[64px] md:h-[72px]">
            <Link to="/" className="flex items-center focus:outline-none h-10 md:h-12">
              <img
                src="/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-3 cursor-pointer"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-2xl md:text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif', color: '#064e6b' }}>
                Digital VagaBonding
              </span>
            </Link>
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div style={{ paddingTop: 80, width: '100%' }}>
        {/* Page title below header */}
        <div className="flex items-center mb-6 max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 ml-2">Account</h1>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 mx-auto">
          <h2 className="text-xl font-bold text-center mb-2">Account Details</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="First Name (optional)"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="Last Name (optional)"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              required
            />
            <input
              type="password"
              placeholder="New Password (leave blank to keep current)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
          <Button onClick={handleDelete} className="w-full" variant="destructive">
            Delete Account
          </Button>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-600 text-xs">{success}</div>}
        </div>
        {/* Subscription section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 mx-auto mt-4">
          <h2 className="text-xl font-bold text-center mb-2">Subscription</h2>
          {subscriptionActive ? (
            <>
              <div className="text-green-600 text-center mb-2">Your subscription is active.</div>
              <Button onClick={handleCancelSubscription} className="w-full" variant="destructive">Cancel Subscription</Button>
            </>
          ) : (
            <>
              <div className="text-yellow-600 text-center mb-2">You do not have an active subscription.</div>
              <Button onClick={handleSubscribe} className="w-full">Subscribe for $10/year</Button>
            </>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed bottom-0 left-0 z-40 text-xs md:text-base">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative h-full">
          <div className="flex-shrink-0 flex items-center w-full md:w-auto justify-center md:justify-start mb-1 md:mb-0">
            <DonateButton />
          </div>
          <div className="flex-1 text-center text-gray-700 text-xs md:text-base font-medium">
            Connecting travelers worldwide through community groups
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end mt-1 md:mt-0 text-xs text-gray-400">
            <Link to="/terms-of-service" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a href="sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
      <AnalyticsAndConsent />
    </div>
  );
};

export default Account;
