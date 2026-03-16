import React from "react";

function Card({ card, isFlipped, isMatched, onFlip }) {
  const Icon = card.icon;

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        w-24 h-24
        cursor-pointer
        perspective
        transform
        transition
        duration-300
        hover:scale-110
        active:scale-95
        hover:shadow-2xl
        hover:shadow-blue-400/40
      "
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          isFlipped || isMatched ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* kartu depan */}
        <div
          className="
            absolute
            w-full
            h-full
            flex
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            text-white
            text-3xl
            font-extrabold
            shadow-lg
            hover:shadow-cyan-400/40
          "
          style={{ backfaceVisibility: "hidden" }}
        >
          ?
        </div>

        {/* kartu belakang */}
        <div
          className="
            absolute
            w-full
            h-full
            flex
            items-center
            justify-center
            rounded-xl
            bg-white
            text-3xl
            shadow-lg
          "
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Icon style={{ color: card.color }} />
        </div>
      </div>
    </div>
  );
}

export default Card;