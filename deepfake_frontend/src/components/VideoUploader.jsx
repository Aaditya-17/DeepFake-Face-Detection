import React from "react";

export const VideoUploader = ({ onVideoSelect, isLoading }) => {
    const [dragActive, setDragActive] = React.useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type === "video/mp4") {
                if (file.size <= 100 * 1024 * 1024) {
                    // 100MB limit
                    onVideoSelect(file);
                } else {
                    alert("File size should be less than 100MB");
                }
            } else {
                alert("Please upload an MP4 video file");
            }
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type === "video/mp4") {
                if (file.size <= 100 * 1024 * 1024) {
                    onVideoSelect(file);
                } else {
                    alert("File size should be less than 100MB");
                }
            } else {
                alert("Please upload an MP4 video file");
            }
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="video/mp4"
                onChange={handleFileInput}
                className="hidden"
                id="video-input"
                disabled={isLoading}
            />
            <label
                htmlFor="video-input"
                className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}
            >
                <div className="mb-4">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20m-6-8l-8 8m0 0l-8-8m8 8v20"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                    Drag and drop your MP4 video here
                </p>
                <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                <p className="text-xs text-gray-400 mt-2">
                    Max file size: 100MB
                </p>
            </label>
        </div>
    );
};
