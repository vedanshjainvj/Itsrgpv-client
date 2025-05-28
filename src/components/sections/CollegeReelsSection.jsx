import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiHash } from 'react-icons/fi';
import mahavideo from '../../assets/mahavideo.mp4';
import coverimg3 from '../../assets/cover-vdo3.jpeg';
import vijayvideo from '../../assets/vijayvideo.mp4';
import coverimg2 from '../../assets/cover-vdo1.png';
import shankhvideo from '../../assets/shankhnaadvideo.mp4';
import coverimg1 from '../../assets/cover-vdo2.png';

const CompactReelsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Updated reel data with descriptions and hashtags
  const reelsData = [
    {
      id: 1,
      title: "Shankhnaad 2k22",
      description: "Incredible moments from our annual cultural fest Shankhnaad 2k23.",
      hashtags: ["Cultural", "CollegeLife", "Fest"],
      source: shankhvideo,
      thumbnail: coverimg2,
      fallbackThumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSunset&psig=AOvVaw3fMdmIZj3VdFCIhCd-0Kkh&ust=1748528272740000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIj-tcitxo0DFQAAAAAdAAAAABAE"
    },
    {
      id: 2,
      title: "VijayPath 2k23",
      description: "Highlights from this year's festival(civil) showcasing amazing talent, music and performances.",
      hashtags: ["CivilDept", "StudentTalent", "Performances"],
      source: vijayvideo,
      thumbnail: coverimg1,
      fallbackThumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSunset&psig=AOvVaw3fMdmIZj3VdFCIhCd-0Kkh&ust=1748528272740000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIj-tcitxo0DFQAAAAAdAAAAABAE"
    },
    {
      id: 3,
      title: "Sports Day",
      description: "Action-packed moments from our sports competition. Celebrating teamwork and athletic excellence!",
      hashtags: ["Mahasangram", "CollegeAthletics"],
      source: mahavideo,
      thumbnail: coverimg3,
      fallbackThumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSunset&psig=AOvVaw3fMdmIZj3VdFCIhCd-0Kkh&ust=1748528272740000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIj-tcitxo0DFQAAAAAdAAAAABAE"
    }
  ];

  return (
    <section className="py-10 relative overflow-hidden bg-black">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute left-0 top-1/3 w-1/3 h-1/3 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-1/3 h-1/3 bg-pink-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-center justify-between mb-6"
        >
          <motion.div variants={itemVariants} className="mb-4 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-transparent bg-clip-text inline-flex items-center">
              <span className="mr-2">Playful Vibes</span>
              <motion.span 
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5
                }}
              >
                📱
              </motion.span>
            </h2>
            <p className="text-gray-300 text-sm">Catch the fun moments around campus</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg"
            >
              View More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Reels Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reelsData.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Reel Card Component with fixed audio
const ReelCard = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  
  // Initialize audio context once at component mount
  useEffect(() => {
    // Try to unlock audio on first user interaction
    const unlockAudio = () => {
      // Create and destroy an audio context to unlock audio
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        audioCtx.resume().then(() => {
          console.log("AudioContext started");
        });
      }
      
      // Remove the event listener once we've unlocked audio
      document.removeEventListener('click', unlockAudio);
    };
    
    document.addEventListener('click', unlockAudio);
    
    return () => {
      document.removeEventListener('click', unlockAudio);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // If already playing, pause the video
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Make sure audio is on when playing
        videoRef.current.muted = false;
        setIsMuted(false);
        
        // Try to play with error handling
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log("Video playing with sound");
            setIsPlaying(true);
          }).catch(error => {
            console.warn("Play was prevented:", error);
            
            // Some browsers require user interaction for unmuted playback
            // Try one more time with a user alert
            alert("Please click OK to enable audio playback");
            
            videoRef.current.play().then(() => {
              console.log("Video playing after user interaction");
              setIsPlaying(true);
            }).catch(e => {
              console.error("Still can't play with audio:", e);
              alert("Audio playback is blocked by your browser. Please check your browser settings.");
            });
          });
        }
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      console.log("Mute toggled:", newMutedState);
    }
  };

  const openFullscreen = (e) => {
    e.stopPropagation(); // Prevent video play/pause
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Animation for hashtags
  const hashtagVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: i => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-xl overflow-hidden h-full"
    >
      <motion.div 
        className="relative h-full bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50"
        whileHover={{ 
          y: -8,
          boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(139, 92, 246, 0.3)" // Purple border on hover
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Video container with 16:9 aspect ratio */}
        <div 
          className="relative aspect-video cursor-pointer overflow-hidden rounded-t-xl" 
          onClick={togglePlay}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 z-10 mix-blend-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <video
            ref={videoRef}
            src={reel.source}
            poster={reel.thumbnail || reel.fallbackThumbnail}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            controls={false} // Disable browser controls
            onEnded={handleVideoEnd}
            onCanPlayThrough={() => console.log("Video can play through")}
            onError={(e) => {
              console.error("Video error:", e);
              e.target.poster = reel.fallbackThumbnail;
            }}
          />
          
          {/* Play/Pause Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'}`}>
            <motion.div 
              className={`w-14 h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/30 ${!isPlaying || isHovered ? 'opacity-100' : 'opacity-0'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: isPlaying && !isHovered ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? 
                <FiPause className="text-2xl" /> : 
                <FiPlay className="text-2xl ml-1" />
              }
            </motion.div>
          </div>
          
          {/* Video Status Indicator */}
          <div className="absolute bottom-3 left-3 text-xs text-white bg-black/50 backdrop-blur-sm py-1 px-2 rounded-full">
            {isPlaying ? (isMuted ? '🔇 Muted' : '🔊 Playing') : 'Paused'}
          </div>
          
          {/* Controls - Only show on hover */}
          <motion.div 
            className="absolute bottom-3 right-3 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button 
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors border border-white/20"
            >
              {isMuted ? <FiVolumeX className='z-50' size={16} /> : <FiVolume2 className='z-50' size={16} />}
            </motion.button>
            <motion.button 
              onClick={openFullscreen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors border border-white/20"
            >
              <FiMaximize size={16} />
            </motion.button>
          </motion.div>
          
          {/* Title tag */}
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full font-medium border border-white/10">
            {reel.title}
          </div>
        </div>
        
        {/* Description and hashtags section */}
        <motion.div 
          className="p-4 bg-[#171717]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Description text */}
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {reel.description}
          </p>
          
          {/* Hashtags */}
          <div className="flex flex-wrap gap-2">
            {reel.hashtags.map((tag, index) => (
              <motion.span
                key={tag}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={hashtagVariants}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(139, 92, 246, 0.3)" 
                }}
                className="inline-flex items-center text-xs bg-gray-800/70 hover:bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full transition-colors cursor-pointer"
              >
                <FiHash size={10} className="mr-1" />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CompactReelsSection;