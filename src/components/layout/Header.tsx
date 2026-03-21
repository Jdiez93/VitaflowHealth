import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const isAuthenticated = !!user;
  const userName = profile?.full_name || user?.email?.split('@')[0] || 'Usuario';

  const publicLinks = [
    { to: '/news', label: 'Noticias' },
    { to: '/recipes', label: 'Recetas' },
    { to: '/calculator', label: 'Calculadora TMB' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bio-gradient flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">VitaFlow AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.to) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bio-gradient flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">{userName[0]?.toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{userName}</span>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-2 w-48 glass-card p-2 shadow-lg z-50">
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors" onClick={() => setDropdownOpen(false)}>
                        <User className="w-4 h-4" /> Perfil
                      </Link>
                      <button onClick={handleSignOut} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors w-full text-left text-destructive">
                        <LogOut className="w-4 h-4" /> Cerrar sesión
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm" className="rounded-xl">Iniciar Sesión</Button></Link>
              <Link to="/register"><Button size="sm" className="rounded-xl bio-gradient border-0 text-primary-foreground hover:opacity-90">Registrarse</Button></Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden glass border-t border-border/50">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {publicLinks.map((link) => (
                <Link key={link.to} to={link.to} className="px-4 py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors" onClick={() => setMobileOpen(false)}>{link.label}</Link>
              ))}
              {!isAuthenticated ? (
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full rounded-xl">Iniciar Sesión</Button></Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}><Button className="w-full rounded-xl bio-gradient border-0 text-primary-foreground">Registrarse</Button></Link>
                </div>
              ) : (
                <div className="flex flex-col gap-1 pt-2 border-t border-border">
                  <Link to="/dashboard" className="px-4 py-3 rounded-xl text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link to="/profile" className="px-4 py-3 rounded-xl text-sm hover:bg-muted" onClick={() => setMobileOpen(false)}>Perfil</Link>
                  <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="px-4 py-3 rounded-xl text-sm hover:bg-muted text-left text-destructive">Cerrar sesión</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
