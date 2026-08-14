import React, { useState } from 'react';
import { X, Calendar, Clock, DollarSign, Send, CheckCircle } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { apiCreateBooking } from '../services/api';

export default function BookingModal() {
  const { bookingProperty, setBookingProperty, showToast, setIsAuthModalOpen } = useProperty();
  const { user } = useAuth();

  const [moveInDate, setMoveInDate] = useState('2026-09-01');
  const [leaseMonths, setLeaseMonths] = useState(11);
  const [phone, setPhone] = useState(user?.phone || '');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!bookingProperty) return null;

  const monthlyRent = bookingProperty.price;
  const totalPrice = monthlyRent * leaseMonths;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast('Please login to send a rental booking inquiry', 'info');
      setBookingProperty(null);
      setIsAuthModalOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      await apiCreateBooking({
        propertyId: bookingProperty._id,
        moveInDate,
        leaseDurationMonths: Number(leaseMonths),
        message,
        userPhone: phone
      });

      showToast(`Rental inquiry sent for "${bookingProperty.title}"! The landlord will contact you soon.`, 'success');
      setBookingProperty(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error submitting booking request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setBookingProperty(null)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
        
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
              Book Rental Inquiry
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {bookingProperty.title} ({bookingProperty.city})
            </span>
          </div>
          <button 
            onClick={() => setBookingProperty(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          
          <div className="form-group">
            <label>EXPECTED MOVE-IN DATE</label>
            <input 
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>LEASE DURATION (MONTHS)</label>
            <select 
              value={leaseMonths}
              onChange={(e) => setLeaseMonths(e.target.value)}
              className="form-select"
            >
              <option value={6}>6 Months Lease</option>
              <option value={11}>11 Months Standard Lease</option>
              <option value={24}>24 Months Long Term</option>
            </select>
          </div>

          <div className="form-group">
            <label>YOUR CONTACT PHONE NUMBER</label>
            <input 
              type="text"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>NOTE TO LANDLORD (OPTIONAL)</label>
            <textarea 
              rows={3}
              placeholder="E.g., Number of family members, occupation, move-in flexibility..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Cost Calculator Summary Box */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              <span>Monthly Rent:</span>
              <strong style={{ color: '#fff' }}>₹{monthlyRent.toLocaleString('en-IN')}/mo</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span>Lease Period:</span>
              <strong style={{ color: '#fff' }}>{leaseMonths} Months</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#34d399', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span>Total Contract Value:</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem' }}
          >
            <Send size={18} /> {submitting ? 'Submitting Inquiry...' : 'Confirm & Submit Inquiry'}
          </button>
        </form>

      </div>
    </div>
  );
}
