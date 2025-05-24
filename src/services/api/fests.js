import axios from "axios";

const API_BASE_URL = "http://localhost:4001/api/v1";

// Map API data to include only fields required by frontend components
const mapFest = (item) => {
  // Common fields used in list view (FestsPage)
  const baseFields = {
    id: item._id || "NA",
    name: item.festName || "NA",
    tagline: item.theme || "Join us for an amazing experience",
    description: item.description || "NA",
    date: item.date || "TBA",
    image:
      Array.isArray(item.festImages) && item.festImages.length > 0
        ? item.festImages[0]
        : "https://source.unsplash.com/random/800x500/?festival,college",
    events: Array.isArray(item.events) ? item.events : ["music", "dance", "art"],
    prizes: `₹${item.totalPrizeMoney || "0"} in total prizes`,
    website: item.websiteUrl || "#",
    previousYearAttendance: item.previousAttendance
      ? `${item.previousAttendance}+`
      : "NA",
    organizedBy: item.organizer || "NA",
  };

  return { ...baseFields };
};

const festsApi = {
  getFests: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fest/get-fests`);
      console.log("API Response:", response);
      if (response.data?.data) {
        const mappedFests = response.data.data.map(mapFest);
        return {
          fests: mappedFests,
          pagination: {
            totalCount: mappedFests.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching fests:", error);
      throw error;
    }
  },

  getFestById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fest/get-fest/${id}`);
      if (response.data?.data) {
        return mapFest(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching fest by ID:", error);
      throw error;
    }
  },

  createFest: async (festData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fest/add-fest`,
        festData
      );
      if (response.data?.data) {
        return mapFest(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating fest:", error);
      throw error;
    }
  },

  updateFest: async (id, festData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/fest/edit-fest/${id}`,
        festData
      );
      if (response.data?.data) {
        return mapFest(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating fest:", error);
      throw error;
    }
  },

  deleteFest: async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/fest/delete-fest/${id}`
      );
      if (response.data && response.status === 200) {
        return { success: true, message: "Fest deleted successfully" };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error deleting fest:", error);
      throw error;
    }
  },
};

export default festsApi;
