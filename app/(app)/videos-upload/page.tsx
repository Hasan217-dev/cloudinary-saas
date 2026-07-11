"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function VideoUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name.split(".")[0]);
    formData.append("description", description || "Uploaded video");
    formData.append("originalSize", String(file.size));

    try {
      const response = await fetch("/api/video-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload the video");

      const data = await response.json();
      setUploadedVideo(data);
      alert("Video uploaded and optimized successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section with brand feel */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center lg:text-left">
            Video Optimizer Studio
          </h1>
          <p className="text-sm text-base-content/60 mt-1 text-center lg:text-left">
            Compress and stream large video files optimized instantly for standard web formats.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Navigation Tab Group */}
          <div className="flex bg-base-200 p-1.5 rounded-xl border border-base-300 gap-1 shadow-inner">
            <Link href="/home" className="btn btn-sm btn-ghost gap-2 rounded-lg text-xs font-semibold hover:bg-base-300 transition-all duration-200">
              <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <Link href="/videos-upload" className="btn btn-sm btn-primary gap-2 rounded-lg text-xs font-semibold shadow-md transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video Upload
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-secondary badge-outline gap-1 p-3">
              MP4 Streamer
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Form: Video Data (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-200 shadow-xl">
            <div className="card-body p-6">
              <h2 className="card-title text-lg font-bold flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Upload Video Details
              </h2>
              
              <div className="form-control gap-3">
                <div>
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">Title</label>
                  <input
                    type="text"
                    placeholder="Enter video title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">Description</label>
                  <textarea
                    placeholder="Enter video description"
                    className="textarea textarea-bordered w-full h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">Choose Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered file-input-secondary w-full"
                    disabled={isUploading}
                  />
                </div>
              </div>

              {isUploading && (
                <div className="mt-6 flex flex-col gap-2">
                  <progress className="progress progress-secondary w-full"></progress>
                  <span className="text-xs text-center text-secondary font-medium animate-pulse">Uploading and optimizing stream...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Output: Video Player Frame (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden h-full flex flex-col justify-between">
            <div className="bg-base-200/50 border-b border-base-300 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-warning"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
                <span className="text-xs font-semibold text-base-content/60 ml-2">Video Player Studio</span>
              </div>
            </div>

            <div className="relative flex-grow flex items-center justify-center p-8 bg-neutral-900 min-h-[300px]">
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "20px 20px"
                }}
              />

              {!uploadedVideo ? (
                <div className="relative text-center p-8 max-w-md flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-neutral-400 mb-6 shadow-2xl">
                    <svg className="w-10 h-10 text-secondary animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-100">No Video Uploaded</h3>
                  <p className="text-sm text-neutral-400 mt-2">
                    Enter details and select a video file on the left to start the optimization process.
                  </p>
                </div>
              ) : (
                <div className="relative w-full max-w-[500px] flex flex-col items-center gap-4">
                  <div className="absolute inset-0 bg-secondary/10 filter blur-3xl rounded-full scale-75 -z-10" />
                  
                  <div className="w-full bg-black border-4 border-neutral-800 rounded-xl overflow-hidden shadow-2xl aspect-video relative flex items-center justify-center">
                    <video
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${uploadedVideo.public_id}.mp4`}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="w-full bg-neutral-800/80 border border-neutral-700/50 p-4 rounded-xl flex flex-col gap-2 text-neutral-200">
                    <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
                      <span className="text-sm font-bold text-neutral-100">{uploadedVideo.title}</span>
                      <span className="badge badge-success badge-sm">Optimized</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-400">
                      <div>Original: {(parseInt(uploadedVideo.orignalSize) / (1024 * 1024)).toFixed(2)} MB</div>
                      <div>Compressed: {(parseInt(uploadedVideo.compressedSize) / (1024 * 1024)).toFixed(2)} MB</div>
                      <div>Saved: {(100 - (parseInt(uploadedVideo.compressedSize) / parseInt(uploadedVideo.orignalSize)) * 100).toFixed(0)}%</div>
                      <div>Duration: {uploadedVideo.duration.toFixed(1)}s</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-base-200/30 border-t border-base-300 px-5 py-3 text-center text-[11px] text-base-content/50">
              Videos are compressed automatically using auto-bitrate optimization streaming parameters.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}