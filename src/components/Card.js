import React from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onFlip }) {

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip();
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  //adding normal white shadow normal | cyan ring kalo matched
  const cardClass = `
  w-24 h-24
  cursor-pointer
  perspective
  transform
  transition
  duration-300
  hover:scale-110
  active:scale-95
  shadow-[0_0_15px_rgba(255,255,255,0.6)]
  hover:shadow-[0_0_25px_rgba(59,130,246,0.9)]
  ${isMatched ? "ring-2 ring-blue-400" : ""}
`;

  return (
    //card container,terima event klik
    <div onClick={handleClick} className={cardClass}>
      <div
      //card inner, bagian melakukan flipping
        className={`relative w-full h-full transition-transform duration-500 ${
          isOpen ? "rotate-y-180" : ""
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
          style={{ backfaceVisibility: "hidden" }} //saat kartu depan terlihat, kartu belakang disembunyikan
        >
          <FaQuestion />
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
          //tampilin icon sesuai dengan data kartu, dengan animasi bounce saat dibuka
        > 
          <span className={isFlipped ? "animate-bounce-once" : ""}>
            <IconComponent style={{ color: card.color }} />
          </span>
        </div>

      </div>
    </div>
  );
}

export default Card;