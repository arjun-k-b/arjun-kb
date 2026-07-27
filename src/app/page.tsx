import { getSiteSettings } from '@/services/site.service';
import { getProjects } from '@/services/projects.service';
import { getSkills } from '@/services/skills.service';
import { getExperience } from '@/services/experience.service';
import { getEducation } from '@/services/education.service';
import { getCertificates } from '@/services/certificates.service';
import { getSocialLinks } from '@/services/social.service';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Education } from '@/components/sections/Education';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage() {
  const [
    siteSettings,
    projects,
    skillCategories,
    experiences,
    educationList,
    certificates,
    socialLinks,
  ] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getSkills(),
    getExperience(),
    getEducation(),
    getCertificates(),
    getSocialLinks(),
  ]);

  return (
    <div className="relative min-h-screen bg-[#0B0B12] text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero siteSettings={siteSettings} />
        <About siteSettings={siteSettings} />
        <Skills skillCategories={skillCategories} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Education educationList={educationList} />
        <Certificates certificates={certificates} />
        <Contact siteSettings={siteSettings} socialLinks={socialLinks} />
      </main>

      <Footer siteSettings={siteSettings} socialLinks={socialLinks} />
    </div>
  );
}
