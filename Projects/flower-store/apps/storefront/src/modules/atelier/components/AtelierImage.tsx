"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AtelierImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export const AtelierImage: React.FC<AtelierImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className = "",
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    const label = (alt || "Atelier")
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    return (
      <div
        className={[
          "flex items-center justify-center bg-gradient-to-br from-sage/25 via-cream to-blush/30",
          fill ? "absolute inset-0 h-full w-full" : "",
          className,
        ].join(" ")}
        role="img"
        aria-label={alt}
      >
        <span className="font-editorial text-4xl text-deep-sage/50">
          {label || "A"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};