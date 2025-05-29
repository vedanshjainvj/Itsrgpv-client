import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to frontend format with fallbacks for missing fields
const mapGalleryItem = (item) => {
  return {
    id: item._id || 'NA',
    title: `Photo Gallery ${item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}`,
    description: 'RGPV Photo Gallery Collection',
    category: 'campus', // Default category - can be enhanced in future
    timestamp: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : 'NA',
    images: item.images && item.images.length > 0 ? item.images.map((imageUrl, index) => ({
      id: `${item._id}_image_${index}`,
      imageUrl: imageUrl,
      width: 800, // Default width
      height: 600, // Default height
      fullImageUrl: imageUrl
    })) : [],
    createdAt: item.createdAt || 'NA',
    updatedAt: item.updatedAt || 'NA'
  };
};

const photogalleryApi = {
  // Get all photogallery entries with pagination
  getPhotogalleries: async (page = 1, limit = 6) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/photogallery/get-photogalleries`, {
        params: { page, limit }
      });
      console.log('API Response for photogalleries:', response);
      
      if (response.data && response.data.data) {
        const mappedGalleries = response.data.data.map(mapGalleryItem);
        
        // Flatten all images from all galleries into a single array for display
        const allImages = mappedGalleries.flatMap(gallery => 
          gallery.images.map(image => ({
            id: image.id,
            title: gallery.title,
            description: gallery.description,
            category: 'campus', // Default category to keep UI consistent
            timestamp: gallery.timestamp,
            imageUrl: image.imageUrl,
            width: image.width || 800,
            height: image.height || 600
          }))
        );
        
        return {
          galleries: mappedGalleries,
          images: allImages,
          pagination: {
            totalCount: response.data.totalCount || mappedGalleries.length,
            currentPage: page,
            totalPages: response.data.totalPages || 1,
            hasMore: response.data.hasMore || false
          }
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching photo galleries:', error);
      throw error;
    }
  },
  
  // Get a specific photogallery by ID
  getPhotogalleryById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/photogallery/get-photogallery/${id}`);
      
      if (response.data && response.data.data) {
        return mapGalleryItem(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching photogallery by ID:', error);
      throw error;
    }
  },
  
  // Add a new photogallery with images
  addPhotogallery: async (images) => {
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      });
      
      const response = await axios.post(
        `${API_BASE_URL}/photogallery/add-photogallery`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data && response.data.data) {
        return mapGalleryItem(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding photogallery:', error);
      throw error;
    }
  },
  
  // Add images to an existing photogallery
  addImages: async (galleryId, images) => {
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      });
      
      const response = await axios.put(
        `${API_BASE_URL}/photogallery/add-images/${galleryId}`, 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data && response.data.data) {
        return mapGalleryItem(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error adding images to photogallery:', error);
      throw error;
    }
  },
  
  // Remove specific images from a photogallery
  removeImages: async (galleryId, imageUrls) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/photogallery/remove-images/${galleryId}`,
        { imageUrls }
      );
      
      if (response.data && response.data.data) {
        return mapGalleryItem(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error removing images from photogallery:', error);
      throw error;
    }
  },
  
  // Delete an entire photogallery
  deletePhotogallery: async (galleryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/photogallery/delete-photogallery/${galleryId}`);
      
      if (response.data) {
        return { success: true, message: response.data.message || 'Photogallery deleted successfully' };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting photogallery:', error);
      throw error;
    }
  }
};

export default photogalleryApi;
