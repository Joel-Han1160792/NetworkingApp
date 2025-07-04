import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import type { Message } from "../types/message";

interface Chat1to1Props {
  userId: string; // 当前用户 id
  receiverId: string; // 对方用户 id
  receiverName?: string; // 可选，对方名字
}

const HUB_URL = "http://localhost:5011/chatHub";

const Chat1to1: React.FC<Chat1to1Props> = ({ userId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL, { accessTokenFactory: () => localStorage.getItem('token') || '' })
    .withAutomaticReconnect()
    .build();

  connection.on('ReceivePrivateMessage', (from: string, content: string) => {
    setMessages(prev => [...prev, { from, to: String(receiverId), content, time: new Date().toLocaleTimeString() }]);
  });

  // ⭐ 防止重复 start
  const start = async () => {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
      try {
        await connection.start();
        setConnected(true);
      } catch (err) {
        console.error('SignalR start error', err);
      }
    }
  };
  start();

  connectionRef.current = connection;
  return () => {
    connection.stop();
  };
}, [userId, receiverId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !connectionRef.current) return;
    setMessages((prev) => [
      ...prev,
      { from: String(userId), to: String(receiverId), content: input, time: new Date().toLocaleTimeString() },
    ]);
    await connectionRef.current.invoke("SendPrivateMessage", receiverId, input);
    setInput("");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col h-[480px]">
      <div className="mb-2 flex justify-between items-center">
        <span className="font-semibold text-indigo-700 dark:text-indigo-200">
          Chatting with: {receiverName ?? receiverId}
        </span>
        <span className={connected ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
          {connected ? "Online" : "Offline"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded p-3 mb-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === String(userId) ? "text-right" : "text-left"}>
            <span className={`inline-block px-2 py-1 rounded ${msg.from === String(userId)
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
            }`}>
              <span className="font-semibold">{msg.from === String(userId) ? "Me" : msg.from}:</span> {msg.content}
            </span>
            <span className="ml-2 text-xs text-gray-400">{msg.time}</span>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          disabled={!connected}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
          disabled={!connected || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat1to1;
