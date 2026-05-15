// ══════════════════════════════════════════
//  LOGIN PAGE
//  src/pages/LoginPage.jsx
// ══════════════════════════════════════════
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, guardarSesion } from '../services/authService';
import './LoginPage.css';

const FEATURES = [
  'Transferencias instantáneas 24/7',
  'Consulta de saldos y movimientos',
  'Pago de servicios y tarjetas',
  'Conexión cifrada con certificado SSL',
  'Sesiones protegidas con token JWT',
];

export default function LoginPage() {
  const navigate  = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('⚠️ Ingresa tu correo y contraseña.');
      return;
    }

    setCargando(true);
    try {
      // authService llama al backend: POST /api/auth/login
      // y devuelve { token, usuario }
      const data = await login(email, password);
      guardarSesion(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('❌ ' + (err.message || 'Error de conexión. Verifica que el backend esté corriendo.'));
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="fade-up">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/')}>
         <img 
              src="/logo-scotiabank.jpg" 
              alt="Scotiabank" 
              style={{ height: '38px', objectFit: 'contain' }}
            />
          <span className="logo-text">Scotia<span>bank</span> — Banca por Internet</span>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate('/')}>← Volver al inicio</button>
        </div>
      </nav>

      {/* ── Layout ── */}
      <div className="login-layout">

        {/* Panel izquierdo */}
        <div className="login-left">
          <h2>Tu banco siempre contigo</h2>
          <p>
            Accede a todos tus productos y servicios financieros
            de forma segura desde cualquier dispositivo.
          </p>
          <ul className="login-features">
            {FEATURES.map((f) => (
              <li key={f}>
                <div className="feature-check">✓</div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Panel derecho — formulario */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-card-header">
              <h3>Ingresa a tu cuenta</h3>
              <p>Usa tu correo y contraseña de Scotiabank</p>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn-login" disabled={cargando}>
                {cargando
                  ? <><span className="spinner" /> Verificando...</>
                  : 'Ingresar'}
              </button>
            </form>

            <p className="login-footer-text">
              ¿Problemas para ingresar?{' '}
              <a href="#">Contáctanos</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}