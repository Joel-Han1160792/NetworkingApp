import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

type Message = { from: string; message: string };

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState('Guest');
  const [input, setInput] = useState('');
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    // Build SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5011/chatHub')
      .withAutomaticReconnect()
      .build();

    // Listen for ReceiveMessage from server
    connection.on('ReceiveMessage', (from, message) => {
      setMessages(prev => [...prev, { from, message }]);
    });

    // Start the connection
    connection.start()
      .then(() => console.log('SignalR connected!'))
      .catch(err => console.error('SignalR connection error:', err));

    connectionRef.current = connection;
    return () => {
      connection.stop();
    };
  }, []);

  // Send message to server
  const sendMessage = async () => {
    if (input.trim() === '' || !connectionRef.current) return;
    await connectionRef.current.invoke('SendMessage', user, input);
    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-4 rounded">
      <div className="mb-4">
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
          placeholder="Your Name"
        />
      </div>
      <div className="h-60 overflow-y-auto border rounded mb-4 p-2 bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i}><b>{msg.from}:</b> {msg.message}</div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
}
