import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize2, ShieldCheck, Phone, Mail, Calendar, Video, CheckCircle, Sparkles, Building, Layers } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export default function PropertyDetailsModal() {
  const { activeProperty, setActiveProperty, setVirtualTourProperty, setBookingProperty } = useProperty();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!activeProperty) return null;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(activeProperty.price);

  const formattedDeposit = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(activeProperty.securityDeposit || activeProperty.price * 5);

  return (
    <div className="modal-overlay" onClick={() => setActiveProperty(null)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        
        {/* Header Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(11,15,25,0.9)'
        }}>
          <div>
            <span className="badge badge-tn" style={{ marginBottom: '0.35rem' }}>
              Tamil Nadu Listing
            </span>
            <h2 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 700 }}>
              {activeProperty.title}
            </h2>
          </div>
          <button 
            onClick={() => setActiveProperty(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          
          {/* Main Image & Gallery Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', height: '360px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <img 
                src={activeProperty.images[activeImageIdx] || activeProperty.images[0]} 
                alt={activeProperty.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {activeProperty.virtualTourUrl && (
                <button 
                  onClick={() => {
                    const prop = activeProperty;
                    setActiveProperty(null);
                    setVirtualTourProperty(prop);
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <Video size={18} /> Launch 360° Room Tour
                </button>
              )}
            </div>

            {/* Thumbnail Row */}
            {activeProperty.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {activeProperty.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '80px',
                      height: '60px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: activeImageIdx === idx ? '2px solid var(--primary)' : '1px solid transparent',
                      opacity: activeImageIdx === idx ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            background: 'rgba(255,255,255,0.03)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            marginBottom: '1.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly Rent</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>{formattedPrice}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Security Deposit</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{formattedDeposit}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bedrooms & Layout</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Bed size={18} color="#818cf8" /> {activeProperty.bedrooms} BHK ({activeProperty.sqft} sqft)
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <MapPin size={16} color="#10b981" /> {activeProperty.locality}, {activeProperty.city}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>About this Property</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {activeProperty.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>Amenities & Facilities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {activeProperty.amenities.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '0.5rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)'
                }}>
                  <CheckCircle size={15} color="#10b981" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Landlord Contact & Booking CTA Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-glass)',
            flexWrap: 'wrap'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PROPERTY OWNER</span>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                {activeProperty.ownerName}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Phone size={14} /> {activeProperty.ownerPhone}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => {
                  const prop = activeProperty;
                  setActiveProperty(null);
                  setBookingProperty(prop);
                }}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.75rem' }}
              >
                <Calendar size={18} /> Schedule Tour / Book Rental
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
