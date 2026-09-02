import React, { useState, useEffect, useRef } from 'react';
import { askLoveAI } from './services/aiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('loveAI');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào Linh, hôm nay các vì sao thì thầm điều gì với trái tim bạn? ♡' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
    <div className="relative min-h-screen bg-[#080511] text-[#E6E1F3] flex flex-col justify-between max-w-md mx-auto overflow-hidden border-x border-[#D4AF37]/20 shadow-[0_0_100px_rgba(100,40,180,0.2)]">
      
      {/* 极光与深紫背景粒子 */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-gradient-to-b from-purple-900/40 via-indigo-900/20 to-transparent blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-[-50px] w-[280px] h-[280px] bg-amber-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      {/* 顶栏 Header */}
      <header className="px-6 pt-12 pb-5 flex justify-between items-end border-b border-[#D4AF37]/20 bg-[#080511]/80 backdrop-blur-2xl z-20 sticky top-0">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#D4AF37]">✦</span>
            <h1 className="text-2xl font-extrabold tracking-[0.25em] gold-gradient-text font-serif-luxury">LUVIA</h1>
          </div>
          <p className="text-[9px] text-[#A699C7] tracking-[0.25em] uppercase font-light mt-0.5">Celestial Love Companion</p>
        </div>
        
        <div className="flex items-center space-x-1.5 bg-[#170E2B] px-4 py-1.5 rounded-full gold-border-glow">
          <span className="text-xs animate-pulse">💎</span>
          <span className="text-xs font-semibold text-[#FFF8DC] tracking-wider">120</span>
        </div>
      </header>

      {/* 主界面内容 */}
      <main className="flex-1 p-5 overflow-y-auto space-y-5 z-10">
        {activeTab === 'loveAI' && (
          <div className="flex flex-col min-h-full justify-between space-y-4">
            
            {/* 顶部分层提示卡 */}
            <div className="p-4 rounded-2xl glass-panel flex items-center space-x-3.5 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-base shadow-inner flex-shrink-0">
                🔮
              </div>
              <div>
                <p className="text-xs text-[#E6E1F3] font-semibold tracking-wide">Tần Số Tình Yêu Chiêm Tinh</p>
                <p className="text-[10px] text-[#A699C7] mt-0.5">LUVIA đang thấu cảm năng lượng hoàng đạo của bạn</p>
              </div>
            </div>

            {/* 对话列表 */}
            <div className="space-y-4 flex-1">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-xs leading-relaxed tracking-wide ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-[#2F1752] to-[#42207A] text-white border border-purple-400/40 shadow-[0_8px_25px_rgba(100,40,180,0.3)] rounded-br-none' 
                      : 'glass-panel text-[#E6E1F3] rounded-bl-none shadow-xl'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="glass-panel px-5 py-3.5 rounded-2xl text-xs text-[#A699C7] flex items-center space-x-2 rounded-bl-none">
                    <span className="animate-spin text-sm">✦</span>
                    <span className="tracking-wider">LUVIA đang chiêm nghiệm năng lượng...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* 占位 Tab */}
        {activeTab !== 'loveAI' && (
          <div className="flex flex-col items-center justify-center h-80 text-center space-y-4 glass-panel rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/40 text-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              ✦
            </div>
            <h3 className="text-lg font-serif-luxury tracking-widest gold-gradient-text">
              Nghi Thức Hoàng Đạo
            </h3>
            <p className="text-xs text-[#A699C7] leading-relaxed max-w-xs">
              Tính năng Tarot & Matchmaking đang được chau chuốt tinh xảo ♡
            </p>
          </div>
        )}
      </main>

      {/* 底部输入框 */}
      {activeTab === 'loveAI' && (
        <div className="p-4 bg-[#080511]/90 backdrop-blur-2xl border-t border-[#D4AF37]/20 z-20">
          <div className="flex items-center space-x-2 bg-[#120A24] border border-[#D4AF37]/40 rounded-full px-4 py-2.5 shadow-inner focus-within:border-[#D4AF37] transition-all">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chia sẻ suy nghĩ của bạn với LUVIA..."
              className="bg-transparent flex-1 text-xs text-white placeholder-[#6E618A] focus:outline-none tracking-wide"
            />
            <button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#997312] text-[#080511] px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95 transition-all"
            >
              Gửi ✦
            </button>
          </div>
        </div>
      )}

      {/* 底部 5-Tab 导航 */}
      <nav className="bg-[#05030C] border-t border-[#D4AF37]/20 px-6 py-3.5 flex justify-between items-center z-30">
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
            className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-[#D4AF37] scale-110 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]' 
                : 'text-[#5C4E78] hover:text-[#A699C7]'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="text-[9px] font-semibold tracking-[0.15em] uppercase">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
