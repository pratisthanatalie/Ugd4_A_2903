import React from "react";
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from "react-icons/fa";

// function ScoreBoard({ moves, matchedCount, totalPairs, onReset }) {
//   const isGameComplete = matchedCount === totalPairs;

function ScoreBoard({ moves, matchedCount, totalPairs, time, onReset }) {
  const isComplete = matchedCount === totalPairs;

  //adding format time
  const formatTime = () => {
    const minutes = Math.floor(time / 60); //hitung by detik
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; //ubah format :
  };

  //adding 1 statistik lagi (waktu)
  //bg-white/20 backdrop-blur-sm rounded-lg
  return (
    <div className="text-center mb-8">
      {/* 3 statistik */}
      <div className="grid grid-cols-3 gap-6 mb-6"> 
        {/* waktu */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
          <p className="flex items-center justify-center gap-2 text-cyan-200 text-sm tracking-wide">
            <FaClock />
            WAKTU
          </p>
          <p className="text-3xl font-bold text-white mt-2">{formatTime()}</p>
        </div>
    
        {/* percobaan */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
          <p className="flex items-center justify-center gap-2 text-yellow-200 text-sm tracking-wide">
            <FaMousePointer />
            PERCOBAAN
          </p>
          <p className="text-3xl font-bold text-white mt-2">{moves}</p>
        </div>

        {/* ditemukan */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
          <p className="flex items-center justify-center gap-2 text-purple-200 text-sm tracking-wide">
            <FaCheck />
            DITEMUKAN
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {matchedCount}/{totalPairs}
          </p>
        </div>
      </div>

      {matchedCount === totalPairs && (
        <div className="mt-4 w-full max-w-xl mx-auto bg-gradient-to-r from-purple-600/40 to-pink-500/30 border border-yellow-400 rounded-xl p-3 text-center text-yellow-300 text-lg font-bold shadow-lg">
          🎉 Selamat! Selesai dalam waktu {formatTime()} dengan {moves} percobaan!
        </div>
      )}

      {/* tombol reset */}
      {/* add warna ungu dan border kuning */}
      <button
        onClick={onReset}
        className="
          mt-4
          px-5 py-3
          bg-yellow-400
          text-indigo-900
          font-bold
          rounded-full
          hover:bg-yellow-300
          transition
          shadow-xl
          flex items-center justify-center gap-2
          mx-auto
        "
      >
        {matchedCount === totalPairs ? <FaRedo /> : <FaSyncAlt />}
        {matchedCount === totalPairs ? "Mainkan Lagi" : "Acak Ulang"}
      </button>
    </div>
  );
}

export default ScoreBoard;