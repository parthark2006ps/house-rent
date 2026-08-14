import React from 'react';
import { MapPin } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

const tnCities = [
  {
    name: 'Chennai',
    tagline: 'Anna Nagar, Velachery, OMR, Besant Nagar',
    count: '150+ listings',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Coimbatore',
    tagline: 'RS Puram, Peelamedu, Gandhipuram',
    count: '95+ listings',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Madurai',
    tagline: 'KK Nagar, Anna Nagar, Simmakkal',
    count: '70+ listings',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Tiruchirappalli',
    tagline: 'Thillai Nagar, Cantonment, Srirangam',
    count: '60+ listings',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Salem',
    tagline: 'Fairlands, Hasthampatti, Suramangalam',
    count: '45+ listings',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Vellore',
    tagline: 'Katpadi near VIT, Gandhinagar',
    count: '40+ listings',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80'
  }
];

export default function CityFilter() {
  const { selectedCity, setSelectedCity } = useProperty();

  return (
    <section style={{ padding: '2.5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.25rem' }}>
              Explore Houses by Tamil Nadu City
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Browse curated rental homes across key residential & IT hubs in Tamil Nadu.
            </p>
          </div>

          {selectedCity !== 'All' && (
            <button 
              onClick={() => setSelectedCity('All')}
              className="btn btn-secondary btn-sm"
            >
              Reset City Filter (Show All)
            </button>
          )}
        </div>

        {/* City Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}>
          {tnCities.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            return (
              <div 
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                style={{
                  position: 'relative',
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                  boxShadow: isSelected ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <img 
                  src={city.image} 
                  alt={city.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isSelected ? 'brightness(0.65)' : 'brightness(0.45)',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95), transparent)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-tn" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                      <MapPin size={10} /> TN
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                      {city.count}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>
                      {city.name}
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {city.tagline}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
