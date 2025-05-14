
# Roulette Wheel with Hand Gesture Control

This project creates a roulette wheel that can be controlled using hand gestures through a webcam. It uses React for the frontend and Python (Eel + CVZone) for the backend.

## Project Structure

- **Frontend:** React application with Canvas-based roulette wheel
- **Backend:** Python application using Eel for web communication and CVZone for hand tracking

## Requirements

### Frontend
- Node.js and npm

### Backend
- Python 3.7+
- OpenCV (`cv2`)
- CVZone (`pip install cvzone`)
- Mediapipe (`pip install mediapipe`)
- Eel (`pip install eel`)

## How to Run

### Frontend (Development)
```sh
npm install
npm run dev
```

### Backend (Python)
```sh
cd python_backend
pip install -r requirements.txt
python app.py
```

## How to Play

1. Start both the frontend and backend applications
2. Position your hand in front of the webcam
3. Move your hand left or right to control the wheel
4. Fast hand movements will trigger the wheel to spin
5. The wheel has numbers from 0 to 40
6. Numbers 0, 10, 20, 30, and 40 are marked as "Again!" spots

## Features

- Interactive roulette wheel with 41 numbers (0-40)
- Hand gesture control for spinning and direction
- Canvas-based animation with realistic rotation effects
- Sound effects for spinning

## Notes

- For the deployed version, the Python backend needs to be running on the user's computer
- The frontend can be hosted separately and will connect to the local Python backend

## License

This project is licensed under the MIT License - see the LICENSE file for details.
