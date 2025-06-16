import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} className="ml-2">
        {open ? <X className="h-12 w-12" /> : <Menu className="h-12 w-12" />}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 p-4 flex flex-col gap-4">
          {!user ? (
            <>
              <Link to="/login" className="w-full">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button className="w-full" variant="outline">Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/account" className="w-full">
                <Button className="w-full">Account</Button>
              </Link>
              <Button onClick={handleLogout} className="w-full" variant="destructive">
                Sign Out
              </Button>
            </>
          )}
          <Link to="/about-us" className="text-blue-600 hover:underline text-sm">About Us</Link>
          <a href="https://digitalvagabondingblog.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Blog</a>
        </div>
      )}
    </div>
  );
};
