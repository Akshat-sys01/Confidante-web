'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../../components/layout';

export default function ComprehensiveSexEducation() {
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
            Comprehensive Sex Education: A Modern Approach
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Sex Education
            </span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/02.jpg"
            alt="Comprehensive education classroom"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="lead text-gray-700">
            In today's rapidly evolving world, comprehensive sex education is more important than ever. This modern approach goes beyond the basics, providing young people with the knowledge and skills they need to make informed decisions about their sexual health and relationships.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">The Need for Comprehensive Education</h2>
          <p className="text-gray-700">
            Traditional sex education often falls short in addressing the complex realities of modern relationships and sexual health. A comprehensive approach ensures that young people receive accurate, age-appropriate information that covers all aspects of sexual health and well-being.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Key Components of Modern Sex Education</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Anatomy and physiology</li>
            <li>Consent and healthy relationships</li>
            <li>Sexual orientation and gender identity</li>
            <li>Contraception and STI prevention</li>
            <li>Digital safety and online relationships</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Benefits of Comprehensive Education</h2>
          <p className="text-gray-700">
            Research shows that comprehensive sex education leads to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Delayed initiation of sexual activity</li>
            <li>Reduced rates of STIs and unintended pregnancies</li>
            <li>Improved communication skills</li>
            <li>Better understanding of consent and boundaries</li>
            <li>Increased confidence in making healthy decisions</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Implementing in Schools</h2>
          <p className="text-gray-700">
            Schools play a crucial role in providing comprehensive sex education. This section covers:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Curriculum development and standards</li>
            <li>Teacher training and resources</li>
            <li>Parental involvement and communication</li>
            <li>Creating safe and inclusive learning environments</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Conclusion</h2>
          <p className="text-gray-700">
            Comprehensive sex education is an essential component of young people's development. By providing accurate information and fostering open discussions, we can empower the next generation to make informed decisions about their sexual health and relationships.
          </p>
        </div>
      </article>
    </main>
  );
} 