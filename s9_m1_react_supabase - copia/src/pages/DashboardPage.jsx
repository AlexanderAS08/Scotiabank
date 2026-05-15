// ══════════════════════════════════════════
//  DASHBOARD PAGE
//  src/pages/DashboardPage.jsx
// ══════════════════════════════════════════
import { useNavigate } from 'react-router-dom';
import { obtenerSesion, cerrarSesion } from '../services/authService';
import './DashboardPage.css';

const CUENTAS = [
  { color: 'green',  label: 'Cuenta de Ahorros',  valor: 'S/ 3,450.80',  sub: 'CTA 0011-0262-01-XXXX' },
  { color: 'blue',   label: 'Cuenta Corriente',    valor: 'S/ 12,000.00', sub: 'CTA 0011-0262-02-XXXX' },
  { color: 'orange', label: 'Crédito Activo',      valor: 'S/ 8,500.00',  sub: 'Próxima cuota: 15/06/2026' },
  { color: 'red',    label: 'Línea de Crédito',    valor: 'S/ 15,000.00', sub: 'Disponible: S/ 6,240.00' },
];

const MOVIMIENTOS = [
  { tipo: 'in',      icon: '📥', nombre: 'Depósito de sueldo',             fecha: '13 May 2026 · Transferencia recibida', monto: '+S/ 3,200.00', positivo: true },
  { tipo: 'out',     icon: '🛒', nombre: 'Plaza Vea — San Isidro',          fecha: '12 May 2026 · Compra con tarjeta',      monto: '-S/ 184.50',   positivo: false },
  { tipo: 'out',     icon: '⚡', nombre: 'Pago Luz del Sur',                fecha: '10 May 2026 · Pago de servicio',        monto: '-S/ 95.00',    positivo: false },
  { tipo: 'in',      icon: '📤', nombre: 'Transferencia recibida — Ana G.', fecha: '08 May 2026 · CCI',                     monto: '+S/ 500.00',   positivo: true },
  { tipo: 'out',     icon: '🏠', nombre: 'Cuota préstamo hipotecario',       fecha: '05 May 2026 · Débito automático',       monto: '-S/ 1,250.00', positivo: false },
  { tipo: 'neutral', icon: '📱', nombre: 'Recarga Claro — 987XXX XXX',      fecha: '03 May 2026 · Pago de servicio',        monto: '-S/ 30.00',    positivo: false },
];

const ACCIONES = [
  { icon: '↗️', label: 'Transferir' },
  { icon: '📄', label: 'Pagar servicio' },
  { icon: '💳', label: 'Pagar tarjeta' },
  { icon: '📊', label: 'Estado de cuenta' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const sesion   = obtenerSesion();

  const nombre  = sesion?.usuario?.nombre || sesion?.usuario?.email?.split('@')[0] || 'Cliente';
  const email   = sesion?.usuario?.email  || '';
  const inicial = nombre.charAt(0).toUpperCase();

  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  function handleLogout() {
    cerrarSesion();
    navigate('/');
  }

  return (
    <div className="dashboard-page fade-up">

      {/* ── Navbar ── */}
      <nav className="dash-nav">
        <div className="dash-nav-left">
          <img 
              src="/logo-scotiabank.jpg" 
              alt="Scotiabank" 
              style={{ height: '38px', objectFit: 'contain' }}
            />
          <span className="logo-text" style={{ color: 'white' }}>
            Scotia<span style={{ color: 'var(--red)' }}>bank</span>
          </span>
        </div>

        <div className="dash-nav-left">
          <div className="dash-avatar">{inicial}</div>
          <div>
            <div className="dash-user-name">{nombre}</div>
            <div className="dash-user-email">{email}</div>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          ↩ Cerrar sesión
        </button>
      </nav>

      {/* ── Cuerpo ── */}
      <div className="dash-body">

        {/* Saludo */}
        <div className="dash-greeting">
          <h1>Buenos días, {nombre} 👋</h1>
          <p>{fecha}</p>
        </div>

        {/* Tarjetas de saldo */}
        <div className="cards-row">
          {CUENTAS.map((c) => (
            <div key={c.label} className={`balance-card ${c.color}`}>
              <div className="card-label">{c.label}</div>
              <div className={`card-amount ${c.color}`}>{c.valor}</div>
              <div className="card-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Grid principal */}
        <div className="dash-grid">

          {/* Movimientos */}
          <div className="panel">
            <div className="panel-title">
              Últimos movimientos
              <span>Ver todos →</span>
            </div>
            <div className="tx-list">
              {MOVIMIENTOS.map((t, i) => (
                <div key={i} className="tx-item">
                  <div className={`tx-icon ${t.tipo}`}>{t.icon}</div>
                  <div className="tx-info">
                    <div className="tx-name">{t.nombre}</div>
                    <div className="tx-date">{t.fecha}</div>
                  </div>
                  <div className={`tx-amount ${t.positivo ? 'positive' : 'negative'}`}>
                    {t.monto}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="panel">
            <div className="panel-title">Acciones rápidas</div>
            <div className="quick-actions">
              {ACCIONES.map((a) => (
                <button key={a.label} className="action-btn">
                  <div className="action-icon">{a.icon}</div>
                  <div className="action-label">{a.label}</div>
                </button>
              ))}
            </div>
            <div className="coming-soon">
              🔧 Módulos de Créditos, Ahorros y Transferencias en desarrollo
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}