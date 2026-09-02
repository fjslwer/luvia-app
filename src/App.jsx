import React, { useState, useEffect, useRef } from 'react';
import { askLoveAI } from './services/aiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('loveAI');
  const [userProfile, setUserProfile] = useState({ name: 'Linh', status: 'Độc thân', sign: 'Bọ Cạp' });

  // Tab 1: Love AI Chat State
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào Linh, hôm nay các vì sao thì thầm điều gì với trái tim bạn? ♡' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Tab 2: Tarot State
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);

  // Tab 3: Match State
  const [partnerSign, setPartnerSign] = useState('Kim Ngưu');
  const [matchResult, setMatchResult] = useState(null);

  const tarotCards = [
    { name: 'The Lovers', desc: 'Thấu hiểu, gắn kết sâu sắc, sự lựa chọn của trái tim.' },
    { name: 'The Star', desc: 'Hy vọng, sự chữa lành, định mệnh đang mỉm cười.' },
    { name: 'The Sun', desc: 'Rạng rỡ, chân thành, năng lượng tích cực ngập tràn.' },
    { name: 'Wheel of Fortune', desc: 'Vòng quay số phận, sự chuyển biến định mệnh trong tình yêu.' }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // AI Chat Handler
  const handleSend = async () => {
    if (!inputMsg.trim() || loading) return;
    const userText = inputMsg;
    setInputMsg('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const reply = await askLoveAI(userText, userProfile);
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡' }]);
    } finally {
      setLoading(false);
    }
  };

  // Draw Tarot Handler
  const handleDrawTarot = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setDrawnCard(randomCard);
      setIsFlipped(true);
    }, 300);
  };

  // Calculate Match Handler
  const handleCalculateMatch = () => {
    const score = Math.floor(Math.random() * 20) + 80;
    setMatchResult({
      score,
      advice: `Chỉ số hòa hợp giữa ${userProfile.sign} và ${partnerSign} là ${score}%. Năng lượng hoàng đạo cho thấy sự hút nhau tự nhiên nhưng cần thấu hiểu để đồng điệu.`
    });
  };

  return (
    <div className="relative min-h-screen bg-[#080511] text-[#E6E1F3] flex flex-col justify-between max-w-md mx-auto overflow-hidden border-x border-[#D4AF37]/20 shadow-[0_0_100px_rgba(100,40,180,0.2)] font-sans">
      
      {/* 光晕与夜空背景 */}
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

      {/* 主界面切换区域 */}
      <main className="flex-1 p-5 overflow-y-auto space-y-5 z-10">
        
        {/* TAB 1: TODAY (Daily Horoscope & Energy) */}
        {activeTab === 'today' && (
          <div className="space-y-4">
            <div className="glass-panel p-6 rounded-3xl space-y-3 shadow-2xl">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase">Dự Báo Hôm Nay</span>
                <span className="text-xs text-[#A699C7]">{userProfile.sign}</span>
              </div>
              <h2 className="text-lg font-serif-luxury gold-gradient-text">Tần Số Trái Tim & Hoàng Đạo</h2>
              <p className="text-xs text-[#E6E1F3] leading-relaxed">
                Hôm nay Mặt Trăng di chuyển qua cung hoàng đạo của bạn, mang lại trực giác mạnh mẽ trong tình cảm. Hãy lắng nghe cảm xúc chân thật nhất của bản thân.
              </p>
              <div className="pt-2 flex justify-between border-t border-[#D4AF37]/20 text-xs">
                <span>Chỉ số may mắn: <strong className="text-[#D4AF37]">88%</strong></span>
                <span>Màu may mắn: <strong className="text-[#D4AF37]">Tím Thạch Anh</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAROT (Tarot Reading) */}
        {activeTab === 'tarot' && (
          <div className="flex flex-col items-center space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-serif-luxury gold-gradient-text">Rút Quẻ Tarot Định Mệnh</h2>
              <p className="text-xs text-[#A699C7]">Tập trung suy nghĩ về câu hỏi tình cảm của bạn</p>
            </div>

            <div 
              onClick={handleDrawTarot}
              className={`w-44 h-72 rounded-2xl glass-panel gold-border-glow flex flex-col items-center justify-center p-4 cursor-pointer transition-transform duration-500 hover:scale-105 shadow-2xl ${
                isFlipped ? 'bg-gradient-to-b from-[#2F1752] to-[#120A24]' : ''
              }`}
            >
              {isFlipped && drawnCard ? (
                <div className="text-center space-y-3 animate-fade-in">
                  <span className="text-3xl">✨</span>
                  <h3 className="text-sm font-serif-luxury text-[#FFF8DC]">{drawnCard.name}</h3>
                  <p className="text-[11px] text-[#A699C7] leading-relaxed">{drawnCard.desc}</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <span className="text-4xl">🔮</span>
                  <p className="text-xs text-[#D4AF37] font-medium">Chạm để rút lá bài</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LOVE AI (AI Consultation) */}
        {activeTab === 'loveAI' && (
          <div className="flex flex-col min-h-full justify-between space-y-4">
            <div className="p-4 rounded-2xl glass-panel flex items-center space-x-3.5 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-base shadow-inner flex-shrink-0">
                🔮
              </div>
              <div>
                <p className="text-xs text-[#E6E1F3] font-semibold tracking-wide">Tần Số Tình Yêu Chiêm Tinh</p>
                <p className="text-[10px] text-[#A699C7] mt-0.5">LUVIA đang thấu cảm năng lượng hoàng đạo của bạn</p>
              </div>
            </div>

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

        {/* TAB 4: MATCH (Love Matchmaking) */}
        {activeTab === 'match' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-serif-luxury gold-gradient-text">Bói Độ Hòa Hợp Hoàng Đạo</h2>
              <p className="text-xs text-[#A699C7]">Khám phá sự tương thích giữa hai chòm sao</p>
            </div>

            <div className="glass-panel p-5 rounded-3xl space-y-4 shadow-2xl">
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <span className="text-xs text-[#A699C7]">Bạn</span>
                  <p className="text-sm font-semibold text-[#D4AF37]">{userProfile.sign}</p>
                </div>
                <span className="text-lg text-[#D4AF37]">✦</span>
                <div className="text-center">
                  <span className="text-xs text-[#A699C7]">Đối Phương</span>
                  <select 
                    value={partnerSign} 
                    onChange={(e) => setPartnerSign(e.target.value)}
                    className="bg-[#120A24] text-xs text-white border border-[#D4AF37]/30 rounded-lg px-2 py-1 mt-1 focus:outline-none"
                  >
                    {['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleCalculateMatch}
                className="w-full bg-gradient-to-r from-[#FFF8DC] via-[#D4AF37] to-[#997312] text-[#080511] py-2.5 rounded-full text-xs font-bold tracking-wider shadow-lg active:scale-95 transition-all"
              >
                Xem Kết Quả Hòa Hợp ✨
              </button>

              {matchResult && (
                <div className="pt-3 border-t border-[#D4AF37]/20 text-center space-y-2">
                  <p className="text-2xl font-serif-luxury gold-gradient-text">{matchResult.score}%</p>
                  <p className="text-xs text-[#E6E1F3] leading-relaxed">{matchResult.advice}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ME (User Profile) */}
        {activeTab === 'me' && (
          <div className="space-y-4">
            <div className="glass-panel p-6 rounded-3xl space-y-4 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 mx-auto flex items-center justify-center text-2xl shadow-inner">
                👑
              </div>
              <div>
                <h3 className="text-base font-serif-luxury text-[#FFF8DC]">{userProfile.name}</h3>
                <p className="text-xs text-[#A699C7]">{userProfile.sign} • {userProfile.status}</p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 text-left space-y-3 text-xs">
                <div className="flex justify-between">
                  <span>Trạng thái tài khoản:</span>
                  <span className="text-[#D4AF37]">Thành viên Premium</span>
                </div>
                <div className="flex justify-between">
                  <span>Trái tim LUVIA Hearts:</span>
                  <span className="text-[#D4AF37]">120 💎</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* AI 输入框 (仅在 Love AI Tab 显示) */}
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

      {/* 5-Tab 底部导航 */}
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
