import React, { useState, useEffect } from 'react';
import { X, LayoutDashboard, ShieldCheck, CheckCircle2, XCircle, Clock, Trash2, Home, User, DollarSign, RefreshCw, Layers, LogOut, Key, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { 
  apiGetMyBookings, 
  apiGetAllBookings, 
  apiUpdateBookingStatus, 
  apiApproveProperty, 
  apiRejectProperty, 
  apiDeleteProperty,
  apiGetStats,
  apiGetProperties
} from '../services/api';

export default function DashboardModal() {
  const { user, logout, switchDemoRole } = useAuth();
  const { isDashboardOpen, setIsDashboardOpen, showToast, fetchProperties: refreshMainProperties } = useProperty();

  const [activeTab, setActiveTab] = useState(user?.role || 'user');
  const [bookings, setBookings] = useState([]);
  const [moderationProperties, setModerationProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setActiveTab(user.role);
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (user?.role === 'user') {
        const res = await apiGetMyBookings();
        setBookings(res.data);
      } else if (user?.role === 'owner') {
        const res = await apiGetAllBookings();
        setBookings(res.data);
      } else if (user?.role === 'admin') {
        const [propsRes, statsRes, bookingsRes] = await Promise.all([
          apiGetProperties({ status: 'all' }),
          apiGetStats(),
          apiGetAllBookings()
        ]);
        setModerationProperties(propsRes.data);
        setStats(statsRes.data);
        setBookings(bookingsRes.data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDashboardOpen) {
      loadDashboardData();
    }
  }, [isDashboardOpen, activeTab, user]);

  if (!isDashboardOpen) return null;

  const handleApproveProperty = async (id) => {
    try {
      await apiApproveProperty(id);
      showToast('Property listing APPROVED and published live!', 'success');
      loadDashboardData();
      refreshMainProperties();
    } catch (err) {
      showToast('Error approving property', 'error');
    }
  };

  const handleRejectProperty = async (id) => {
    try {
      await apiRejectProperty(id);
      showToast('Property listing rejected', 'info');
      loadDashboardData();
      refreshMainProperties();
    } catch (err) {
      showToast('Error rejecting property', 'error');
    }
  };

  const handleUpdateBooking = async (id, status) => {
    try {
      await apiUpdateBookingStatus(id, status);
      showToast(`Booking inquiry marked as ${status.toUpperCase()}`, 'success');
      loadDashboardData();
    } catch (err) {
      showToast('Error updating booking status', 'error');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await apiDeleteProperty(id);
      showToast('Property removed', 'success');
      loadDashboardData();
      refreshMainProperties();
    } catch (err) {
      showToast('Error deleting property', 'error');
    }
  };

  const handleLogoutSession = () => {
    logout();
    showToast('Logged out of session successfully', 'info');
    setIsDashboardOpen(false);
  };

  const handleSwitchAccount = async (targetRole) => {
    try {
      await switchDemoRole(targetRole);
      showToast(`Switched active session to ${targetRole.toUpperCase()} Portal`, 'success');
    } catch (err) {
      showToast('Account switch failed', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsDashboardOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '950px' }}>
        
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(11,15,25,0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'var(--primary-glow)', borderRadius: '10px', color: '#818cf8' }}>
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', fontWeight: 700 }}>
                HouseHunt Management Dashboard
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Active Profile: <strong style={{ color: '#34d399' }}>{user?.name || 'Guest User'}</strong> ({user?.role?.toUpperCase() || 'NOT LOGGED IN'})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={loadDashboardData} className="btn btn-secondary btn-sm" title="Refresh Data">
              <RefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => setIsDashboardOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Dashboard Role Tabs */}
        <div style={{ padding: '1.25rem 1.5rem' }}>
          
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => setActiveTab('user')}
            >
              👤 Renter User Portal
            </button>
            <button 
              className={`tab-btn ${activeTab === 'owner' ? 'active' : ''}`}
              onClick={() => setActiveTab('owner')}
            >
              🏡 Landlord Owner Portal
            </button>
            <button 
              className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              🔑 Admin Moderation Portal
            </button>
          </div>

          {/* ADMIN OVERVIEW & MODERATION TAB */}
          {activeTab === 'admin' && (
            <div>
              {/* ADMIN SESSION CREDENTIALS & LOGOUT PANEL */}
              <div className="glass-panel" style={{
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #f59e0b',
                background: 'rgba(245, 158, 11, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <ShieldCheck size={18} color="#fbbf24" />
                      <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                        ADMIN PORTAL SESSION & CREDENTIALS
                      </h4>
                      <span className="badge badge-pending">System Administrator</span>
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                      Active Email: <code style={{ color: '#fbbf24', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>{user?.role === 'admin' ? user.email : 'admin@househunt.tn'}</code> | Password: <code style={{ color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>
                    </p>
                    {user?.role !== 'admin' && (
                      <p style={{ fontSize: '0.78rem', color: '#f87171', marginTop: '0.25rem' }}>
                        ⚠️ You are currently viewing as {user?.role ? user.role.toUpperCase() : 'GUEST'}. Click "Switch to Admin" to authenticate full moderation capabilities.
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {user?.role !== 'admin' ? (
                      <button onClick={() => handleSwitchAccount('admin')} className="btn btn-primary btn-sm" style={{ background: '#f59e0b', fontSize: '0.8rem' }}>
                        <Key size={14} /> Switch to Admin Session
                      </button>
                    ) : (
                      <button onClick={handleLogoutSession} className="btn btn-danger btn-sm" style={{ fontSize: '0.8rem' }}>
                        <LogOut size={14} /> Logout Admin Portal
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Stat Counters */}
              {stats && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="glass-panel" style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL LISTINGS</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{stats.totalProperties}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #10b981' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LIVE APPROVED</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>{stats.approvedProperties}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #f59e0b' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PENDING MODERATION</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>{stats.pendingModeration}</div>
                  </div>
                  <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid #6366f1' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL BOOKINGS</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8' }}>{stats.totalBookings}</div>
                  </div>
                </div>
              )}

              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>
                Pending Property Approval Moderation Queue
              </h3>

              {moderationProperties.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No properties in moderation queue.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {moderationProperties.map((prop) => (
                    <div key={prop._id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={prop.images[0] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=300&q=80'} 
                          alt="Prop" 
                          style={{ width: '70px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h4 style={{ color: '#fff', fontSize: '1rem' }}>{prop.title}</h4>
                            <span className={`badge badge-${prop.status}`}>{prop.status}</span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {prop.locality}, {prop.city} • ₹{prop.price.toLocaleString('en-IN')}/mo • Owner: {prop.ownerName}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {prop.status === 'pending' && (
                          <>
                            <button onClick={() => handleApproveProperty(prop._id)} className="btn btn-accent btn-sm">
                              <CheckCircle2 size={14} /> Approve
                            </button>
                            <button onClick={() => handleRejectProperty(prop._id)} className="btn btn-danger btn-sm">
                              <XCircle size={14} /> Reject
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDeleteProperty(prop._id)} className="btn btn-secondary btn-sm" title="Delete Property">
                          <Trash2 size={14} color="#f43f5e" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LANDLORD / OWNER TAB */}
          {activeTab === 'owner' && (
            <div>
              {/* OWNER SESSION CREDENTIALS & LOGOUT PANEL */}
              <div className="glass-panel" style={{
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #10b981',
                background: 'rgba(16, 185, 129, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <Home size={18} color="#34d399" />
                      <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                        LANDLORD / OWNER PORTAL SESSION & CREDENTIALS
                      </h4>
                      <span className="badge badge-approved">Property Owner</span>
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                      Active Email: <code style={{ color: '#34d399', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>{user?.role === 'owner' ? user.email : 'owner@househunt.tn'}</code> | Password: <code style={{ color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>owner123</code>
                    </p>
                    {user?.role !== 'owner' && (
                      <p style={{ fontSize: '0.78rem', color: '#fbbf24', marginTop: '0.25rem' }}>
                        ℹ️ You are currently viewing as {user?.role ? user.role.toUpperCase() : 'GUEST'}. Click "Switch to Owner" to manage landlord listings.
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {user?.role !== 'owner' ? (
                      <button onClick={() => handleSwitchAccount('owner')} className="btn btn-accent btn-sm" style={{ fontSize: '0.8rem' }}>
                        <Key size={14} /> Switch to Owner Session
                      </button>
                    ) : (
                      <button onClick={handleLogoutSession} className="btn btn-danger btn-sm" style={{ fontSize: '0.8rem' }}>
                        <LogOut size={14} /> Logout Owner Portal
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>
                Rental Inquiries Received from Tenants
              </h3>

              {bookings.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No incoming booking inquiries yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bookings.map((book) => (
                    <div key={book._id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h4 style={{ color: '#fff', fontSize: '1rem' }}>{book.propertyTitle} ({book.propertyCity})</h4>
                          <span className={`badge badge-${book.status === 'confirmed' ? 'approved' : book.status === 'rejected' ? 'rejected' : 'pending'}`}>
                            {book.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                          Renter Name: <strong style={{ color: '#fff' }}>{book.userName}</strong> ({book.userPhone}) • Move In: {book.moveInDate} ({book.leaseDurationMonths} months)
                        </p>
                        {book.message && (
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                            "{book.message}"
                          </p>
                        )}
                      </div>

                      {book.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleUpdateBooking(book._id, 'confirmed')} className="btn btn-accent btn-sm">
                            Accept Inquiry
                          </button>
                          <button onClick={() => handleUpdateBooking(book._id, 'rejected')} className="btn btn-danger btn-sm">
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TENANT / USER TAB */}
          {activeTab === 'user' && (
            <div>
              {/* USER / TENANT SESSION CREDENTIALS & LOGOUT PANEL */}
              <div className="glass-panel" style={{
                padding: '1rem 1.25rem',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #6366f1',
                background: 'rgba(99, 102, 241, 0.06)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <User size={18} color="#818cf8" />
                      <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                        USER / TENANT PORTAL SESSION & CREDENTIALS
                      </h4>
                      <span className="badge badge-tn">Verified Tenant</span>
                    </div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                      Active Email: <code style={{ color: '#818cf8', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>{user?.role === 'user' ? user.email : 'user@househunt.tn'}</code> | Password: <code style={{ color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>user123</code>
                    </p>
                    {user?.role !== 'user' && (
                      <p style={{ fontSize: '0.78rem', color: '#818cf8', marginTop: '0.25rem' }}>
                        ℹ️ You are currently viewing as {user?.role ? user.role.toUpperCase() : 'GUEST'}. Click "Switch to Tenant" to manage renter inquiries.
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {user?.role !== 'user' ? (
                      <button onClick={() => handleSwitchAccount('user')} className="btn btn-primary btn-sm" style={{ fontSize: '0.8rem' }}>
                        <Key size={14} /> Switch to Tenant Session
                      </button>
                    ) : (
                      <button onClick={handleLogoutSession} className="btn btn-danger btn-sm" style={{ fontSize: '0.8rem' }}>
                        <LogOut size={14} /> Logout User Portal
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem' }}>
                My House Rental Inquiries & Bookings
              </h3>

              {bookings.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>You haven't submitted any rental booking inquiry yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {bookings.map((book) => (
                    <div key={book._id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h4 style={{ color: '#fff', fontSize: '1rem' }}>{book.propertyTitle}</h4>
                          <span className={`badge badge-${book.status === 'confirmed' ? 'approved' : book.status === 'rejected' ? 'rejected' : 'pending'}`}>
                            {book.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                          Move-in Date: <strong>{book.moveInDate}</strong> • Duration: {book.leaseDurationMonths} Months • Estimated Contract Value: ₹{book.totalPrice?.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {book.status === 'confirmed' && (
                        <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={16} /> Landlord Confirmed Tour!
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
