"use client";

import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
import {GiCardJoker} from "react-icons/gi";
// import { FaAppleAlt, FaLemon, FaHeart, FaStar } from "react-icons/fa";
import {FaAppleAlt,FaLemon,FaHeart,FaStar,FaBolt,FaGem,FaLeaf,FaSun} from "react-icons/fa";
import confetti from "canvas-confetti";

// const ICONS = [
//   { icon: FaAppleAlt, color: "#ef4444" },
//   { icon: FaLemon, color: "#eab308" },
//   { icon: FaHeart, color: "#ec4899" },
//   { icon: FaStar, color: "#f97316" },
// ];
const ICONS = [
  { icon: FaAppleAlt, color: "#ef4444" }, 
  { icon: FaLemon, color: "#facc15" }, 
  { icon: FaHeart, color: "#ec4899" }, 
  { icon: FaStar, color: "#fb923c" }, 
  { icon: FaBolt, color: "#3b82f6" }, 
  { icon: FaGem, color: "#a855f7" }, 
  { icon: FaLeaf, color: "#22c55e" }, 
  { icon: FaSun, color: "#f97316" }, 
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (pairs) => { /*ambil icon sesuai jumlah pairs, lalu buat 2 kartu untuk tiap icon dengan id unik, lalu acak */
  const selected = ICONS.slice(0, pairs);
  const paired = selected.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [difficulty, setDifficulty] = useState(4);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

// adding
  const changeDifficulty = (level) => { 
    setDifficulty(level); //simpan level
    setCards(createCards(level)); //buat kartu
    if (!isPlaying) setIsPlaying(true); //set mulai
    //reset semua state
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
  };
  //jalankan sekali saat awal
  useEffect(() => {
    setMounted(true);
    changeDifficulty(4);
  }, []);

// jalankan timer saat isPlaying true, bersihkan saat false
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1); //tambah 1 setiap detik
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      //ambil data kartu yang dibalik(2)
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);
      // moves bertambah
      setMoves((prev) => prev + 1);
      //bandingkan kondisi setelahnya
      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        //tutup lagi setelah delay 0.8 detik
        setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (!isPlaying) setIsPlaying(true);
    if (
      //validasi-validasi
      flippedCards.length < 2 &&
      !flippedCards.includes(id) &&
      !matchedCards.includes(id)
    ) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

 //deteksi selesai
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      //stop
      setIsPlaying(false);
      //tampilkan confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [matchedCards, cards]);

// const resetGame = () => {
//   setCards(createCards());
//   setFlippedCards([]);
//   setMatchedCards([]);
//   setMoves(0);
// };

  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1
        className="
        text-5xl
        font-extrabold
        mb-6
        bg-gradient-to-r
        from-white
        via-blue-200 
        to-cyan-400
        bg-clip-text
        text-transparent
        animate-title
        flex
        items-center
        gap-3
        drop-shadow-lg
        " //awalnya indigo via purple to-pink
      >
        <GiCardJoker className="text-yellow-400 text-5xl" />
        Memory Card
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => changeDifficulty(4)} //klik,ganti level
          className={`px-4 py-2 rounded-full font-bold transition transform ${
            difficulty === 4 //perubahan tombol/aktif or no
              ? "bg-green-400 text-black scale-110 shadow-xl"
              : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
          }`}
        >
          🟢 Easy (4)
        </button>

        <button
          onClick={() => changeDifficulty(6)}
          className={`px-4 py-2 rounded-full font-bold transition transform ${
            difficulty === 6
              ? "bg-yellow-400 text-black scale-110 shadow-xl"
              : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
          }`}
        >
          🟡 Medium (6)
        </button>

        <button
          onClick={() => changeDifficulty(8)}
          className={`px-4 py-2 rounded-full font-bold transition transform ${
            difficulty === 8
              ? "bg-red-400 text-black scale-110 shadow-xl"
              : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
          }`}
        >
          🔴 Hard (8)
        </button>
      </div>

      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={difficulty}
        time={time}
        onReset={resetGame}
      />

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}
//sb-gb gadirubah samsek