import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

/**
 * Generate rating based on note properties (mock data)
 */
const generateRating = (id) => {
  // Use the ID to generate a consistent rating between 3.0 and 5.0
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const rating = 3.0 + (Math.abs(hash) % 20) / 10; // Between 3.0 and 5.0
  return rating.toFixed(1);
};

/**
 * Generate page count for notes (mock data)
 */
const generatePageCount = (id) => {
  // Use the ID to generate a consistent page count between 5 and 60
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return 5 + (Math.abs(hash) % 56); // Between 5 and 60
};

/**
 * Generate file size in MB (mock data)
 */
const getFileSize = (id) => {
  // Use the ID to generate a consistent size between 0.5 and 15 MB
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const size = (Math.abs(hash) % 145 + 5) / 10; // Between 0.5 and 15 MB
  return size.toFixed(1) + ' MB';
};

/**
 * Generate views, downloads, and likes based on id (mock data)
 */
const generateStats = (id) => {
  const hash = id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const positiveHash = Math.abs(hash);
  
  return {
    views: 50 + (positiveHash % 950),  // 50-999 views
    downloads: 10 + (positiveHash % 240), // 10-249 downloads
    likes: 5 + (positiveHash % 95)  // 5-99 likes
  };
};

/**
 * Generate placeholder image if none provided
 */
const getImageUrl = (thumbnailPicture, subjectName, department) => {
  if (thumbnailPicture && !thumbnailPicture.includes('undefined')) {
    return thumbnailPicture;
  }
  
  // Create a searchable term based on subject and department
  const searchTerm = encodeURIComponent(`${department} ${subjectName} notes textbook`);
  
  // Generate a placeholder with subject context
  return `https://source.unsplash.com/random/800x600/?${searchTerm}`;
};

/**
 * Generate a title if needed
 */
const generateTitle = (subjectName, subjectCode) => {
  return `${subjectName} (${subjectCode}) Complete Notes`;
};

/**
 * Map API data to include only fields required by frontend components
 */
const mapNote = (item) => {
  // Generate consistent mock data based on ID
  const stats = generateStats(item._id);
  
  // Map department to frontend branch format
  const departmentToBranch = (dept) => {
    const deptLower = (dept || '').toLowerCase();
    
    // Common mappings
    if (deptLower.includes('computer') || deptLower.includes('cse')) return 'CSE';
    if (deptLower.includes('electronics') || deptLower.includes('ece')) return 'ECE';
    if (deptLower.includes('mechanical') || deptLower.includes('me')) return 'ME';
    if (deptLower.includes('civil') || deptLower.includes('ce')) return 'CE';
    if (deptLower.includes('electrical') || deptLower.includes('ee')) return 'EE';
    
    // If no mapping found, use first 3 letters in uppercase
    return dept ? dept.substring(0, 3).toUpperCase() : 'NA';
  };
  
  // Generate tags if not available
  const generateHashtags = (subjectName, subjectCode, department) => {
    if (item.hashtags && item.hashtags.length > 0) {
      return item.hashtags;
    }
    
    const tags = [
      subjectCode.toLowerCase(),
      department.toLowerCase(),
      'notes',
      'study',
      subjectName.split(' ')[0].toLowerCase(),
    ];
    
    return [...new Set(tags)]; // Remove duplicates
  };
  
  // Basic note information mapped to frontend format
  const mappedNote = {
    id: item._id || '',
    title: generateTitle(item.subjectName, item.subjectCode),
    author: item.nameOfPerson || 'Unknown Author',
    authorBatch: item.batchOfPerson || 'Alumni',
    branch: departmentToBranch(item.department),
    semester: item.semester || 1,
    subject: item.subjectName || 'Unknown Subject',
    subjectCode: item.subjectCode || 'NA',
    description: item.descriptionNotes || `Comprehensive study notes for ${item.subjectName}. These notes cover all important topics and concepts required for the course.`,
    coverImage: getImageUrl(item.thumbnailPicture, item.subjectName, item.department),
    tags: generateHashtags(item.subjectName, item.subjectCode, item.department),
    
    // Mock data based on ID for consistent display
    rating: generateRating(item._id),
    views: stats.views,
    downloads: stats.downloads,
    likes: stats.likes,
    pages: generatePageCount(item._id),
    fileSize: getFileSize(item._id),
    dateAdded: item.createdAt || new Date().toISOString(),
    
    // Original file data
    fileUrl: item.notesFile || '#',
    
    // Additional contact info
    contactNumber: item.contactNumber ? item.contactNumber.toString() : ''
  };

  return mappedNote;
};

/**
 * Notes API service with CRUD operations
 */
