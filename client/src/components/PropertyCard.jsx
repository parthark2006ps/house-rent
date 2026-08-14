import React from 'react';
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, Eye, Calendar, Sparkles, CheckCircle, Video } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export default function PropertyCard({ property }) {
  const { 
    setActiveProperty, 
    setVirtualTourProperty, 
    setBookingProperty 
  } = useProperty();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, border-color 0.3s ease',
      height: '100%',
      position: 'relative'
    }}>
      {/* Property Image Container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img 
          src={property.images[0] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />

        {/* Status Badge Top Left */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {property.status === 'approved' && (
            <span className="badge badge-approved">
              <ShieldCheck size={12} /> Verified
            </span>
          )}
          {property.status === 'pending' && (
            <span className="badge badge-pending">
              Pending Moderation
            </span>
          )}
          {property.featured && (
            <span className="badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' }}>
              <Sparkles size={12} /> Featured
            </span>
          )}
        </div>

        {/* 360 Virtual Tour Pill Top Right */}
        {property.virtualTourUrl && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setVirtualTourProperty(property);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(99, 102, 241, 0.85)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <Video size={13} /> 360° Virtual Tour
          </button>
        )}

        {/* City Badge Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          background: 'rgba(11, 15, 25, 0.85)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem',
          color: '#fff',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <MapPin size={13} color="#10b981" /> {property.locality}, {property.city}
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Rent Price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-heading)' }}>
              {formattedPrice} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {property.furnishing}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setActiveProperty(property)}
            style={{ 
              fontSize: '1.1rem', 
              color: '#fff', 
              fontWeight: 700, 
              marginBottom: '0.75rem', 
              cursor: 'pointer',
              lineHeight: 1.3 
            }}
          >
            {property.title}
          </h3>

          {/* Spec Sheet Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            padding: '0.6rem 0',
            borderTop: '1px solid var(--border-glass)',
            borderBottom: '1px solid var(--border-glass)',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <Bed size={15} color="#818cf8" /> {property.bedrooms} BHK
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <Bath size={15} color="#818cf8" /> {property.bathrooms} Bath
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <Maximize2 size={15} color="#818cf8" /> {property.sqft} sqft
            </div>
          </div>

          {/* Amenities Chips */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {property.amenities.slice(0, 4).map((item, idx) => (
              <span key={idx} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px'
              }}>
                {item}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                +{property.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveProperty(property)}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%' }}
          >
            <Eye size={14} /> Details
          </button>
          <button 
            onClick={() => setBookingProperty(property)}
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            <Calendar size={14} /> Book Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
