import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event);
  console.log('Session:', session);
});

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
