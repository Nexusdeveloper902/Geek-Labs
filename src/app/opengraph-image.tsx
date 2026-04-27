import { ImageResponse } from "next/og";

export const alt = "Geek Labs Studio — Code it. Build it. Break it.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.12), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Terminal icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "rgba(16, 185, 129, 0.15)",
            marginBottom: "24px",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <span style={{ fontSize: "40px", color: "#10b981" }}>⟩_</span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafafa",
            letterSpacing: "-2px",
            marginBottom: "12px",
            display: "flex",
          }}
        >
          Geek Labs Studio
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            background: "linear-gradient(to right, #10b981, #34d399, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Code it. Build it. Break it.
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: "18px",
            color: "#a1a1aa",
            marginTop: "32px",
            display: "flex",
          }}
        >
          by Jerónimo — Game Dev • Embedded Systems • Hardware Hacking
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
