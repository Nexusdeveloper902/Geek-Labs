import React from 'react';

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function Video({ src, ...props }: VideoProps) {
  return (
    <span className="my-8 block overflow-hidden rounded-xl border border-white/10 glass-card relative w-full bg-[#0d0d0e]">
      <video
        className="w-full h-auto"
        controls
        playsInline
        muted
        autoPlay
        loop
        src={src}
        {...props}
      />
    </span>
  );
}
