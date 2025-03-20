// Sidebar.js
import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const chatHistory = ["Ahmed Khan", "Fatima Malik", "Ali Raza", "Ayesha Noor", "Bilal Hussain"];

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
       
        <button className="close-button" onClick={onClose}>X</button>
        <div className="silent-echo-logo-in-chat-page">
            <img src="./images/footer-logo.svg" alt="" />
        </div>
      </div>
      <div className="chat-history">
        <h3>Chat History</h3>
        <ul>
          {chatHistory.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Sidebar.css";

// const Sidebar = ({ isOpen, onClose }) => {
//   const [chatHistory, setChatHistory] = useState([]);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get('http://your-backend-api/chat-history');
//         setChatHistory(response.data);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };
//     fetchChatHistory();
//   }, []);

//   return (
//     <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-header">
//         <button className="close-button" onClick={onClose}>X</button>
//         <div className="silent-echo-logo-in-chat-page">
//           <img src="./images/footer-logo.svg" alt="" />
//         </div>
//       </div>
//       <div className="chat-history">
//         <h3>Chat History</h3>
//         <ul>
//           {chatHistory.map((chat, index) => (
//             <li key={index}>{chat.username} - {new Date(chat.timestamp).toLocaleDateString()}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;