import React from 'react';
import { Home, MapPin, Heart, ShieldCheck, Key, User, Lock } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { setSelectedCity, setIsAuthModalOpen } = useProperty();
  const { switchDemoRole } = useAuth();

  return (
    <footer style={{
      background: '#070a12',
      borderTop: '1px solid var(--border-glass)',
      padding: '3.5rem 0 2rem 0',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        {/* Credentials Directory Banner */}
        <div className="glass-panel" style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2.5rem',
          background: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                <Key size={18} color="#f59e0b" /> PORTAL LOGIN CREDENTIALS DIRECTORY
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Use these demo credentials to test Admin Moderation, User/Tenant Booking, and Landlord Management portals.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#fbbf24', fontWeight: 700, display: 'block' }}>🔑 Admin Portal</span>
                <code>admin@househunt.tn</code> / <code>admin123</code>
              </div>
              <div>
                <span style={{ color: '#818cf8', fontWeight: 700, display: 'block' }}>👤 User Portal</span>
                <code>user@househunt.tn</code> / <code>user123</code>
              </div>
              <div>
                <span style={{ color: '#34d399', fontWeight: 700, display: 'block' }}>🏡 Owner Portal</span>
                <code>owner@househunt.tn</code> / <code>owner123</code>
              </div>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.75rem', alignSelf: 'center' }}
              >
                Open Login Modal
              </button>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #10b981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Home size={20} color="#fff" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                House<span style={{ color: '#6366f1' }}>Hunt</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Tamil Nadu's premier digital house rental marketplace connecting tenants directly with verified landlords and brokers across Chennai, Coimbatore, Madurai, Trichy, Salem & more.
            </p>
            <span className="badge badge-approved" style={{ fontSize: '0.75rem' }}>
              <ShieldCheck size={13} /> 100% Verified Rental Properties
            </span>
          </div>

          {/* TN Main Cities */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Tamil Nadu Cities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
              {["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli"].map((city) => (
                <li key={city}>
                  <span 
                    onClick={() => setSelectedCity(city)} 
                    style={{ cursor: 'pointer' }}
                  >
                    Houses for Rent in {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Rental Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
              <li>Gated Community Apartments</li>
              <li>Independent Luxury Villas</li>
              <li>Family Independent Homes</li>
              <li>Studio Apartments & PGs</li>
              <li>IT Corridor Rental Flats</li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Platform Support
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              📍 Regional HQ: Mount Road, Anna Salai, Chennai - 600002
            </p>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              📞 Support: +91 044 4567 8900
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              ✉️ Email: support@househunt.tn
            </p>
          </div>
        </div>

        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
          fontSize: '0.82rem'
        }}>
          © {new Date().getFullYear()} HouseHunt Tamil Nadu House Rent Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
