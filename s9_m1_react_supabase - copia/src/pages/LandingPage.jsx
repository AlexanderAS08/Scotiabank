// ══════════════════════════════════════════
//  LANDING PAGE
//  src/pages/LandingPage.jsx
// ══════════════════════════════════════════
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const PRODUCTOS = [
  {
    icon: '💰',
    titulo: 'Cuenta de Ahorros',
    desc:   'Tasa preferencial hasta 4.5% TEA. Sin comisión de mantenimiento el primer año.',
  },
  {
    icon: '🏦',
    titulo: 'Crédito Hipotecario',
    desc:   'Financia hasta el 90% del valor del inmueble con cuotas fijas en soles.',
  },
  {
    icon: '💳',
    titulo: 'Tarjeta de Crédito',
    desc:   'Visa y Mastercard con cashback de hasta 3% en consumos diarios.',
  },
  {
    icon: '📈',
    titulo: 'Fondos de Inversión',
    desc:   'Rentabiliza tu dinero con fondos diversificados desde S/ 100.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="fade-up">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-logo">
          <img 
              src="/logo-scotiabank.jpg" 
              alt="Scotiabank" 
              style={{ height: '38px', objectFit: 'contain' }}
            />
          <span className="logo-text">Scotia<span>bank</span></span>
        </div>
        <div className="nav-links">
          <button className="nav-link">Créditos</button>
          <button className="nav-link">Ahorros</button>
          <button className="nav-link">Seguros</button>
          <button className="nav-link">Sucursales</button>
          <button className="btn btn-red" onClick={() => navigate('/login')}>
            Banca por Internet
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span>⭐</span> Banco del Año — Perú 2026
          </div>
          <h1>Banca digital que trabaja para ti</h1>
          <p>
            Gestiona tus cuentas, transfiere dinero y paga tus servicios
            desde donde estés, las 24 horas del día.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-white" onClick={() => navigate('/login')}>
              Ingresar a mi cuenta
            </button>
            <button className="btn btn-ghost">Conocer más</button>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">+4M</div><div className="stat-label">Clientes en el Perú</div></div>
            <div><div className="stat-num">99.9%</div><div className="stat-label">Disponibilidad del sistema</div></div>
            <div><div className="stat-num">3 seg</div><div className="stat-label">Transferencias instantáneas</div></div>
          </div>
        </div>
      </section>

      {/* ── Productos ── */}
      <section className="products">
        <div className="section-header">
          <h2>Todo lo que necesitas en un solo banco</h2>
          <p>Productos diseñados para el ritmo de vida del peruano moderno</p>
        </div>
        <div className="products-grid">
          {PRODUCTOS.map((p) => (
            <div key={p.titulo} className="product-card">
              <div className="product-icon">{p.icon}</div>
              <h3>{p.titulo}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promo ── */}
      <div className="promo-banner">
        <h2>¿Aún no eres cliente Scotiabank?</h2>
        <p>Abre tu cuenta en minutos, sin ir a una agencia. 100% digital.</p>
        <button className="btn btn-white">Abrir mi cuenta ahora</button>
      </div>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <strong>Scotiabank Perú S.A.A.</strong> · Banco supervisado por la SBS ·
        Av. Dionisio Derteano 102, San Isidro, Lima · Línea gratuita: 0800-00-072
        <br />© 2026 Scotiabank Perú. Todos los derechos reservados.
      </footer>

    </div>
  );
}