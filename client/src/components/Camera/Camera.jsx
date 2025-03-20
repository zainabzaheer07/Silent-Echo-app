import React, { useRef, useState } from "react";
import "./Camera.css";

const Camera = () => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setIsStreaming(false);
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay className="camera-video"></video>
      {!isStreaming ? (
        <button className="start-button" onClick={startCamera}>Start</button>
      ) : (
        <button className="stop-button" onClick={stopCamera}>Stop</button>
      )}
    </div>
  );
};

export default Camera;