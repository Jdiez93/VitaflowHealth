import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border bg-muted/30">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bio-gradient flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">VitaFlow AI</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tu plataforma integral de bienestar y nutrición impulsada por inteligencia artificial.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Producto</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/news" className="hover:text-foreground transition-colors">Noticias</Link></li>
            <li><Link to="/recipes" className="hover:text-foreground transition-colors">Recetas</Link></li>
            <li><Link to="/calculator" className="hover:text-foreground transition-colors">Calculadora TMB</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Empresa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Acerca de</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Blog</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Contacto</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacidad</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Términos</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Cookies</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 VitaFlow AI. Todos los derechos reservados.</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Hecho con <Heart className="w-3 h-3 text-destructive fill-destructive" /> para tu bienestar
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
