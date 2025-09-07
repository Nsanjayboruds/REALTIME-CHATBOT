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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [message, newRequestLoading]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Area */}
      <div className="flex flex-1 flex-col relative">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl border-b border-gray-700"
        >
          <GiHamburgerMenu />
        </button>

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <Header />
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto thin-scrollbar" ref={messagecontainerRef}>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingBig />
            </div>
          ) : message && message.length > 0 ? (
            message.map((e, i) => (
              <div key={i} className="mb-6">
                {/* User Message */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-full text-white text-xl">
                    <CgProfile />
                  </div>
                  <div className="bg-blue-600 px-4 py-3 rounded-2xl max-w-xl">
                    <p className="text-white">{e.question}</p>
                  </div>
                </div>

                {/* Bot Response */}
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 p-2 rounded-full text-white text-xl">
                    <FaRobot />
                  </div>
                  <div className="bg-gray-800 px-4 py-3 rounded-2xl max-w-xl">
                    <p
                      className="text-gray-100"
                      dangerouslySetInnerHTML={{ __html: e.answer }}
                    ></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-20">No chat yet. Start by typing below 👇</p>
          )}

          {newRequestLoading && (
            <div className="flex justify-center mt-6">
              <LoadingSmall />
            </div>
          )}
        </div>

        {/* Input Box */}
        {!(chats && chats.length === 0) && (
          <div className="fixed bottom-0 right-0 left-0 md:left-[25%] p-4 bg-gray-900 border-t border-gray-700">
            <form
              onSubmit={submitHandler}
              className="flex items-center gap-2 max-w-4xl mx-auto"
            >
              <input
                className="flex-grow p-4 bg-gray-800 rounded-xl text-white outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                placeholder="Enter your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-2xl text-white transition">
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
