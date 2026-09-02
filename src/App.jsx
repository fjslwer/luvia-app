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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
    <div className="relative min-h-screen bg-[#07050E] text-[#E2D9F3] flex flex-col justify-between max-w-md mx-auto overflow-hidden border-x border-[#D4AF37]/20 shadow-[0_0_80px_rgba(147,51,234,0.15)] font-sans">
      
      {/* 1. 星空粒子与光晕背景 (Celestial Glow Background) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-to-b from-purple-900/30 via-indigo-900/10 to-transparent blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-0 w-[250px] h-[250px] bg-amber-600/10 blur-[100px] pointer-events-none rounded-full"></div>
      
      {/* 动态星芒粒子遮罩 */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* 2. 顶栏 Header (Celestial Luxury Bar) */}
      <header className="px-6 pt-12 pb-5 flex justify-between items-end border-b border-[#D4AF37]/20 bg-[#07050E]/80 backdrop-blur-xl z-20 sticky top-0">
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-[#D4AF37]">✨</span>
            <h1 className="text-2xl font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#AA7C11] font-serif">LUVIA</h1>
          </div>
          <p className="text-[9px] text-[#A294C2] tracking-[0.2em] uppercase font-light mt-0.5">Celestial Love Companion</p>
        </div>
        
        {/* 心形代币/Hearts 计数器 */}
        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-[#1A112C] to-[#25173E] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <span className="text-xs animate-pulse">💎</span>
          <span className="text-xs font-semibold text-[#FFF6D6] tracking-wider">120</span>
        </div>
      </header>

      {/* 3. 主内容区 (Main Content) */}
      <main className="flex-1 p-5 overflow-y-auto space-y-5 z-10 scrollbar-none">
        {activeTab === 'loveAI' && (
          <div className="flex flex-col min-h-full justify-between space-y-4">
            
            {/* 顶部分性/灵性提示卡片 */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/40 border border-[#D4AF37]/20 backdrop-blur-md flex items-center space-x-3 shadow-lg">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-sm shadow-inner flex-shrink-0">
                🔮
              </div>
              <div>
                <p className="text-xs text-[#E2D9F3] font-medium">Trí tuệ Tình yêu Cung Hoàng Đạo</p>
                <p className="text-[10px] text-[#A294C2] mt-0.5">LUVIA đang thấu cảm cùng tần số năng lượng của bạn</p>
              </div>
            </div>

            {/* 消息对话列表 */}
            <div className="space-y-4 flex-1">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-xs leading-relaxed tracking-wide ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-[#2A164D] to-[#3B1E6D] text-white border border-purple-400/30 shadow-[0_4px_20px_rgba(147,51,234,0.2)] rounded-br-none' 
                      : 'bg-white/[0.04] backdrop-blur-xl text-[#E2D9F3] border border-[#D4AF37]/25 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.03] backdrop-blur-md px-5 py-3.5 rounded-2xl border border-[#D4AF37]/20 text-xs text-[#A294C2] flex items-center space-x-2 rounded-bl-none shadow-md">
                    <span className="animate-spin text-sm">✨</span>
                    <span className="tracking-wider">LUVIA đang kết nối với các vì sao...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* 其它 Tab 占位样式 */}
        {activeTab !== 'loveAI' && (
          <div className="flex flex-col items-center justify-center h-80 text-center space-y-4 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-[#D4AF37]/25 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/40 text-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              ✨
            </div>
            <h3 className="text-lg font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6D6] to-[#D4AF37]">
              Trải Nghiệm Nghi Thức
            </h3>
            <p className="text-xs text-[#A294C2] leading-relaxed max-w-xs">
              Tính năng Tarot & Quẻ Tình Yêu đang được hoàn thiện với giao diện nghi thức huyền bí nhất ♡
            </p>
          </div>
        )}
      </main>

      {/* 4. 输入框 (Luxury Input Bar) */}
      {activeTab === 'loveAI' && (
        <div className="p-4 bg-[#07050E]/90 backdrop-blur-2xl border-t border-[#D4AF37]/20 z-20">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-[#140D24] to-[#1C1233] border border-[#D4AF37]/35 rounded-full px-4 py-2.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] focus-within:border-[#D4AF37] transition-all">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chia sẻ góc khuất trái tim bạn..."
              className="bg-transparent flex-1 text-xs text-white placeholder-[#7A6B99] focus:outline-none tracking-wide"
            />
            <button 
              onClick={handleSend}
              className="bg-gradient-to-r from-[#FFF6D6] via-[#D4AF37] to-[#AA7C11] text-[#07050E] px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95 transition-all"
            >
              Gửi ✨
            </button>
          </div>
        </div>
      )}

      {/* 5. 底部 5-Tab 导航 (Celestial Bottom Navigation) */}
      <nav className="bg-[#05030A] border-t border-[#D4AF37]/20 px-6 py-3.5 flex justify-between items-center z-30">
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
                ? 'text-[#D4AF37] scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]' 
                : 'text-[#6C5E8A] hover:text-[#A294C2]'
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
