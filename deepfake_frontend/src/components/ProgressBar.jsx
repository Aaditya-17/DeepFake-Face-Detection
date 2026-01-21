import React from "react";

export const ProgressBar = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
                className="bg-blue-600 h-2.5 rounded-full animate-pulse"
                style={{
                    animation: "progress 2s ease-in-out infinite",
                }}
            ></div>
            <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>
        </div>
    );
};
