import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';
import { DonateButton } from '@/components/DonateButton';
import { Separator } from '@/components/ui/separator';
import { AnalyticsAndConsent } from '@/components/AnalyticsAndConsent';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess('Registration successful! Please check your email to confirm your account.');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
  };

  const handlePasswordReset = async () => {
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email to reset your password.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setSuccess('Password reset email sent!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FF] p-4">
      {/* Main header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fbf5f7]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between h-[64px]">
            <Link to="/" className="flex items-center focus:outline-none h-10">
              <img
                src="/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-10 w-10 mr-3 cursor-pointer"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif', color: '#064e6b' }}>
                Digital VagaBonding
              </span>
            </Link>
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div style={{ paddingTop: 0, width: '100%' }}>
        {/* Page title below header */}
        <div className="flex items-center mb-6 max-w-4xl mx-auto px-4"></div>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 mx-auto">
          <h2 className="text-xl font-bold text-center mb-2">Register</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-2">
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
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
          <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
            Register with Google
          </Button>
          <button
            type="button"
            onClick={handlePasswordReset}
            className="text-xs text-[#1D1818} hover:underline mt-1 text-left"
          >
            Forgot password? Email me a reset link
          </button>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          {success && <div className="text-green-600 text-xs">{success}</div>}
          <div className="text-xs text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1D1818} hover:underline">Sign in here.</Link>
          </div>
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
            <a href="/sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
      <AnalyticsAndConsent />
    </div>
  );
};

export default Register;
