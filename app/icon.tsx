import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#0d1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #c9a84c",
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#c9a84c",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          T
        </span>
      </div>
    ),
    { ...size }
  );
}
