import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const MenuHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-2 p-2 rounded-full hover:bg-gray-100"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="h-7 w-7 md:h-9 md:w-9" /> : <Menu className="h-7 w-7 md:h-9 md:w-9" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 p-4 flex flex-col gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-[#1D1818} hover:underline text-sm transition-colors">Sign In</Link>
              <Link to="/register" className="text-[#1D1818} hover:underline text-sm transition-colors">Register</Link>
            </>
          ) : (
            <>
              <Link to="/account" className="text-[#1D1818} hover:underline text-sm transition-colors">Account</Link>
              <button
                onClick={handleLogout}
                className="text-[#1D1818} hover:underline text-sm text-left transition-colors focus:outline-none"
                type="button"
              >
                Sign Out
              </button>
            </>
          )}
          <Link to="/about-us" className="text-[#1D1818} hover:underline text-sm transition-colors">About Us</Link>
          <a href="https://digitalvagabondingblog.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-[#1D1818} hover:underline text-sm transition-colors">Blog</a>
        </div>
      )}
    </div>
  );
};
