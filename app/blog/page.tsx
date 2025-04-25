'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/layout';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Teen Mental Health",
    category: "Mental Health",
    readTime: "10 min read",
    image: "/images/07.jpg",
    slug: "understanding-teen-mental-health",
    excerpt: "Exploring the challenges teens face and strategies for support."
  },
  {
    id: 2,
    title: "Comprehensive Sex Education: A Modern Approach",
    category: "Sex Education",
    readTime: "12 min read",
    image: "/images/02.jpg",
    slug: "comprehensive-sex-education",
    excerpt: "Evidence-based approaches to inclusive sex education."
  },
  {
    id: 3,
    title: "Building Emotional Intelligence in Schools",
    category: "Emotional Well-being",
    readTime: "15 min read",
    image: "/images/04.jpg",
    slug: "building-emotional-intelligence-in-schools",
    excerpt: "How to foster emotional skills in educational settings."
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navigation />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-primary">
          Latest Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-white/90 text-primary px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-4 text-gray-600 mb-4">
                  <span className="text-sm ml-auto">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 