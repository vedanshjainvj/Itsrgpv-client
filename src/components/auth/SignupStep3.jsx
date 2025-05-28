import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiCalendar, FiArrowLeft, FiX, FiPlus } from 'react-icons/fi';

const SignupStep3 = ({ onNext, onBack, data }) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    branch: data.branch || '',
    year: data.year || '',
    gender: data.gender || '',
    dob: data.dob || '',
    semester: data.semester || '',
    contactNumber: data.contactNumber || '',
    enrollmentNumber: data.enrollmentNumber || '',
    aboutUs: data.aboutUs || '',
    socialLinks: data.socialLinks || {
      instagram: '',
      linkedin: '',
      github: '',
      twitter: ''
    },
    skills: data.skills || []
  });
  
  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState('');
  
  const branchOptions = [
    'Computer Science',
    'Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology'
  ];
  
  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const semesterOptions = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    }
    
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.enrollmentNumber) {
      newErrors.enrollmentNumber = 'Enrollment Number is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
  if (!formData.aboutUs || formData.aboutUs.trim().split(/\s+/).length < 10) {
  newErrors.aboutUs = 'About Us is required and must be at least 10 words long';
}
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext(formData);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (social links)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
    >
      <div className="space-y-4">
        {/* Last Name */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
           First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 pl-10 pr-3 rounded-lg border ${
                errors.firstName ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        
        {/* Last Name */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 pl-10 pr-3 rounded-lg border ${
                errors.lastName ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Enter your last name"
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
        
        {/* Branch */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Branch
          </label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className={`bg-gray-800 text-white w-full py-2 px-3 rounded-lg border ${
              errors.branch ? 'border-red-500' : 'border-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          >
            <option value="">Select your branch</option>
            {branchOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-red-500 text-xs mt-1">{errors.branch}</p>
          )}
        </div>
        
        {/* Year and Semester in a row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 px-3 rounded-lg border ${
                errors.year ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="">Select year</option>
              {yearOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 px-3 rounded-lg border ${
                errors.semester ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="">Select semester</option>
              {semesterOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.semester && (
              <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
            )}
          </div>
        </div>
        
        {/* Gender and Date of Birth */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 px-3 rounded-lg border ${
                errors.gender ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="">Select gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-500" />
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`bg-gray-800 text-white w-full py-2 pl-10 pr-3 rounded-lg border ${
                  errors.dob ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
            )}
          </div>
        </div>
        
        {/* enrollmentNumber */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Enrollment Number
          </label>
          <div className="relative">
       
            <input
              type="text"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 px-3 rounded-lg border ${
                errors.enrollmentNumber ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.enrollmentNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.enrollmentNumber}</p>
          )}
        </div>
        {/* Contact */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-500" />
            </div>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2 pl-10 pr-3 rounded-lg border ${
                errors.contactNumber ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
          )}
        </div>
        
        {/* Social Links */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Social Links (Optional)
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Instagram"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  className="bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="LinkedIn"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="GitHub"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Twitter"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Skills
          </label>
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              className="bg-gray-800 text-white flex-grow py-2 px-3 rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-r-lg flex items-center"
            >
              <FiPlus />
            </button>
          </div>
          
          {formData.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-gray-700 text-white text-sm px-3 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

             {/* About Us */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            About Us
          </label>
          <div className="relative">
            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-500" />
            </div> */}
            <textarea
              type="tel"
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleChange}
              className={`bg-gray-800 text-white w-full py-2  px-2 rounded-lg border ${
                errors.aboutUs ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="Enter about us"
            />
          </div>
          {errors.aboutUs && (
            <p className="text-red-500 text-xs mt-1">{errors.aboutUs}</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        {/* <button
          type="button"
          onClick={onBack}
          className="flex-1 py-2 px-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button> */}
        
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
        >
          Continue
        </button>
      </div>
    </motion.form>
  );
};

export default SignupStep3;