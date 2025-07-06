'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function ChatPage() {
  const { id } = useParams(); // deal ID from URL
  const { data: session } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages for the deal
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(`/api/deal/${id}/messages`);
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        toast.error('Failed to load messages');
      }
    }
    fetchMessages();

    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [id]);

  // Send new message
  const handleSend = async () => {
    if (!content.trim()) return;
    try {
      const res = await fetch(`/api/deal/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (data.success) {
        setContent('');
        setMessages((prev) => [...prev, data.message]);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        toast.error(data.error || 'Failed to send');
      }
    } catch {
      toast.error('Error sending message');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <button
        className="mb-4 text-blue-600 hover:underline"
        onClick={() => router.push('/dashboard/counterparty')}
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-xl font-bold mb-4">💬 Deal Chat</h2>

      <div className="border rounded p-4 h-[400px] overflow-y-auto bg-black/10 backdrop-blur-lg">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              msg.senderId === session?.user?.id
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 space-y-4">
        {/* Payment Action Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              try {
                const res = await fetch(`/api/deal/${id}/release`, { method: 'POST' });
                const data = await res.json();
                if (data.success) toast.success('Payment released');
                else toast.error(data.error || 'Release failed');
              } catch {
                toast.error('Network error during release');
              }
            }}
          >
            ✅ Release
          </button>

          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded"
            onClick={async () => {
              try {
                const res = await fetch(`/api/deal/${id}/dispute`, { method: 'POST' });
                const data = await res.json();
                if (data.success) toast.success('Dispute raised');
                else toast.error(data.error || 'Dispute failed');
              } catch {
                toast.error('Network error during dispute');
              }
            }}
          >
            ⚠️ Dispute
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              try {
                const res = await fetch(`/api/deal/${id}/cancel`, { method: 'POST' });
                const data = await res.json();
                if (data.success) toast.success('Deal cancelled');
                else toast.error(data.error || 'Cancel failed');
              } catch {
                toast.error('Network error during cancel');
              }
            }}
          >
            ❌ Cancel
          </button>
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

