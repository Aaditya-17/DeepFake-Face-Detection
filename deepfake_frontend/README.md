# Deepfake Detector Frontend

A React-based frontend application for detecting deepfakes using video analysis. Upload MP4 videos to check if they are real or fake using machine learning predictions.

## Features

✅ **Video Upload** - Drag and drop or click to upload MP4 videos (max 100MB)  
✅ **Progress Indicator** - Visual feedback during video analysis  
✅ **Real-time Results** - Displays prediction (REAL/FAKE) with confidence score  
✅ **Clean UI** - Modern interface built with Tailwind CSS  
✅ **Dummy API** - Mock API for testing (easily replaced with actual backend)

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Package Manager**: npm

## Project Structure

```
src/
├── App.jsx              # Main app component
├── api.js               # API service (dummy for now)
├── main.jsx             # Entry point
├── tailwind.css         # Tailwind directives
├── components/
│   ├── VideoUploader.jsx    # Video upload component
│   ├── ProgressBar.jsx      # Loading progress indicator
│   ├── ResultDisplay.jsx    # Results display component
│   └── index.js             # Component exports
└── assets/
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Usage

1. **Upload Video**: Click the upload area or drag and drop an MP4 file
2. **Wait for Analysis**: Progress bar shows while analyzing
3. **View Results**: See if video is REAL or FAKE with confidence percentage
4. **Upload Another**: Click "Upload Another Video" to analyze more videos

## API Integration

The app currently uses a **dummy API** that simulates analysis with random results.

### To integrate with your Python backend:

1. Update `src/api.js`:

```javascript
// Replace dummy response with actual API call
const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
```

2. Change `API_BASE_URL` to your backend URL (default: `http://localhost:5000/api`)

3. Backend should return:

```json
{
  "prediction": "REAL" | "FAKE",
  "confidence": 85.5,
  "timestamp": "2026-01-16T23:37:00Z"
}
```

## Video Constraints

- **Format**: MP4 only
- **Max Size**: 100MB
- **Min Duration**: No limit
- **Recommended**: 1-30 seconds for faster processing

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. **Backend Setup**: Integrate with your Python API
2. **Styling**: Customize colors/themes in `tailwind.config.js`
3. **Features**: Add video preview, download results, etc.
4. **Testing**: Add unit tests using Vitest or Jest

## Notes

- Dummy API simulates 3-second analysis delay
- Confidence scores are random (60-90%) for demo purposes
- Replace dummy API when backend is ready
- CORS may need configuration on backend for local development

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
