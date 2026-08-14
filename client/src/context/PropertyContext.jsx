import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiGetProperties } from '../services/api';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBedrooms, setSelectedBedrooms] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // Modals & Active State
  const [activeProperty, setActiveProperty] = useState(null); // Property Detail Modal
  const [virtualTourProperty, setVirtualTourProperty] = useState(null); // Virtual Tour Modal
  const [bookingProperty, setBookingProperty] = useState(null); // Booking Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        city: selectedCity !== 'All' ? selectedCity : undefined,
        locality: selectedLocality !== 'All' ? selectedLocality : undefined,
        propertyType: selectedType !== 'All' ? selectedType : undefined,
        bedrooms: selectedBedrooms !== 'All' ? selectedBedrooms : undefined,
        minPrice: priceRange.min > 0 ? priceRange.min : undefined,
        maxPrice: priceRange.max < 100000 ? priceRange.max : undefined,
        search: searchQuery || undefined
      };
      const res = await apiGetProperties(params);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch properties', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [selectedCity, selectedLocality, selectedType, selectedBedrooms, searchQuery]);

  return (
    <PropertyContext.Provider value={{
      properties,
      loading,
      fetchProperties,
      selectedCity,
      setSelectedCity,
      selectedLocality,
      setSelectedLocality,
      selectedType,
      setSelectedType,
      selectedBedrooms,
      setSelectedBedrooms,
      searchQuery,
      setSearchQuery,
      priceRange,
      setPriceRange,
      activeProperty,
      setActiveProperty,
      virtualTourProperty,
      setVirtualTourProperty,
      bookingProperty,
      setBookingProperty,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isPostPropertyOpen,
      setIsPostPropertyOpen,
      isDashboardOpen,
      setIsDashboardOpen,
      toastMessage,
      showToast
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => useContext(PropertyContext);
