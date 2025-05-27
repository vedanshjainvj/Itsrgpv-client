import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4001/api/v1";

const mapStartup = (startup) => ({
  id: startup._id,
  name: startup.startupName,
  founder: startup.founder?.[0]
    ? JSON.parse(startup.founder[0])
        .map((founder) => JSON.parse(founder))
        .map((f) => `${f.name}`)
        .join(" & ")
    : "",
  batch: startup.batch || "",
  description: startup.description,
  logo: startup.startupLogo,
  image: startup.startupImage || "",
  funding: startup.funding || "",
  website: startup.website || "",
  category: startup.startupCategory,
  contactEmail: startup.contactEmail,
  contactPhone: startup.contactPhone,
  socialLinks: startup.socialLinks?.[0]
    ? JSON.parse(startup.socialLinks[0])
    : [],
  createdAt: new Date(startup.createdAt),
  updatedAt: new Date(startup.updatedAt),
});

const startupsApi = {
  /**
   * Get all startups
   */
  getStartups: async () => {
    try {
      console.log("Fetching startups from API...", API_BASE_URL);
      const response = await axios.get(`${API_BASE_URL}/startup/get-startup`);
      console.log(
        "API Response for startup:",
        JSON.stringify(response.data.data, null, 2)
      );
      if (response.data?.data) {
        const mappedStartups = response.data.data.map(mapStartup);
        return {
          startups: mappedStartups,
          pagination: {
            totalCount: mappedStartups.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching startups:", error);
      throw error;
    }
  },

  /**
   * Get startup by ID
   */
  getStartupById: async (id) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/startup/get-startup/${id}`
      );
      if (response.data?.data) {
        return mapStartup(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching startup by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new startup
   */
  createStartup: async (startupData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/startup/add-startup`,
        startupData
      );
      if (response.data?.data) {
        return mapStartup(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating startup:", error);
      throw error;
    }
  },

  /**
   * Update an existing startup
   */
  updateStartup: async (id, startupData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/startup/edit-startup/${id}`,
        startupData
      );
      if (response.data?.data) {
        return mapStartup(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating startup:", error);
      throw error;
    }
  },

  /**
   * Delete a startup
   */
  deleteStartup: async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/startup/delete-startup/${id}`
      );
      if (response.data?.success) {
        return { success: true };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error deleting startup:", error);
      throw error;
    }
  },
};

export default startupsApi;
