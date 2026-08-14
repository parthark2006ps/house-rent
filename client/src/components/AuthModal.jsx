import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';

export default function AuthModal() {
  const { login, register, switchDemoRole } = useAuth();
  const { isAuthModalOpen, setIsAuthModalOpen, showToast } = useProperty();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Chennai');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isRegister) {
        await register({ name, email, password, role, phone, city });
        showToast(`Registration successful! Logged in as ${role.toUpperCase()}`, 'success');
      } else {
        await login(email, password);
        showToast('Logged in successfully!', 'success');
      }
      setIsAuthModalOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemo = async (roleName) => {
    try {
      await switchDemoRole(roleName);
      showToast(`Quick Logged in as Demo ${roleName.toUpperCase()}`, 'success');
      setIsAuthModalOpen(false);
    } catch (err) {
      showToast('Demo login error', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>
              {isRegister ? 'Create HouseHunt Account' : 'Welcome Back to HouseHunt'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tamil Nadu's House Rental Portal
            </span>
          </div>
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* 1-Click Quick Demo Login & Credential Directory */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(99, 102, 241, 0.08)',
          borderBottom: '1px solid var(--border-glass)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} color="#10b981" /> PORTAL LOGIN CREDENTIALS
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Click to auto-fill or log in</span>
          </div>

          {/* Credentials Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {/* Admin Credentials */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.8)',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>🔑 ADMIN PORTAL</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Email: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>admin@househunt.tn</code> | Pass: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>admin123</code>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => { setEmail('admin@househunt.tn'); setPassword('admin123'); setIsRegister(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  Fill
                </button>
                <button 
                  type="button" 
                  onClick={() => handleQuickDemo('admin')} 
                  className="btn btn-primary btn-sm" 
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: '#f59e0b' }}
                >
                  Login
                </button>
              </div>
            </div>

            {/* User / Tenant Credentials */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.8)',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8' }}>👤 USER / TENANT PORTAL</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Email: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>user@househunt.tn</code> | Pass: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>user123</code>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => { setEmail('user@househunt.tn'); setPassword('user123'); setIsRegister(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  Fill
                </button>
                <button 
                  type="button" 
                  onClick={() => handleQuickDemo('user')} 
                  className="btn btn-primary btn-sm" 
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  Login
                </button>
              </div>
            </div>

            {/* Landlord / Owner Credentials */}
            <div style={{
              background: 'rgba(17, 24, 39, 0.8)',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>🏡 LANDLORD / OWNER PORTAL</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Email: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>owner@househunt.tn</code> | Pass: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>owner123</code>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button 
                  type="button" 
                  onClick={() => { setEmail('owner@househunt.tn'); setPassword('owner123'); setIsRegister(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  Fill
                </button>
                <button 
                  type="button" 
                  onClick={() => handleQuickDemo('owner')} 
                  className="btn btn-accent btn-sm" 
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          
          {isRegister && (
            <>
              <div className="form-group">
                <label>FULL NAME</label>
                <input 
                  type="text"
                  placeholder="e.g. Anand Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>SELECT ROLE</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                  <option value="user">Tenant (Looking for Rent)</option>
                  <option value="owner">Landlord / Owner (Post Houses)</option>
                  <option value="admin">Admin Moderator</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input 
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem' }}
          >
            {submitting ? 'Please wait...' : (isRegister ? 'Sign Up' : 'Log In')}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span 
              onClick={() => setIsRegister(!isRegister)}
              style={{ fontSize: '0.85rem', color: '#818cf8', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isRegister ? 'Already have an account? Log In' : "Don't have an account? Register"}
            </span>
          </div>
        </form>

      </div>
    </div>
  );
}
