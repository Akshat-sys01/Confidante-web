'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../../components/layout';

export default function BuildingEmotionalIntelligenceInSchools() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navigation />
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Building Emotional Intelligence in Schools
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Education
            </span>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/02.jpg"
            alt="Emotional intelligence in classroom"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="lead text-gray-700">
            Emotional intelligence is a crucial skill for success in both academic and personal life. This article explores how schools can effectively integrate emotional intelligence development into their curriculum and create supportive learning environments.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">The Importance of Emotional Intelligence</h2>
          <p className="text-gray-700">
            Emotional intelligence (EI) is increasingly recognized as a fundamental skill for academic success and personal development. Schools play a vital role in nurturing these skills from an early age.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Key Components of Emotional Intelligence</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Self-awareness and self-regulation</li>
            <li>Empathy and social awareness</li>
            <li>Relationship management</li>
            <li>Emotional expression and communication</li>
            <li>Conflict resolution skills</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Benefits of EI Education</h2>
          <p className="text-gray-700">
            Research shows that emotional intelligence education leads to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Improved academic performance</li>
            <li>Better social relationships</li>
            <li>Reduced behavioral problems</li>
            <li>Enhanced mental health</li>
            <li>Increased resilience and coping skills</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Implementing in Schools</h2>
          <p className="text-gray-700">
            Schools can integrate emotional intelligence development through:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Dedicated EI curriculum</li>
            <li>Teacher training and support</li>
            <li>Classroom activities and discussions</li>
            <li>Parental involvement programs</li>
            <li>School-wide initiatives and policies</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Conclusion</h2>
          <p className="text-gray-700">
            Building emotional intelligence in schools is essential for preparing students for success in all aspects of life. By integrating EI development into the curriculum and creating supportive learning environments, schools can help students develop the skills they need to thrive academically, socially, and emotionally.
          </p>
        </div>
      </article>
    </main>
  );
} 