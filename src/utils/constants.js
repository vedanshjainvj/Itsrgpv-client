import logo1 from '../assets/asperlogo4.png';
import logo2 from '../assets/code4all3.png';
import logo3 from '../assets/codinglogo.png';
import logo4 from '../assets/domeclublogo.jpg';
import logo5 from '../assets/fclogo4.png';
import logo6 from '../assets/innovationsecelogo.jpg';
import logo7 from '../assets/insynclogo.png';

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/fests', label: 'Fests' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/demands', label: 'Demands' }
];
  
  export const DEPARTMENTS = [
    {
      id: 'cse',
      name: 'Computer Science Engineering',
      shortName: 'CSE',
      description: 'From artificial intelligence to cybersecurity, our CSE program is at the cutting edge of digital innovation.',
      icon: 'ComputerIcon',
      color: 'blue',
      image: 'https://content.jdmagicbox.com/comp/bhopal/t1/0755px755.x755.181002231622.j6t1/catalogue/computer-science-and-engineering-department-rgpv-bhopal-1mnl2k4huh.jpg',
      facilities: ['AI Research Lab', 'Cybersecurity Center', 'Software Development Studio'],
      faculty: 45,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      achievements: ['National Coding Championship Winners 2023', 'Best Research Paper Award at IEEE Conference']
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      shortName: 'ECE',
      description: 'Design integrated circuits, communication systems, and the next generation of electronic devices.',
      icon: 'ChipIcon',
      color: 'green',
      image: 'https://content.jdmagicbox.com/comp/bhopal/t1/0755px755.x755.181002231622.j6t1/catalogue/computer-science-and-engineering-department-rgpv-bhopal-1mnl2k4huh.jpg',
      facilities: ['Microelectronics Lab', 'Signal Processing Lab', 'Circuit Design Studio'],
      faculty: 38,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      achievements: ['IEEE Best Student Chapter Award', 'National Robotics Competition Runners-up']
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      shortName: 'ME',
      description: 'From automotive design to thermal systems, explore the physical principles that power our world.',
      icon: 'CogIcon',
      color: 'yellow',
      image: 'https://content.jdmagicbox.com/comp/bhopal/t1/0755px755.x755.181002231622.j6t1/catalogue/computer-science-and-engineering-department-rgpv-bhopal-1mnl2k4huh.jpg',
      facilities: ['Thermodynamics Lab', 'Materials Testing Center', 'CAD Design Studio'],
      faculty: 35,
      courses: ['B.Tech', 'M.Tech'],
      achievements: ['SAE Racing Competition Winners', 'ASME Design Challenge Finalists']
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      shortName: 'CE',
      description: 'Build the infrastructure that shapes our cities and connects our communities.',
      icon: 'BuildingIcon',
      color: 'red',
      image: 'https://content.jdmagicbox.com/comp/bhopal/t1/0755px755.x755.181002231622.j6t1/catalogue/computer-science-and-engineering-department-rgpv-bhopal-1mnl2k4huh.jpg',
      facilities: ['Structural Testing Facility', 'Hydraulics Lab', 'Surveying Equipment Center'],
      faculty: 30,
      courses: ['B.Tech', 'M.Tech'],
      achievements: ['Best Concrete Mix Design Award', 'National Bridge Design Competition Winners']
    },
    {
      id: 'eee',
      name: 'Electrical Engineering',
      shortName: 'EE',
      description: 'Power systems, control engineering, and renewable energy solutions for tomorrow.',
      icon: 'LightningIcon',
      color: 'purple',
      image: 'https://content.jdmagicbox.com/comp/bhopal/t1/0755px755.x755.181002231622.j6t1/catalogue/computer-science-and-engineering-department-rgpv-bhopal-1mnl2k4huh.jpg',
      facilities: ['Power Systems Lab', 'Embedded Systems Center', 'Renewable Energy Lab'],
      faculty: 32,
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      achievements: ['Smart Grid Technology Innovation Award', 'National Power Electronics Challenge Winners']
    }
  ];
  
  export const CLUBS = [
    {
      id: 'ieee',
      name: 'IEEE Student Branch',
      tagline: 'Fostering technical innovation',
      description: 'The IEEE Student Branch organizes workshops, technical talks, and competitions to promote technological advancement and professional development among students.',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuGMgiZzBLCj0j16RMkZ8y2VdEdm_fcjnNZA&s',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuGMgiZzBLCj0j16RMkZ8y2VdEdm_fcjnNZA&s',
      established: '2005',
      members: 120,
      events: ['Tech Week', 'Circuit Design Challenge', 'Paper Presentation Contest'],
      socialLinks: {
        instagram: 'https://instagram.com/ieee_college',
        linkedin: 'https://linkedin.com/company/ieee-college',
        twitter: 'https://twitter.com/ieee_college'
      }
    },
    {
      id: 'literary',
      name: 'Literary Society',
      tagline: 'Words that inspire change',
      description: 'The Literary Society nurtures creative writing, debating, and public speaking skills. Our activities include poetry slams, book discussions, and literary festivals.',
      logo: 'https://source.unsplash.com/random/100x100/?book,logo',
      coverImage: 'https://source.unsplash.com/random/1000x600/?literature,books',
      established: '2007',
      members: 85,
      events: ['Annual Literary Fest', 'Debate Championship', 'Creative Writing Workshop'],
      socialLinks: {
        instagram: 'https://instagram.com/lit_society',
        linkedin: 'https://linkedin.com/company/lit-society',
        twitter: 'https://twitter.com/lit_society'
      }
    },
    {
      id: 'robotics',
      name: 'Robotics Club',
      tagline: 'Building the future, one robot at a time',
      description: 'The Robotics Club offers hands-on experience in designing, building, and programming robots. We participate in various national and international robotics competitions.',
      logo: 'https://source.unsplash.com/random/100x100/?robot,logo',
      coverImage: 'https://source.unsplash.com/random/1000x600/?robotics,technology',
      established: '2010',
      members: 95,
      events: ['Robo Wars', 'Autonomous Robot Challenge', 'AI Integration Workshop'],
      socialLinks: {
        instagram: 'https://instagram.com/robotics_club',
        linkedin: 'https://linkedin.com/company/robotics-club',
        twitter: 'https://twitter.com/robotics_club'
      }
    },
    {
      id: 'cultural',
      name: 'Cultural Club',
      tagline: 'Celebrating diversity through art',
      description: 'The Cultural Club promotes and preserves diverse cultural heritage through various performing arts, festivals, and cultural exchange programs.',
      logo: 'https://source.unsplash.com/random/100x100/?culture,logo',
      coverImage: 'https://source.unsplash.com/random/1000x600/?culture,performance',
      established: '2003',
      members: 150,
      events: ['Cultural Night', 'Dance Competition', 'Music Festival'],
      socialLinks: {
        instagram: 'https://instagram.com/cultural_club',
        linkedin: 'https://linkedin.com/company/cultural-club',
        twitter: 'https://twitter.com/cultural_club'
      }
    },
    {
      id: 'sports',
      name: 'Sports Club',
      tagline: 'Champions in the making',
      description: 'The Sports Club promotes physical fitness, sportsmanship, and competitive spirit through various sporting events and training programs.',
      logo: 'https://source.unsplash.com/random/100x100/?sports,logo',
      coverImage: 'https://source.unsplash.com/random/1000x600/?sports,competition',
      established: '2002',
      members: 200,
      events: ['Annual Sports Meet', 'Inter-college Tournament', 'Fitness Challenge'],
      socialLinks: {
        instagram: 'https://instagram.com/sports_club',
        linkedin: 'https://linkedin.com/company/sports-club',
        twitter: 'https://twitter.com/sports_club'
      }
    }
  ];
  
  export const ACHIEVEMENTS = [
    {
      id: 1,
      student: 'Priya Sharma',
      department: 'Computer Science',
      achievement: 'Google AI Research Internship',
      description: 'Selected for the prestigious Google AI Research Internship program, working on natural language processing projects.',
      year: 2023,
      image: 'https://i.pinimg.com/736x/56/d8/bb/56d8bb50b2a1c9ae24762b3611f4835e.jpg',
      category: 'academic'
    },
    {
      id: 2,
      student: 'Rahul Verma',
      department: 'Electronics',
      achievement: 'International Robotics Competition Winner',
      description: 'Led the college team to victory at the International Robotics Competition held in Tokyo.',
      year: 2023,
      image: 'https://source.unsplash.com/random/300x300/?portrait,man',
      category: 'competition'
    },
    {
      id: 3,
      student: 'Ananya Patel',
      department: 'Mechanical Engineering',
      achievement: 'Research Paper Publication in Nature',
      description: 'Published groundbreaking research on sustainable materials in the prestigious Nature journal.',
      year: 2022,
      image: 'https://source.unsplash.com/random/300x300/?portrait,woman',
      category: 'research'
    },
    {
      id: 4,
      student: 'Vikram Singh',
      department: 'Civil Engineering',
      achievement: 'National Design Award',
      description: 'Received the National Design Award for innovative earthquake-resistant building design.',
      year: 2023,
      image: 'https://source.unsplash.com/random/300x300/?portrait,man',
      category: 'award'
    },
    {
      id: 5,
      student: 'Neha Gupta',
      department: 'Computer Science',
      achievement: 'ACM-ICPC World Finals',
      description: 'Qualified for the ACM-ICPC World Finals, representing the college at the global competitive programming contest.',
      year: 2022,
      image: 'https://source.unsplash.com/random/300x300/?portrait,woman',
      category: 'competition'
    },
    {
      id: 6,
      student: 'Arjun Mehta',
      department: 'Electrical Engineering',
      achievement: 'IEEE Best Paper Award',
      description: 'Received the Best Paper Award at the IEEE International Conference on Power Systems.',
      year: 2023,
      image: 'https://source.unsplash.com/random/300x300/?portrait,man',
      category: 'research'
    }
  ];
  
  export const STARTUPS = [
    {
      id: 1,
      name: 'EduTech Solutions',
      founder: 'Ravi Kumar & Team',
      batch: '2018 CSE',
      description: 'An AI-powered personalized learning platform that adapts to individual student needs and learning styles.',
      logo: 'https://source.unsplash.com/random/100x100/?tech,logo',
      image: 'https://source.unsplash.com/random/600x400/?education,technology',
      funding: '$2.5 Million',
      website: 'https://www.edutechsolutions.com'
    },
    {
      id: 2,
      name: 'GreenEnergy',
      founder: 'Aisha Kapoor',
      batch: '2019 EE',
      description: 'Developing affordable solar energy solutions for rural communities with innovative storage technology.',
      logo: 'https://source.unsplash.com/random/100x100/?energy,logo',
      image: 'https://source.unsplash.com/random/600x400/?solar,energy',
      funding: '$1.8 Million',
      website: 'https://www.greenenergy.com'
    },
    {
      id: 3,
      name: 'MediConnect',
      founder: 'Sanjay Mehta & Priya Desai',
      batch: '2017 ECE',
      description: 'A telemedicine platform connecting patients in remote areas with specialists using low-bandwidth video technology.',
      logo: 'https://source.unsplash.com/random/100x100/?medical,logo',
      image: 'https://source.unsplash.com/random/600x400/?medical,technology',
      funding: '$3.2 Million',
      website: 'https://www.mediconnect.com'
    },
    {
      id: 4,
      name: 'UrbanFarm',
      founder: 'Nisha Singh',
      batch: '2020 CE',
      description: 'Vertical farming solutions for urban spaces, using hydroponics and IoT monitoring systems.',
      logo: 'https://source.unsplash.com/random/100x100/?farm,logo',
      image: 'https://source.unsplash.com/random/600x400/?vertical,farming',
      funding: '$1.2 Million',
      website: 'https://www.urbanfarm.com'
    },
    {
      id: 5,
      name: 'CyberShield',
      founder: 'Arjun Malhotra',
      batch: '2016 CSE',
      description: 'An AI-based cybersecurity solution that predicts and prevents attacks before they happen.',
      logo: 'https://source.unsplash.com/random/100x100/?security,logo',
      image: 'https://source.unsplash.com/random/600x400/?cyber,security',
      funding: '$4.5 Million',
      website: 'https://www.cybershield.com'
    }
  ];
  
  export const PARTNERS = [
    {
      id: 1,
      name: 'Microsoft',
      logo: logo1,
      type: 'technology'
    },
    {
      id: 2,
      name: 'IBM Research',
      logo: logo2,
      type: 'research'
    },
    {
      id: 3,
      name: 'Tata Consultancy Services',
      logo: logo3,
      type: 'industry'
    },
    {
      id: 4,
      name: 'Infosys',
      logo: logo4,
      type: 'industry'
    },
    {
      id: 5,
      name: 'Google',
      logo: logo5,
      type: 'technology'
    },
    {
      id: 6,
      name: 'Intel',
      logo: logo6,
      type: 'technology'
    },
    {
      id: 7,
      name: 'Siemens',
      logo: logo7,
      type: 'industry'
    }
  ];
  
  export const FESTS = [
    {
      id: 'techfest',
      name: 'TechNova',
      tagline: 'Innovate. Create. Elevate.',
      description: 'Our annual technical festival featuring coding competitions, hackathons, robot wars, technical paper presentations, and workshops by industry experts.',
      date: 'March 15-17, 2025',
      image: 'https://source.unsplash.com/random/800x500/?technology,festival',
      events: [
        'Hackathon',
        'Coding Contest',
        'Robot Wars',
        'Tech Quiz',
        'Project Exhibition'
      ],
      prizes: '₹5,00,000 in total prizes',
      website: 'https://technova.college.edu',
      previousYearAttendance: '5,000+',
      organizedBy: 'Technical Council'
    },
    {
      id: 'cultfest',
      name: 'Rhythms',
      tagline: 'Where Culture Comes Alive',
      description: 'A vibrant cultural festival celebrating dance, music, drama, literature, and fine arts with performances, competitions, and celebrity appearances.',
      date: 'February 10-12, 2025',
      image: 'https://source.unsplash.com/random/800x500/?culture,festival',
      events: [
        'Battle of Bands',
        'Dance Competition',
        'Fashion Show',
        'Drama Contest',
        'Literary Events'
      ],
      prizes: '₹3,00,000 in total prizes',
      website: 'https://rhythms.college.edu',
      previousYearAttendance: '4,500+',
      organizedBy: 'Cultural Council'
    },
    {
      id: 'sportsfest',
      name: 'Zenith',
      tagline: 'Pushing Beyond Limits',
      description: 'Our annual sports festival with competitions in cricket, football, basketball, athletics, chess, and many more sports.',
      date: 'January 20-25, 2025',
      image: 'https://source.unsplash.com/random/800x500/?sports,festival',
      events: [
        'Cricket Tournament',
        'Football Championship',
        'Basketball League',
        'Athletics Meet',
        'Chess Championship'
      ],
      prizes: '₹2,50,000 in total prizes',
      website: 'https://zenith.college.edu',
      previousYearAttendance: '3,000+',
      organizedBy: 'Sports Council'
    },
    {
      id: 'management',
      name: 'Pinnacle',
      tagline: 'Leading Through Innovation',
      description: 'A management festival featuring case studies, business plan competitions, stock market simulations, and talks by industry leaders.',
      date: 'April 5-7, 2025',
      image: 'https://source.unsplash.com/random/800x500/?business,festival',
      events: [
        'Case Study Competition',
        'Business Plan Contest',
        'Marketing Challenge',
        'Stock Market Simulation',
        'Leadership Summit'
      ],
      prizes: '₹2,00,000 in total prizes',
      website: 'https://pinnacle.college.edu',
      previousYearAttendance: '2,500+',
      organizedBy: 'Management Council'
    }
  ];
  
  export const RESOURCES = {
    pyqs: {
      title: 'Previous Year Papers',
      description: 'Access question papers from previous years for all departments and courses.',
      count: '2000+',
      icon: 'DocumentIcon',
      image: 'https://preview.redd.it/class-10-science-pyqs-ke-link-dedo-koi-v0-si4tyb9hxcla1.jpg?auto=webp&s=c199dc08e303edfd79d425307c81dbd899ebd875',
      categories: ['Semester Exams', 'Mid-Term Tests', 'Quizzes']
    },
    gallery: {
      title: 'Photo Gallery',
      description: 'Browse through moments captured during college events and activities.',
      count: '5000+',
      icon: 'CameraIcon',
      image: 'https://itdcindia.com/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-31-at-4.28.36-PM.jpeg',
      categories: ['Events', 'Campus Life', 'Sports']
    },
    videos: {
      title: 'Video Library',
      description: 'Watch recordings of special lectures, events, and student performances.',
      count: '500+',
      icon: 'VideoIcon',
      image: 'https://source.unsplash.com/random/600x400/?video,library',
      categories: ['Lectures', 'Tutorials', 'Events', 'Student Projects']
    }
  };
  
  export const COLLEGE_INFO = {
    name: 'University Tech Institute',
    shortName: 'Its RGPV',
    established: '1965',
    motto: 'Knowledge, Innovation, Excellence',
    address: 'University Campus, Tech City, TC 12345',
    email: 'contact@uti.edu',
    phone: '+1 (555) 123-4567',
    socialLinks: {
      facebook: 'https://facebook.com/uti',
      twitter: 'https://twitter.com/uti',
      instagram: 'https://instagram.com/uti',
      linkedin: 'https://linkedin.com/company/uti',
    },
  };

  export const GALLERY_ITEMS = [
    {
      id: 1,
      title: 'Annual Tech Fest 2023',
      description: 'Students showcasing their innovative tech projects',
      category: 'events',
      timestamp: '2023-03-15',
      imageUrl: 'https://www.rgpv.ac.in/images/slider/new_slide1.jpg',
      width: 600,
      height: 800
    },
    {
      id: 2,
      title: 'College Campus',
      description: 'Main academic building on a sunny day',
      category: 'campus',
      timestamp: '2023-01-20',
      imageUrl: 'https://www.rgpv.ac.in/images/slider/new_slide2.jpg',
      width: 800,
      height: 600
    },
    {
      id: 3,
      title: 'Cultural Night',
      description: 'Dance performance during the cultural night',
      category: 'events',
      timestamp: '2023-02-10',
      imageUrl: 'https://static.mygov.in/indiancc/2022/07/mygov-1000000000204301158.jpg',
      width: 600,
      height: 600
    },
    {
      id: 4,
      title: 'Graduation Day',
      description: 'Students celebrating graduation',
      category: 'academics',
      timestamp: '2023-05-25',
      imageUrl: 'https://i.ytimg.com/vi/t1jVdkjX51Y/sddefault.jpg',
      width: 800,
      height: 500
    },
    {
      id: 5,
      title: 'Robotics Lab',
      description: 'Students working on robotics projects',
      category: 'academics',
      timestamp: '2023-04-12',
      imageUrl: 'https://www.rgpv.ac.in/images/Sport-Complex/sport-complex5.jpg',
      width: 700,
      height: 900
    },
    {
      id: 6,
      title: 'Sports Meet',
      description: 'Annual inter-college sports competition',
      category: 'sports',
      timestamp: '2023-03-30',
      imageUrl: 'https://collegegyan24.edugrown.in/wp-content/uploads/2020/12/university-institute-of-technology-rajiv-gandhi-proudyogiki-vishwavidyalaya-uit-rgpv-bhopal-800x400.jpg',
      width: 800,
      height: 600
    }
  ];
  
  export const SAMPLE_PYQS = [
    {
      id: 1,
      subjectName: 'Data Structures and Algorithms',
      subjectCode: 'CS2001',
      year: '2023',
      branch: 'CSE',
      type: 'end-sem',
      semester: 3,
      fileUrl: '#',
      tags: ['algorithms', 'data structures', 'core']
    },
    {
      id: 2,
      subjectName: 'Database Management Systems',
      subjectCode: 'CS3002',
      year: '2023',
      branch: 'CSE',
      type: 'mid-sem',
      semester: 5,
      fileUrl: '#',
      tags: ['database', 'sql', 'core']
    },
    {
      id: 3,
      subjectName: 'Digital Electronics',
      subjectCode: 'EC2003',
      year: '2022',
      branch: 'ECE',
      type: 'assignment',
      semester: 3,
      fileUrl: '#',
      tags: ['electronics', 'digital', 'core']
    },
    {
      id: 4,
      subjectName: 'Engineering Mechanics',
      subjectCode: 'ME1001',
      year: '2023',
      branch: 'ME',
      type: 'end-sem',
      semester: 1,
      fileUrl: '#',
      tags: ['mechanics', 'force', 'core']
    },
    {
      id: 5,
      subjectName: 'Computer Networks',
      subjectCode: 'CS4001',
      year: '2022',
      branch: 'CSE',
      type: 'mid-sem',
      semester: 6,
      fileUrl: '#',
      tags: ['networks', 'protocols', 'core']
    },
    {
      id: 6,
      subjectName: 'Machine Learning',
      subjectCode: 'CS4002',
      year: '2023',
      branch: 'CSE',
      type: 'assignment',
      semester: 7,
      fileUrl: '#',
      tags: ['ml', 'ai', 'elective']
    }
  ];

  export const STUDENT_DEMANDS = [
    {
      id: 1,
      title: "24/7 Library Access",
      shortDescription: "Extended library hours to accommodate late-night study sessions",
      description: "As our academic workload increases, students need more flexible study hours. We request that the main library remain accessible 24/7, with proper security arrangements and basic facilities during night hours. This would significantly help students during examination periods and project deadlines.",
      category: "academic",
      status: "pending",
      upvotes: 342,
      dateSubmitted: "2025-02-15",
      submittedBy: "Student Council",
      supporters: 560,
      targetDate: "2025-05-01",
      adminResponse: "Under review by the academic committee. Initial feedback suggests possible implementation during exam periods as a trial.",
      progress: 40,
      updates: [
        {
          date: "2025-03-10",
          content: "Proposal presented to the Dean of Student Affairs"
        },
        {
          date: "2025-03-25",
          content: "Budget allocation discussions initiated"
        }
      ],
      tags: ["library", "study-hours", "student-welfare"]
    },
    {
      id: 2,
      title: "Improved Campus Wi-Fi",
      shortDescription: "Strengthen Wi-Fi infrastructure across all campus buildings",
      description: "The current Wi-Fi infrastructure is insufficient for the growing digital needs of students. We propose a comprehensive upgrade to provide high-speed internet across all areas of the campus, including hostels, canteens, and outdoor study areas. This will enable better access to online learning resources and improve the overall academic experience.",
      category: "infrastructure",
      status: "approved",
      upvotes: 529,
      dateSubmitted: "2025-01-20",
      submittedBy: "Technical Committee",
      supporters: 780,
      targetDate: "2025-06-15",
      adminResponse: "Proposal approved. Budget allocated for phase-wise implementation starting with academic buildings and hostels.",
      progress: 65,
      updates: [
        {
          date: "2025-02-05",
          content: "Technical assessment completed"
        },
        {
          date: "2025-03-01",
          content: "Vendor selection process initiated"
        },
        {
          date: "2025-04-10",
          content: "Phase 1 implementation scheduled for May 2025"
        }
      ],
      tags: ["wifi", "infrastructure", "digital-access"]
    },
    {
      id: 3,
      title: "Sustainable Campus Initiative",
      shortDescription: "Implement eco-friendly practices across campus operations",
      description: "We propose a comprehensive sustainability plan including solar power installations, water harvesting systems, waste segregation facilities, and a reduction in single-use plastics. This initiative aims to make our campus carbon-neutral by 2027, while also creating educational opportunities for students interested in environmental sciences and sustainable development.",
      category: "environment",
      status: "in-progress",
      upvotes: 423,
      dateSubmitted: "2025-01-10",
      submittedBy: "Green Campus Coalition",
      supporters: 650,
      targetDate: "2025-12-31",
      adminResponse: "Initiative approved with phased implementation. A sustainability committee has been formed with student and faculty representatives.",
      progress: 30,
      updates: [
        {
          date: "2025-02-20",
          content: "Environmental audit completed"
        },
        {
          date: "2025-03-15",
          content: "Initial solar panel installation begun on the Science building"
        }
      ],
      tags: ["sustainability", "environment", "green-campus"]
    }
  ];
  
  export const DEMAND_CATEGORIES = [
    { id: "all", label: "All Demands" },
    { id: "academic", label: "Academic", color: "blue" },
    { id: "infrastructure", label: "Infrastructure", color: "purple" },
    { id: "environment", label: "Environment", color: "green" },
    { id: "welfare", label: "Student Welfare", color: "pink" },
    { id: "sports", label: "Sports & Recreation", color: "orange" }
  ];
  
  export const DEMAND_STATUSES = [
    { id: "all", label: "All Statuses" },
    { id: "pending", label: "Pending Review", color: "yellow" },
    { id: "in-progress", label: "In Progress", color: "blue" },
    { id: "approved", label: "Approved", color: "green" },
    { id: "implemented", label: "Implemented", color: "purple" },
    { id: "rejected", label: "Rejected", color: "red" }
  ];

  export const EVENTS = [
    {
      id: 'techfest-2025',
      title: 'TechNova 2025',
      date: '2025-03-15',
      endDate: '2025-03-17',
      location: 'Main Campus Auditorium',
      category: 'technical',
      coverImage: 'https://source.unsplash.com/random/800x500/?technology,festival',
      description: 'Our annual technical festival featuring coding competitions, hackathons, robot wars, technical paper presentations, and workshops by industry experts.',
      shortDescription: 'The premier tech festival with competitions, hackathons, and expert workshops.',
      organizer: 'Technical Committee',
      registrationLink: 'https://example.com/register',
      registrationFee: 'Free for students',
      registrationDeadline: '2025-03-10',
      prizes: '₹5,00,000 in total prizes',
      contactEmail: 'technova@college.edu',
      contactPhone: '+91 9876543210',
      featured: true,
      upcoming: true,
      attendees: 450,
      maxAttendees: 500,
      tags: ['hackathon', 'coding', 'robotics', 'workshops'],
      schedule: [
        {
          day: '1',
          date: '2025-03-15',
          events: [
            {
              time: '09:00 AM - 10:00 AM',
              title: 'Opening Ceremony',
              venue: 'Main Auditorium'
            },
            {
              time: '10:30 AM - 12:30 PM',
              title: 'Keynote: Future of AI',
              venue: 'Main Auditorium',
              speaker: 'Dr. Rajesh Kumar, Google AI'
            },
            {
              time: '01:30 PM - 05:30 PM',
              title: 'Hackathon Begins',
              venue: 'CS Building Labs'
            },
            {
              time: '06:00 PM - 08:00 PM',
              title: 'Tech Quiz Preliminaries',
              venue: 'Lecture Hall 1'
            }
          ]
        },
        {
          day: '2',
          date: '2025-03-16',
          events: [
            {
              time: '09:00 AM - 11:00 AM',
              title: 'Technical Paper Presentations',
              venue: 'Seminar Hall'
            },
            {
              time: '11:30 AM - 01:30 PM',
              title: 'Industry Panel Discussion',
              venue: 'Main Auditorium'
            },
            {
              time: '02:30 PM - 05:30 PM',
              title: 'Robot Wars',
              venue: 'Open Arena'
            },
            {
              time: '07:00 PM - 09:00 PM',
              title: 'Cultural Night',
              venue: 'Main Auditorium'
            }
          ]
        },
        {
          day: '3',
          date: '2025-03-17',
          events: [
            {
              time: '09:00 AM - 12:00 PM',
              title: 'Hackathon Final Submissions',
              venue: 'CS Building Labs'
            },
            {
              time: '01:00 PM - 03:00 PM',
              title: 'Project Exhibition',
              venue: 'Central Hall'
            },
            {
              time: '04:00 PM - 06:00 PM',
              title: 'Prize Distribution & Closing Ceremony',
              venue: 'Main Auditorium'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?hackathon',
          caption: 'Students working on their hackathon projects'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?robotics',
          caption: 'Robot Wars competition from previous year'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?coding',
          caption: 'Coding competition in progress'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?technology,workshop',
          caption: 'Workshop session by industry experts'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?awards,ceremony',
          caption: 'Prize distribution ceremony'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?exhibition,tech',
          caption: 'Project exhibition'
        }
      ]
    },
    {
      id: 'cultural-fest-2025',
      title: 'Rhythms 2025',
      date: '2025-02-10',
      endDate: '2025-02-12',
      location: 'College Amphitheater',
      category: 'cultural',
      coverImage: 'https://source.unsplash.com/random/800x500/?culture,festival',
      description: 'A vibrant cultural festival celebrating dance, music, drama, literature, and fine arts with performances, competitions, and celebrity appearances.',
      shortDescription: 'Celebrate arts and culture through dance, music, drama, and more.',
      organizer: 'Cultural Committee',
      registrationLink: 'https://example.com/register',
      registrationFee: '₹200',
      registrationDeadline: '2025-02-05',
      prizes: '₹3,00,000 in total prizes',
      contactEmail: 'rhythms@college.edu',
      contactPhone: '+91 9876543211',
      featured: true,
      upcoming: true,
      attendees: 380,
      maxAttendees: 600,
      tags: ['dance', 'music', 'drama', 'literature', 'arts'],
      schedule: [
        {
          day: '1',
          date: '2025-02-10',
          events: [
            {
              time: '10:00 AM - 11:30 AM',
              title: 'Inauguration Ceremony',
              venue: 'Amphitheater'
            },
            {
              time: '12:00 PM - 02:00 PM',
              title: 'Solo Singing Competition',
              venue: 'Amphitheater'
            },
            {
              time: '03:00 PM - 05:00 PM',
              title: 'Group Dance Preliminaries',
              venue: 'Amphitheater'
            },
            {
              time: '06:30 PM - 09:00 PM',
              title: 'Fashion Show',
              venue: 'Main Auditorium'
            }
          ]
        },
        {
          day: '2',
          date: '2025-02-11',
          events: [
            {
              time: '10:00 AM - 12:00 PM',
              title: 'Drama Competition',
              venue: 'Amphitheater'
            },
            {
              time: '01:00 PM - 03:00 PM',
              title: 'Battle of Bands',
              venue: 'Amphitheater'
            },
            {
              time: '04:00 PM - 06:00 PM',
              title: 'Literary Events',
              venue: 'Central Library'
            },
            {
              time: '07:00 PM - 10:00 PM',
              title: 'Celebrity Performance',
              venue: 'Main Ground'
            }
          ]
        },
        {
          day: '3',
          date: '2025-02-12',
          events: [
            {
              time: '10:00 AM - 12:00 PM',
              title: 'Classical Dance Competition',
              venue: 'Amphitheater'
            },
            {
              time: '01:00 PM - 03:00 PM',
              title: 'Art Exhibition',
              venue: 'Art Gallery'
            },
            {
              time: '04:00 PM - 06:00 PM',
              title: 'Award Ceremony',
              venue: 'Main Auditorium'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?dance,performance',
          caption: 'Group dance performance'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?music,concert',
          caption: 'Battle of Bands competition'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?fashion,show',
          caption: 'Fashion show highlights'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?drama,theater',
          caption: 'Drama competition'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?art,exhibition',
          caption: 'Art exhibition'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?award,ceremony',
          caption: 'Award ceremony'
        }
      ]
    },
    {
      id: 'sports-meet-2025',
      title: 'Zenith 2025',
      date: '2025-01-20',
      endDate: '2025-01-25',
      location: 'College Sports Complex',
      category: 'sports',
      coverImage: 'https://source.unsplash.com/random/800x500/?sports,meet',
      description: 'Our annual sports festival with competitions in cricket, football, basketball, athletics, chess, and many more sports.',
      shortDescription: 'Compete in a variety of sports from cricket to chess in our annual sports festival.',
      organizer: 'Sports Committee',
      registrationLink: 'https://example.com/register',
      registrationFee: '₹100 per individual event, ₹500 per team event',
      registrationDeadline: '2025-01-15',
      prizes: '₹2,50,000 in total prizes',
      contactEmail: 'zenith@college.edu',
      contactPhone: '+91 9876543212',
      featured: false,
      upcoming: true,
      attendees: 320,
      maxAttendees: 500,
      tags: ['cricket', 'football', 'basketball', 'athletics', 'chess'],
      schedule: [
        {
          day: '1',
          date: '2025-01-20',
          events: [
            {
              time: '09:00 AM - 10:00 AM',
              title: 'Opening Ceremony',
              venue: 'Main Ground'
            },
            {
              time: '10:30 AM - 05:00 PM',
              title: 'Cricket Tournament (Preliminaries)',
              venue: 'Cricket Ground'
            },
            {
              time: '10:30 AM - 05:00 PM',
              title: 'Basketball Tournament (Preliminaries)',
              venue: 'Basketball Court'
            }
          ]
        },
        {
          day: '2',
          date: '2025-01-21',
          events: [
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Football Tournament (Preliminaries)',
              venue: 'Football Ground'
            },
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Volleyball Tournament (Preliminaries)',
              venue: 'Volleyball Court'
            }
          ]
        },
        {
          day: '3',
          date: '2025-01-22',
          events: [
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Athletics - Track Events',
              venue: 'Athletic Track'
            },
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Badminton Tournament',
              venue: 'Indoor Stadium'
            }
          ]
        },
        {
          day: '4',
          date: '2025-01-23',
          events: [
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Athletics - Field Events',
              venue: 'Athletic Ground'
            },
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Table Tennis Tournament',
              venue: 'Indoor Stadium'
            }
          ]
        },
        {
          day: '5',
          date: '2025-01-24',
          events: [
            {
              time: '09:00 AM - 05:00 PM',
              title: 'Semi-Finals (All Team Events)',
              venue: 'Multiple Venues'
            }
          ]
        },
        {
          day: '6',
          date: '2025-01-25',
          events: [
            {
              time: '09:00 AM - 03:00 PM',
              title: 'Finals (All Events)',
              venue: 'Multiple Venues'
            },
            {
              time: '04:00 PM - 06:00 PM',
              title: 'Closing Ceremony & Prize Distribution',
              venue: 'Main Ground'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?cricket,match',
          caption: 'Cricket tournament'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?football,game',
          caption: 'Football match in action'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?basketball,game',
          caption: 'Basketball tournament'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?athletics,race',
          caption: 'Athletics competition'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?badminton,game',
          caption: 'Badminton matches'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?winners,trophy',
          caption: 'Winners with their trophies'
        }
      ]
    },
    {
      id: 'management-fest-2025',
      title: 'Pinnacle 2025',
      date: '2025-04-05',
      endDate: '2025-04-07',
      location: 'Business School Building',
      category: 'management',
      coverImage: 'https://source.unsplash.com/random/800x500/?business,conference',
      description: 'A management festival featuring case studies, business plan competitions, stock market simulations, and talks by industry leaders.',
      shortDescription: 'Showcase your business acumen through case studies, competitions, and learn from industry leaders.',
      organizer: 'Management Committee',
      registrationLink: 'https://example.com/register',
      registrationFee: '₹300',
      registrationDeadline: '2025-04-01',
      prizes: '₹2,00,000 in total prizes',
      contactEmail: 'pinnacle@college.edu',
      contactPhone: '+91 9876543213',
      featured: false,
      upcoming: true,
      attendees: 180,
      maxAttendees: 300,
      tags: ['management', 'business', 'entrepreneurship', 'leadership'],
      schedule: [
        {
          day: '1',
          date: '2025-04-05',
          events: [
            {
              time: '09:30 AM - 10:30 AM',
              title: 'Inauguration',
              venue: 'MBA Auditorium'
            },
            {
              time: '11:00 AM - 01:00 PM',
              title: 'Keynote: Future of Work',
              venue: 'MBA Auditorium',
              speaker: 'Ms. Sunita Rao, CEO, TechSolutions Inc.'
            },
            {
              time: '02:00 PM - 05:00 PM',
              title: 'Case Study Competition (Round 1)',
              venue: 'Multiple Classrooms'
            },
            {
              time: '05:30 PM - 07:30 PM',
              title: 'Networking Dinner',
              venue: 'Business School Lawn'
            }
          ]
        },
        {
          day: '2',
          date: '2025-04-06',
          events: [
            {
              time: '09:00 AM - 12:00 PM',
              title: 'Business Plan Competition',
              venue: 'MBA Auditorium'
            },
            {
              time: '01:00 PM - 03:00 PM',
              title: 'Marketing Challenge',
              venue: 'Conference Room'
            },
            {
              time: '03:30 PM - 06:30 PM',
              title: 'Stock Market Simulation',
              venue: 'Computer Lab'
            }
          ]
        },
        {
          day: '3',
          date: '2025-04-07',
          events: [
            {
              time: '09:00 AM - 12:00 PM',
              title: 'Case Study Finals',
              venue: 'MBA Auditorium'
            },
            {
              time: '01:00 PM - 03:00 PM',
              title: 'Leadership Summit & Panel Discussion',
              venue: 'MBA Auditorium'
            },
            {
              time: '03:30 PM - 05:30 PM',
              title: 'Valedictory & Prize Distribution',
              venue: 'MBA Auditorium'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?business,conference',
          caption: 'Business conference session'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?presentation,business',
          caption: 'Business plan presentation'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?networking,event',
          caption: 'Networking session'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?stock,market',
          caption: 'Stock market simulation'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?panel,discussion',
          caption: 'Panel discussion with industry leaders'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?award,business',
          caption: 'Award ceremony'
        }
      ]
    },
    {
      id: 'alumni-meet-2025',
      title: 'Reconnect 2025',
      date: '2025-02-28',
      endDate: '2025-03-01',
      location: 'College Campus',
      category: 'alumni',
      coverImage: 'https://source.unsplash.com/random/800x500/?reunion,alumni',
      description: 'Annual alumni gathering to reconnect with former classmates, network with professionals, and share experiences with current students.',
      shortDescription: 'Reconnect with fellow alumni and share your experiences with current students.',
      organizer: 'Alumni Association',
      registrationLink: 'https://example.com/register',
      registrationFee: '₹500',
      registrationDeadline: '2025-02-20',
      prizes: null,
      contactEmail: 'alumni@college.edu',
      contactPhone: '+91 9876543214',
      featured: false,
      upcoming: true,
      attendees: 150,
      maxAttendees: 300,
      tags: ['alumni', 'networking', 'reunion'],
      schedule: [
        {
          day: '1',
          date: '2025-02-28',
          events: [
            {
              time: '04:00 PM - 05:30 PM',
              title: 'Registration & Welcome Tea',
              venue: 'College Lawn'
            },
            {
              time: '06:00 PM - 08:00 PM',
              title: 'Alumni Success Stories Session',
              venue: 'Main Auditorium'
            },
            {
              time: '08:00 PM - 10:00 PM',
              title: 'Dinner & Cultural Night',
              venue: 'College Lawn'
            }
          ]
        },
        {
          day: '2',
          date: '2025-03-01',
          events: [
            {
              time: '09:00 AM - 10:30 AM',
              title: 'Campus Tour',
              venue: 'College Campus'
            },
            {
              time: '11:00 AM - 01:00 PM',
              title: 'Interactive Session with Current Students',
              venue: 'Department-wise'
            },
            {
              time: '01:00 PM - 02:30 PM',
              title: 'Lunch',
              venue: 'College Lawn'
            },
            {
              time: '03:00 PM - 05:00 PM',
              title: 'Alumni Association Meeting',
              venue: 'Conference Hall'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?alumni,meeting',
          caption: 'Alumni gathering'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?reunion,college',
          caption: 'Reunion celebrations'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?networking,social',
          caption: 'Networking session'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?campus,tour',
          caption: 'Campus tour'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?dinner,event',
          caption: 'Gala dinner'
        }
      ]
    },
    {
      id: 'research-symposium-2025',
      title: 'Innovate Research Symposium',
      date: '2025-01-15',
      endDate: '2025-01-16',
      location: 'Research Center',
      category: 'academic',
      coverImage: 'https://source.unsplash.com/random/800x500/?research,conference',
      description: 'A platform for researchers to present their work, exchange ideas, and foster collaborations across disciplines.',
      shortDescription: 'Present research findings and connect with fellow researchers across disciplines.',
      organizer: 'Research Committee',
      registrationLink: 'https://example.com/register',
      registrationFee: '₹400 for students, ₹800 for professionals',
      registrationDeadline: '2025-01-10',
      prizes: 'Best Paper Awards in Multiple Categories',
      contactEmail: 'research@college.edu',
      contactPhone: '+91 9876543215',
      featured: false,
      upcoming: true,
      attendees: 120,
      maxAttendees: 200,
      tags: ['research', 'academic', 'innovation', 'science'],
      schedule: [
        {
          day: '1',
          date: '2025-01-15',
          events: [
            {
              time: '09:00 AM - 10:00 AM',
              title: 'Inauguration',
              venue: 'Research Center Auditorium'
            },
            {
              time: '10:30 AM - 12:30 PM',
              title: 'Keynote Address',
              venue: 'Research Center Auditorium',
              speaker: 'Prof. Amit Sharma, IISc Bangalore'
            },
            {
              time: '01:30 PM - 04:30 PM',
              title: 'Parallel Technical Sessions I',
              venue: 'Multiple Seminar Halls'
            },
            {
              time: '05:00 PM - 06:30 PM',
              title: 'Poster Presentation Session',
              venue: 'Research Center Lobby'
            }
          ]
        },
        {
          day: '2',
          date: '2025-01-16',
          events: [
            {
              time: '09:00 AM - 12:00 PM',
              title: 'Parallel Technical Sessions II',
              venue: 'Multiple Seminar Halls'
            },
            {
              time: '01:00 PM - 02:30 PM',
              title: 'Panel Discussion: Future Research Directions',
              venue: 'Research Center Auditorium'
            },
            {
              time: '03:00 PM - 04:30 PM',
              title: 'Awards & Closing Ceremony',
              venue: 'Research Center Auditorium'
            }
          ]
        }
      ],
      photos: [
        {
          url: 'https://source.unsplash.com/random/600x400/?research,conference',
          caption: 'Research presentation session'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?poster,presentation',
          caption: 'Poster presentation'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?keynote,speaker',
          caption: 'Keynote address'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?panel,discussion',
          caption: 'Panel discussion'
        },
        {
          url: 'https://source.unsplash.com/random/600x400/?award,academic',
          caption: 'Award ceremony'
        }
      ]
    }
  ];
  
  export const EVENT_CATEGORIES = [
    { id: 'all', label: 'All Events' },
    { id: 'technical', label: 'Technical', color: 'blue' },
    { id: 'cultural', label: 'Cultural', color: 'pink' },
    { id: 'sports', label: 'Sports', color: 'green' },
    { id: 'management', label: 'Management', color: 'purple' },
    { id: 'academic', label: 'Academic', color: 'yellow' },
    { id: 'alumni', label: 'Alumni', color: 'orange' }
  ];

  export const STUDENT_ACHIEVEMENTS = [
    {
      id: 1,
      name: "Priya Sharma",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      branch: "Computer Science",
      year: 2024,
      achievement: "Google AI Research Internship",
      headline: "Selected for prestigious Google AI Research Internship",
      category: "academic",
      description: "Priya was selected for the highly competitive Google AI Research Internship program among thousands of applicants worldwide. During her internship, she worked on cutting-edge natural language processing projects under the mentorship of senior Google AI researchers. Her work contributed to improving contextual understanding in conversational AI models, resulting in a 15% improvement in response accuracy.",
      longDescription: "Priya Sharma, a final year Computer Science student, has achieved a remarkable milestone by securing the highly sought-after Google AI Research Internship, competing against thousands of applicants worldwide. Known for her exceptional academic record and previous contributions to open-source AI projects, Priya stood out during Google's rigorous selection process.\n\nDuring her 12-week internship, Priya worked under the guidance of Dr. Mei Zhang, a distinguished researcher in Google's Natural Language Understanding team. Her primary project focused on enhancing contextual understanding in conversational AI models, specifically addressing the challenges of maintaining context over extended dialogues.\n\nPriya's innovative approach combined traditional transformer architectures with a novel attention mechanism that she developed, which improved the model's ability to reference earlier parts of conversations. This contribution resulted in a significant 15% improvement in response accuracy on Google's internal benchmarks for extended conversations.\n\nBeyond her technical work, Priya actively participated in Google's research community, presenting her findings at internal symposiums and collaborating with researchers across different teams. Her project paper has been submitted to the upcoming Conference on Neural Information Processing Systems (NeurIPS), one of the most prestigious conferences in artificial intelligence research.\n\n\"Working at Google AI was a dream come true,\" says Priya. \"The opportunity to collaborate with brilliant minds and contribute to technology that impacts billions of users was incredibly rewarding. I'm grateful for the mentorship and knowledge I gained during my time there.\"\n\nFollowing her successful internship, Priya has received a pre-placement offer to join Google's AI Research team full-time after graduation.",
      date: "January 2024",
      location: "Mountain View, California",
      recognizedBy: "Google AI Research",
      impact: "Contributed to a 15% improvement in conversational AI accuracy",
      skills: ["Machine Learning", "Natural Language Processing", "Python", "TensorFlow"],
      mentors: ["Dr. Mei Zhang, Senior Research Scientist at Google AI"],
      publications: [
        "Sharma, P., Zhang, M., et al. (2024). \"Enhanced Contextual Memory in Transformer Models for Extended Conversations.\" Submitted to NeurIPS 2024."
      ],
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Priya presenting her research findings at Google's internal symposium"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Working with Google's AI team"
        }
      ],
      testimonials: [
        {
          quote: "Priya demonstrated exceptional technical skills and research intuition during her internship. Her contributions have made a meaningful impact on our conversational AI systems.",
          author: "Dr. Mei Zhang, Senior Research Scientist, Google AI"
        }
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/priya-sharma",
        github: "https://github.com/priyasharma",
        twitter: "https://twitter.com/priya_sharma_ai"
      }
    },
    {
      id: 2,
      name: "Rahul Verma",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      branch: "Electronics Engineering",
      year: 2023,
      achievement: "International Robotics Competition Winner",
      headline: "Led college team to victory at International Robotics Competition in Tokyo",
      category: "competition",
      description: "Rahul led our college robotics team to first place at the International Robotics Competition held in Tokyo. Their winning robot, 'EcoBot', demonstrated innovative approaches to environmental monitoring using custom sensors and machine learning algorithms for real-time data analysis.",
      longDescription: "Rahul Verma, a third-year Electronics Engineering student, has brought international recognition to our institution by leading the college robotics team to a remarkable first-place victory at the prestigious International Robotics Competition held in Tokyo, Japan. Competing against 72 teams from 28 countries, Rahul's leadership and technical expertise were instrumental in crafting the winning robot, 'EcoBot'.\n\nThe competition, organized by the International Association of Robotics and Automation (IARA), challenged participants to develop robots that could address real-world environmental challenges. Rahul's team chose to focus on creating an autonomous robot capable of monitoring and analyzing environmental parameters in difficult-to-access locations.\n\nEcoBot stood out for its innovative design integrating multiple custom-built sensors that could simultaneously monitor air quality, water contamination levels, soil composition, and radiation. What particularly impressed the judges was the onboard edge computing system that Rahul designed, which processed this environmental data in real-time using sophisticated machine learning algorithms.\n\n\"The key innovation was developing a system that could not only collect accurate environmental data but also make immediate assessments about potential hazards without requiring constant connectivity to external computing resources,\" Rahul explained. \"This makes EcoBot particularly valuable for disaster zones or remote areas where communication infrastructure might be compromised.\"\n\nThe team spent eight months developing EcoBot, overcoming numerous technical challenges along the way. Rahul was responsible for the overall system architecture and the critical integration between the hardware sensors and the software processing systems. His novel approach to power management also allowed EcoBot to operate for extended periods on a single charge, a feature that gave their entry a significant edge over competitors.\n\nThe judges awarded EcoBot the highest scores in the categories of technical innovation, practical application, and engineering excellence. The robot's potential applications in disaster response, environmental protection, and scientific research were specifically highlighted in the judges' comments.\n\n\"This achievement represents countless hours of work from our entire team,\" Rahul said during the award ceremony. \"Each team member brought unique skills to the project, and our success reflects our collaborative approach and shared commitment to using technology to address environmental challenges.\"\n\nThe victory has earned the team a ₹10,00,000 prize, which they plan to invest in expanding their robotics laboratory and developing EcoBot further for real-world applications.",
      date: "November 2023",
      location: "Tokyo, Japan",
      recognizedBy: "International Association of Robotics and Automation",
      impact: "Created innovative environmental monitoring robot with real-time analysis capabilities",
      skills: ["Robotics", "Embedded Systems", "Machine Learning", "Sensor Integration", "System Architecture"],
      team: ["Ananya Patel", "Vikram Singh", "Meera Kapoor", "Arjun Kumar"],
      awards: [
        "First Place - International Robotics Competition 2023",
        "Best Technical Innovation Award",
        "Best Environmental Application Award"
      ],
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Rahul and team with their winning robot EcoBot"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581092160607-ee22731cc60f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "EcoBot demonstration at the competition"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1581093196277-9f608bb3d4bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Award ceremony in Tokyo"
        }
      ],
      testimonials: [
        {
          quote: "The technical sophistication of EcoBot demonstrates exceptional engineering talent and innovation. This team has raised the bar for next year's competition.",
          author: "Dr. Hiroshi Tanaka, Head Judge, International Robotics Competition"
        }
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/rahul-verma",
        github: "https://github.com/rahulverma",
        instagram: "https://instagram.com/rahul_robotics"
      }
    },
    {
      id: 3,
      name: "Ananya Patel",
      profileImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      branch: "Mechanical Engineering",
      year: 2022,
      achievement: "Research Paper Publication in Nature",
      headline: "Published groundbreaking research on sustainable materials in Nature journal",
      category: "research",
      description: "Ananya's research on biodegradable composites derived from agricultural waste was published in Nature, one of the world's most prestigious scientific journals. Her innovative material demonstrates strength comparable to conventional plastics while being fully biodegradable within 180 days.",
      longDescription: "Ananya Patel, a final year Mechanical Engineering student, has achieved an extraordinary milestone by publishing her groundbreaking research on sustainable materials in Nature, one of the world's most prestigious and selective scientific journals. This remarkable accomplishment places her among a rare group of undergraduate students to have their work featured in this high-impact publication.\n\nHer paper, titled \"High-Performance Biodegradable Composites Derived from Agricultural Waste,\" presents a novel approach to creating sustainable materials that could potentially revolutionize multiple industries. Ananya's research focused on developing biodegradable composites using agricultural waste products that are typically discarded or burned, contributing to environmental pollution.\n\nThe innovative material she developed demonstrates mechanical properties comparable to conventional petroleum-based plastics, including tensile strength, flexibility, and thermal stability. Most importantly, her composites biodegrade completely within 180 days in standard composting conditions, addressing one of the most pressing global environmental challenges of plastic pollution.\n\n\"The key innovation was finding the right combination of rice straw, sugarcane bagasse, and specific natural binding agents that, when processed under precise conditions, form molecular structures similar to those found in durable plastics,\" Ananya explained. \"The resulting material maintains structural integrity during use but breaks down harmlessly when discarded.\"\n\nAnanya conducted this research under the mentorship of Dr. Vikram Mehta at the University's Advanced Materials Laboratory, but the concept, experimental design, and majority of the work were her own initiative. The research journey spanned over two years, during which she overcame numerous technical challenges and developed several innovative processing techniques.\n\nThe implications of her research extend across multiple industries, from packaging and consumer goods to automotive components and building materials. Several companies have already expressed interest in licensing the technology, and Ananya has filed a patent application for her manufacturing process.\n\n\"What makes Ananya's achievement particularly noteworthy is that she identified a problem, conceived a solution, and carried it through to publication in the world's leading scientific journal—all as an undergraduate student,\" said Dr. Mehta. \"Her work demonstrates not only scientific brilliance but also a commitment to addressing real-world environmental challenges.\"\n\nAnanya's research has been funded by a competitive grant from the National Science Foundation's Undergraduate Research Initiative, and she has been invited to present her findings at several international conferences on sustainable materials and green engineering.",
      date: "June 2022",
      location: "University Research Lab",
      recognizedBy: "Nature Journal (Impact Factor: 49.962)",
      impact: "Developed sustainable material with potential applications across multiple industries",
      skills: ["Materials Science", "Mechanical Engineering", "Sustainable Design", "Chemical Processing", "Research Methodology"],
      mentors: ["Dr. Vikram Mehta, Professor of Materials Science"],
      publications: [
        "Patel, A., Mehta, V. (2022). \"High-Performance Biodegradable Composites Derived from Agricultural Waste.\" Nature, 605(7908), 682-689."
      ],
      patents: [
        "Biodegradable Composite Materials and Manufacturing Process (Patent Pending, Application #US2022/047291)"
      ],
      media: [
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Ananya in the materials research laboratory"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          caption: "Samples of the biodegradable composite material"
        }
      ],
      testimonials: [
        {
          quote: "Ananya's research represents a significant breakthrough in sustainable materials. The elegant approach she developed addresses both performance requirements and end-of-life environmental concerns.",
          author: "Dr. Elizabeth Chen, Editor, Nature Materials"
        }
      ],
      socialLinks: {
        linkedin: "https://linkedin.com/in/ananya-patel",
        researchgate: "https://researchgate.net/profile/Ananya_Patel",
        googleScholar: "https://scholar.google.com/citations?user=AnanyaPatel"
      }
    }
  ];
  
  export const ACHIEVEMENT_CATEGORIES = [
    { id: "all", label: "All Achievements" },
    { id: "academic", label: "Academic Excellence", color: "blue" },
    { id: "research", label: "Research", color: "purple" },
    { id: "competition", label: "Competitions", color: "green" },
    { id: "innovation", label: "Innovation", color: "yellow" },
    { id: "sports", label: "Sports", color: "red" },
    { id: "cultural", label: "Cultural", color: "pink" },
    { id: "social", label: "Social Impact", color: "orange" }
  ];
  
  export const BRANCH_OPTIONS = [
    { id: "all", label: "All Branches" },
    { id: "Computer Science", label: "Computer Science" },
    { id: "Electronics Engineering", label: "Electronics Engineering" },
    { id: "Mechanical Engineering", label: "Mechanical Engineering" },
    { id: "Civil Engineering", label: "Civil Engineering" },
    { id: "Electrical Engineering", label: "Electrical Engineering" },
    { id: "Chemical Engineering", label: "Chemical Engineering" },
    { id: "Biotechnology", label: "Biotechnology" }
  ];
  
  export const YEAR_OPTIONS = [
    { id: "all", label: "All Years" },
    { id: 2025, label: "2025" },
    { id: 2024, label: "2024" },
    { id: 2023, label: "2023" },
    { id: 2022, label: "2022" },
    { id: 2021, label: "2021" }
  ];

  export const NOTES_DATA = [
    {
      id: 1,
      title: 'Data Structures and Algorithms Complete Notes',
      description: 'Comprehensive notes covering all DSA concepts with examples and solutions to practice problems.',
      subject: 'Data Structures',
      subjectCode: 'CS2001',
      branch: 'CSE',
      semester: 3,
      author: 'Priya Sharma',
      authorBatch: '2020-24',
      rating: 4.9,
      downloads: 1203,
      views: 2456,
      likes: 892,
      pages: 72,
      fileSize: '5.2 MB',
      dateAdded: '2023-05-10',
      fileUrl: '#',
      tags: ['algorithms', 'data structures', 'sorting', 'trees', 'graphs'],
      coverImage: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
    },
    {
      id: 2,
      title: 'Database Management Systems Notes with Diagrams',
      description: 'Well-structured notes with detailed diagrams for DBMS concepts, covering normalization, SQL, and more.',
      subject: 'DBMS',
      subjectCode: 'CS3002',
      branch: 'CSE',
      semester: 5,
      author: 'Rohan Verma',
      authorBatch: '2019-23',
      rating: 4.8,
      downloads: 987,
      views: 1845,
      likes: 762,
      pages: 65,
      fileSize: '6.8 MB',
      dateAdded: '2023-04-22',
      fileUrl: '#',
      tags: ['database', 'sql', 'normalization', 'transactions'],
      coverImage: 'https://source.unsplash.com/random/300x400/?database,notes'
    },
    {
      id: 3,
      title: 'Digital Electronics Handwritten Notes',
      description: 'Detailed handwritten notes with circuit diagrams, truth tables, and solved examples.',
      subject: 'Digital Electronics',
      subjectCode: 'EC2003',
      branch: 'ECE',
      semester: 3,
      author: 'Ananya Patel',
      authorBatch: '2020-24',
      rating: 4.7,
      downloads: 856,
      views: 1632,
      likes: 643,
      pages: 48,
      fileSize: '4.5 MB',
      dateAdded: '2023-03-15',
      fileUrl: '#',
      tags: ['electronics', 'digital', 'circuits', 'boolean algebra'],
      coverImage: 'https://source.unsplash.com/random/300x400/?electronics,circuits'
    },
    {
      id: 4,
      title: 'Engineering Mechanics Complete Study Material',
      description: 'Comprehensive notes with force diagrams, equilibrium examples, and practice problems with solutions.',
      subject: 'Engineering Mechanics',
      subjectCode: 'ME1001',
      branch: 'ME',
      semester: 1,
      author: 'Rahul Singh',
      authorBatch: '2021-25',
      rating: 4.6,
      downloads: 752,
      views: 1423,
      likes: 521,
      pages: 60,
      fileSize: '7.1 MB',
      dateAdded: '2023-02-18',
      fileUrl: '#',
      tags: ['mechanics', 'statics', 'dynamics', 'equilibrium'],
      coverImage: 'https://source.unsplash.com/random/300x400/?mechanics,engineering'
    },
    {
      id: 5,
      title: 'Computer Networks Notes with Protocol Diagrams',
      description: 'Detailed notes on networking concepts, protocols, and architecture with visual diagrams.',
      subject: 'Computer Networks',
      subjectCode: 'CS4001',
      branch: 'CSE',
      semester: 6,
      author: 'Arjun Mehta',
      authorBatch: '2019-23',
      rating: 4.9,
      downloads: 1102,
      views: 2134,
      likes: 843,
      pages: 82,
      fileSize: '9.3 MB',
      dateAdded: '2023-06-05',
      fileUrl: '#',
      tags: ['networks', 'protocols', 'tcp/ip', 'routing'],
      coverImage: 'https://source.unsplash.com/random/300x400/?network,technology'
    },
    {
      id: 6,
      title: 'Machine Learning Algorithms Notes',
      description: 'Comprehensive notes on ML algorithms with mathematical derivations and Python code examples.',
      subject: 'Machine Learning',
      subjectCode: 'CS4002',
      branch: 'CSE',
      semester: 7,
      author: 'Neha Gupta',
      authorBatch: '2019-23',
      rating: 4.8,
      downloads: 1320,
      views: 2567,
      likes: 978,
      pages: 95,
      fileSize: '12.4 MB',
      dateAdded: '2023-05-28',
      fileUrl: '#',
      tags: ['ml', 'ai', 'algorithms', 'data science', 'python'],
      coverImage: 'https://source.unsplash.com/random/300x400/?machine,learning'
    }
  ];

  export const images = [
    {
      id: 1,
      src: "https://www.rgpv.ac.in/images/slider/new_slide1.jpg",
      title: "Main Campus Building",
      category: "Campus",
      link: "/campus-life"
    },
    {
      id: 2,
      src: "https://www.rgpv.ac.in/images/slider/new_slide3.jpg",
      title: "Modern Library",
      category: "Academics",
      link: "/academics"
    },
    {
      id: 3,
      src: "https://rgpv.ac.in/images/slider/slider-img3.jpg",
      title: "Research Labs",
      category: "Research",
      link: "/research"
    },
    {
      id: 4,
      src: "https://www.rgpv.ac.in/images/slider/new_slide4.jpg",
      title: "Computer Science Lab",
      category: "Labs",
      link: "/academics/cse"
    },
    {
      id: 5,
      src: "https://www.rgpv.ac.in/images/slider/new_slide2.jpg",
      title: "Student Activities",
      category: "Events",
      link: "/events"
    },
    {
      id: 6,
      src: "https://rgpv.ac.in/images/slider/slider-img1.jpg",
      title: "Graduation Day",
      category: "Convocation",
      link: "/achievements"
    },
    {
      id: 7,
      src: "https://rgpv.ac.in/images/slider/slider-img2.jpg",
      title: "Cultural Festival",
      category: "Fests",
      link: "/fests"
    },
    {
      id: 8,
      src: "https://www.rgpv.ac.in/images/slider/new_slide5.jpg",
      title: "Sports Complex",
      category: "Sports",
      link: "/sports"
    },
    {
      id: 9,
      src: "https://rgpv.ac.in/images/slider/slider-img5.jpg",
      title: "Innovation Hub",
      category: "Innovation",
      link: "/innovation"
    },
    {
      id: 10,
      src: "https://www.rgpv.ac.in/images/slider/new_slide1.jpg",
      title: "Student Hostel",
      category: "Accommodation",
      link: "/hostels"
    },
    {
      id: 11,
      src: "https://rgpv.ac.in/images/slider/slider-img2.jpg",
      title: "Technical Workshop",
      category: "Workshops",
      link: "/workshops"
    },
    {
      id: 12,
      src: "https://rgpv.ac.in/images/slider/slider-img3.jpg",
      title: "Placement Drive",
      category: "Placements",
      link: "/placements"
    },
    {
      id: 13,
      src: "https://www.rgpv.ac.in/images/slider/new_slide3.jpg",
      title: "Green Campus",
      category: "Environment",
      link: "/campus-life"
    },
    {
      id: 14,
      src: "https://www.rgpv.ac.in/images/slider/new_slide5.jpg",
      title: "Robotics Competition",
      category: "Competitions",
      link: "/competitions"
    }
  ];
