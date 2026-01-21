import { useState } from "react";
import { VideoUploader, ProgressBar, ResultDisplay } from "./components";
import { analyzeVideo } from "./api";
import "./tailwind.css";

function App() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleVideoSelect = async (file) => {
        setSelectedVideo(file);
        setResult(null);
        setIsLoading(true);

        try {
            const response = await analyzeVideo(file);
            if (response.success) {
                setResult(response.data);
            } else {
                alert(`Error: ${response.error}`);
            }
        } catch (error) {
            alert("Failed to analyze video. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedVideo(null);
        setResult(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Deepfake Detector
                    </h1>
                    <p className="text-gray-400">
                        Upload a video to analyze if it's real or a deepfake
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    {/* Video Uploader */}
                    {!selectedVideo && (
                        <VideoUploader
                            onVideoSelect={handleVideoSelect}
                            isLoading={isLoading}
                        />
                    )}

                    {/* Selected Video Info */}
                    {selectedVideo && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-600">
                                Selected Video:
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                                {selectedVideo.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Size:{" "}
                                {(selectedVideo.size / (1024 * 1024)).toFixed(
                                    2,
                                )}
                                MB
                            </p>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {isLoading && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-2">
                                Analyzing video...
                            </p>
                            <ProgressBar isVisible={isLoading} />
                        </div>
                    )}

                    {/* Result Display */}
                    <ResultDisplay
                        result={result}
                        isVisible={!isLoading && result !== null}
                    />

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4">
                        {selectedVideo && (
                            <button
                                onClick={handleReset}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Reset
                            </button>
                        )}
                        {selectedVideo && !result && (
                            <button
                                onClick={() => handleVideoSelect(selectedVideo)}
                                disabled={isLoading}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Analyzing..." : "Analyze Again"}
                            </button>
                        )}
                        {result && (
                            <button
                                onClick={handleReset}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Upload Another Video
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">
                        Currently using dummy API for demonstration. Will
                        connect to backend API when ready.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
