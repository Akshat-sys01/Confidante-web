'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../../components/layout';

export default function UnderstandingTeenMentalHealth() {
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
            Understanding Teen Mental Health
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Mental Health
            </span>
            <span>•</span>
            <span>10 min read</span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/07.jpg"
            alt="Teen mental health support"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="lead text-gray-700">
            Teen mental health is a critical aspect of adolescent development that requires careful attention and understanding. This article explores the key aspects of teen mental health, common challenges, and effective support strategies.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">The Importance of Teen Mental Health</h2>
          <p className="text-gray-700">
            Adolescence is a period of significant physical, emotional, and social changes. Understanding and supporting teen mental health during this crucial developmental stage is essential for their overall well-being and future success.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Common Mental Health Challenges</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Anxiety and stress</li>
            <li>Depression and mood disorders</li>
            <li>Eating disorders</li>
            <li>Substance abuse</li>
            <li>Self-harm and suicidal thoughts</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Signs to Watch For</h2>
          <p className="text-gray-700">
            Recognizing the signs of mental health issues in teens is crucial for early intervention:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Changes in sleep patterns</li>
            <li>Withdrawal from social activities</li>
            <li>Changes in academic performance</li>
            <li>Mood swings and irritability</li>
            <li>Changes in eating habits</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Support Strategies</h2>
          <p className="text-gray-700">
            Effective support for teen mental health includes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Open communication and active listening</li>
            <li>Professional counseling and therapy</li>
            <li>Healthy lifestyle habits</li>
            <li>Peer support groups</li>
            <li>Family involvement and support</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Conclusion</h2>
          <p className="text-gray-700">
            Understanding and supporting teen mental health is a shared responsibility. By recognizing the signs, providing appropriate support, and fostering open communication, we can help teens navigate this challenging period and build a foundation for lifelong mental well-being.
          </p>
        </div>
      </article>
    </main>
  );
} 