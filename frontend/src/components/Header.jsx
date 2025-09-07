import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();

  return (
    <div>
      {chats && chats.length > 0 ? (
        <p className="text-lg mb-6">Hello, How can I help you today?</p>
      ) : (
        <p className="text-lg mb-6">Create new chat to continue</p>
      )}
    </div>
  );
};

export default Header;
