import { ImageResponse } from "next/og";
import { logoBase64 } from "./_logoBase64";

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
          overflow: "hidden",
          border: "2px solid #c9a84c",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          width={64}
          height={64}
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
