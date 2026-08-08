import React from "react";

interface FaSignRepresentationProps {
  patternLeft: [number, number, number, number];
  patternRight: [number, number, number, number];
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onCellClick?: (side: "left" | "right", index: number) => void;
}

export const FaSignRepresentation: React.FC<FaSignRepresentationProps> = ({
  patternLeft,
  patternRight,
  size = "md",
  interactive = false,
  onCellClick,
}) => {
  const getStrokeElements = (val: number) => {
    // val is 1 (single stroke) or 2 (double stroke)
    if (val === 1) {
      return (
        <div className="flex justify-center items-center w-full">
          <div className="w-2.5 h-8 bg-amber-500 rounded-full shadow-lg shadow-amber-900/50 border border-amber-400 animate-pulse-slow" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center gap-4 w-full">
          <div className="w-2.5 h-8 bg-amber-500 rounded-full shadow-lg shadow-amber-900/50 border border-amber-400" />
          <div className="w-2.5 h-8 bg-amber-500 rounded-full shadow-lg shadow-amber-900/50 border border-amber-400" />
        </div>
      );
    }
  };

  const getStrokeElementsSm = (val: number) => {
    if (val === 1) {
      return (
        <div className="flex justify-center items-center w-full">
          <div className="w-1.5 h-5 bg-amber-500 rounded-full border border-amber-400" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center gap-1.5 w-full">
          <div className="w-1.5 h-5 bg-amber-500 rounded-full border border-amber-400" />
          <div className="w-1.5 h-5 bg-amber-500 rounded-full border border-amber-400" />
        </div>
      );
    }
  };

  const getStrokeElementsLg = (val: number) => {
    if (val === 1) {
      return (
        <div className="flex justify-center items-center w-full">
          <div className="w-3.5 h-12 bg-amber-400 rounded-full shadow-xl shadow-amber-950/80 border border-amber-300" />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center gap-6 w-full">
          <div className="w-3.5 h-12 bg-amber-400 rounded-full shadow-xl shadow-amber-950/80 border border-amber-300" />
          <div className="w-3.5 h-12 bg-amber-400 rounded-full shadow-xl shadow-amber-950/80 border border-amber-300" />
        </div>
      );
    }
  };

  const sizeClasses = {
    sm: "w-28 h-32 p-3 gap-x-2 text-xs",
    md: "w-44 h-52 p-5 gap-x-6 text-sm",
    lg: "w-64 h-76 p-8 gap-x-10 text-base",
  };

  const renderRow = (rowIndex: number) => {
    const valLeft = patternLeft[rowIndex];
    const valRight = patternRight[rowIndex];

    return (
      <div key={rowIndex} className="flex justify-between items-center w-full">
        {/* Left Column half */}
        <div
          className={`flex-1 flex justify-center py-1 rounded transition ${
            interactive ? "hover:bg-amber-900/30 cursor-pointer active:scale-95" : ""
          }`}
          onClick={() => interactive && onCellClick && onCellClick("left", rowIndex)}
        >
          {size === "sm"
            ? getStrokeElementsSm(valLeft)
            : size === "lg"
            ? getStrokeElementsLg(valLeft)
            : getStrokeElements(valLeft)}
        </div>

        {/* Right Column half */}
        <div
          className={`flex-1 flex justify-center py-1 rounded transition ${
            interactive ? "hover:bg-amber-900/30 cursor-pointer active:scale-95" : ""
          }`}
          onClick={() => interactive && onCellClick && onCellClick("right", rowIndex)}
        >
          {size === "sm"
            ? getStrokeElementsSm(valRight)
            : size === "lg"
            ? getStrokeElementsLg(valRight)
            : getStrokeElements(valRight)}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-col justify-between items-center bg-radial from-stone-900 via-neutral-950 to-stone-950 border-4 border-amber-700/80 rounded-full shadow-inner shadow-amber-950 ${sizeClasses[size]}`}
      style={{
        backgroundImage: "radial-gradient(circle, #2d1c0c 0%, #150b04 70%, #080301 100%)",
        boxShadow: "inset 0 0 30px #000, 0 10px 25px rgba(0,0,0,0.5)",
      }}
    >
      {/* Opon Ifa central dividing vertical marker lines (optional subtle traditional design) */}
      <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] bg-amber-900/20 pointer-events-none" />

      {/* 4 Levels */}
      {renderRow(0)}
      {renderRow(1)}
      {renderRow(2)}
      {renderRow(3)}
    </div>
  );
};
