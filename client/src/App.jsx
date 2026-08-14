import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CityFilter from './components/CityFilter';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import VirtualTourModal from './components/VirtualTourModal';
import BookingModal from './components/BookingModal';
import PostPropertyModal from './components/PostPropertyModal';
import DashboardModal from './components/DashboardModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

function MainApp() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <CityFilter />
        <PropertyGrid />
      </main>
      <Footer />

      {/* Modals & Overlays */}
      <PropertyDetailsModal />
      <VirtualTourModal />
      <BookingModal />
      <PostPropertyModal />
      <DashboardModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <MainApp />
      </PropertyProvider>
    </AuthProvider>
  );
}
