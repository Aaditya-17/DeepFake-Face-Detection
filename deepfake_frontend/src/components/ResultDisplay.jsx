export const ResultDisplay = ({ result, isVisible }) => {
    if (!isVisible || !result) return null;

    const isPredictionReal = result.prediction === "REAL";
    const bgColor = isPredictionReal ? "bg-green-50" : "bg-red-50";
    const borderColor = isPredictionReal
        ? "border-green-200"
        : "border-red-200";
    const textColor = isPredictionReal ? "text-green-800" : "text-red-800";
    const badgeBg = isPredictionReal ? "bg-green-100" : "bg-red-100";
    const badgeText = isPredictionReal ? "text-green-700" : "text-red-700";

    return (
        <div className={`mt-8 p-6 border rounded-lg ${bgColor} ${borderColor}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl font-bold ${textColor}`}>
                    Analysis Result
                </h3>
                <div
                    className={`px-4 py-2 rounded-full ${badgeBg} ${badgeText} font-semibold`}
                >
                    {result.prediction}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-600">Confidence Score</p>
                    <p className={`text-3xl font-bold ${textColor}`}>
                        {result.confidence}%
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Analyzed At</p>
                    <p className="text-sm text-gray-700">
                        {new Date(result.timestamp).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className={`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                <div
                    className={`h-full ${isPredictionReal ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: `${result.confidence}%` }}
                ></div>
            </div>

            <p className={`text-sm mt-4 ${textColor}`}>
                {isPredictionReal
                    ? "This video appears to be REAL based on the analysis."
                    : "This video appears to be a DEEPFAKE based on the analysis."}
            </p>
        </div>
    );
};
