import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to frontend format with fallbacks for missing fields
const mapAchievement = (item) => {
  return {
    id: item._id || 'NA',
    name: `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'NA',
    profileImage: item.photos || 'https://source.unsplash.com/random/300x300/?portrait',
    branch: item.branch || 'NA',
    year: item.semester ? new Date().getFullYear() - Math.floor(item.semester/2) : 'NA',
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
  getAchievements: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/achievement/get-achievements`);
      console.log('API Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.data) {
        const mappedAchievements = response.data.data.map(mapAchievement);
        return {
          achievements: mappedAchievements,
          pagination: {
            totalCount: response.data.data.totalCount || 0,
            currentPage: response.data.data.currentPage || 1,
            totalPages: response.data.data.totalPages || 1,
            hasMore: response.data.data.hasMore || false
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
      const response = await axios.get(`${API_BASE_URL}/achivement/get-achievement/${id}`);
      
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
