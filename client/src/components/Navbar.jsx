import React from 'react';
import { Home, MapPin, PlusCircle, User, ShieldCheck, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';

export default function Navbar() {
  const { user, logout, switchDemoRole } = useAuth();
  const { 
    selectedCity, 
    setSelectedCity, 
    setIsAuthModalOpen, 
    setIsPostPropertyOpen, 
    setIsDashboardOpen,
    showToast 
  } = useProperty();

  const handleRoleSwitch = async (role) => {
    try {
      await switchDemoRole(role);
      showToast(`Switched active role to ${role.toUpperCase()}`, 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error switching demo role', 'error');
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setSelectedCity('All')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #10b981)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Home size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                House<span style={{ color: '#6366f1' }}>Hunt</span>
              </span>
              <span className="badge badge-tn" style={{ fontSize: '0.65rem' }}>Tamil Nadu</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rental Management System</span>
          </div>
        </div>

        {/* City Quick Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255,255,255,0.05)',
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-glass)'
        }}>
          <MapPin size={16} color="#10b981" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Location:</span>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All" style={{ background: '#111827' }}>All Tamil Nadu</option>
            <option value="Chennai" style={{ background: '#111827' }}>Chennai</option>
            <option value="Coimbatore" style={{ background: '#111827' }}>Coimbatore</option>
            <option value="Madurai" style={{ background: '#111827' }}>Madurai</option>
            <option value="Tiruchirappalli" style={{ background: '#111827' }}>Trichy</option>
            <option value="Salem" style={{ background: '#111827' }}>Salem</option>
            <option value="Vellore" style={{ background: '#111827' }}>Vellore</option>
            <option value="Tirunelveli" style={{ background: '#111827' }}>Tirunelveli</option>
          </select>
        </div>

        {/* Demo Role Switcher Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'rgba(0,0,0,0.3)',
          padding: '0.25rem 0.4rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', padding: '0 0.3rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Sparkles size={12} color="#f59e0b" /> Demo Role:
          </span>
          <button 
            onClick={() => handleRoleSwitch('user')}
            className={`btn btn-sm ${user?.role === 'user' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
          >
            Renter
          </button>
          <button 
            onClick={() => handleRoleSwitch('owner')}
            className={`btn btn-sm ${user?.role === 'owner' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
          >
            Owner
          </button>
          <button 
            onClick={() => handleRoleSwitch('admin')}
            className={`btn btn-sm ${user?.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}
          >
            Admin
          </button>
        </div>

        {/* Navigation Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', gap: '0.3rem' }}
            title="View Portal Credentials"
          >
            <ShieldCheck size={15} color="#10b981" /> Portal Credentials
          </button>

          <button 
            onClick={() => {
              if (!user) {
                setIsAuthModalOpen(true);
              } else if (user.role === 'user') {
                showToast('Owners and Admins can post listings. Switch role to Owner!', 'info');
              } else {
                setIsPostPropertyOpen(true);
              }
            }}
            className="btn btn-accent btn-sm"
          >
            <PlusCircle size={16} /> Post Rental
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button 
                onClick={() => setIsDashboardOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <LayoutDashboard size={16} color="#6366f1" /> Dashboard ({user.role.toUpperCase()})
              </button>
              <button 
                onClick={() => {
                  logout();
                  showToast('Logged out successfully', 'info');
                }}
                className="btn btn-danger btn-sm"
                title="Logout Account"
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.78rem', gap: '0.25rem' }}
              >
                <LogOut size={15} color="#f43f5e" /> Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <User size={16} /> Login / Credentials
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
