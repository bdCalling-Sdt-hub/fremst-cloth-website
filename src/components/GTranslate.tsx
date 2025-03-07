"use client"; // Ensure this is a client component

import { useEffect } from "react";
import Script from "next/script";

// Extend the Window interface to include gtranslateSettings
declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      languages: string[];
      wrapper_selector: string;
    };
  }
}

export default function GTranslate() {
  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["en", "sv"],
      wrapper_selector: ".gtranslate_wrapper",
    };
  }, []);

  return (
    <>
      <div className="gtranslate_wrapper"></div>
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/float.js"
        strategy="lazyOnload"
      />
    </>
  );
}
