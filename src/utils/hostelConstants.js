export const HOSTELS = [
    {
      id: "boys-hostel-a",
      name: "Boys Hostel A",
      type: "male",
      shortDescription: "Modern accommodation with premium amenities for male students, featuring spacious rooms and state-of-the-art facilities.",
      description: "Boys Hostel A is one of our premium accommodations offering a comfortable and conducive environment for male students. The hostel features spacious rooms, modern bathrooms, high-speed internet, and various recreational facilities. Located close to the academic buildings, it provides convenient access to classrooms, labs, and the library.",
      totalRooms: 120,
      totalToilets: 60,
      totalCapacity: 240,
      roomTypes: [
        {
          type: "Double Sharing",
          count: 110,
          description: "Spacious rooms with two beds, study tables, and wardrobes",
          amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi"]
        },
        {
          type: "Single Occupancy",
          count: 10,
          description: "Private rooms for senior students and those with special requirements",
          amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi", "Attached Bathroom"]
        }
      ],
      facilities: [
        {
          name: "Mess",
          description: "Modern kitchen and dining area serving nutritious meals three times a day",
          timing: "Breakfast: 7:30 AM - 9:30 AM, Lunch: 12:30 PM - 2:30 PM, Dinner: 7:30 PM - 9:30 PM"
        },
        {
          name: "Common Room",
          description: "Spacious area with television, indoor games, and comfortable seating",
          timing: "Open 24 hours"
        },
        {
          name: "Gym",
          description: "Well-equipped fitness center with modern equipment",
          timing: "6:00 AM - 10:00 PM"
        },
        {
          name: "Laundry",
          description: "Automated washing machines and dryers for student use",
          timing: "6:00 AM - 10:00 PM"
        },
        {
          name: "Reading Room",
          description: "Quiet space for studying with reference books and journals",
          timing: "Open 24 hours"
        }
      ],
      staff: [
        {
          name: "Dr. Rajesh Kumar",
          position: "Warden",
          contact: "warden.boysa@university.edu",
          phone: "+91-9876543210",
          image: "https://source.unsplash.com/random/150x150/?professor,man"
        },
        {
          name: "Mr. Sunil Sharma",
          position: "Assistant Warden",
          contact: "asswarden.boysa@university.edu",
          phone: "+91-9876543211",
          image: "https://source.unsplash.com/random/150x150/?teacher,indian"
        },
        {
          name: "Mr. Prakash Verma",
          position: "Caretaker",
          contact: "caretaker.boysa@university.edu",
          phone: "+91-9876543212",
          image: "https://source.unsplash.com/random/150x150/?indian,man"
        }
      ],
      rules: [
        "Entry to the hostel after 10:00 PM requires prior permission",
        "Visitors are allowed only in the visitor's area during designated hours",
        "Consumption of alcohol and smoking is strictly prohibited",
        "Playing loud music and creating disturbance is not allowed",
        "Damaging hostel property will result in fines and disciplinary action",
        "All students must maintain cleanliness in their rooms and common areas",
        "Electrical appliances other than laptops and mobile chargers require permission"
      ],
      location: {
        address: "North Campus, University Road",
        coordinates: {
          lat: 28.7041,
          lng: 77.1025
        },
        nearbyPlaces: ["Main Academic Block (300m)", "Library (400m)", "Sports Complex (200m)"]
      },
      fees: {
        annual: "₹75,000",
        semester: "₹40,000",
        security: "₹10,000 (Refundable)"
      },
      reviews: [
        {
          student: "Rahul Sharma",
          rating: 4.5,
          comment: "Great facilities and maintenance. Food quality is excellent.",
          date: "2023-05-15"
        },
        {
          student: "Amit Kumar",
          rating: 4.0,
          comment: "Clean rooms and responsive staff. Wi-Fi could be better though.",
          date: "2023-04-22"
        },
        {
          student: "Vikram Singh",
          rating: 4.8,
          comment: "Outstanding hostel experience. The gym and common room are top-notch.",
          date: "2023-03-10"
        }
      ],
      images: [
        {
          url: "https://source.unsplash.com/random/800x600/?dormitory,room",
          alt: "Double Sharing Room",
          category: "room"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?single,bedroom",
          alt: "Single Occupancy Room",
          category: "room"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?dining,cafeteria",
          alt: "Hostel Mess",
          category: "mess"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?gym,fitness",
          alt: "Gym Facility",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?lounge,common",
          alt: "Common Room",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?reading,library",
          alt: "Reading Room",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?corridor,hallway",
          alt: "Hostel Corridor",
          category: "building"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?laundry,washing",
          alt: "Laundry Room",
          category: "facility"
        }
      ],
      mainImage: "https://source.unsplash.com/random/1200x800/?hostel,dormitory,building",
      applicationProcess: "Applications open at the beginning of each academic year. Current students can apply through the student portal. New students receive application details with their admission offer.",
      contactEmail: "boyshostela@university.edu",
      contactPhone: "+91-1123456789"
    },
    {
      id: "girls-hostel-a",
      name: "Girls Hostel A",
      type: "female",
      shortDescription: "Secure and comfortable accommodation for female students with excellent facilities and 24/7 security.",
      description: "Girls Hostel A provides a safe, comfortable, and nurturing environment for female students. With 24/7 security, modern amenities, and a supportive community, it's designed to be a home away from home. The hostel is strategically located near academic buildings and features well-furnished rooms, high-speed internet, and dedicated study spaces.",
      totalRooms: 100,
      totalToilets: 50,
      totalCapacity: 200,
      roomTypes: [
        {
          type: "Double Sharing",
          count: 90,
          description: "Comfortable rooms with two beds, study tables, and wardrobes",
          amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi"]
        },
        {
          type: "Single Occupancy",
          count: 10,
          description: "Private rooms for senior students and those with special requirements",
          amenities: ["Study Table", "Wardrobe", "Bookshelf", "Wi-Fi", "Attached Bathroom"]
        }
      ],
      facilities: [
        {
          name: "Mess",
          description: "Clean kitchen and dining area serving nutritious vegetarian and non-vegetarian meals",
          timing: "Breakfast: 7:30 AM - 9:00 AM, Lunch: 12:30 PM - 2:00 PM, Dinner: 7:30 PM - 9:00 PM"
        },
        {
          name: "Common Room",
          description: "Comfortable area with television, indoor games, and seating",
          timing: "Open 24 hours"
        },
        {
          name: "Reading Room",
          description: "Quiet space for studying with good lighting and comfortable seating",
          timing: "Open 24 hours"
        },
        {
          name: "Laundry",
          description: "Automated washing machines for student use",
          timing: "6:00 AM - 10:00 PM"
        },
        {
          name: "Indoor Gym",
          description: "Small but well-equipped fitness area",
          timing: "6:00 AM - 9:00 PM"
        }
      ],
      staff: [
        {
          name: "Dr. Meena Sharma",
          position: "Warden",
          contact: "warden.girlsa@university.edu",
          phone: "+91-9876543220",
          image: "https://source.unsplash.com/random/150x150/?professor,woman"
        },
        {
          name: "Ms. Priya Singh",
          position: "Assistant Warden",
          contact: "asswarden.girlsa@university.edu",
          phone: "+91-9876543221",
          image: "https://source.unsplash.com/random/150x150/?teacher,woman"
        },
        {
          name: "Ms. Lata Devi",
          position: "Caretaker",
          contact: "caretaker.girlsa@university.edu",
          phone: "+91-9876543222",
          image: "https://source.unsplash.com/random/150x150/?indian,woman"
        }
      ],
      rules: [
        "Entry to the hostel after 9:00 PM requires prior permission",
        "Visitors are allowed only in the visitor's area during 4:00 PM to 7:00 PM",
        "All students must sign the in/out register when leaving or entering the hostel",
        "Playing loud music and creating disturbance is not allowed",
        "Damaging hostel property will result in fines and disciplinary action",
        "All students must maintain cleanliness in their rooms and common areas",
        "Electrical appliances other than laptops and mobile chargers require permission"
      ],
      location: {
        address: "East Campus, University Road",
        coordinates: {
          lat: 28.7042,
          lng: 77.1026
        },
        nearbyPlaces: ["Main Academic Block (200m)", "Library (300m)", "Girls Sports Facility (100m)"]
      },
      fees: {
        annual: "₹75,000",
        semester: "₹40,000",
        security: "₹10,000 (Refundable)"
      },
      reviews: [
        {
          student: "Priya Patel",
          rating: 4.7,
          comment: "Excellent security and facilities. The staff is very responsive and caring.",
          date: "2023-05-20"
        },
        {
          student: "Neha Gupta",
          rating: 4.5,
          comment: "Clean rooms and great mess food. The reading room is perfect for studying.",
          date: "2023-04-15"
        },
        {
          student: "Anjali Singh",
          rating: 4.3,
          comment: "Safe and comfortable environment. The common room could use some updates.",
          date: "2023-03-25"
        }
      ],
      images: [
        {
          url: "https://source.unsplash.com/random/800x600/?girls,dormitory",
          alt: "Double Sharing Room",
          category: "room"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?single,bedroom,female",
          alt: "Single Occupancy Room",
          category: "room"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?cafeteria,dining",
          alt: "Hostel Mess",
          category: "mess"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?women,gym",
          alt: "Indoor Gym",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?lounge,sitting",
          alt: "Common Room",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?study,room",
          alt: "Reading Room",
          category: "facility"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?hallway,modern",
          alt: "Hostel Corridor",
          category: "building"
        },
        {
          url: "https://source.unsplash.com/random/800x600/?washing,machine",
          alt: "Laundry Room",
          category: "facility"
        }
      ],
      mainImage: "https://source.unsplash.com/random/1200x800/?girls,hostel,building",
      applicationProcess: "Applications open at the beginning of each academic year. Current students can apply through the student portal. New students receive application details with their admission offer.",
      contactEmail: "girlshostela@university.edu",
      contactPhone: "+91-1123456790"
    }
  ];