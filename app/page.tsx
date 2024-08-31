"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Image from 'next/image';

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];
  const locations = [
    { emoji: "🏰", value: "Old Town" },
    { emoji: "🗿", value: "Stari Bar Fortress" },
    { emoji: "🌊", value: "Waterfront Promenade" },
    { emoji: "👑", value: "King Nikola's Palace" },
    { emoji: "🫒", value: "Old Olive Tree Groves" },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
    location: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    if (state.genre && state.tone && state.location) {
      generateStory(lang);
    }
  };

  const generateStory = (language: string) => {
    const languagePrompt = language === 'en' ? 'in English' : 'na crnogorskom jeziku';
    append({
      role: "user",
      content: `Generate a ${state.genre} short story set in ${state.location}, Bar, Montenegro, with a ${state.tone} tone ${languagePrompt}`,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Bar, Montenegro Short Stories</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Craft a unique short story set in Bar by selecting the genre, tone, and location.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Location</h3>

            <div className="flex flex-wrap justify-center">
              {locations.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="location"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone || !state.location}
            onClick={() => generateStory(selectedLanguage)}
          >
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>

          <div className="mb-4">
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`mr-2 p-2 bg-white text-black rounded ${selectedLanguage === 'en' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
            >
              🇬🇧 English
            </button>
            <button 
              onClick={() => handleLanguageChange('me')} 
              className={`p-2 bg-white text-black rounded ${selectedLanguage === 'me' ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
            >
              🇲🇪 Crnogorski
            </button>
          </div>

          {/* Remove the static story content */}
        </div>
      </div>
    </main>
  );
}