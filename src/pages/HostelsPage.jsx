import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiFilter,
  FiSearch,
  FiArrowRight,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";
import hostelsApi from "../services/api/hostels";

const HostelsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await hostelsApi.getHostels();
        setHostels(response.hostels);
        setError(null);
      } catch (err) {
        console.error("Error fetching hostels:", err);
        setError("Failed to load hostels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  const filteredHostels = hostels.filter((hostel) => {
    // Filter by type
    const typeMatch = activeFilter === "all" || hostel.type === activeFilter;

    // Filter by search query
    const searchMatch =
      searchQuery === "" ||
      hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hostel.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading hostels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
          <FiHome className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white text-xl font-medium mb-2">Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-24 px-4 sm:px-6 relative overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Campus Hostels
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore our campus accommodation options designed to provide
            comfort, safety, and a sense of community for all students.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hostels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("male")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === "male"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              Boys
            </button>
            <button
              onClick={() => setActiveFilter("female")}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                activeFilter === "female"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              Girls
            </button>
          </div>
        </motion.div>

        {filteredHostels.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto">
              <FiHome className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">
                No hostels found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear filters
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHostels.map((hostel, index) => (
              <motion.div
                key={hostel.id}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-sm group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                  <div
                    className={`absolute top-4 left-4 z-20 ${
                      hostel.type === "male" ? "bg-blue-500" : "bg-pink-500"
                    } text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {hostel.type === "male" ? "Boys Hostel" : "Girls Hostel"}
                  </div>
                  <motion.img
                    src={hostel.mainImage}
                    alt={hostel.name}
                    className="w-full h-full object-cover transition-transform duration-10000"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <div className="flex items-center mb-1">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`${
                              i <
                              Math.floor(
                                hostel.reviews.reduce(
                                  (acc, review) => acc + review.rating,
                                  0
                                ) / hostel.reviews.length
                              )
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } w-4 h-4`}
                          />
                        ))}
                      </div>
                      <span className="text-white text-sm ml-2">
                        ({hostel.reviews.length} reviews)
                      </span>
                    </div>
                    <h2 className="text-white text-2xl font-bold">
                      {hostel.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    {hostel.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-3">
                        <FiHome className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Total Rooms</p>
                        <p className="text-white font-medium">
                          {hostel.totalRooms}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-3">
                        <FiUsers className="text-pink-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Capacity</p>
                        <p className="text-white font-medium">
                          {hostel.totalCapacity} students
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-white text-lg font-medium mb-3">
                      Key Facilities
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {hostel.facilities && hostel.facilities.length > 0 ? (
                        // Show up to 4 facilities, or all if less than 4
                        hostel.facilities.slice(0, 4).map((facility, i) => (
                          <div key={i} className="flex items-center">
                            <FiCheckCircle className="text-blue-400 mr-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">
                              {facility.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 col-span-2">
                          No facilities listed
                        </span>
                      )}
                    </div>
                    {hostel.facilities && hostel.facilities.length > 4 && (
                      <p className="text-gray-400 text-sm mt-2">
                        +{hostel.facilities.length - 4} more facilities
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/hostels/${hostel.id}`}
                    className={`w-full flex items-center justify-center ${
                      hostel.type === "male"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : "bg-gradient-to-r from-pink-500 to-purple-500"
                    } text-white py-3 px-6 rounded-xl font-medium transition-all`}
                  >
                    <span>View Details</span>
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Hostel Allocation Process
              </h2>
              <p className="text-gray-300 mb-4">
                Hostel allocation is based on various factors including distance
                from hometown, academic performance, and specific requirements.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    Applications open at the beginning of each academic year
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    Current students can apply through the student portal
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    New students receive application details with their
                    admission offer
                  </span>
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    Priority is given to students from distant locations
                  </span>
                </li>
              </ul>
              <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-medium transition-all">
                Download Hostel Guide
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Hostel Management Contact
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">
                      Hostel Administration Office
                    </p>
                    <p className="text-white">
                      Student Services Building, Ground Floor
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">hostel.admin@university.edu</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+91-1123456780</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Office Hours</p>
                    <p className="text-white">
                      Monday to Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostelsPage;
