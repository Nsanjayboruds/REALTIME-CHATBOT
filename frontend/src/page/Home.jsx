import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const {
    fetchResponse,
    message,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    if (prompt.trim() === "") return;
    fetchResponse();
    setPrompt("");
  };

  const messagecontainerRef = useRef();

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (!selectedVoice && availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  const speakTextAdvanced = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const voiceObj = voices.find((v) => v.name === selectedVoice);
    if (voiceObj) utterance.voice = voiceObj;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = voiceObj?.lang || "en-US";
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    if (message && message.length > 0) {
      const lastMessage = message[message.length - 1];
      if (lastMessage.answer) speakTextAdvanced(lastMessage.answer);
    }
  }, [message, newRequestLoading, selectedVoice, rate, pitch, volume]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main */}
      <div className="flex flex-1 flex-col relative">
        {/* Mobile Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl border-b border-gray-700 hover:bg-gray-700 transition"
        >
          <GiHamburgerMenu />
        </button>

        {/* Header + Voice Controls */}
        <div className="px-6 py-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-center gap-3">
          <Header />
          <div className="flex items-center gap-2 flex-wrap"> 
            <select
              className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700 transition"
              value={selectedVoice || ""}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              title="Rate"
              className="accent-blue-500"
            />
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              title="Pitch"
              className="accent-green-500"
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              title="Volume"
              className="accent-red-500"
            />
          </div>
        </div>

        {/* Chat */}
        <div
          className="flex-1 p-6 overflow-y-auto thin-scrollbar"
          ref={messagecontainerRef}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingBig />
            </div>
          ) : message && message.length > 0 ? (
            message.map((e, i) => (
              <div key={i} className="mb-6">
                {/* User */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-full text-white text-xl shadow-md">
                    <CgProfile />
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 rounded-2xl max-w-xl shadow-md hover:shadow-lg transition">
                    <p className="text-white">{e.question}</p>
                  </div>
                </div>

                {/* Bot */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 p-2 rounded-full text-white text-xl shadow-md">
                    <FaRobot />
                  </div>
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 rounded-2xl max-w-xl flex justify-between items-center shadow-md hover:shadow-lg transition">
                    <p
                      className="text-gray-100"
                      dangerouslySetInnerHTML={{ __html: e.answer }}
                    ></p>
                    <button
                      onClick={() => speakTextAdvanced(e.answer)}
                      className="ml-2 text-blue-400 hover:text-blue-600 text-xl"
                      title="Listen"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-20 text-lg">
              No chat yet. Start by typing below 👇
            </p>
          )}

          {newRequestLoading && (
            <div className="flex justify-center mt-6">
              <LoadingSmall />
            </div>
          )}
        </div>

        {/* Input */}
        {!(chats && chats.length === 0) && (
          <div className="fixed bottom-0 right-0 left-0 md:left-[25%] p-4 bg-gray-900 border-t border-gray-700 shadow-lg">
            <form
              onSubmit={submitHandler}
              className="flex items-center gap-2 max-w-4xl mx-auto"
            >
              <input
                className="flex-grow p-4 bg-gray-800 rounded-xl text-white outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500 transition shadow-inner"
                type="text"
                placeholder="Enter your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-2xl text-white transition transform hover:scale-110">
                <IoMdSend />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
