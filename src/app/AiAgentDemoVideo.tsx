"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AIAgentDemoVideo = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 100);
    });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const containerStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#000",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile && isLandscape ? "10px" : "20px"
  };

  const buttonStyle = {
    position: "absolute" as const,
    top: isMobile && isLandscape ? 10 : 24,
    right: isMobile && isLandscape ? 10 : 32,
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: isMobile ? "6px 12px" : "8px 16px",
    fontSize: isMobile ? 14 : 18,
    cursor: "pointer",
    zIndex: 1100,
    minHeight: isMobile ? 32 : 36,
    minWidth: isMobile ? 60 : 70
  };

  const iframeStyle = {
    border: "none",
    borderRadius: isMobile && isLandscape ? 8 : 16,
    width: isMobile && isLandscape ? "100%" : "95%",
    height: isMobile && isLandscape ? "100%" : "95%",
    maxWidth: isMobile ? "100%" : 1200,
    maxHeight: isMobile ? "100%" : 700
  };

  return (
    <div style={containerStyle} className="video-container video-fullscreen">
      <button 
        onClick={() => router.back()} 
        style={buttonStyle}
        className="video-close-btn"
      >
        Close
      </button>
      <iframe
        src="https://drive.google.com/file/d/1ULs6_8nAmrCLNRPaweGnpr7Mo0bzrAF8/preview"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={iframeStyle}
        className="video-iframe"
        title="AI Agent Demo Video"
      />
    </div>
  );
};

export default AIAgentDemoVideo;