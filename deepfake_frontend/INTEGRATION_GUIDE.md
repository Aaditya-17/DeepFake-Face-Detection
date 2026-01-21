# Integration Guide

## Current Status

✅ **Frontend**: Fully built and running  
⏳ **Backend**: Template provided, waiting for integration

## Frontend Features Completed

1. **Video Upload Component**
    - Drag and drop support
    - File validation (MP4 only, max 100MB)
    - File info display

2. **Analysis Flow**
    - Video selection
    - Progress indicator during processing
    - Result display with prediction and confidence
    - Reset functionality

3. **UI/UX**
    - Modern Tailwind CSS styling
    - Responsive design
    - Loading states
    - Clear visual feedback

4. **Dummy API**
    - Simulates analysis with 3-second delay
    - Random REAL/FAKE prediction
    - Random confidence (60-90%)

## Steps to Integrate with Backend

### 1. Backend Setup

Choose your framework (Flask, FastAPI, Django, etc.) and create:

```python
# Endpoint: POST /api/analyze
# Input: Multipart form-data with 'video' file
# Output: JSON with prediction, confidence, timestamp
```

See `BACKEND_TEMPLATE.py` for a complete Flask example.

### 2. Update Frontend API Configuration

Edit `src/api.js`:

```javascript
// Comment out dummy response
// setTimeout(() => { resolve(...) }, 3000);

// Uncomment and use actual API
const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
return { success: true, data: response.data };
```

### 3. Configure Backend URL

In `src/api.js`, update:

```javascript
const API_BASE_URL = "http://your-backend-url:5000/api";
```

### 4. Enable CORS

Backend must allow requests from frontend:

**Flask:**

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

**FastAPI:**

```python
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 5. Test Integration

1. Start backend on `http://localhost:5000`
2. Frontend already running on `http://localhost:5173`
3. Upload a video - it should send to your backend
4. Results will display from actual model

## API Contract

### Request

```
POST /api/analyze
Content-Type: multipart/form-data

video: <binary video file>
```

### Response (Success)

```json
{
    "prediction": "REAL",
    "confidence": 85.5,
    "timestamp": "2026-01-16T23:37:00Z"
}
```

### Response (Error)

```json
{
    "error": "Error message here"
}
```

## File Size & Performance Considerations

- **Max Size**: 100MB (configurable in frontend and backend)
- **Typical Processing**: 3-10 seconds
- **Video Format**: MP4
- **Recommended Duration**: 1-30 seconds for faster processing

## Development Tips

1. **Test with Dummy API First**: App works as-is for testing UI
2. **Check Browser Console**: For API errors and debugging
3. **Network Tab**: Monitor requests/responses to your backend
4. **Backend Logs**: Print/log API calls to debug preprocessing issues

## Common Issues & Solutions

### CORS Error

- Enable CORS in backend
- Ensure frontend URL is in allowed origins

### File Upload Fails

- Check file size limit matches frontend
- Verify Content-Type headers
- Check backend logs

### Timeout

- Increase timeout in axios config
- Optimize video processing in backend

## Useful Tools

- **Postman**: Test backend API without frontend
- **VS Code Thunder Client**: Quick API testing
- **Browser DevTools**: Network debugging

## Next Steps

1. Build your Python deepfake detection model
2. Create backend API using template provided
3. Test backend with Postman
4. Uncomment actual API call in `src/api.js`
5. Deploy when ready
