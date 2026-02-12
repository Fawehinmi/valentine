"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ValentinePage() {
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noIndex, setNoIndex] = useState(0);

  const [stage, setStage] = useState<
    | "intro1"
    | "intro2"
    | "intro3"
    | "intro4"
    | "question"
    | "ready1"
    | "ready2"
    | "ready3"
    | "gifts"
    | "reveal"
    | "already"
  >("intro1");

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

  // 🎬 STORY TRANSITIONS
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (stage === "intro1") {
      timer = setTimeout(() => setStage("intro2"), 3500);
    }
    if (stage === "intro2") {
      timer = setTimeout(() => setStage("intro3"), 4000);
    }
    if (stage === "intro3") {
      timer = setTimeout(() => setStage("intro4"), 4000);
    }
    if (stage === "intro4") {
      timer = setTimeout(() => setStage("question"), 4000);
    }

    return () => clearTimeout(timer);
  }, [stage]);

  const handleNoClick = () => {
    setYesScale((p) => p + 0.2);
    setNoScale((p) => Math.max(p - 0.15, 0.3));
    setNoIndex((prev) => (prev + 1) % noMessages.length);
  };

  const handleYesClick = () => {
    setStage("ready1");
    setTimeout(() => setStage("ready2"), 5000);
    setTimeout(() => setStage("ready3"), 8500);
    setTimeout(() => setStage("gifts"), 11500);
  };

  const handleGiftClick = (gift: string) => {
    setSelectedGift(gift);
    setStage("reveal");
    localStorage.setItem("giftPicked", gift);
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

      {/* ================= STORY INTRO ================= */}

      {stage === "intro1" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-semibold text-rose-600">
            I wasn’t planning to do this…
          </h2>
        </div>
      )}

      {stage === "intro2" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-semibold text-rose-600">
            But then I met you, Precious.
          </h2>
        </div>
      )}

      {stage === "intro3" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-semibold text-rose-600">
            And somehow… things just felt different.
          </h2>
        </div>
      )}

      {stage === "intro4" && (
        <div className="text-center z-10 animate-reveal">
          <h2 className="text-2xl font-semibold text-rose-600">
            So before I overthink it…
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            I need to ask you something.
          </p>
        </div>
      )}

      {/* ================= QUESTION ================= */}

      {stage === "question" && (
        <div className="text-center z-10 animate-reveal">
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

      {/* ================= YES FLOW ================= */}

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

      {/* ================= GIFTS ================= */}

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

          <p className="text-gray-600 mt-1 text-xl">
            Screenshot this and send it to me 😘
          </p>
        </div>
      )}

      {/* Desktop Block */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-black text-white text-center px-6">
        <p className="text-xl">📱 Please open this on your phone</p>
      </div>

      {/* STYLES */}
      <style jsx>{`
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

        .big-reveal-box {
          width: 260px;
          height: 260px;
          margin: 0 auto;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 140px;
          animation: floatGift 2.5s ease-in-out infinite;
        }

        @keyframes floatGift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-reveal {
          animation: reveal 0.6s ease-out;
        }

        @keyframes reveal {
          from {
            transform: scale(0.8);
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
