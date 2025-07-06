'use client';

import { BellRing, Check, X } from 'lucide-react';
import { useState } from 'react';

type Notification = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
  timestamp: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'You have a new job invitation!',
    type: 'info',
    timestamp: '2 mins ago',
    read: false,
  },
  {
    id: '2',
    message: 'Your proposal was accepted 🎉',
    type: 'success',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    message: 'Payment received for Project Z.',
    type: 'success',
    timestamp: 'Today',
    read: true,
  },
];

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-xl shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BellRing className="w-5 h-5 animate-pulse" />
          Notifications
        </h2>
        <button
          onClick={markAllRead}
          className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scroll">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-300">No new notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-start gap-3 p-3 rounded-md transition ${
                n.read ? 'bg-blue-800/50' : 'bg-blue-700/90'
              }`}
            >
              <div>
                <p className="text-sm">{n.message}</p>
                <span className="text-xs text-gray-300">{n.timestamp}</span>
              </div>
              <div className="flex gap-2">
                {!n.read && (
                  <Check
                    className="w-4 h-4 cursor-pointer hover:text-green-300"
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((notif) =>
                          notif.id === n.id ? { ...notif, read: true } : notif
                        )
                      )
                    }
                  />
                )}
                <X
                  className="w-4 h-4 cursor-pointer hover:text-red-400"
                  onClick={() => deleteNotification(n.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

