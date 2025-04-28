import React from 'react';
import Hero from '../components/sections/Hero';
import ClubsCarousel from '../components/sections/ClubsCarousel';
import AchievementsCarousel from '../components/sections/AchievementsCarousel';
import StartupsSection from '../components/sections/StartupsSection';
import PartnersMarquee from '../components/sections/PartnersMarquee';
import FestsSection from '../components/sections/FestsSection';
import ResourcesCTA from '../components/sections/ResourcesCTA';
import DepartmentsSection from '../components/sections/DepartmentsSection';
import GlimpsesGrid from '../components/sections/GlimpsesGrid';
import NssNccSection from '../components/sections/NssNccSection';
import CollegeReelsSection from '../components/sections/CollegeReelsSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <DepartmentsSection />
      <CollegeReelsSection />
      <ClubsCarousel />
      <NssNccSection />
      <AchievementsCarousel />
      <FestsSection />
      {/* <StartupsSection /> */}
      <PartnersMarquee />
      <ResourcesCTA />
      <GlimpsesGrid />
    </div>
  );
};

export default Home;