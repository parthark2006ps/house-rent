const initialUsers = [
  {
    _id: "usr_admin_001",
    name: "Tamil Nadu Admin Moderation",
    email: "admin@househunt.tn",
    password: "$2a$10$wE99JbF9n41c0pX9HqQe8.XN18hN0lqgE1Y3/8f/N3uW012345678", // admin123
    role: "admin",
    phone: "+91 94440 11223",
    city: "Chennai"
  },
  {
    _id: "usr_owner_001",
    name: "Karthik Raja (Property Owner)",
    email: "owner@househunt.tn",
    password: "$2a$10$wE99JbF9n41c0pX9HqQe8.XN18hN0lqgE1Y3/8f/N3uW012345678", // owner123
    role: "owner",
    phone: "+91 98401 55667",
    city: "Chennai"
  },
  {
    _id: "usr_tenant_001",
    name: "Priya Sundaram (Renter)",
    email: "user@househunt.tn",
    password: "$2a$10$wE99JbF9n41c0pX9HqQe8.XN18hN0lqgE1Y3/8f/N3uW012345678", // user123
    role: "user",
    phone: "+91 97908 99887",
    city: "Coimbatore"
  }
];

const initialProperties = [
  {
    _id: "prop_tn_001",
    title: "Luxury 3BHK Gated Apartment with Pool",
    description: "Premium 3BHK East-facing apartment in prime Anna Nagar, West Extension. Offers centralized air conditioning, covered modular kitchen, swimming pool, continuous Metro water, 24/7 security, and 2 car parkings.",
    propertyType: "Apartment",
    price: 35000,
    securityDeposit: 150000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1850,
    city: "Chennai",
    locality: "Anna Nagar",
    address: "Block 5, 2nd Avenue, Near Tower Park, Anna Nagar West, Chennai - 600040",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=sample1",
    amenities: ["WiFi", "AC", "Parking", "Gym", "Swimming Pool", "Lift", "Power Backup", "Security", "Furnished"],
    furnishing: "Fully Furnished",
    ownerName: "Karthik Raja",
    ownerPhone: "+91 98401 55667",
    status: "approved",
    featured: true,
    rating: 4.9
  },
  {
    _id: "prop_tn_002",
    title: "Modern 2BHK Near OMR IT Corridor & TIDEL Park",
    description: "Ideal for tech professionals! Well-ventilated 2BHK apartment in Velachery near OMR link road. Fully fitted with teak wood wardrobes, modular kitchen, gym access, power backup, and high-speed fiber internet connection.",
    propertyType: "Apartment",
    price: 22000,
    securityDeposit: 100000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    city: "Chennai",
    locality: "Velachery",
    address: "Plot 42, Vijaya Nagar 3rd Main Rd, Velachery, Chennai - 600042",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=sample2",
    amenities: ["WiFi", "AC", "Parking", "Lift", "Power Backup", "Security"],
    furnishing: "Semi Furnished",
    ownerName: "Subramanian Swamy",
    ownerPhone: "+91 98410 11223",
    status: "approved",
    featured: true,
    rating: 4.8
  },
  {
    _id: "prop_tn_003",
    title: "Exclusive Executive Villa in RS Puram",
    description: "Architect-designed 4BHK independent villa in the heart of RS Puram, Coimbatore. Features private garden lawn, servant room, solar water heating, marble flooring, and spacious balcony with Siruvani water connection.",
    propertyType: "Villa",
    price: 45000,
    securityDeposit: 250000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2800,
    city: "Coimbatore",
    locality: "RS Puram",
    address: "18, DB Road, Opposite Brookefields Lane, RS Puram, Coimbatore - 641002",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=sample3",
    amenities: ["Parking", "Garden", "AC", "Solar Heater", "Power Backup", "Security", "Furnished"],
    furnishing: "Fully Furnished",
    ownerName: "Viswanathan Iyer",
    ownerPhone: "+91 94430 88776",
    status: "approved",
    featured: true,
    rating: 4.95
  },
  {
    _id: "prop_tn_004",
    title: "Spacious 3BHK Apartment in Peelamedu",
    description: "Close to PSG College and Fun Republic Mall. Bright 3BHK flat in prime Peelamedu area with 24/7 security, lift, covered car parking, continuous water supply, and peaceful residential neighborhood.",
    propertyType: "Apartment",
    price: 24000,
    securityDeposit: 120000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1550,
    city: "Coimbatore",
    locality: "Peelamedu",
    address: "Avinashi Road, Near PSG Tech Gate 2, Peelamedu, Coimbatore - 641004",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["Parking", "Lift", "Power Backup", "Security"],
    furnishing: "Semi Furnished",
    ownerName: "Lakshmi Narayanan",
    ownerPhone: "+91 98940 33445",
    status: "approved",
    featured: false,
    rating: 4.7
  },
  {
    _id: "prop_tn_005",
    title: "Independent 3BHK House in KK Nagar",
    description: "Peaceful Independent 3BHK home with portico, private open terrace, ground water and Cauvery water tap in KK Nagar, Madurai. Close to Mattuthavani Bus Stand and Apollo Hospital.",
    propertyType: "Independent House",
    price: 18000,
    securityDeposit: 90000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1600,
    city: "Madurai",
    locality: "KK Nagar",
    address: "80 Feet Road, Near Lake View Road, KK Nagar, Madurai - 625020",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["Parking", "Terrace Access", "Power Backup", "Water Storage"],
    furnishing: "Semi Furnished",
    ownerName: "Meenakshi Sundaram",
    ownerPhone: "+91 97890 12345",
    status: "approved",
    featured: true,
    rating: 4.85
  },
  {
    _id: "prop_tn_006",
    title: "Premium 3BHK Flat in Thillai Nagar",
    description: "Located in Tiruchirappalli's premier commercial and residential area. Spacious 3BHK flat on 2nd floor with balcony view, teak wood doors, covered car parking, and modular kitchen.",
    propertyType: "Apartment",
    price: 20000,
    securityDeposit: 100000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1450,
    city: "Tiruchirappalli",
    locality: "Thillai Nagar",
    address: "10th Cross East, Thillai Nagar, Trichy - 620018",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["Lift", "Parking", "AC", "Power Backup", "Security"],
    furnishing: "Fully Furnished",
    ownerName: "Renganathan Pillai",
    ownerPhone: "+91 94431 55443",
    status: "approved",
    featured: false,
    rating: 4.75
  },
  {
    _id: "prop_tn_007",
    title: "Elegant Independent House in Fairlands",
    description: "Spacious 3BHK house in Salem's upmarket Fairlands area. Wooden interiors, private garden, car porch, 24-hour borewell & metro water connection.",
    propertyType: "Independent House",
    price: 19000,
    securityDeposit: 95000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    city: "Salem",
    locality: "Fairlands",
    address: "Brindavan Road, 4th Cross, Fairlands, Salem - 636016",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["Parking", "Garden", "Power Backup"],
    furnishing: "Semi Furnished",
    ownerName: "Shanmugam Chettiar",
    ownerPhone: "+91 98427 66554",
    status: "approved",
    featured: false,
    rating: 4.6
  },
  {
    _id: "prop_tn_008",
    title: "Modern 2BHK Near VIT Campus Katpadi",
    description: "Perfect for university faculty, research scholars & families. Gated community 2BHK flat with high speed WiFi, elevator, CCTV surveillance, and 24/7 security near Katpadi Junction.",
    propertyType: "Apartment",
    price: 15000,
    securityDeposit: 75000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    city: "Vellore",
    locality: "Katpadi",
    address: "Chittoor Main Road, Katpadi, Vellore - 632014",
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["WiFi", "Lift", "Parking", "Security", "Power Backup"],
    furnishing: "Fully Furnished",
    ownerName: "Dr. Vijayaraghavan",
    ownerPhone: "+91 94422 77889",
    status: "approved",
    featured: false,
    rating: 4.8
  },
  {
    _id: "prop_tn_009",
    title: "Heritage Style Independent Villa in Palayamkottai",
    description: "Quiet & green location in Tirunelveli. Beautiful 3BHK home with traditional courtyard, high ceilings, spacious kitchen, and parking for 2 vehicles.",
    propertyType: "Villa",
    price: 16000,
    securityDeposit: 80000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1900,
    city: "Tirunelveli",
    locality: "Palayamkottai",
    address: "High Ground Road, Near St. Xavier's College, Palayamkottai, Tirunelveli - 627002",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["Parking", "Terrace", "Water Storage"],
    furnishing: "Semi Furnished",
    ownerName: "Nellaiappan Pandian",
    ownerPhone: "+91 98430 22110",
    status: "approved",
    featured: false,
    rating: 4.7
  },
  {
    _id: "prop_tn_010",
    title: "Pending Approval: Sea-view Penthouse in ECR Chennai",
    description: "Exclusive sea facing 4BHK duplex penthouse in East Coast Road, Chennai. Terraced garden, jacuzzi, private elevator access, and unobstructed Bay of Bengal view. (Awaiting Admin Review)",
    propertyType: "Villa",
    price: 75000,
    securityDeposit: 400000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 3400,
    city: "Chennai",
    locality: "ECR",
    address: "Beach Road, Neelankarai, ECR, Chennai - 600115",
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80"
    ],
    virtualTourUrl: "",
    amenities: ["WiFi", "AC", "Parking", "Gym", "Swimming Pool", "Lift", "Power Backup", "Security", "Furnished"],
    furnishing: "Fully Furnished",
    ownerName: "Karthik Raja",
    ownerPhone: "+91 98401 55667",
    status: "pending", // Pending Admin Approval
    featured: false,
    rating: 5.0
  }
];

const initialBookings = [
  {
    _id: "book_001",
    property: "prop_tn_001",
    propertyTitle: "Luxury 3BHK Gated Apartment with Pool",
    propertyCity: "Chennai",
    propertyPrice: 35000,
    user: "usr_tenant_001",
    userName: "Priya Sundaram",
    userEmail: "user@househunt.tn",
    userPhone: "+91 97908 99887",
    moveInDate: "2026-09-01",
    leaseDurationMonths: 11,
    totalPrice: 385000,
    status: "confirmed",
    message: "Interested in a 11-month lease starting 1st September.",
    createdAt: new Date()
  }
];

module.exports = { initialUsers, initialProperties, initialBookings };
