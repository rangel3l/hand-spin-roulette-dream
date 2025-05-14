
# This is a reference Python file that would be implemented separately
# It would use Eel to connect to the frontend and CVZone for hand tracking

"""
import eel
import cv2
import mediapipe as mp
import math
import numpy as np
from cvzone.HandTrackingModule import HandDetector

# Initialize Eel with the web directory
eel.init('build')  # Point to your React build folder

# Initialize the webcam
cap = cv2.VideoCapture(0)
detector = HandDetector(detectionCon=0.8, maxHands=1)

# Previous hand position for calculating movement
prev_x = 0
movement_threshold = 50  # Threshold to detect significant movement
spin_threshold = 200  # Threshold to trigger a spin

@eel.expose
def start_camera():
    while True:
        # Read the frame from the webcam
        success, img = cap.read()
        if not success:
            break
            
        # Find hands in the image
        img = detector.findHands(img)
        lmList, bbox = detector.findPosition(img)
        
        if lmList:
            # Get the hand position (wrist point)
            x, y = lmList[0][0], lmList[0][1]
            
            # Calculate movement direction and speed
            if prev_x != 0:
                movement = x - prev_x
                direction = 1 if movement > 0 else -1  # 1 for right, -1 for left
                speed = min(1.0, abs(movement) / 100.0)  # Normalize speed between 0 and 1
                
                # Send data to JavaScript
                eel.updateHandPosition({
                    'type': 'hand-movement',
                    'position': x,
                    'direction': direction,
                    'speed': speed,
                    'action': 'move'
                })
                
                # If movement is large enough, trigger a spin
                if abs(movement) > spin_threshold:
                    eel.updateHandPosition({
                        'type': 'hand-movement',
                        'position': x,
                        'direction': direction,
                        'speed': speed,
                        'action': 'spin'
                    })
            
            prev_x = x
        
        # Display the image (for debugging)
        cv2.imshow("Image", img)
        cv2.waitKey(1)
        
        # Allow Eel to update
        eel.sleep(0.01)

# Start the application
eel.start('index.html', mode='chrome', block=False)

# Start the camera processing
start_camera()
"""
