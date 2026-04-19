import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gautam Joshi — Senior AI Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#ffbe0b",
              boxShadow: "0 0 24px #ffbe0b",
            }}
          />
          <div
            style={{
              color: "#e6e6e6",
              fontSize: "20px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              letterSpacing: "0.1em",
              display: "flex",
            }}
          >
            <span>Gautam</span>
            <span style={{ color: "#ffbe0b", fontWeight: 700 }}>Joshi</span>
            <span style={{ color: "#7a7a82" }}>&nbsp;/ console</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "#e6e6e6",
              fontSize: "128px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Gautam
          </div>
          <div
            style={{
              color: "#ffbe0b",
              fontSize: "128px",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Joshi.
          </div>

          <div
            style={{
              width: "120px",
              height: "6px",
              background: "#ffbe0b",
              marginTop: "28px",
            }}
          />

          <div
            style={{
              color: "#9a9aa2",
              fontSize: "28px",
              fontWeight: 400,
              marginTop: "28px",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            Senior AI Full-Stack Engineer — LLMs, RAG pipelines, voice agents.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
