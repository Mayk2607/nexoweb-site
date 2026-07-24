import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexoweb — Empresa de Soluciones Digitales en Saltillo, Coahuila";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d1f35",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(18,81,163,0.5) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(18,81,163,0.3)",
            border: "1px solid rgba(148,184,232,0.3)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#94b8e8",
            }}
          />
          <span style={{ color: "#94b8e8", fontSize: "16px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Soluciones Digitales · Saltillo, Coahuila
          </span>
        </div>

        {/* Logo wordmark */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "20px",
          }}
        >
          Nexo<span style={{ color: "#1251a3" }}>web</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#94b8e8",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
            marginBottom: "48px",
          }}
        >
          Diseño web · Sistemas a medida · Marketing digital
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            padding: "24px 48px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(148,184,232,0.2)",
            borderRadius: "16px",
          }}
        >
          {[
            { v: "31", l: "Servicios" },
            { v: "< 24 h", l: "Respuesta" },
            { v: "100%", l: "Tuya la tech" },
          ].map((s) => (
            <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff" }}>{s.v}</span>
              <span style={{ fontSize: "14px", color: "#94b8e8", fontWeight: 500 }}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            fontSize: "18px",
            color: "rgba(148,184,232,0.6)",
            fontWeight: 600,
          }}
        >
          nexoweb.mx
        </div>
      </div>
    ),
    { ...size }
  );
}
