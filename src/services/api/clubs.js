import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to frontend format with fallbacks for missing fields
const mapClub = (item) => {
  // Basic club information
  const mappedClub = {
    id: item._id || "NA",
    name: item.clubName || "NA",
    description: item.description || "No description available",
    tagline: item.tagline || "Student club at RGPV",
    type: item.typeOfClub || "General",
    established: item.dateOfeshtablishment ? new Date(item.dateOfeshtablishment).getFullYear() : "NA",
    founderName: item.founderName || "NA",
    members: item.members || Math.floor(Math.random() * 100) + 20, // Fallback with random number
    contactEmail: item.contactEmail || "contact@rgpv.ac.in",
    contactPhone: Array.isArray(item.contactPhone) ? item.contactPhone : [],
    
    // Image fields
    logo: item.logoImg || "https://source.unsplash.com/random/200x200/?logo,emblem",
    coverImage: item.coverImg || "https://source.unsplash.com/random/1200x600/?university,club",
    
    // Social links
    socialLinks: Array.isArray(item.socialLinks) ? 
      // Convert array to object if available
      item.socialLinks.reduce((acc, link) => {
        // Try to extract platform name from URL
        const platform = link.includes('facebook') ? 'facebook' :
                        link.includes('instagram') ? 'instagram' :
                        link.includes('twitter') ? 'twitter' :
                        link.includes('linkedin') ? 'linkedin' : 'website';
        acc[platform] = link;
        return acc;
      }, {}) : 
      // Default social links
      {
        website: "#",
        instagram: "#",
        facebook: "#"
      },
    
    // Events (not in model, using placeholder)
    events: item.events || ["Workshop", "Meetup", "Competition"],
  };
  
  return mappedClub;
};

const clubsApi = {
  getClubs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/club/get-club`);
      console.log("API Response for clubs:", response);
      
      if (response.data?.data) {
        const mappedClubs = response.data.data.map(mapClub);
        return {
          clubs: mappedClubs,
          pagination: {
            totalCount: mappedClubs.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching clubs:", error);
      throw error;
    }
  },

  getClubById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/club/get-club/${id}`);
      if (response.data?.data) {
        return mapClub(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching club by ID:", error);
      throw error;
    }
  },

  createClub: async (clubData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/club/add-club`, clubData);
      if (response.data?.data) {
        return mapClub(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating club:", error);
      throw error;
    }
  },

  updateClub: async (id, clubData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/club/edit-club/${id}`, clubData);
      if (response.data?.data) {
        return mapClub(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating club:", error);
      throw error;
    }
  },

  deleteClub: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/club/delete-club/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting club:", error);
      throw error;
    }
  },
};

export default clubsApi;