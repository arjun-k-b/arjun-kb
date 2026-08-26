'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Layers,
  Code,
  Palette,
  Sparkles,
  Globe,
  Cpu,
  Server,
  Box,
  Network,
  Terminal,
  Boxes,
  Workflow,
  Database,
  Layout,
  Cloud,
  Share2,
  HardDrive,
  FileCode,
  Zap,
  Grid,
  Package,
  GitBranch,
  GitPullRequest,
  Code2,
  Send,
  CheckCircle2,
  FileText,
  BookOpen,
  Monitor,
  Microchip,
  Container,
} from 'lucide-react';
import { SkillCategory } from '@/types/skill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Workflow: <Workflow className="w-5 h-5" />,
      Table: <Layout className="w-5 h-5" />,
      Layout: <Layout className="w-5 h-5" />,
      Database: <Database className="w-5 h-5" />,
      BookOpen: <BookOpen className="w-5 h-5" />,
      FileText: <FileText className="w-5 h-5" />,
      Boxes: <Boxes className="w-5 h-5" />,
      Terminal: <Terminal className="w-5 h-5" />,
      Monitor: <Monitor className="w-5 h-5" />,
      Layers: <Layers className="w-5 h-5" />,
      Code: <Code className="w-5 h-5" />,
      Atom: <Atom className="w-5 h-5" />,
      Server: <Server className="w-5 h-5" />,
      Box: <Box className="w-5 h-5" />,
      Network: <Network className="w-5 h-5" />,
      GitBranch: <GitBranch className="w-5 h-5" />,
      Github: <Code2 className="w-5 h-5" />,
      Send: <Send className="w-5 h-5" />,
      Code2: <Code2 className="w-5 h-5" />,
      Cpu: <Cpu className="w-5 h-5" />,
      Microchip: <Microchip className="w-5 h-5" />,
      Container: <Container className="w-5 h-5" />,
    };
    return icons[iconName] || <Code className="w-5 h-5" />;
  };

  const categoriesList: string[] = [
    'All',
    ...skillCategories.map((c) => c.category),
  ];

  const filteredCategories = React.useMemo(() => {
    if (selectedCategory === 'All') {
      return skillCategories;
    }
    return skillCategories.filter((c) => c.category === selectedCategory);
  }, [selectedCategory, skillCategories]);

  return (
    <section id="skills" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Technical Expertise"
          title="Skills & Core Competencies"
          subtitle="Primary specialization in enterprise SAP ABAP, supported by full-stack web development and embedded technologies."
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-[#7C3AED]'
                  : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="space-y-10">
          {filteredCategories.map((catGroup) => {
            const isSapAbap = catGroup.category === 'SAP ABAP';

            return (
              <motion.div
                key={catGroup.id}
                variants={fadeIn('up', 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-50px' }}
                className={`space-y-4 p-6 sm:p-8 rounded-3xl transition-all ${
                  isSapAbap
                    ? 'bg-[#7C3AED]/10 border-2 border-[#7C3AED]/60 shadow-[0_0_40px_rgba(124,58,237,0.25)]'
                    : 'bg-white/[0.02] border border-white/10'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      {catGroup.category}
                      {isSapAbap && (
                        <span className="text-xs font-semibold text-[#7C3AED] bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 fill-[#7C3AED]" />
                          Primary Specialization
                        </span>
                      )}
                    </h3>
                  </div>

                  <p className="text-xs text-[#A1A1AA] max-w-md">
                    {catGroup.description}
                  </p>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pt-2"
                >
                  {catGroup.skills.map((skill) => (
                    <GlassCard
                      key={skill.name}
                      className={`p-3.5 flex flex-col items-center justify-center text-center gap-2.5 group transition-all duration-300 ${
                        isSapAbap
                          ? 'border-[#7C3AED]/40 bg-[#111118]/90 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                          : 'hover:border-[#7C3AED]/50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 ${
                          isSapAbap
                            ? 'bg-[#7C3AED]/25 border border-[#7C3AED]/50 text-[#A78BFA]'
                            : 'bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED]'
                        }`}
                      >
                        {getIcon(skill.icon)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#7C3AED] transition-colors leading-tight">
                        {skill.name}
                      </h4>
                    </GlassCard>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
