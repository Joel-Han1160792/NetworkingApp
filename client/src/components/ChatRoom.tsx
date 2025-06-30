import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useUser } from '../contexts/UserContext';

type Message = { from: string; message: string };

export default function ChatRoom() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [guestName, setGuestName] = useState('Guest');
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // Registered User
  const displayName = user?.name || guestName;

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5011/chatHub')
      .withAutomaticReconnect()
      .build();

    connection.on('ReceiveMessage', (from, message) => {
      setMessages(prev => [...prev, { from, message }]);
    });

    connection.start()
      .then(() => console.log('SignalR connected!'))
      .catch(err => console.error('SignalR connection error:', err));

    connectionRef.current = connection;
    return () => {
      connection.stop();
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '' || !connectionRef.current) return;
    await connectionRef.current.invoke('SendMessage', displayName, input);
    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow p-4 rounded w-full">
      {/* Editable for Guest */}
      {!user && (
        <div className="mb-4">
          <input
            value={guestName}
            onChange={e => setGuestName(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
            placeholder="Your Name"
          />
        </div>
      )}
      {user && (
        <div className="mb-4">
          <input
            value={user.name}
            disabled
            className="border rounded px-2 py-1 mr-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
            placeholder="Your Name"
          />
        </div>
      )}
      <div className="h-60 overflow-y-auto border rounded mb-4 p-2 bg-gray-100 dark:bg-gray-700">
        {messages.map((msg, i) => (
          <div key={i}>
            <b className="text-blue-600 dark:text-blue-300">{msg.from}:</b> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
