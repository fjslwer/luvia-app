import React, { useState } from 'react';
import { askLoveAI } from './services/aiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('loveAI');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào Linh, hôm nay các vì sao thì thầm điều gì với trái tim bạn? ♡' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMsg.trim() || loading) return;
    const userText = inputMsg;
    setInputMsg('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const reply = await askLoveAI(userText, { name: 'Linh', status: 'Độc thân' });
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0914] text-[#E2D9F3] flex flex-col justify-between max-w-md mx-auto relative overflow-hidden border-x border-[#D4AF37]/20 shadow-2xl">
      {/* 背景奢华微光 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-900/20 blur-[100px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600/10 blur-[90px] pointer-events-none rounded-full"></div>

      {/* 顶栏 Header */}
      <header className="px-6 pt-10 pb-4 flex justify-between items-center border-b border-[#D4AF37]/15 bg-[#0B0914]/80 backdrop-blur-md z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-gold-gradient font-serif">LUVIA</h1>
          <p className="text-[10px] text-[#A294C2] tracking-wider uppercase font-light">Celestial Love Companion</p>
        </div>
        <div className="flex items-center space-x-2 bg-[#1A132B] px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-inner">
          <span className="text-xs text-[#D4AF37]">✨ 120 Hearts</span>
        </div>
      </header>

      {/* 主内容区域 Body */}
      <main className="flex-1 p-5 overflow-y-auto space-y-4 z-10">
        {activeTab === 'loveAI' && (
          <div className="flex flex-col h-full justify-between">
            {/* 消息对话列表 */}
            <div className="space-y-4 mb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-900/80 to-[#2A1B4E] text-white border border-purple-500/30 shadow-lg rounded-br-none' 
                      : 'glass-card text-[#E2D9F3] rounded-bl-none border border-[#D4AF37]/20 shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-card px-4 py-3 rounded-2xl text-xs text-[#A294C2] animate-pulse flex items-center space-x-2">
                    <span>LUVIA đang lắng nghe những vì sao...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab !== 'loveAI' && (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 glass-card rounded-2xl p-6 border border-[#D4AF37]/20">
            <span className="text-3xl">✨</span>
            <h3 className="text-lg font-serif text-gold-gradient">Tính năng sắp ra mắt</h3>
            <p className="text-xs text-[#A294C2]">Trải nghiệm Tarot và Matchmaking đang được chau chuốt tốt nhất cho bạn ♡</p>
          </div>
        )}
      </main>

      {/* AI 输入框 Input Area */}
      {activeTab === 'loveAI' && (
        <div className="p-4 bg-[#0B0914]/90 backdrop-blur-lg border-t border-[#D4AF37]/15 z-10">
          <div className="flex items-center space-x-2 bg-[#1A132B] border border-[#D4AF37]/30 rounded-full px-4 py-2 shadow-inner focus-within:border-[#D4AF37]/80 transition-all">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chia sẻ với LUVIA điều bạn vướng bận..."
              className="bg-transparent flex-1 text-sm text-white placeholder-[#7A6B99] focus:outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0B0914] px-4 py-1.5 rounded-full text-xs font-semibold shadow-md active:scale-95 transition-transform"
            >
              Gửi ✨
            </button>
          </div>
        </div>
      )}

      {/* 5-Tab 底部导航 Bottom Nav */}
      <nav className="bg-[#08060F] border-t border-[#D4AF37]/20 px-6 py-3 flex justify-between items-center z-20">
        {[
          { id: 'today', label: 'Today', icon: '🌙' },
          { id: 'tarot', label: 'Tarot', icon: '🔮' },
          { id: 'loveAI', label: 'Love AI', icon: '💎' },
          { id: 'match', label: 'Match', icon: '✨' },
          { id: 'me', label: 'Me', icon: '👑' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 transition-all ${
              activeTab === tab.id ? 'text-[#D4AF37] scale-110' : 'text-[#6C5E8A] hover:text-[#A294C2]'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[10px] font-medium tracking-wider uppercase">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
