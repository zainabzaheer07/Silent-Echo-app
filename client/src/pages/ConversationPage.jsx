import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Camera from "../components/Camera/Camera";
import axios from "axios";
import "../PagesStyles/ConversationPage.css";

function ConversationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("Translated text will be displayed here.");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ username: "", email: "" });

  const clearInput = () => setInputText("");
  const clearTranslation = () => setTranslatedText("Translated text will be displayed here.");

  const handleSaveConversation = async () => {
    try {
      const response = await axios.post('http://your-backend-api/save-conversation', {
        username: modalData.username,
        email: modalData.email,
        conversation: {
          input: inputText,
          translation: translatedText
        }
      });
      console.log("Conversation saved:", response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  return (
    <div className="conversation-page-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="conversation-page-header">
        <figure className="conversation-hamburger-icon" onClick={() => setIsSidebarOpen(true)}>
          <img src="./images/menu-icon.svg" alt="hamburger" />
        </figure>
        <div className="conversation-page-title">
          <h2>ASL to English, Real-Time Translation</h2>
        </div>
      </div>

      <section className="conversation-section">
        <div className="conversation-section-left">
          <div className="user-typed-input-section">
            <textarea 
              className="conversation-text-input" 
              placeholder="Typed text appears here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="clear-button" onClick={clearInput}>Clear</button>
          </div>
        </div>

        <div className="conversation-section-right">
          <Camera />
          <div className="translation-section">
            <p className="translated-text-para">{translatedText}</p>
            <button className="clear-button" onClick={clearTranslation}>Clear</button>
          </div>
        </div>
      </section>

      <div className="save-conversation">
        <button onClick={() => setShowModal(true)}>Save Conversation</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Save Conversation</h3>
            <input
              type="text"
              placeholder="Username"
              value={modalData.username}
              onChange={(e) => setModalData({...modalData, username: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              value={modalData.email}
              onChange={(e) => setModalData({...modalData, email: e.target.value})}
            />
            <div className="modal-buttons">
              <button onClick={handleSaveConversation}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationPage;