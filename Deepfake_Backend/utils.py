import cv2
import torch
import numpy as np
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
from facenet_pytorch import MTCNN
from torchvision import transforms

device = "cuda" if torch.cuda.is_available() else "cpu"

# ---------------- MODELS ---------------- #

class BiLSTMClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=2048,
            hidden_size=256,
            bidirectional=True,
            batch_first=True
        )
        self.pool = nn.AdaptiveAvgPool1d(1)
        self.fc = nn.Linear(512, 2)

    def forward(self, x):
        x, _ = self.lstm(x)
        x = x.permute(0, 2, 1)
        x = self.pool(x).squeeze(-1)
        return self.fc(x)

# Load BiLSTM
model = BiLSTMClassifier().to(device)
model.load_state_dict(torch.load("bilstm_model.pth", map_location=device))
model.eval()

# ResNeXt
resnext = models.resnext50_32x4d(pretrained=True)
resnext.fc = nn.Identity()
resnext = resnext.to(device)
resnext.eval()

# Face detector
mtcnn = MTCNN(image_size=224, margin=20, device=device)

# Normalize
normalize = transforms.Normalize(
    mean=[0.485, 0.456, 0.406],
    std=[0.229, 0.224, 0.225]
)

# ---------------- PIPELINE ---------------- #

def extract_frames(video_path, num_frames=60):
    cap = cv2.VideoCapture(video_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    ids = np.linspace(0, total - 1, num_frames, dtype=int)

    frames = []
    i, j = 0, 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if i == ids[j]:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.resize(frame, (224, 224))
            frames.append(frame)
            j += 1
            if j >= num_frames:
                break
        i += 1
    cap.release()
    return frames

def predict_video(video_path):
    frames = extract_frames(video_path)
    faces = []

    for f in frames:
        face = mtcnn(f)
        if face is None:
            face = torch.zeros(3, 224, 224)
        faces.append(face)

    features = []
    with torch.no_grad():
        for face in faces:
            face = normalize(face).unsqueeze(0).to(device)
            feat = resnext(face)
            features.append(feat.squeeze(0))

        seq = torch.stack(features).unsqueeze(0)
        output = model(seq)
        probs = F.softmax(output, dim=1)

    fake_prob = probs[0][1].item()
    return fake_prob
