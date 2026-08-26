'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, CheckCircle2, UserCheck } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project, ProjectCategory } from '@/types/project';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  // Sorted projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const categories: ProjectCategory[] = [
    'All',
    ...Array.from(new Set(sortedProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Featured Work"
          title="Portfolio Projects"
          subtitle="Explore enterprise SAP ABAP applications, full-stack web platforms, and embedded IoT solutions."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-[#7C3AED]'
                  : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-0 group overflow-hidden border border-white/10 hover:border-[#7C3AED]/60 transition-all duration-300">
                  {/* Card Image Container */}
                  <div className="relative w-full h-52 overflow-hidden bg-black/40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant="accent" size="sm" className="flex items-center gap-1 font-semibold">
                          <Star className="w-3 h-3 fill-[#7C3AED]" />
                          Top Project
                        </Badge>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        variant="secondary"
                        size="sm"
                        className="cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={() => setActiveCategory(project.category)}
                      >
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#7C3AED] transition-colors">
                          {project.title}
                        </h3>
                        {project.role && (
                          <div className="flex items-center gap-1.5 text-xs text-[#7C3AED] font-semibold">
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Role: {project.role}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Features List */}
                      {project.keyFeatures && project.keyFeatures.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-white/10">
                          <p className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                            Key Features
                          </p>
                          <div className="space-y-1">
                            {project.keyFeatures.slice(0, 4).map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-white/90">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="primary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Card Footer Links - ONLY render if actual link exists */}
                    {(project.githubUrl || project.liveUrl || project.url) && (
                      <div className="pt-4 border-t border-white/10 flex items-center justify-start gap-3">
                        {project.githubUrl && (
                          <Button
                            asAnchor
                            href={project.githubUrl}
                            target="_blank"
                            variant="ghost"
                            size="sm"
                            icon={<GithubIcon className="w-4 h-4" />}
                          >
                            GitHub
                          </Button>
                        )}

                        {project.liveUrl && (
                          <Button
                            asAnchor
                            href={project.liveUrl}
                            target="_blank"
                            variant="primary"
                            size="sm"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                            iconPosition="right"
                          >
                            Live Demo
                          </Button>
                        )}

                        {!project.liveUrl && project.url && (
                          <Button
                            asAnchor
                            href={project.url}
                            target="_blank"
                            variant="primary"
                            size="sm"
                            icon={<ExternalLink className="w-3.5 h-3.5" />}
                            iconPosition="right"
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
