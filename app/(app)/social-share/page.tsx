"use client";

import React, { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const socialFormats = {
  "Instagram Square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
    label: "Instagram Square",
    icon: "instagram",
  },
  "Instagram Portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5",
    label: "Instagram Portrait",
    icon: "instagram",
  },
  "Twitter Post (16:9)": {
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
    label: "Twitter Post",
    icon: "twitter",
  },
  "Twitter Header (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1",
    label: "Twitter Header",
    icon: "twitter",
  },
  "Facebook Cover (205:78)": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
    label: "Facebook Cover",
    icon: "facebook",
  },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);



  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload the image");

      const data = await response.json();
      // FIX: The api returns public_id, not publicid
      if (data.public_id) {
        setUploadedImage(data.public_id);
        setIsTransforming(true);
      } else {
        throw new Error("No public ID returned");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
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

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // FIX: Removed duplicate removeChild call
        window.URL.revokeObjectURL(url);
      });
  };

  // SVGs for platform branding
  const renderPlatformIcon = (iconType: string) => {
    switch (iconType) {
      case "instagram":
        return (
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header section with brand feel */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center lg:text-left">
            Social Share Studio
          </h1>
          <p className="text-sm text-base-content/60 mt-1 text-center lg:text-left">
            Transform and crop your images instantly for all major social media aspect ratios.
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
            <Link href="/social-share" className="btn btn-sm btn-primary gap-2 rounded-lg text-xs font-semibold shadow-md transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <div className="badge badge-primary badge-outline gap-1 p-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Cloudinary Powered
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Controls Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: Upload File */}
          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
            <div className="card-body p-6">
              <h2 className="card-title text-lg font-bold flex items-center gap-2 text-base-content mb-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Source Image
              </h2>

              {!uploadedImage ? (
                // Drag and Drop Upload Zone
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? "border-primary bg-primary/5 scale-[0.99]"
                      : "border-base-300 hover:border-primary/50 hover:bg-base-200/50"
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {isUploading ? (
                      <span className="loading loading-spinner loading-md text-primary"></span>
                    ) : (
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm font-semibold">
                    {isUploading ? "Uploading file..." : "Drag & drop your image here"}
                  </p>
                  <p className="text-xs text-base-content/50 mt-1">
                    Supports PNG, JPG, JPEG, WEBP up to 10MB
                  </p>
                  <button className="btn btn-sm btn-primary btn-outline mt-4 pointer-events-none">
                    Browse Files
                  </button>
                </div>
              ) : (
                // Uploaded Image info/change action
                <div className="flex items-center justify-between p-4 bg-base-200/60 border border-base-300 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-slate-800">
                        <CldImage
                          width={48}
                          height={48}
                          src={uploadedImage}
                          alt="thumbnail"
                          crop="fill"
                          priority
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold max-w-45 truncate text-base-content">
                        image_source.png
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        <span className="text-[10px] text-base-content/60">Uploaded successfully</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="btn btn-circle btn-xs btn-ghost text-error hover:bg-error/10"
                      title="Clear image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <label htmlFor="file-replace" className="btn btn-xs btn-outline btn-neutral cursor-pointer">
                      Replace
                      <input
                        type="file"
                        id="file-replace"
                        onChange={handleInputChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Formats Grid Selector */}
          {uploadedImage && (
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body p-6">
                <h2 className="card-title text-lg font-bold flex items-center gap-2 text-base-content mb-4">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
                  </svg>
                  Format Presets
                </h2>

                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(socialFormats).map(([formatName, details]) => {
                    const isSelected = selectedFormat === formatName;
                    
                    // Simple logic to draw aspect ratio box preview helper
                    const aspectParts = details.aspectRatio.split(":");
                    const widthRatio = parseFloat(aspectParts[0]);
                    const heightRatio = parseFloat(aspectParts[1]);
                    
                    // Max width/height bounds for visual indicator
                    const maxBoxSize = 32;
                    let boxWidth = maxBoxSize;
                    let boxHeight = maxBoxSize;
                    if (widthRatio > heightRatio) {
                      boxHeight = Math.round(maxBoxSize * (heightRatio / widthRatio));
                    } else {
                      boxWidth = Math.round(maxBoxSize * (widthRatio / heightRatio));
                    }

                    return (
                      <button
                        key={formatName}
                        onClick={() => {
                          setSelectedFormat(formatName as SocialFormat);
                          setIsTransforming(true);
                        }}
                        className={`flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary shadow-md"
                            : "border-base-200 bg-base-100 hover:bg-base-200/50 hover:border-base-300"
                        }`}
                      >
                        {/* Miniature layout indicator box */}
                        <div className="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center shrink-0">
                          <div
                            style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}
                            className={`border-2 rounded transition-all duration-200 ${
                              isSelected ? "border-primary bg-primary/20" : "border-base-content/40 bg-base-content/5"
                            }`}
                          />
                        </div>

                        {/* Format Text Details */}
                        <div className="grow">
                          <div className="flex items-center gap-1.5">
                            {renderPlatformIcon(details.icon)}
                            <span className="font-semibold text-sm text-base-content">{details.label}</span>
                          </div>
                          <p className="text-xs text-base-content/60 mt-0.5">
                            Ratio {details.aspectRatio} • {details.width} × {details.height} px
                          </p>
                        </div>

                        {/* Radio element mimicking select state */}
                        <input
                          type="radio"
                          name="format-selection"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedFormat(formatName as SocialFormat);
                            setIsTransforming(true);
                          }}
                          className="radio radio-primary radio-xs pointer-events-none"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    className="btn btn-primary w-full shadow-lg hover:shadow-primary/20 hover:scale-[1.01] transition-all"
                    onClick={handleDownload}
                    disabled={isTransforming}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Presets
                  </button>
                  <p className="text-[11px] text-center text-base-content/50">
                    High quality .PNG with auto fill-crop and smart gravity alignment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Editor Canvas (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden h-full flex flex-col">
            {/* Editor Canvas Toolbar */}
            <div className="bg-base-200/50 border-b border-base-300 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-warning"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
                <span className="text-xs font-semibold text-base-content/60 ml-2">Studio Preview</span>
              </div>
              
              {uploadedImage && (
                <div className="flex items-center gap-3">
                  <div className="badge badge-md bg-neutral text-neutral-content border-0 font-mono text-[11px]">
                    {socialFormats[selectedFormat].width}×{socialFormats[selectedFormat].height} px
                  </div>
                  <div className="badge badge-md badge-secondary font-mono text-[11px]">
                    Aspect Ratio {socialFormats[selectedFormat].aspectRatio}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Workspace Canvas */}
            <div className="relative grow flex items-center justify-center p-8 bg-neutral-900 border-base-300 min-h-125 md:min-h-100">
              {/* Checkered Canvas Grid Background */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "20px 20px"
                }}
              />

              {!uploadedImage ? (
                // Empty State Frame
                <div className="relative text-center p-8 max-w-md flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-neutral-400 mb-6 shadow-2xl">
                    <svg className="w-10 h-10 animate-pulse text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-100">No Image Selected</h3>
                  <p className="text-sm text-neutral-400 mt-2">
                    Upload an image source using the controls panel to trigger the smart crop studio preview.
                  </p>
                </div>
              ) : (
                // Actual Smart Transformation Crop Render Mockup
                <div className="relative flex flex-col items-center justify-center w-full h-full max-w-112.5 transition-all duration-300">
                  {/* Backdrop glowing effect */}
                  <div className="absolute inset-0 bg-primary/10 filter blur-3xl rounded-full scale-75 -z-10 pointer-events-none" />

                  <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-neutral-800 transition-all duration-300 max-h-95 flex items-center justify-center aspect-square w-full">
                    {/* Cloudinary Transformed Image component */}
                    <CldImage
                      width={socialFormats[selectedFormat].width}
                      height={socialFormats[selectedFormat].height}
                      src={uploadedImage}
                      sizes="(max-width: 768px) 100vw, 450px"
                      alt="Transformed Social Media Post"
                      crop="fill"
                      aspectRatio={socialFormats[selectedFormat].aspectRatio}
                      gravity="auto"
                      ref={imageRef}
                      onLoad={() => setIsTransforming(false)}
                      className="object-contain max-w-full max-h-full transition-transform duration-500 ease-out"
                    />

                    {/* Editor Processing Overlay Cover */}
                    {isTransforming && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-10 transition-opacity duration-300">
                        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                        <p className="text-xs text-neutral-300 font-medium tracking-wide">
                          Processing smart cropping aspect ratio...
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          Analyzing facial focus & main composition
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Caption underneath the frame */}
                  <p className="text-neutral-400 text-xs mt-4 flex items-center gap-1.5 font-medium">
                    <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Ready for export • Safe margins configured
                  </p>
                </div>
              )}
            </div>
            
            {/* Editor Canvas Footer */}
            <div className="bg-base-200/30 border-t border-base-300 px-5 py-3 text-center">
              <span className="text-[11px] text-base-content/50">
                Powered by Cloudinary Auto-Gravity Cropping. Presets match recommended standards for 2026.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
