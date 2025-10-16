import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat, Part } from '@google/genai';
import { initializeChat } from './services/geminiService';
import { ChatMessage as ChatMessageType } from './types';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { WelcomeScreen } from './components/WelcomeScreen';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const chatSession = await initializeChat();
        setChat(chatSession);
      } catch (e) {
        setError("Failed to initialize the chat session. Please check your API key and refresh the page.");
        console.error(e);
      }
    };
    init();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (userInput: string, file?: File) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessageType = { 
      role: 'user', 
      content: userInput,
      attachment: file ? { name: file.name, type: file.type } : undefined
    };
    const modelMessagePlaceholder: ChatMessageType = { role: 'model', content: '' };
    
    setMessages(prev => [...prev, userMessage, modelMessagePlaceholder]);

    try {
      const messageParts: (string | Part)[] = [{ text: userInput }];
      
      if (file) {
        const base64Data = await fileToBase64(file);
        messageParts.push({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        });
      }

      const stream = await chat.sendMessageStream({ message: messageParts });
      let fullResponse = '';
      
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: fullResponse };
          return newMessages;
        });
      }
      
    } catch (e) {
      const errorMessage = "An error occurred while fetching the response. Please try again.";
      setError(errorMessage);
      console.error(e);
      setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: errorMessage, isError: true };
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);


  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <Header />
      <main className="flex-1 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {messages.length === 0 && !isLoading && <WelcomeScreen onSendMessage={handleSendMessage} />}
            <div className="space-y-8">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))}
                {isLoading && messages.length > 0 && <LoadingIndicator />}
                {error && !isLoading && <div className="text-red-400 text-center py-4">{error}</div>}
                <div ref={chatEndRef} />
            </div>
        </div>
         <div className="sticky bottom-0 w-full flex justify-center z-20">
            <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
                 <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;