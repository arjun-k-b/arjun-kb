'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, ArrowRight, X, Sparkles, User, Tag, ExternalLink } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BlogProps {
  blogs: BlogPost[];
}

export const Blog: React.FC<BlogProps> = ({ blogs }) => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('All');
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});
  const [userLikedState, setUserLikedState] = useState<{ [id: string]: boolean }>({});
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Initialize likes and userLiked state from localStorage on client side
  useEffect(() => {
    const initialLikes: { [id: string]: number } = {};
    const initialUserLiked: { [id: string]: boolean } = {};

    blogs.forEach((blog) => {
      const storedLikes = localStorage.getItem(`blog_likes_${blog.id}`);
      const storedUserLiked = localStorage.getItem(`blog_liked_${blog.id}`);

      initialLikes[blog.id] = storedLikes ? parseInt(storedLikes, 10) : blog.likes;
      initialUserLiked[blog.id] = storedUserLiked === 'true';
    });

    setLikesState(initialLikes);
    setUserLikedState(initialUserLiked);
  }, [blogs]);

  const categories: BlogCategory[] = [
    'All',
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  const filteredBlogs =
    activeCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  const handleToggleLike = (e: React.MouseEvent, blogId: string) => {
    e.stopPropagation();

    const isCurrentlyLiked = !!userLikedState[blogId];
    const currentCount = likesState[blogId] ?? blogs.find((b) => b.id === blogId)?.likes ?? 0;

    const newLikedStatus = !isCurrentlyLiked;
    const newCount = isCurrentlyLiked ? currentCount - 1 : currentCount + 1;

    setUserLikedState((prev) => ({ ...prev, [blogId]: newLikedStatus }));
    setLikesState((prev) => ({ ...prev, [blogId]: newCount }));

    try {
      localStorage.setItem(`blog_liked_${blogId}`, String(newLikedStatus));
      localStorage.setItem(`blog_likes_${blogId}`, String(newCount));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#0B0B12] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Articles & Insights"
          title="Latest Blog Posts"
          subtitle="Explore thoughts on SAP ABAP & Full-Stack Developer, SAP integration strategies, modern web tech, and agentic AI."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activeCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-[#7C3AED]'
                  : 'bg-white/5 text-[#A1A1AA] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredBlogs.map((blog) => {
              const count = likesState[blog.id] ?? blog.likes;
              const isLiked = !!userLikedState[blog.id];

              return (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="h-full flex flex-col justify-between p-0 group overflow-hidden border border-white/10 hover:border-[#7C3AED]/60 transition-all duration-300">
                    {/* Thumbnail Image Container */}
                    <div
                      className="relative w-full h-52 overflow-hidden bg-black/40 cursor-pointer"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant="primary"
                          size="sm"
                          className="font-semibold cursor-pointer hover:bg-white/20 transition-colors"
                          onClick={() => setActiveCategory(blog.category)}
                        >
                          {blog.category}
                        </Badge>
                      </div>

                      {/* Read Time & Optional External Link Badge */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                        {blog.url && (
                          <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-[#7C3AED] border border-white/10 transition-colors"
                            title="Visit Website Article"
                            aria-label={`Visit website for ${blog.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#A1A1AA] border border-white/10">
                          <Clock className="w-3 h-3 text-[#A78BFA]" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Blog Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                          <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>{blog.date}</span>
                        </div>

                        {/* Heading / Title */}
                        <h3
                          onClick={() => setSelectedBlog(blog)}
                          className="text-lg sm:text-xl font-bold text-white group-hover:text-[#7C3AED] transition-colors line-clamp-2 cursor-pointer"
                        >
                          {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-3 leading-relaxed">
                          {blog.description}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        {/* Interactive Like Button */}
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => handleToggleLike(e, blog.id)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${isLiked
                              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                              : 'bg-white/5 text-[#A1A1AA] border-white/10 hover:text-rose-400 hover:border-rose-500/30 hover:bg-white/10'
                            }`}
                          aria-label={`Like blog post: ${blog.title}`}
                        >
                          <Heart
                            className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                              }`}
                          />
                          <span>{count}</span>
                        </motion.button>

                        <div className="flex items-center gap-2">
                          {/* Render external link icon button only if link exists */}
                          {blog.url && (
                            <Button
                              asAnchor
                              href={blog.url}
                              target="_blank"
                              variant="ghost"
                              size="sm"
                              icon={<ExternalLink className="w-3.5 h-3.5 text-[#A78BFA]" />}
                              className="text-xs font-semibold text-[#A1A1AA] hover:text-white"
                              aria-label={`Open link for ${blog.title}`}
                            >
                              Link
                            </Button>
                          )}

                          {/* Read Article Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBlog(blog)}
                            icon={<ArrowRight className="w-3.5 h-3.5" />}
                            iconPosition="right"
                            className="text-xs font-semibold text-[#A78BFA] hover:text-white"
                          >
                            Read Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#111118] border border-white/15 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Image */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black">
                <Image
                  src={selectedBlog.thumbnail}
                  alt={selectedBlog.title}
                  fill
                  className="object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-black/40 to-transparent" />

                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="primary" size="md">
                    {selectedBlog.category}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-[#A1A1AA] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                      {selectedBlog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A78BFA]" />
                      {selectedBlog.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 flex-1">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedBlog.title}
                </h2>

                {/* Author Info & Like Toggle */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#7C3AED]">
                      <Image
                        src={selectedBlog.author.avatar}
                        alt={selectedBlog.author.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {selectedBlog.author.name}
                      </h4>
                      <p className="text-xs text-[#A1A1AA]">Author & Developer</p>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => handleToggleLike(e, selectedBlog.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${userLikedState[selectedBlog.id]
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        : 'bg-white/5 text-[#A1A1AA] border-white/10 hover:text-rose-400 hover:border-rose-500/30'
                      }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${userLikedState[selectedBlog.id] ? 'fill-rose-500 text-rose-500' : ''
                        }`}
                    />
                    <span>{likesState[selectedBlog.id] ?? selectedBlog.likes} Likes</span>
                  </motion.button>
                </div>

                {/* Article Content */}
                <div className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed whitespace-pre-line space-y-4">
                  {selectedBlog.content}
                </div>

                {/* Tags & External Link */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-[#7C3AED]" />
                    {selectedBlog.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {selectedBlog.url && (
                    <Button
                      asAnchor
                      href={selectedBlog.url}
                      target="_blank"
                      variant="primary"
                      size="sm"
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Read on Website
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
