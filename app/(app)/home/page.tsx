"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section with brand feel */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center lg:text-left">
            Cloudinary Creative Hub
          </h1>
          <p className="text-sm text-base-content/60 mt-1 text-center lg:text-left">
            Manage, crop, compress, and optimize media resources using advanced smart Cloudinary integration.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Navigation Tab Group */}
          <div className="flex bg-base-200 p-1.5 rounded-xl border border-base-300 gap-1 shadow-inner">
            <Link href="/home" className="btn btn-sm btn-primary gap-2 rounded-lg text-xs font-semibold shadow-md transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11V11a1 1 0 00-1-1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link href="/social-share" className="btn btn-sm btn-ghost gap-2 rounded-lg text-xs font-semibold hover:bg-base-300 transition-all duration-200">
              <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.928-2.464m0 0a3 3 0 113.417 4.474l-4.929 2.465m-3.416-4.475a3 3 0 003.417-4.474M7.222 15.656a3 3 0 11-3.417-4.474m3.417 4.474a3 3 0 003.417 4.474" />
              </svg>
              Social Share
            </Link>
            <Link href="/videos-upload" className="btn btn-sm btn-ghost gap-2 rounded-lg text-xs font-semibold hover:bg-base-300 transition-all duration-200">
              <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Upload
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-secondary badge-outline gap-1 p-3">
              Studio Portal
            </div>
          </div>
        </div>
      </div>

      {/* Portal Hero Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Card 1: Social Share Portal */}
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden hover:shadow-2xl hover:border-primary/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div className="relative h-48 bg-gradient-to-tr from-pink-500/20 via-primary/10 to-transparent flex items-center justify-center p-6 border-b border-base-200">
            <div className="absolute inset-0 bg-linear-to-t from-base-100 to-transparent" />
            <div className="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center shadow-lg border border-primary/20 relative z-10">
              <svg className="w-10 h-10 text-primary animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.928-2.464m0 0a3 3 0 113.417 4.474l-4.929 2.465m-3.416-4.475a3 3 0 003.417-4.474M7.222 15.656a3 3 0 11-3.417-4.474m3.417 4.474a3 3 0 003.417 4.474" />
              </svg>
            </div>
          </div>
          <div className="card-body p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="card-title text-xl font-bold">Social Share Studio</h2>
                <div className="badge badge-primary badge-sm">Popular</div>
              </div>
              <p className="text-sm text-base-content/75 mt-3 leading-relaxed">
                Crop and optimize custom dimensions for Instagram (Square/Portrait), Twitter (Posts/Headers), and Facebook Covers. Uses auto-gravity focus to crop faces and primary subjects smartly.
              </p>
            </div>
            <div className="card-actions justify-end mt-6">
              <Link href="/social-share" className="btn btn-primary w-full sm:w-auto shadow-md">
                Launch Creator
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Video Upload Portal */}
        <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden hover:shadow-2xl hover:border-secondary/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div className="relative h-48 bg-gradient-to-tr from-cyan-500/20 via-secondary/10 to-transparent flex items-center justify-center p-6 border-b border-base-200">
            <div className="absolute inset-0 bg-linear-to-t from-base-100 to-transparent" />
            <div className="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center shadow-lg border border-secondary/20 relative z-10">
              <svg className="w-10 h-10 text-secondary animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="card-body p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="card-title text-xl font-bold">Video Optimizer Studio</h2>
                <div className="badge badge-secondary badge-sm">HD MP4</div>
              </div>
              <p className="text-sm text-base-content/75 mt-3 leading-relaxed">
                Compress, upload, and publish large video formats. Optimizes sizing, resolution bitrates, formats, and generates clean responsive video files instantly with Cloudinary streaming.
              </p>
            </div>
            <div className="card-actions justify-end mt-6">
              <Link href="/videos-upload" className="btn btn-secondary w-full sm:w-auto shadow-md">
                Launch Video Studio
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}