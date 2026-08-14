import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

export default function Toast() {
  const { toastMessage } = useProperty();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const getIcon = () => {
    if (type === 'error') return <AlertCircle size={18} color="#f43f5e" />;
    if (type === 'info') return <Info size={18} color="#6366f1" />;
    return <CheckCircle2 size={18} color="#10b981" />;
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      background: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border-glass)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      borderRadius: 'var(--radius-md)',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      maxWidth: '400px',
      color: '#fff',
      fontSize: '0.9rem',
      animation: 'slideUp 0.3s ease-out'
    }}>
      {getIcon()}
      <span style={{ flex: 1 }}>{message}</span>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
