import React, { useState } from 'react';
import { X, Eye, Video, Compass, Maximize, ShieldCheck, Check } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

const roomPanoramas = [
  {
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious living hall with vitrified tile flooring, LED ambient lighting & TV unit space.'
  },
  {
    name: 'Master Bedroom',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1200&q=80',
    description: 'Sunlit master bedroom with attached bathroom, teakwood wardrobe, and inverter AC wiring.'
  },
  {
    name: 'Modular Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern modular kitchen with granite countertop, chimney provision, and stainless steel sink.'
  },
  {
    name: 'Balcony View',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    description: 'Open airy balcony overlooking green residential surroundings and clear sky.'
  }
];

export default function VirtualTourModal() {
  const { virtualTourProperty, setVirtualTourProperty } = useProperty();
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);

  if (!virtualTourProperty) return null;

  const currentRoom = roomPanoramas[activeRoomIdx];

  return (
    <div className="modal-overlay" onClick={() => setVirtualTourProperty(null)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '950px', background: '#0b0f19' }}>
        
        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(17,24,39,0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', background: 'var(--primary-glow)', borderRadius: '8px', color: '#818cf8' }}>
              <Video size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 700 }}>
                360° Virtual Tour: {virtualTourProperty.title}
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {virtualTourProperty.locality}, {virtualTourProperty.city}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setVirtualTourProperty(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Room Switcher Tabs */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto'
        }}>
          {roomPanoramas.map((room, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRoomIdx(idx)}
              className={`btn btn-sm ${activeRoomIdx === idx ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}
            >
              <Eye size={13} /> {room.name}
            </button>
          ))}
        </div>

        {/* 360 Viewer Viewport */}
        <div style={{ position: 'relative', height: '420px', background: '#000', overflow: 'hidden' }}>
          <img 
            src={currentRoom.image} 
            alt={currentRoom.name} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.9)'
            }}
          />

          {/* Compass / Pan Indicator Badge */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            color: '#fff',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <Compass size={16} color="#34d399" /> Pan & Zoom Room Preview
          </div>

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            background: 'rgba(17, 24, 39, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                {currentRoom.name}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {currentRoom.description}
              </p>
            </div>

            <span className="badge badge-approved">
              <ShieldCheck size={12} /> 100% Verified Layout
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
