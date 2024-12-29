'use client';

import { motion } from 'framer-motion';
import { FaChartBar, FaUser, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const dashboardItems = [
  { id: 1, name: 'Overview', icon: <FaChartBar />, description: 'View key metrics and performance.' },
  { id: 2, name: 'Profile', icon: <FaUser />, description: 'Manage your user profile and settings.' },
  { id: 3, name: 'Settings', icon: <FaCog />, description: 'Configure your account preferences.' },
];

interface UserInfo {
  name?: string;
  email?: string;
  picture?: string;
  age?: number;
  gender?: string;
  favoriteMusic?: string;
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserInfo>>({});

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/user-info');
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUserInfo(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    fetchUserInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user info');
      }
      const updatedData = await response.json();
      setUserInfo(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 text-white overflow-hidden relative w-full">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Your <span className="text-yellow-400">Dashboard</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-zinc-800 rounded-lg shadow-lg p-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-2xl mr-3">{item.icon}</div>
                <h2 className="text-2xl font-bold">{item.name}</h2>
              </div>
              <p className="text-sm text-zinc-300">{item.description}</p>
              {item.name === 'Profile' && userInfo && (
                <div className="mt-4">
                  <div className="flex items-center mb-3 border-b-2 border-zinc-600">
                    {userInfo.picture && (
                      <div className="relative w-10 h-10 mr-3 mb-2">
                        <Image
                          src={userInfo.picture}
                          alt="Profile"
                          fill
                          className="rounded-full object-cover"
                          sizes="40px"
                          priority
                        />
                      </div>
                    )}
                    <p className="text-sm text-zinc-300">{userInfo.email}</p>
                  </div>
                  {!isEditing ? (
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-zinc-200 font-bold">Name: <span className="px-2 bg-zinc-800 text-zinc-400">{userInfo.name || 'Not specified'}</span></p>
                      <p className="text-sm text-zinc-300 font-bold">Age: <span className="px-2 bg-zinc-800 text-zinc-400">{userInfo.age || 'Not specified'}</span></p>
                      <p className="text-sm text-zinc-300 font-bold">Gender: <span className="px-2 bg-zinc-800 text-zinc-400">{userInfo.gender || 'Not specified'}</span></p>
                      <p className="text-sm text-zinc-300 font-bold">Favorite Music: <span className="px-2 bg-zinc-800 text-zinc-400">{userInfo.favoriteMusic || 'Not specified'}</span></p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
                      >
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-2">
                      <input
                        type="number"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="w-full px-3 py-2 bg-zinc-700 rounded text-white"
                      />
                      <input
                        type="text"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleInputChange}
                        placeholder="Gender"
                        className="w-full px-3 py-2 bg-zinc-700 rounded text-white"
                      />
                      <input
                        type="text"
                        name="favoriteMusic"
                        value={formData.favoriteMusic || ''}
                        onChange={handleInputChange}
                        placeholder="Favorite Music"
                        className="w-full px-3 py-2 bg-zinc-700 rounded text-white"
                      />
                      <button
                        type="submit"
                        className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="ml-2 bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

