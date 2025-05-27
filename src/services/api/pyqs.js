import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

/**
 * Generate standard tags based on subject and type
 */
const generateTags = (subject, type, department) => {
  const tags = [];
  
  // Add subject-based tag
  if (subject) {
    // Extract key words from subject name
    const keywords = subject.split(' ')
      .filter(word => word.length > 3)
      .map(word => word.toLowerCase());
    
    tags.push(...keywords);
  }
  
  // Add type-based tag
  if (type) {
    tags.push(type.replace('endsem', 'finals').replace('midsem', 'midterm'));
  }
  
  // Add department-based tag
  if (department) {
    tags.push(department.toLowerCase());
  }
  
  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
};

/**
 * Get file size in MB (mock data with consistent output)
 */
const getFileSize = (id) => {
  // Use the ID to generate a consistent size between 0.5 and 5 MB
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const size = (Math.abs(hash) % 45 + 5) / 10; // Between 0.5 and 5.0
  return size.toFixed(1);
};

/**
 * Map API data to include only fields required by frontend components
 */
const mapPyq = (item) => {
  // Map paperType from backend format to frontend format
  const typeMapping = {
    'endsem': 'end-sem',
    'midsem': 'mid-sem',
    'assignment': 'assignment',
    'back': 'back-paper'
  };

  // Map department to frontend branch format
  const departmentToBranch = (dept) => {
    const deptLower = dept.toLowerCase();
    
    // Common mappings
    if (deptLower.includes('computer') || deptLower.includes('cse')) return 'CSE';
    if (deptLower.includes('electronics') || deptLower.includes('ece')) return 'ECE';
    if (deptLower.includes('mechanical') || deptLower.includes('me')) return 'ME';
    if (deptLower.includes('civil') || deptLower.includes('ce')) return 'CE';
    if (deptLower.includes('electrical') || deptLower.includes('ee')) return 'EE';
    
    // If no mapping found, use first 3 letters in uppercase
    return dept.substring(0, 3).toUpperCase();
  };

  // Basic PYQ information mapped to frontend format
  const mappedPyq = {
    id: item._id || '',
    subjectName: item.subjectName || 'Unknown Subject',
    subjectCode: item.subjectCode || 'NA',
    year: item.paperPublishYear ? item.paperPublishYear.toString() : 'NA',
    semester: item.semester || 1,
    type: typeMapping[item.paperType] || 'assignment',
    branch: departmentToBranch(item.department),
    paperYear: item.paperForYear || new Date().getFullYear(),
    college: item.college || 'UIT',
    
    // Generate file URL if available or use placeholder
    fileUrl: item.questionPaperImg || '#',
    
    // Generate tags based on subject name and type
    tags: generateTags(item.subjectName, item.paperType, item.department),
    
    // Mock file size based on ID for consistent display
    fileSize: `${getFileSize(item._id || Math.random().toString())} MB`,
  };

  return mappedPyq;
};

/**
 * PYQs API service with CRUD operations
 */
const pyqsApi = {
  /**
   * Get all PYQs with optional filtering
   */
  getPyqs: async (filters = {}) => {
    try {
      // Construct query parameters for filtering
      const queryParams = new URLSearchParams();
      
      if (filters.year) queryParams.append('year', filters.year);
      if (filters.branch) queryParams.append('department', filters.branch);
      if (filters.type) queryParams.append('paperType', filters.type);
      if (filters.semester) queryParams.append('semester', filters.semester);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await axios.get(`${API_BASE_URL}/pyq/get-pyq${queryString}`);
      console.log("API Response for PYQs:", response);
      
      if (response.data?.data) {
        const mappedPyqs = response.data.data.map(mapPyq);
        return {
          pyqs: mappedPyqs,
          pagination: {
            totalCount: mappedPyqs.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching PYQs:", error);
      throw error;
    }
  },

  /**
   * Search PYQs by query string
   */
  searchPyqs: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pyq/search-pyqs?q=${query}`);
      
      if (response.data?.data) {
        const mappedPyqs = response.data.data.map(mapPyq);
        return {
          pyqs: mappedPyqs,
          pagination: {
            totalCount: mappedPyqs.length || 0,
            currentPage: 1,
            totalPages: 1,
            hasMore: false,
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error searching PYQs:", error);
      throw error;
    }
  },

  /**
   * Get PYQ by ID
   */
  getPyqById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pyq/get-pyq/${id}`);
      if (response.data?.data) {
        return mapPyq(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching PYQ by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new PYQ
   */
  createPyq: async (pyqData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pyq/add-pyq`, pyqData);
      if (response.data?.data) {
        return mapPyq(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating PYQ:", error);
      throw error;
    }
  },

  /**
   * Update an existing PYQ
   */
  updatePyq: async (id, pyqData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/pyq/edit-pyq/${id}`, pyqData);
      if (response.data?.data) {
        return mapPyq(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating PYQ:", error);
      throw error;
    }
  },

  /**
   * Delete a PYQ
   */
  deletePyq: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/pyq/delete-pyq/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting PYQ:", error);
      throw error;
    }
  },
  
  /**
   * Download PYQ file
   */
  downloadPyq: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pyq/download/${id}`, {
        responseType: 'blob'
      });
      
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `question-paper-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (error) {
      console.error("Error downloading PYQ:", error);
      throw error;
    }
  }
};

export default pyqsApi;