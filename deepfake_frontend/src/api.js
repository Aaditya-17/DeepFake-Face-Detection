import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Dummy API response generator
const generateDummyResponse = () => {
    const isReal = Math.random() > 0.5;
    return {
        prediction: isReal ? "REAL" : "FAKE",
        confidence: (Math.random() * 30 + 60).toFixed(2), // 60-90% confidence
        timestamp: new Date().toISOString(),
    };
};

export const analyzeVideo = async (videoFile) => {
    try {
        const formData = new FormData();
        formData.append("video", videoFile);

        // For now, return dummy response after a delay to simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: generateDummyResponse(),
                });
            }, 3000); // 3 second delay to simulate processing
        });

        // Uncomment below when backend is ready
        // const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        // return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Failed to analyze video",
        };
    }
};
