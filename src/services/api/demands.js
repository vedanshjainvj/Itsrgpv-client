import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to include only fields required by frontend components
const mapDemand = (item) => {
  return {
    // Essential ID field for operations
    id: item._id || 'NA',
    
    // Fields used in DemandCard component
    title: item.demandTitle || 'NA',
    shortDescription: item.topicOfFeedback || 'NA',
    category: determineDemandCategory(item.topicOfFeedback),
    status: item.demandStatus || 'NA',
    dateSubmitted: item.createdAt || 'NA',
    supporters: 'NA',
    progress: item.progressCount || 'NA',
    
    // Fields used in DemandModal component
    description: item.description || 'NA',
    submittedBy: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'NA',
    targetDate: item.demandRaiseDate || 'NA',
    adminResponse: item.administrationResponse || 'NA',
    tags: item.hashtags || ['NA'],
    
    // Special transformation for updates (required by DemandModal)
    updates: Array.isArray(item.demandUpdates) && item.demandUpdates.length > 0 ? 
      item.demandUpdates.map(update => ({
        date: item.updatedAt || 'NA',
        content: update || 'NA'
      })) : 
      [{ date: item.createdAt || 'NA', content: 'Demand submitted' }]
  };
};

// Helper function to determine category based on topicOfFeedback
const determineDemandCategory = (topic) => {
  if (!topic) return 'academic';
  
  topic = topic.toLowerCase();
  if (topic.includes('library') || topic.includes('course') || topic.includes('class')) {
    return 'academic';
  } else if (topic.includes('wifi') || topic.includes('building') || topic.includes('facility')) {
    return 'infrastructure';
  } else if (topic.includes('green') || topic.includes('clean') || topic.includes('environment')) {
    return 'environment';
  } else if (topic.includes('hostel') || topic.includes('canteen') || topic.includes('food')) {
    return 'welfare';
  } else if (topic.includes('sport') || topic.includes('gym') || topic.includes('field')) {
    return 'sports';
  }
  return 'academic';
};

const demandsApi = {
  getDemands: async (page = 1, limit = 3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/demand/get-demand`, {
        params: { page, limit }
      });
      console.log('API Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.data) {
        const mappedDemands = response.data.data.map(mapDemand);
        
        // If no items returned and we're beyond page 1, we've gone too far
        if (mappedDemands.length === 0 && page > 1) {
          return {
            demands: [],
            pagination: {
              totalCount: (page - 1) * limit,
              currentPage: page,
              totalPages: page - 1,
              hasMore: false
            }
          };
        }
        
        // Normal case - check if this is likely the last page
        const isLastPage = mappedDemands.length < limit;
        const totalItems = isLastPage 
          ? (page - 1) * limit + mappedDemands.length 
          : mappedDemands.length * (page + 1); // Better estimate
        
        return {
          demands: mappedDemands,
          pagination: {
            totalCount: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit) || 1,
            hasMore: !isLastPage && mappedDemands.length > 0
          }
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching demands:', error);
      throw error;
    }
  },
  
  getDemandById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/demand/get-demand/${id}`);
      console.log('API Response for single demand:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.data) {
        return mapDemand(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching demand by ID:', error);
      throw error;
    }
  },

  createDemand: async (demandData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/demand/add-demand`, demandData);
      
      if (response.data && response.data.data) {
        return mapDemand(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error creating demand:', error);
      throw error;
    }
  }
};

export default demandsApi;