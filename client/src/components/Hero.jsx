import React from 'react';
import { Search, MapPin, Building, DollarSign, Bed, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export default function Hero() {
  const { 
    selectedCity, setSelectedCity, 
    selectedType, setSelectedType,
    selectedBedrooms, setSelectedBedrooms,
    searchQuery, setSearchQuery 
  } = useProperty();

  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 3rem 0',
      background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 70%)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Sub-badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399' }}>
            Tamil Nadu's #1 Verified Rental Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15, background: 'linear-gradient(to right, #ffffff, #93c5fd, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Find Your Dream Home Across <br/>Tamil Nadu's Prime Locations
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          Explore verified apartments, executive villas, and budget-friendly houses in 
          <strong style={{ color: '#fff' }}> Chennai, Coimbatore, Madurai, Trichy, Salem, Vellore</strong> & more with 360° virtual tours.
        </p>

        {/* Multi-Search Panel */}
        <div className="glass-panel" style={{
          padding: '1.25rem',
          maxWidth: '960px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Keyword Search */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              SEARCH KEYWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                placeholder="Area, project or landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.2rem' }}
              />
            </div>
          </div>

          {/* City Selection */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              SELECT CITY
            </label>
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="form-select"
            >
              <option value="All">All Tamil Nadu Cities</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Tiruchirappalli">Tiruchirappalli (Trichy)</option>
              <option value="Salem">Salem</option>
              <option value="Vellore">Vellore</option>
              <option value="Tirunelveli">Tirunelveli</option>
            </select>
          </div>

          {/* Property Type */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              PROPERTY TYPE
            </label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              <option value="All">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
              <option value="PG / Studio">PG / Studio</option>
            </select>
          </div>

          {/* Bedrooms BHK */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              BEDROOMS (BHK)
            </label>
            <select 
              value={selectedBedrooms}
              onChange={(e) => setSelectedBedrooms(e.target.value)}
              className="form-select"
            >
              <option value="All">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>
        </div>

        {/* Quick Trust Highlights */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginTop: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <CheckCircle2 size={16} color="#10b981" /> 100% Admin Approved Listings
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <CheckCircle2 size={16} color="#10b981" /> Direct Landlord Contacts
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <CheckCircle2 size={16} color="#10b981" /> 360° Interactive Virtual Room Tours
          </div>
        </div>

      </div>
    </section>
  );
}
