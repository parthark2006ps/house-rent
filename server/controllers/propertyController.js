const Property = require('../models/Property');
const { getMongoStatus } = require('../config/db');
const { initialProperties } = require('../data/seedData');

// In-memory property store
let memoryProperties = [...initialProperties];

// Get all properties with filters
const getProperties = async (req, res) => {
  try {
    const { search, city, locality, propertyType, minPrice, maxPrice, bedrooms, status, featured } = req.query;

    if (getMongoStatus()) {
      let query = {};
      
      // Default non-admin query gets approved properties unless status specified
      if (status) {
        query.status = status;
      } else {
        query.status = 'approved';
      }

      if (city && city !== 'All') {
        query.city = { $regex: city, $options: 'i' };
      }
      if (locality && locality !== 'All') {
        query.locality = { $regex: locality, $options: 'i' };
      }
      if (propertyType && propertyType !== 'All') {
        query.propertyType = propertyType;
      }
      if (bedrooms && bedrooms !== 'All') {
        query.bedrooms = Number(bedrooms);
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (featured === 'true') {
        query.featured = true;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { city: { $regex: search, $options: 'i' } },
          { locality: { $regex: search, $options: 'i' } }
        ];
      }

      const properties = await Property.find(query).sort({ createdAt: -1 });
      return res.json(properties);
    } else {
      // In-Memory Filtering logic
      let result = [...memoryProperties];

      const filterStatus = status || 'approved';
      if (filterStatus !== 'all') {
        result = result.filter(p => p.status === filterStatus);
      }

      if (city && city !== 'All') {
        result = result.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
      }
      if (locality && locality !== 'All') {
        result = result.filter(p => p.locality.toLowerCase().includes(locality.toLowerCase()));
      }
      if (propertyType && propertyType !== 'All') {
        result = result.filter(p => p.propertyType === propertyType);
      }
      if (bedrooms && bedrooms !== 'All') {
        result = result.filter(p => Number(p.bedrooms) === Number(bedrooms));
      }
      if (minPrice) {
        result = result.filter(p => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        result = result.filter(p => p.price <= Number(maxPrice));
      }
      if (featured === 'true') {
        result = result.filter(p => p.featured);
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q)
        );
      }

      return res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      return res.json(property);
    } else {
      const property = memoryProperties.find(p => p._id === id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      return res.json(property);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new Property listing
const createProperty = async (req, res) => {
  try {
    const {
      title, description, propertyType, price, securityDeposit,
      bedrooms, bathrooms, sqft, city, locality, address,
      images, virtualTourUrl, amenities, furnishing
    } = req.body;

    if (!title || !price || !city || !locality || !bedrooms) {
      return res.status(400).json({ message: 'Please provide all mandatory fields (Title, Price, City, Locality, Bedrooms).' });
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ];

    // Status: Pending if created by owner, auto-approved if admin
    const status = req.user && req.user.role === 'admin' ? 'approved' : 'pending';

    const newPropData = {
      title,
      description: description || 'Beautiful house for rent in prime ' + locality + ', ' + city,
      propertyType: propertyType || 'Apartment',
      price: Number(price),
      securityDeposit: Number(securityDeposit || price * 4),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms || 2),
      sqft: Number(sqft || 1200),
      city,
      locality,
      address: address || `${locality}, ${city}, Tamil Nadu`,
      images: (images && images.length > 0) ? images : defaultImages,
      virtualTourUrl: virtualTourUrl || '',
      amenities: amenities || ['Parking', 'Power Backup', 'Water Storage'],
      furnishing: furnishing || 'Semi Furnished',
      ownerName: req.user ? req.user.name : 'Tamil Nadu Landlord',
      ownerPhone: '+91 98765 43210',
      status,
      featured: false,
      rating: 4.8,
      createdAt: new Date()
    };

    if (getMongoStatus()) {
      const property = await Property.create({
        ...newPropData,
        owner: req.user ? req.user.id : null
      });
      return res.status(201).json(property);
    } else {
      const memoryProp = {
        _id: 'prop_custom_' + Date.now(),
        ...newPropData,
        owner: req.user ? req.user.id : null
      };
      memoryProperties.unshift(memoryProp);
      return res.status(201).json(memoryProp);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Approve Property
const approveProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      const prop = await Property.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
      if (!prop) return res.status(404).json({ message: 'Property not found' });
      return res.json({ message: 'Property listing approved successfully', property: prop });
    } else {
      const prop = memoryProperties.find(p => p._id === id);
      if (!prop) return res.status(404).json({ message: 'Property not found' });
      prop.status = 'approved';
      return res.json({ message: 'Property listing approved successfully', property: prop });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Reject Property
const rejectProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      const prop = await Property.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
      if (!prop) return res.status(404).json({ message: 'Property not found' });
      return res.json({ message: 'Property listing rejected', property: prop });
    } else {
      const prop = memoryProperties.find(p => p._id === id);
      if (!prop) return res.status(404).json({ message: 'Property not found' });
      prop.status = 'rejected';
      return res.json({ message: 'Property listing rejected', property: prop });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      await Property.findByIdAndDelete(id);
      return res.json({ message: 'Property removed successfully' });
    } else {
      memoryProperties = memoryProperties.filter(p => p._id !== id);
      return res.json({ message: 'Property removed successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  approveProperty,
  rejectProperty,
  deleteProperty,
  memoryProperties
};
