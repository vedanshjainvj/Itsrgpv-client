import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to frontend format with fallbacks for missing fields
const mapAchievement = (item) => {
  return {  
    id: item._id || 'NA',
    name: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'NA',
    profileImage: item.photos || 'https://source.unsplash.com/random/300x300/?portrait',
    branch: item.department || 'NA',
    semester: item.semester || 'NA',
    achievement: item.achievementTitle || 'NA',
    headline: item.achievementTitle || 'NA',
    category: item.fieldOfAchievement && item.fieldOfAchievement.length > 0 && item.fieldOfAchievement[0] 
      ? item.fieldOfAchievement[0].toLowerCase() 
      : 'academic',
    description: item.achievementDescription || 'NA',
    longDescription: item.achievementDescription || 'NA',
    date: item.achievementDate ? new Date(item.achievementDate).toLocaleDateString() : 'NA',
    location: item.department || 'NA',
    recognizedBy: item.awards || 'NA',
    impact: 'NA',
    skills: item.fieldOfAchievement || ['NA'],
    mentors: ['NA'],
    publications: [],
    media: item.photos ? [{ type: 'image', url: item.photos, caption: item.achievementTitle || '' }] : [],
    testimonials: [],
    socialLinks: item.socialMediaLinks && item.socialMediaLinks.length > 0 ? {
      linkedin: item.socialMediaLinks.find(link => link && link.includes('linkedin')) || '',
      twitter: item.socialMediaLinks.find(link => link && link.includes('twitter')) || '',
      github: item.socialMediaLinks.find(link => link && link.includes('github')) || ''
    } : {}
  };
};

const achievementsApi = {
  getAchievements: async (page=1 , limit=3) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/achievement/get-achievements`,{
        params: { page, limit }
      });
      console.log('API Response:', JSON.stringify(response.data, null, 2));
        if (response.data && response.data.data) {
        const mappedAchievements = response.data.data.map(mapAchievement);
          // Calculate pagination values since they're not provided by the backend
        
        // If no items returned and we're beyond page 1, we've gone too far
        if (mappedAchievements.length === 0 && page > 1) {
          return {
            achievements: [],
            pagination: {
              totalCount: (page - 1) * limit,
              currentPage: page,
              totalPages: page - 1,
              hasMore: false
            }
          };
        }
        
        // Normal case - check if this is likely the last page
        const isLastPage = mappedAchievements.length < limit;
        const totalItems = isLastPage 
          ? (page - 1) * limit + mappedAchievements.length 
          : mappedAchievements.length * (page + 1); // Better estimate
        
        return {
          achievements: mappedAchievements,
          pagination: {
            totalCount: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit) || 1,
            hasMore: !isLastPage && mappedAchievements.length > 0
          }
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      throw error;
    }
  },
    getAchievementById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/achievement/get-achievement/${id}`);
      
      if (response.data && response.data.data) {
        return mapAchievement(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching achievement by ID:', error);
      throw error;
    }
  }
};

export default achievementsApi;
