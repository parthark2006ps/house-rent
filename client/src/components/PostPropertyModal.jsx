import React, { useState } from 'react';
import { X, Plus, Building, MapPin, DollarSign, Bed, Bath, Image as ImageIcon, Video, CheckCircle } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { apiCreateProperty } from '../services/api';

const tnCitiesList = ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Vellore", "Tirunelveli", "Thanjavur", "Erode"];
const amenitiesOptions = ["WiFi", "AC", "Parking", "Gym", "Swimming Pool", "Lift", "Power Backup", "Security", "Garden", "Furnished"];

export default function PostPropertyModal() {
  const { isPostPropertyOpen, setIsPostPropertyOpen, fetchProperties, showToast } = useProperty();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [city, setCity] = useState('Chennai');
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [bedrooms, setBedrooms] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [sqft, setSqft] = useState('1200');
  const [imageUrl, setImageUrl] = useState('');
  const [virtualTourUrl, setVirtualTourUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState(["WiFi", "Parking", "Power Backup"]);
  const [furnishing, setFurnishing] = useState('Semi Furnished');
  const [submitting, setSubmitting] = useState(false);

  if (!isPostPropertyOpen) return null;

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !city || !locality) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const defaultImg = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80";
      const imagesList = imageUrl ? [imageUrl] : [defaultImg];

      await apiCreateProperty({
        title,
        description,
        propertyType,
        city,
        locality,
        address: address || `${locality}, ${city}, Tamil Nadu`,
        price: Number(price),
        securityDeposit: Number(securityDeposit || Number(price) * 4),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        sqft: Number(sqft),
        images: imagesList,
        virtualTourUrl: virtualTourUrl || 'https://my.matterport.com/show/?m=sample1',
        amenities: selectedAmenities,
        furnishing
      });

      showToast('Property listing created successfully! (Submitted for Admin Moderation)', 'success');
      setIsPostPropertyOpen(false);
      fetchProperties();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error posting property', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPostPropertyOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        
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
              Post New House Listing in Tamil Nadu
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Directly connect with thousands of active tenants across TN
            </span>
          </div>
          <button 
            onClick={() => setIsPostPropertyOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          
          <div className="form-group">
            <label>PROPERTY TITLE *</label>
            <input 
              type="text"
              placeholder="e.g. Spacious 3BHK Independent Villa in RS Puram"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>PROPERTY TYPE</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="form-select">
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
                <option value="PG / Studio">PG / Studio</option>
              </select>
            </div>

            <div className="form-group">
              <label>TAMIL NADU CITY *</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select">
                {tnCitiesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>LOCALITY / AREA *</label>
              <input 
                type="text"
                placeholder="e.g. Anna Nagar, Velachery, KK Nagar"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>FULL STREET ADDRESS</label>
              <input 
                type="text"
                placeholder="Door No, Street Name, Landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>RENT / MO (₹) *</label>
              <input 
                type="number"
                placeholder="25000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>DEPOSIT (₹)</label>
              <input 
                type="number"
                placeholder="100000"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>BEDROOMS</label>
              <input 
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="form-input"
                min={1} max={10}
              />
            </div>
            <div className="form-group">
              <label>SQFT AREA</label>
              <input 
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>IMAGE URL (HD PHOTO)</label>
            <input 
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>VIRTUAL TOUR LINK (360 VIEW / MATTERPORT)</label>
            <input 
              type="text"
              placeholder="https://my.matterport.com/show/..."
              value={virtualTourUrl}
              onChange={(e) => setVirtualTourUrl(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Amenities Checklist */}
          <div className="form-group">
            <label>SELECT AMENITIES</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {amenitiesOptions.map((item) => {
                const isChecked = selectedAmenities.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`btn btn-sm ${isChecked ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                  >
                    {isChecked ? '✓ ' : '+ '} {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>PROPERTY DESCRIPTION</label>
            <textarea 
              rows={3}
              placeholder="Describe house features, water facility, proximity to schools or tech parks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="btn btn-accent"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {submitting ? 'Submitting...' : 'Submit Property for Listing'}
          </button>
        </form>

      </div>
    </div>
  );
}
