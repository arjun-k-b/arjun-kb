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
} from 'lucide-react';
import { FigmaIcon } from '@/components/ui/Icons';
import { SkillCategory, SkillCategoryName } from '@/types/skill';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { fadeIn, staggerContainer } from '@/lib/framer';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Featured');

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Atom: <Atom className="w-5 h-5" />,
      Layers: <Layers className="w-5 h-5" />,
      Code: <Code className="w-5 h-5" />,
      Palette: <Palette className="w-5 h-5" />,
      Sparkles: <Sparkles className="w-5 h-5" />,
      Globe: <Globe className="w-5 h-5" />,
      Cpu: <Cpu className="w-5 h-5" />,
      Server: <Server className="w-5 h-5" />,
      Box: <Box className="w-5 h-5" />,
      Network: <Network className="w-5 h-5" />,
      Terminal: <Terminal className="w-5 h-5" />,
      Boxes: <Boxes className="w-5 h-5" />,
      Workflow: <Workflow className="w-5 h-5" />,
      Database: <Database className="w-5 h-5" />,
      Layout: <Layout className="w-5 h-5" />,
      Cloud: <Cloud className="w-5 h-5" />,
      Share2: <Share2 className="w-5 h-5" />,
      HardDrive: <HardDrive className="w-5 h-5" />,
      FileCode: <FileCode className="w-5 h-5" />,
      Zap: <Zap className="w-5 h-5" />,
      Grid: <Grid className="w-5 h-5" />,
      Package: <Package className="w-5 h-5" />,
      GitBranch: <GitBranch className="w-5 h-5" />,
      GitPullRequest: <GitPullRequest className="w-5 h-5" />,
      Code2: <Code2 className="w-5 h-5" />,
      Send: <Send className="w-5 h-5" />,
      Figma: <FigmaIcon className="w-5 h-5" />,
      CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
    };
    return icons[iconName] || <Code className="w-5 h-5" />;
  };

  const categoriesList: string[] = [
    'Featured',
    'All',
    ...Array.from(new Set(skillCategories.map((c) => c.category))),
  ];

  const filteredCategories = React.useMemo(() => {
    if (selectedCategory === 'Featured') {
      return skillCategories
        .map((catGroup) => ({
          ...catGroup,
          skills: catGroup.skills.filter((s) => s.featured),
        }))
        .filter((catGroup) => catGroup.skills.length > 0);
    }
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
          subtitle="Mastery across modern full-stack web technologies, enterprise SAP systems, and cloud architecture."
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
          {filteredCategories.map((catGroup) => (
            <motion.div
              key={catGroup.id}
              variants={fadeIn('up', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-white">{catGroup.category}</h3>
                <span className="text-xs text-[#7C3AED] font-medium bg-[#7C3AED]/10 px-2.5 py-0.5 rounded-md border border-[#7C3AED]/30">
                  {catGroup.skills.length} Skills
                </span>
                <p className="text-xs text-[#A1A1AA] hidden sm:block ml-auto">
                  {catGroup.description}
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {catGroup.skills.map((skill) => (
                  <GlassCard
                    key={skill.name}
                    className="p-4 flex items-center justify-between group hover:border-[#7C3AED]/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] group-hover:scale-110 transition-transform shrink-0">
                        {getIcon(skill.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#7C3AED] transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-[#A1A1AA]">{skill.experience}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
