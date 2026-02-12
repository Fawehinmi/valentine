"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ValentinePage() {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noIndex, setNoIndex] = useState(0);
  const [stage, setStage] = useState<
    "question" | "ready1" | "ready2" | "ready3" | "gifts" | "reveal" | "already"
  >("question");
  const [selectedGift, setSelectedGift] = useState<string | null>(null);

  const noMessages = [
    "No 😢",
    "No Again 😢",
    "Please, Precious... 💕",
    "Come on… 😭",

    "I really need a Yes! 💖",
    "Are you sure about this? 😢",
    "Think about us! 💘",
  ];

  // Check if gift already picked
  useEffect(() => {
    const picked = localStorage.getItem("giftPicked");
    if (picked) {
      // setStage("already");
    }
  }, []);

  const handleNoClick = () => {
    setYesScale((p) => p + 0.2);
    setNoScale((p) => Math.max(p - 0.15, 0.3));
    setNoIndex((prev) => (prev + 1) % noMessages.length);
  };

  const handleYesClick = () => {
    setStage("ready1");
    setTimeout(() => setStage("ready2"), 6000);
    setTimeout(() => setStage("ready3"), 9600);
    setTimeout(() => setStage("gifts"), 12500);
  };

  const handleGiftClick = (gift: string) => {
    setSelectedGift(gift);
    setStage("reveal");
    localStorage.setItem("giftPicked", gift); // save status
  };

  const fireworkColors = [
    "#e11d48",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center md:hidden px-6">
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="love"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              fontSize: "22px",
            }}
          >
            💕
          </span>
        ))}
      </div>

      {/* Already picked */}
      {stage === "already" && (
        <div className="text-center z-10">
          <h2 className="text-3xl font-bold text-rose-600 mb-6">
            You’ve already picked your gift 💖
          </h2>
          <p className="text-gray-600 mt-6 text-xl">
            Thanks for your response 😘
          </p>
        </div>
      )}

      {/* Question */}
      {stage === "question" && (
        <div className="text-center z-10">
          <h1 className="text-2xl font-bold text-rose-600">
            Precious, will you be my Valentine? 💘
          </h1>
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={handleYesClick}
              style={{ transform: `scale(${yesScale})` }}
              className="transition-transform duration-300 bg-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            >
              Yes 💖
            </button>
            <button
              onClick={handleNoClick}
              style={{ transform: `scale(${noScale})` }}
              className="transition-transform duration-300 bg-gray-100 text-rose-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            >
              {noMessages[noIndex]}
            </button>
          </div>
        </div>
      )}

      {/* READY layers */}
      {stage === "ready1" && (
        <div className="text-center z-10 animate-reveal">
          <video
            width="600"
            autoPlay
            loop
            muted
            className="rounded-xl shadow-lg"
          >
            <source src="fireworks.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>{" "}
          <div className="fireworks-container">
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 6 + 4;
              const left = Math.random() * 100;
              const delay = Math.random() * 1.5;
              const color =
                fireworkColors[
                  Math.floor(Math.random() * fireworkColors.length)
                ];
              return (
                <span
                  key={i}
                  className="firework"
                  style={{
                    width: size,
                    height: size,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    backgroundColor: color,
                  }}
                />
              );
            })}
          </div>
          <h2 className="text-2xl font-bold text-rose-600 mt-10">
            She said YES 💖🎆
          </h2>
        </div>
      )}
      {stage === "ready2" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-bold text-rose-600 mb-4">Okayyy… 😌</h2>
          <p className="text-xl text-gray-600">
            This is where it gets interesting 👀✨
          </p>
        </div>
      )}
      {stage === "ready3" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-bold text-rose-600 mb-4">
            One last thing…
          </h2>
          <p className="text-xl text-gray-600">
            Once you choose, there’s no going back 😏💘
          </p>
        </div>
      )}

      {/* GIFTS */}
      {stage === "gifts" && (
        <div className="text-center z-10">
          <h2 className="text-2xl font-bold text-rose-600 mb-3">
            Pick a gift 🎁
          </h2>
          <p className="text-gray-600 mb-8 text-xl">
            Screenshot the response and send it to me 💕
          </p>
          <div className="flex gap-6 justify-center">
            {["F", "C", "T"].map((gift) => (
              <button
                key={gift}
                onClick={() => handleGiftClick(gift)}
                className="gift-box"
              >
                <span className="gift-letter">{gift}</span>🎁
              </button>
            ))}
          </div>
        </div>
      )}

      {/* REVEAL */}
      {stage === "reveal" && selectedGift && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-bold text-rose-600 mb-6">
            You picked {selectedGift} 💖
          </h2>

          <div className="big-reveal-box">🎁</div>

          <p className="text-gray-600 mt-6 text-xl">
            Screenshot this and send it to me 😘
          </p>
        </div>
      )}

      {/* DESKTOP BLOCK */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-black text-white text-center px-6">
        <p className="text-xl">📱 Please open this on your phone</p>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .big-reveal-box {
          width: 260px;
          height: 260px;
          margin: 0 auto;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 140px; /* makes 🎁 big */
          position: relative;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.15),
            inset 0 2px 6px rgba(255, 255, 255, 0.6);
          animation: floatGift 2.5s ease-in-out infinite;
        }

        .love {
          position: absolute;
          bottom: -40px;
          animation: floatUp 14s linear infinite;
          opacity: 0.4;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }

        .fireworks-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .firework {
          position: absolute;
          top: 50%;
          border-radius: 50%;
          animation: explode 1.5s ease-out infinite;
        }
        @keyframes explode {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50px + 100px * var(--rand)),
                calc(-50px + 100px * var(--rand))
              )
              scale(2);
            opacity: 0;
          }
        }

        .gift-box {
          font-size: 46px;
          padding: 20px;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          animation: bounce 1.8s infinite;
          position: relative;
        }
        .gift-letter {
          position: absolute;
          top: -14px;
          right: -14px;
          background: #e11d48;
          color: white;
          font-weight: bold;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-reveal {
          animation: reveal 0.6s ease-out;
        }
        @keyframes reveal {
          from {
            transform: scale(0.7);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
