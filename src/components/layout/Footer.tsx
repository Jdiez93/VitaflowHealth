import { Link } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bio-gradient flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">VitaFlow AI</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Plataforma integral de bienestar y nutrición impulsada por inteligencia artificial. Datos precisos para decisiones saludables.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> contacto@vitaflow.ai</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +34 900 123 456</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Madrid, España</div>
          </div>
        </div>

        {/* Producto */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Producto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/news" className="hover:text-foreground transition-colors">Noticias</Link></li>
            <li><Link to="/recipes" className="hover:text-foreground transition-colors">Recetas</Link></li>
            <li><Link to="/calculator" className="hover:text-foreground transition-colors">Calculadora TMB</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Empresa */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Empresa</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Sobre nosotros</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Equipo</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Carreras</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Prensa</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Política de privacidad</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Términos de servicio</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Política de cookies</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Aviso legal</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} VitaFlow AI. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-pointer">Privacidad</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Términos</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Cookies</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
