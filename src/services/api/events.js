import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4001/api/v1';

// Map API data to include only fields required by frontend components
const mapEvent = (item) => {
  return {
    // Essential ID field for operations
    id: item._id || 'NA',
    
    // Fields used in EventCard component
    title: item.eventName || 'NA',
    shortDescription: item.description?.substring(0, 150) || 'NA',
    category: determineEventCategory(item.eventType),
    date: item.dateOfEvent || 'NA',
    endDate: item.dateOfEvent || 'NA', // Backend doesn't have endDate, using the same date
    location: item.venue || 'NA',
    organizer: item.organisedBy || 'NA',
    
    // Fields for EventDetailsPage
    description: item.description || 'NA',
    coverImage: item.bannerPicture || 'https://source.unsplash.com/random/800x500/?event',
    registrationLink: '#', // Not available in backend, using placeholder
    registrationFee: 'Free', // Not available in backend, using placeholder
    registrationDeadline: item.dateOfEvent || 'NA', // Using event date as deadline since not specified
    prizes: item.prizes || 'Details will be announced soon', // Not available in backend, using placeholder
    contactEmail: item.contactEmail || 'contact@itsrgpv.com', // Not available in backend, using placeholder
    contactPhone: item.contactPhone || 'Contact the organizer for details', // Not available in backend, using placeholder
    featured: item.featured || false, // Not available in backend, using default
    upcoming: determineIfUpcoming(item.dateOfEvent),
    attendees: item.attendees || 0, // Not available in backend, using default
    maxAttendees: item.maxAttendees || 100, // Not available in backend, using default
    tags: parseTags(item.tags),
    
    // Photos array for EventDetailsPage gallery
    photos: formatPhotosArray(item.eventImages),
    
    // Schedule is not available in backend model, creating a simple placeholder
    schedule: createSchedulePlaceholder(item.dateOfEvent, item.eventName)
  };
};

// Helper function to determine category based on eventType
const determineEventCategory = (type) => {
  if (!type) return 'technical';
  
  switch(type.toLowerCase()) {
    case 'tech':
      return 'technical';
    case 'non-tech':
      return 'academic';
    case 'cultural':
      return 'cultural';
    case 'finance':
      return 'management';
    case 'graphic':
      return 'academic';
    case 'robotic':
      return 'technical';
    case 'political':
      return 'management';
    default:
      return 'technical';
  }
};

// Helper function to parse tags
const parseTags = (tagString) => {
  if (!tagString) return [];
  
  // If it's already an array, return it
  if (Array.isArray(tagString)) return tagString;
  
  // Try to parse as comma-separated string
  return tagString.split(',').map(tag => tag.trim());
};

// Helper function to determine if an event is upcoming
const determineIfUpcoming = (dateString) => {
  if (!dateString) return false;
  
  const eventDate = new Date(dateString);
  const today = new Date();
  
  return eventDate >= today;
};

// Helper function to format photos array
const formatPhotosArray = (images) => {
  if (!images) return [];
  
  // If it's not an array or it's empty, return a default placeholder
  if (!Array.isArray(images) || images.length === 0) {
    return [{ 
      url: 'https://source.unsplash.com/random/600x400/?event', 
      caption: 'Event Image' 
    }];
  }
  
  // Map images to the expected format
  return images.map((url, index) => ({
    url: url,
    caption: `Event Image ${index + 1}`
  }));
};

// Helper function to create a schedule placeholder
const createSchedulePlaceholder = (dateString, eventTitle) => {
  if (!dateString) return [];
  
  const eventDate = new Date(dateString);
  const formattedDate = eventDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
  // Create a basic one-day schedule
  return [
    {
      day: '1',
      date: formattedDate,
      events: [
        {
          time: '09:00 AM - 10:00 AM',
          title: 'Opening Ceremony',
          venue: 'Main Venue'
        },
        {
          time: '10:30 AM - 12:30 PM',
          title: `${eventTitle || 'Event'} Main Program`,
          venue: 'Main Venue'
        },
        {
          time: '02:00 PM - 04:00 PM',
          title: 'Interactive Sessions',
          venue: 'Main Venue'
        },
        {
          time: '04:30 PM - 06:00 PM',
          title: 'Closing Ceremony',
          venue: 'Main Venue'
        }
      ]
    }
  ];
};

const eventsApi = {
  getEvents: async (page = 1, limit = 6) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event/get-event`, {
        params: { page, limit }
      });
      console.log('API Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.data) {
        const mappedEvents = response.data.data.map(mapEvent);
        
        // If no items returned and we're beyond page 1, we've gone too far
        if (mappedEvents.length === 0 && page > 1) {
          return {
            events: [],
            pagination: {
              totalCount: (page - 1) * limit,
              currentPage: page,
              totalPages: page - 1,
              hasMore: false
            }
          };
        }
        
        // Normal case - check if this is likely the last page
        const isLastPage = mappedEvents.length < limit;
        const totalItems = isLastPage 
          ? (page - 1) * limit + mappedEvents.length 
          : mappedEvents.length * (page + 1); // Better estimate
        
        return {
          events: mappedEvents,
          pagination: {
            totalCount: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit) || 1,
            hasMore: !isLastPage && mappedEvents.length > 0
          }
        };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
  
  getEventById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event/get-event/${id}`);
      console.log('API Response for single event:', JSON.stringify(response.data, null, 2));
      
      if (response.data && response.data.data) {
        return mapEvent(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/event/add-event`, eventData);
      
      if (response.data && response.data.data) {
        return mapEvent(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  updateEvent: async (id, eventData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/event/edit-event/${id}`, eventData);
      
      if (response.data && response.data.data) {
        return mapEvent(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
  
  deleteEvent: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/event/delete-event/${id}`);
      
      if (response.data && response.status === 200) {
        return { success: true, message: 'Event deleted successfully' };
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

export default eventsApi;
