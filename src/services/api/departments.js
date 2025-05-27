import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

/**
 * Generate shortName from full department name
 * E.g. "Computer Science Engineering" -> "CSE"
 */
const generateShortName = (name) => {
  // Try to generate abbreviation from capital letters
  const abbreviation = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  
  // If abbreviation is too short, use first 3 letters
  return abbreviation.length < 2 ? name.substring(0, 3).toUpperCase() : abbreviation;
};

/**
 * Assign color and icon based on department type
 */
const getDepartmentMetadata = (name) => {
  const lowerName = name.toLowerCase();
  
  // Match department with icon and color
  if (lowerName.includes('computer') || lowerName.includes('cse')) {
    return { color: 'blue', iconType: 'FiCpu' };
  } else if (lowerName.includes('information') || lowerName.includes('it')) {
    return { color: 'purple', iconType: 'FiServer' };
  } else if (lowerName.includes('electronics') || lowerName.includes('ec')) {
    return { color: 'green', iconType: 'FiRadio' };
  } else if (lowerName.includes('electrical') || lowerName.includes('ee')) {
    return { color: 'yellow', iconType: 'FiZap' };
  } else if (lowerName.includes('mechanical') || lowerName.includes('me')) {
    return { color: 'red', iconType: 'FiTool' };
  } else if (lowerName.includes('civil') || lowerName.includes('ce')) {
    return { color: 'blue', iconType: 'FiHome' };
  } else if (lowerName.includes('chemical') || lowerName.includes('petro')) {
    return { color: 'pink', iconType: 'FiDroplet' };
  } else if (lowerName.includes('auto') || lowerName.includes('ae')) {
    return { color: 'orange', iconType: 'FiTruck' };
  } else if (lowerName.includes('data')) {
    return { color: 'red', iconType: 'FiDatabase' };
  } else if (lowerName.includes('ai') || lowerName.includes('ml')) {
    return { color: 'purple', iconType: 'FiBriefcase' };
  } else if (lowerName.includes('security') || lowerName.includes('blockchain')) {
    return { color: 'green', iconType: 'FiServer' };
  } else {
    // Default
    return { color: 'blue', iconType: 'FiAward' };
  }
};

/**
 * Map API data to include only fields required by frontend components
 */
const mapDepartment = (item) => {
  // Generate short name from department name
  const shortName = generateShortName(item.departmentName || '');
  
  // Get color and icon type
  const { color, iconType } = getDepartmentMetadata(item.departmentName || '');

  // Map main fields
  const mappedDepartment = {
    id: item._id || '',
    name: item.departmentName || 'Unknown Department',
    shortName: shortName,
    description: item.descriptionOfDepartment || 'No description available',
    headOfDepartment: item.headOfDepartment || 'Not specified',
    seats: item.totalSeats || 0,
    icon: iconType, // Note: This is just the icon name, it will need to be resolved in the component
    color: color,
    establishedYear: item.yearOfEstablishment || 'NA',
    contactEmail: item.contactEmail || 'department@rgpv.ac.in',
    contactPhone: item.contactPhone ? item.contactPhone.toString() : 'NA',
    
    // Derived or additional fields
    courses: [`${item.totalSeats || 0} Students`],
    
    // Image handling
    images: Array.isArray(item.departmentImages) && item.departmentImages.length > 0 
      ? item.departmentImages 
      : ['https://source.unsplash.com/random/800x600/?university,department'],
    
    coverImage: Array.isArray(item.departmentImages) && item.departmentImages.length > 0
      ? item.departmentImages[0]
      : 'https://source.unsplash.com/random/800x600/?university,department',
  };

  return mappedDepartment;
};

/**
 * Department API service with CRUD operations
 */
const departmentsApi = {
  /**
   * Get all departments
   */
  getDepartments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/department/get-department`);
      console.log("API Response for departments:", response);
      
      if (response.data?.data) {
        const mappedDepartments = response.data.data.map(mapDepartment);
        return {
          departments: mappedDepartments,
          pagination: {
            totalCount: mappedDepartments.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  /**
   * Get department by ID
   */
  getDepartmentById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/department/get-department/${id}`);
      if (response.data?.data) {
        return mapDepartment(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching department by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new department
   */
  createDepartment: async (departmentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/department/add-department`, departmentData);
      if (response.data?.data) {
        return mapDepartment(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating department:", error);
      throw error;
    }
  },

  /**
   * Update an existing department
   */
  updateDepartment: async (id, departmentData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/department/edit-department/${id}`, departmentData);
      if (response.data?.data) {
        return mapDepartment(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating department:", error);
      throw error;
    }
  },

  /**
   * Delete a department
   */
  deleteDepartment: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/department/delete-department/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting department:", error);
      throw error;
    }
  },
};

export default departmentsApi;