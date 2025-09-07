import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ChatData } from "../context/ChatContext";
import { LoadingSmall } from "./Loading";
import { UserData } from "../context/UserContext";

function Sidebar({ isOpen, toggleSidebar }) {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-xl text-white p-4 transition-transform transform 
                  md:relative md:translate-x-0 md:w-1/4 md:block shadow-2xl
                  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Close button for mobile */}
      <button
        className="md:hidden p-2 mb-4 bg-gray-700 rounded-full text-2xl hover:bg-gray-600 transition"
        onClick={toggleSidebar}
      >
        <IoCloseCircle />
      </button>

      {/* Header */}
      <div className="text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md">
        ChatBot
      </div>

      {/* New Chat */}
      <div className="mb-6">
        <button
          onClick={createChat}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 
                     hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
        >
          {createLod ? <LoadingSmall /> : "➕ New Chat"}
        </button>
      </div>

      {/* Chat List */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>
        <div className="max-h-[500px] overflow-y-auto thin-scrollbar space-y-2">
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <div
                key={e._id}
                className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition 
                           rounded-lg px-3 py-2 cursor-pointer group"
              >
                <span
                  className="flex-1 truncate"
                  onClick={() => clickEvent(e._id)}
                >
                  {e.latestMessage?.slice(0, 40) || "Untitled Chat"}
                </span>
                <button
                  className="p-2 text-red-500 hover:text-red-600 rounded-full transition"
                  onClick={() => deleteChatHandler(e._id)}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center mt-4">No chats yet</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold shadow-md"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
