import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001/api/v1';

// Helper function to determine hostel type based on name
const determineHostelType = (name) => {
  if (!name) return 'male';
  const lowerCaseName = name.toLowerCase();
  return lowerCaseName.includes('girl') || lowerCaseName.includes('female') || lowerCaseName.includes('women') 
    ? 'female' 
    : 'male';
};

// Map API data to include only fields required by frontend components
const mapHostel = (item) => {
  // Common fields used in list view (HostelsPage)
const baseFields = {
    id: item._id || 'NA',
    name: item.hostelName || 'NA',
    type: item.type || determineHostelType(item.hostelName),
    mainImage: Array.isArray(item.hostelPictures) && item.hostelPictures.length > 0 
        ? item.hostelPictures[0] 
        : "https://source.unsplash.com/random/1200x800/?hostel,dormitory,building",
    totalRooms: item.roomsInHostel || 'NA',
    totalToilets: item.totalToilets || 'NA', // Added missing field
    totalCapacity: item.totalStudentsInHostel || 'NA',
    shortDescription: item.shortDescription || `Modern accommodation with premium amenities for students.`,
    reviews: item.reviews || [
        {
            student: "Priya Patel",
            rating: 4.7,
            comment: "Excellent security and facilities. The staff is very responsive and caring.",
            date: "2023-05-20"
        },
        {
            student: "Neha Gupta", 
            rating: 4.5,
            comment: "Clean rooms and great mess food. The reading room is perfect for studying.",
            date: "2023-04-15"
        },
        {
            student: "Anjali Singh",
            rating: 4.3, 
            comment: "Safe and comfortable environment. The common room could use some updates.",
            date: "2023-03-25"
        }
    ]
};

  // Additional fields for detail view (HostelDetailPage)
  const detailFields = {
    description: item.description || `${item.hostelName} provides comfortable accommodation for students with various amenities and facilities.`,
    facilities: Array.isArray(item.HostelFacilities) && item.HostelFacilities.length > 0 
      ? item.HostelFacilities.map(facility => ({
          name: facility,
          description: `${facility} facility available for students`,
          timing: "Open 24 hours"
        }))
      : ['WiFi', 'Study Room', 'Security', 'Mess', 'Common Room', 'Laundry'].map(facility => ({
          name: facility,
          description: `${facility} facility available for students`,
          timing: "Open 24 hours"
        })),
    fees: {
      annual: `₹${item.hostelAnnualFees || '75,000'}`,
      semester: `₹${item.hostelFeesPerSemester || '40,000'}`,
      security: `₹${item.securityDeposit || '10,000'} (Refundable)`
    },
    staff: [{
      name: item.hostelWardenName || 'NA',
      position: "Warden",
      contact: item.hostelWardenContactNumber || 'NA',
      image: "https://source.unsplash.com/random/150x150/?professor",
    }],
    rules: item.hostelRules || [
      "Entry to the hostel after 10:00 PM requires prior permission",
      "Visitors are allowed only in the visitor's area during designated hours",
      "All students must maintain cleanliness in their rooms and common areas"
    ],
    location: {
      address: item.hostelAddress || "University Campus",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      nearbyPlaces: ["Main Academic Block (300m)", "Library (400m)", "Sports Complex (200m)"]
    },
    images: Array.isArray(item.hostelPictures) 
      ? item.hostelPictures.map((url, index) => ({
          url,
          alt: `${item.hostelName} - Image ${index + 1}`,
          category: ['room', 'facility', 'mess', 'building'][index % 4]
        }))
      : [],
    roomTypes: item.roomTypes || [
      {
        type: "Double Sharing",
        count: item.roomsInHostel ? Math.floor(item.roomsInHostel * 0.8) : 100,
        description: "Spacious rooms with two beds, study tables, and wardrobes",
        amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi"]
      },
      {
        type: "Single Occupancy",
        count: item.roomsInHostel ? Math.floor(item.roomsInHostel * 0.2) : 20,
        description: "Private rooms for senior students",
        amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi", "Attached Bathroom"]
      }
    ],
    applicationProcess: item.applicationProcess || "Applications open at the beginning of each academic year. Current students can apply through the student portal. New students receive application details with their admission offer.",
    contactEmail: item.contactEmail || "hostel.admin@university.edu",
    contactPhone: item.contactPhone || "+91-1123456780"
  };

  return { ...baseFields, ...detailFields };
};

const hostelsApi = {
  getHostels: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hostel/get-hostel`);
      
      if (response.data?.data) {
        const mappedHostels = response.data.data.map(mapHostel);
        return {
          hostels: mappedHostels,
          pagination: {
            totalCount: mappedHostels.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false
          }
        };
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('Error fetching hostels:', error);
      throw error;
    }
  },
  
  getHostelById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hostel/get-hostel/${id}`);
      if (response.data?.data) {
        return mapHostel(response.data.data);
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('Error fetching hostel by ID:', error);
      throw error;
    }
  },

  createHostel: async (hostelData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/hostel/add-hostel`, hostelData);
      if (response.data?.data) {
        return mapHostel(response.data.data);
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('Error creating hostel:', error);
      throw error;
    }
  },
  
  updateHostel: async (id, hostelData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/hostel/edit-hostel/${id}`, hostelData);
      if (response.data?.data) {
        return mapHostel(response.data.data);
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('Error updating hostel:', error);
      throw error;
    }
  },
  
  deleteHostel: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/hostel/delete-hostel/${id}`);
      if (response.data && response.status === 200) {
        return { success: true, message: 'Hostel deleted successfully' };
      }
      throw new Error('Invalid API response format');
    } catch (error) {
      console.error('Error deleting hostel:', error);
      throw error;
    }
  }
};

export default hostelsApi;
