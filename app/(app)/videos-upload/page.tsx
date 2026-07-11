"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);

  const router = useRouter();
  
  // Max file size of 70 MB
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleFileUpload = async (selectedFile: File) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setNotification({ message: "File size too large. Maximum size allowed is 70MB.", type: "error" });
      return;
    }

    setFile(selectedFile);
    setNotification(null);
    if (!title) {
      // Auto-populate title with file name without extension
      setTitle(selectedFile.name.split(".")[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFileUpload(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setNotification({ message: "File size too large. Maximum size allowed is 70MB.", type: "error" });
      return;
    }

    setIsUploading(true);
    setNotification(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.error(error);
      setNotification({ message: "Failed to upload video. Please try again.", type: "error" });
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

      {notification && (
        <div className={`alert ${notification.type === "error" ? "alert-error" : "alert-success"} mb-6 shadow-md`}>
          <svg className="w-6 h-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wide">
              {notification.type === "error" ? "Upload Notice" : "Success"}
            </h3>
            <div className="text-xs">{notification.message}</div>
          </div>
          <div className="flex-none">
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="btn btn-sm btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Form: Video Data (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="card bg-base-100 border border-base-200 shadow-xl">
            <form onSubmit={handleSubmit} className="card-body p-6">
              <h2 className="card-title text-lg font-bold flex items-center gap-2 text-base-content mb-4">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Video Upload Details
              </h2>
              
              <div className="form-control gap-4">
                <div>
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">
                    Title <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter video title"
                    className="input input-bordered w-full focus:input-secondary transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">Description</label>
                  <textarea
                    placeholder="Enter video description"
                    className="textarea textarea-bordered w-full h-24 focus:textarea-secondary transition-all"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="label text-xs font-semibold uppercase tracking-wider text-base-content/60 p-1">
                    Video File <span className="text-error">*</span>
                  </label>
                  
                  {!file ? (
                    // Drag and Drop Zone
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        dragActive
                          ? "border-secondary bg-secondary/5 scale-[0.99]"
                          : "border-base-300 hover:border-secondary/50 hover:bg-base-200/50"
                      }`}
                    >
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleInputChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold">Drag & drop your video here</p>
                      <p className="text-xs text-base-content/50 mt-1">Supports standard video formats up to 70MB</p>
                    </div>
                  ) : (
                    // Selected File Indicator
                    <div className="flex items-center justify-between p-4 bg-base-200/60 border border-base-300 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold max-w-45 truncate text-base-content">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-base-content/50 mt-0.5">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="btn btn-circle btn-xs btn-ghost text-error hover:bg-error/10"
                        title="Clear file"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="btn btn-secondary w-full shadow-lg hover:shadow-secondary/20 hover:scale-[1.01] transition-all"
                  disabled={isUploading || !file}
                >
                  {isUploading ? (
                    <>
                      <span className="loading loading-spinner loading-xs mr-2"></span>
                      Uploading and Optimizing Video...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Optimize and Publish Video
                    </>
                  )}
                </button>
              </div>
            </form>
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
                <span className="text-xs font-semibold text-base-content/60 ml-2">Video Studio Workspace</span>
              </div>
            </div>

            <div className="relative flex-1 flex items-center justify-center p-8 bg-neutral-900 min-h-87.5">
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "20px 20px"
                }}
              />

              <div className="relative text-center p-8 max-w-md flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-neutral-400 mb-6 shadow-2xl">
                  {isUploading ? (
                    <span className="loading loading-spinner loading-lg text-secondary"></span>
                  ) : (
                    <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-bold text-neutral-100">
                  {isUploading ? "Uploading in Progress" : "Ready for Optimization"}
                </h3>
                <p className="text-sm text-neutral-400 mt-2">
                  {isUploading
                    ? "Please wait while we upload and compress your raw video file to Cloudinary storage..."
                    : "Configure details and choose a video file on the left. We will auto-compress it for fast streaming."}
                </p>
              </div>
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