const notesApi = {  /**
   * Get all notes with optional filtering and pagination
   */
  getNotes: async (filters = {}, page = 1, limit = 3) => {
    try {
      // Construct query parameters for filtering
      const queryParams = new URLSearchParams();
      
      if (filters.branch) queryParams.append('department', filters.branch);
      if (filters.semester) queryParams.append('semester', filters.semester);
      if (filters.subject) queryParams.append('subjectName', filters.subject);
      
      // Add pagination parameters
      queryParams.append('page', page);
      queryParams.append('limit', limit);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await axios.get(`${API_BASE_URL}/notes/get-notes${queryString}`);
      console.log("API Response for notes:", response);
      
      if (response.data?.data) {
        const mappedNotes = response.data.data.map(mapNote);
        
        // If no items returned and we're beyond page 1, we've gone too far
        if (mappedNotes.length === 0 && page > 1) {
          return {
            notes: [],
            pagination: {
              totalCount: (page - 1) * limit,
              currentPage: page,
              totalPages: page - 1,
              hasMore: false
            }
          };
        }
        
        // Normal case - check if this is likely the last page
        const isLastPage = mappedNotes.length < limit;
        const totalItems = isLastPage 
          ? (page - 1) * limit + mappedNotes.length 
          : mappedNotes.length * (page + 1); // Better estimate
        
        return {
          notes: mappedNotes,
          pagination: {
            totalCount: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit) || 1,
            hasMore: !isLastPage && mappedNotes.length > 0
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },
  /**
   * Search notes by query string with pagination
   */
  searchNotes: async (query, page = 1, limit = 3) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('q', query);
      queryParams.append('page', page);
      queryParams.append('limit', limit);
      
      const response = await axios.get(`${API_BASE_URL}/notes/search?${queryParams.toString()}`);
      
      if (response.data?.data) {
        const mappedNotes = response.data.data.map(mapNote);
        
        // If no items returned and we're beyond page 1, we've gone too far
        if (mappedNotes.length === 0 && page > 1) {
          return {
            notes: [],
            pagination: {
              totalCount: (page - 1) * limit,
              currentPage: page,
              totalPages: page - 1,
              hasMore: false
            }
          };
        }
        
        // Normal case - check if this is likely the last page
        const isLastPage = mappedNotes.length < limit;
        const totalItems = isLastPage 
          ? (page - 1) * limit + mappedNotes.length 
          : mappedNotes.length * (page + 1); // Better estimate
        
        return {
          notes: mappedNotes,
          pagination: {
            totalCount: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit) || 1,
            hasMore: !isLastPage && mappedNotes.length > 0
          },
        };
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error searching notes:", error);
      throw error;
    }
  },

  /**
   * Get note by ID
   */
  getNoteById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/get-note/${id}`);
      if (response.data?.data) {
        return mapNote(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      throw error;
    }
  },

  /**
   * Create a new note
   */
  createNote: async (noteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes/add-note`, noteData);
      if (response.data?.data) {
        return mapNote(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  /**
   * Update an existing note
   */
  updateNote: async (id, noteData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/notes/edit-note/${id}`, noteData);
      if (response.data?.data) {
        return mapNote(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  /**
   * Delete a note
   */
  deleteNote: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/notes/delete-note/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
  
  /**
   * Download note file
   */
  downloadNote: async (id) => {
    try {
      // First get the note details to get the file URL
      const note = await notesApi.getNoteById(id);
      
      if (!note.fileUrl || note.fileUrl === '#') {
        throw new Error("No file available for download");
      }
      
      // If it's an external URL, open in a new tab
      if (note.fileUrl.startsWith('http')) {
        window.open(note.fileUrl, '_blank');
        return true;
      }
      
      // Otherwise try to download from our API
      const response = await axios.get(`${API_BASE_URL}/notes/download/${id}`, {
        responseType: 'blob'
      });
      
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${note.subjectCode}_${note.author}_notes.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        link.remove();
      }, 100);
      
      return true;
    } catch (error) {
      console.error("Error downloading note:", error);
      throw error;
    }
  },
  
  /**
   * Like a note (increment like count)
   */
  likeNote: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes/like/${id}`);
      if (response.data?.data) {
        return mapNote(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error liking note:", error);
      throw error;
    }
  },
  
  /**
   * View a note (increment view count)
   */
  viewNote: async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes/view/${id}`);
      if (response.data?.data) {
        return mapNote(response.data.data);
      }
      throw new Error("Invalid API response format");
    } catch (error) {
      console.error("Error registering note view:", error);
      throw error;
    }
  }
};

export default notesApi;