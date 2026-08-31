"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type OptimizedVideoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const FALLBACK_IMAGES: Record<string, string> = {
  "/static/Hero-Animation-4.webm": "/static/Hero-Animation-4.gif",
};

export default function OptimizedVideo({
  src,
  alt,
  className = "",
  priority = false,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback, setShowFallback] = useState(false);
  const fallbackImage = FALLBACK_IMAGES[src];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (fallbackImage && !video.canPlayType('video/webm; codecs="vp9"')) {
      setShowFallback(true);
      return;
    }

    setShowFallback(false);

    const ensureSource = () => {
      if (video.getAttribute("src")) return;
      video.src = video.dataset.mediaSrc || src;
      video.load();
    };

    if (priority) ensureSource();

    const resourceObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureSource();
          return;
        }
        video.pause();
        video.removeAttribute("src");
        video.load();
      },
      { rootMargin: "500px 0px" },
    );

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureSource();
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );

    resourceObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      resourceObserver.disconnect();
      playbackObserver.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [fallbackImage, priority, showFallback, src]);

  if (showFallback && fallbackImage) {
    return (
      <Image
        src={fallbackImage}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        unoptimized
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={priority ? src : undefined}
      data-media-src={src}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      autoPlay={priority}
      className={className}
      disablePictureInPicture
      loop
      muted
      onError={() => {
        if (fallbackImage) setShowFallback(true);
      }}
      playsInline
      preload={priority ? "auto" : "none"}
    />
  );
}
