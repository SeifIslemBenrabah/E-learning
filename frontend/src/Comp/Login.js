import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthData } from '../Auth/AuthContext'

const Login = () => {
  const { login } = AuthData();
  const [info, setinfo] = useReducer(
    (info, newItem) => ({ ...info, ...newItem }),
    { name: '', password: '' }
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlelogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(info.name, info.password);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-blue overflow-hidden">

      {/* ── Left panel: branding ── */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative"
        style={{
          backgroundImage: 'radial-gradient(circle, #2E86FB26 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-primary/30 blur-[100px] pointer-events-none" />

        {/* Logo / back link */}
        <Link to="/" className="relative flex items-center gap-2 w-fit group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white/40 group-hover:text-white transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span className="text-white/40 group-hover:text-white text-sm transition-colors">Back to home</span>
        </Link>

        {/* Center text */}
        <div className="relative flex flex-col gap-5">
          <span className="font-extrabold text-4xl text-white tracking-tight">
            ESI<span className="text-primary">Learn</span>
          </span>
          <h2 className="text-white text-3xl font-bold leading-snug max-w-sm">
            Welcome back to your academic hub.
          </h2>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">
            Access your courses, quizzes, resources, and results — all in one place.
          </p>

          {/* Trust badges */}
          <div className="flex flex-col gap-3 mt-4">
            {[
              '📚  All your course materials in one place',
              '✅  Quizzes with instant scoring',
              '🔒  Role-based secure access',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/60 text-sm">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="relative text-white/20 text-xs">
          © {new Date().getFullYear()} ESILearn · École Supérieure en Informatique · SBA
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 py-12 relative">

        {/* Mobile back link */}
        <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-1 text-sm text-gray hover:text-blue transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Home
        </Link>

        <div className="w-full max-w-sm flex flex-col gap-6">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-2">
            <span className="font-extrabold text-3xl text-blue tracking-tight">
              ESI<span className="text-primary">Learn</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-blue">Sign in</h1>
            <p className="text-gray text-sm mt-1">Enter your school email and password to continue.</p>
          </div>

          <form onSubmit={handlelogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-blue/70 uppercase tracking-wide">
                School Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="you@esi-sba.dz"
                className="border border-gray/30 rounded-lg px-4 py-2.5 text-sm text-blue placeholder-gray/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                value={info.name}
                onChange={(e) => setinfo({ name: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-blue/70 uppercase tracking-wide">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="border border-gray/30 rounded-lg px-4 py-2.5 text-sm text-blue placeholder-gray/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                value={info.password}
                onChange={(e) => setinfo({ password: e.target.value })}
                disabled={loading}
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500 mt-0.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="text-red-600 text-xs leading-snug">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-primary text-white rounded-lg py-3 font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-blue transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray mt-2">
            Having trouble? Contact your platform administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
