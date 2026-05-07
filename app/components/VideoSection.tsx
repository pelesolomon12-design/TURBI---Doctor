"use client";

import { useState } from "react";

// Replace VIDEO_URL with your actual YouTube/Vimeo URL when ready
const VIDEO_URL = ""; // e.g. "https://www.youtube.com/embed/YOUR_VIDEO_ID"

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold tracking-widest text-amber-600 mb-3 fade-in">הסיפור שלנו</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in">
          ראו איך הערכה משנה חיים
        </h2>
        <div className="gold-divider max-w-24 mx-auto mb-12 fade-in" />

        <div className="fade-in relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video max-w-3xl mx-auto">
          {VIDEO_URL && playing ? (
            <iframe
              src={`${VIDEO_URL}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            /* Placeholder — swap for real thumbnail when ready */
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-500 bg-opacity-20 border-2 border-amber-400 flex items-center justify-center mb-4 animate-pulse-glow cursor-pointer hover:scale-110 transition-transform"
                onClick={() => VIDEO_URL ? setPlaying(true) : null}
              >
                <svg className="w-8 h-8 text-amber-400 mr-[-4px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">הסרטון יתעדכן בקרוב</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
