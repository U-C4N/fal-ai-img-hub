import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-center gap-4 mb-8">
      <NavLink to="/" active={location.pathname === '/'}>
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/favorites" active={location.pathname === '/favorites'}>
        <Heart className="w-5 h-5" />
        <span>Favorites</span>
      </NavLink>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
        active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
      )}
    >
      {children}
    </Link>
  );
}