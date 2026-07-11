"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Videos } from "@/types";
import Link from "next/link";

export default function Home() {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback((url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section with brand feel */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center lg:text-left">
            Cloudinary Creative Hub
          </h1>
          <p className="text-sm text-base-content/60 mt-1 text-center lg:text-left">
            Browse, stream, and download your optimized video library.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Navigation Tab Group */}
          <div className="flex bg-base-200 p-1.5 rounded-xl border border-base-300 gap-1 shadow-inner">
            <Link
              href="/home"
              className="btn btn-sm btn-primary gap-2 rounded-lg text-xs font-semibold shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11V11a1 1 0 00-1-1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              href="/social-share"
              className="btn btn-sm btn-ghost gap-2 rounded-lg text-xs font-semibold hover:bg-base-300 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.928-2.464m0 0a3 3 0 113.417 4.474l-4.929 2.465m-3.416-4.475a3 3 0 003.417-4.474M7.222 15.656a3 3 0 11-3.417-4.474m3.417 4.474a3 3 0 003.417 4.474" />
              </svg>
              Social Share
            </Link>
            <Link
              href="/videos-upload"
              className="btn btn-sm btn-ghost gap-2 rounded-lg text-xs font-semibold hover:bg-base-300 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Upload
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-primary badge-outline gap-1 p-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Cloudinary Powered
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-100 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center shadow-xl">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
          <p className="text-sm text-base-content/60 font-medium animate-pulse">
            Loading your video library...
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="alert alert-error shadow-md">
          <svg className="w-6 h-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wide">Error</h3>
            <div className="text-xs">{error}</div>
          </div>
          <button onClick={fetchVideos} className="btn btn-sm btn-ghost">
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-100 gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-base-content/30" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-base-content">No Videos Yet</h2>
            <p className="text-sm text-base-content/60 mt-1 max-w-sm">
              Your video library is empty. Upload your first video to get started.
            </p>
          </div>
          <Link href="/videos-upload" className="btn btn-primary shadow-md gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload First Video
          </Link>
        </div>
      )}

      {/* Video Grid */}
      {!loading && !error && videos.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-base-content">Your Library</h2>
              <div className="badge badge-neutral badge-outline font-mono text-xs">
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </div>
            </div>
            <Link href="/videos-upload" className="btn btn-sm btn-outline btn-primary gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Upload New
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onDownload={handleDownload} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}