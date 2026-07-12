import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp, Sparkles } from "lucide-react";
import dayjs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";

dayjs.extend(realtiveTime);

interface Videos {
  public_id: string;
  title: string;
  description: string;
  duration: number;
  orignalSize: string | number;
  compressedSize: string | number;
  createdAt: string | Date;
}

interface VideoCardProps {
  video: Videos;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((public_id: string) => {
    return getCldImageUrl({
      src: public_id,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((public_id: string) => {
    return getCldVideoUrl({
      src: public_id,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((public_id: string) => {
    return getCldVideoUrl({
      src: public_id,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((size: number | string | null | undefined) => {
    const num = Number(size);
    if (!size || isNaN(num) || !isFinite(num)) {
      return "0 B";
    }
    return filesize(num);
  }, []);

  const original = Number(video.orignalSize);
  const compressed = Number(video.compressedSize);
  const compressionPercentage =
    original > 0 &&
    compressed >= 0 &&
    isFinite(original) &&
    isFinite(compressed)
      ? Math.round((1 - compressed / original) * 100)
      : 0;

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <div
      className="group card bg-base-100 border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Preview Section */}
      <figure className="aspect-video relative overflow-hidden bg-base-300">
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex items-center justify-center bg-error/10 text-error p-4">
              <p className="text-sm font-medium">Preview not available</p>
            </div>
          ) : (
            <video
              src={getPreviewVideoUrl(video.public_id)}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover scale-105 transition-transform duration-500"
              onError={handlePreviewError}
            />
          )
        ) : (
          <img
            src={getThumbnailUrl(video.public_id)}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Floating Glassmorphic Duration Badge */}
        <div className="absolute bottom-3 right-3 backdrop-blur-md bg-black/60 text-white border border-white/10 px-2.5 py-1 rounded-md text-xs font-medium flex items-center shadow-sm z-10">
          <Clock size={12} className="mr-1.5 opacity-80" />
          {formatDuration(video.duration)}
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body p-5 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="card-title text-base font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {video.title}
            </h2>
          </div>
          <p className="text-xs text-base-content/60 mt-1 line-clamp-2 min-h-8">
            {video.description || "No description provided."}
          </p>
          <p className="text-[11px] font-medium text-base-content/40 mt-2 flex items-center gap-1">
            <span>•</span> Uploaded {dayjs(video.createdAt).fromNow()}
          </p>
        </div>

        {/* Size Metrics Matrix */}
        <div className="grid grid-cols-2 gap-2 bg-base-200/50 p-2.5 rounded-xl border border-base-200/60">
          <div className="flex items-center gap-2 px-1">
            <div className="p-1.5 bg-base-100 rounded-lg shadow-sm text-base-content/70">
              <FileUp size={14} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-base-content/50 font-bold">Original</div>
              <div className="text-xs font-semibold text-base-content/80">{formatSize(Number(video.orignalSize))}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-1 border-l border-base-300">
            <div className="p-1.5 bg-success/10 rounded-lg text-success">
              <FileDown size={14} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-success/70 font-bold">Compressed</div>
              <div className="text-xs font-bold text-success">{formatSize(Number(video.compressedSize))}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions & Stats */}
        <div className="flex justify-between items-center pt-2 border-t border-base-200">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-base-content/70">Saved</span>
            <span className="badge badge-success badge-sm font-bold gap-1 rounded-md py-2.5 text-white">
              <Sparkles size={10} />
              {compressionPercentage}%
            </span>
          </div>

          <button
            className="btn btn-primary btn-sm btn-square rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all"
            onClick={() =>
              onDownload(getFullVideoUrl(video.public_id), video.title)
            }
            aria-label="Download Video"
          >
            <Download size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;