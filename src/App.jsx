import React, { useState } from "react";
import { askLoveAI } from "./services/aiService";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [hearts, setHearts] = useState(125);
  const [userProfile, setUserProfile] = useState({ name: "Linh", birthday: "2001-03-12", status: "Độc thân" });
  
  // AI Chat State
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Chào buổi tối, Linh ♡ LUVIA ở đây để lắng nghe nhịp đập trái tim bạn. Hôm nay bạn đang vướng bận điều gì?" }
  ]);
  const [loading, setLoading] = useState(false);

  // Tarot Flip State
  const [flippedCard, setFlippedCard] = useState(null);
  const [tarotReading, setTarotReading] = useState("");

  // Match State
  const [matchData, setMatchData] = useState({ self: "Mai Anh", partner: "Minh", selfDob: "2001-03-12", partnerDob: "1999-11-08" });
  const [matchResult, setMatchResult] = useState(null);
  const [analyzingMatch, setAnalyzingMatch] = useState(false);

  // Handle Onboarding Submit
  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#180E29] via-[#0D0B14] to-[#08040C] text-white p-6 flex flex-col justify-center font-sans max-w-md mx-auto">
        <h1 className="font-serif text-3xl text-center text-[#E6CA65] tracking-widest mb-2">LUVIA</h1>
        <p className="text-center text-xs text-[#C8B6FF] mb-8 uppercase tracking-wider">Tạo Luvia Profile Của Bạn</p>
        
        <div className="space-y-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div>
            <label className="text-xs text-gray-300">Tên của bạn</label>
            <input 
              type="text" 
              value={userProfile.name} 
              onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2.5 text-sm mt-1 text-white focus:outline-none focus:border-[#E6CA65]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-300">Tình trạng mối quan hệ</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Đang yêu", "Vừa chia tay", "Đang thích ai đó", "Độc thân", "Muốn khám phá"].map((status) => (
                <button 
                  key={status}
                  onClick={() => setUserProfile({...userProfile, status})}
                  className={`p-2.5 text-xs rounded-xl border text-center transition-all ${userProfile.status === status ? "border-[#E6CA65] bg-[#E6CA65]/20 text-[#E6CA65]" : "border-white/10 bg-white/5 text-gray-300"}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setHasCompletedOnboarding(true)}
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#E6CA65] to-[#F4A8C4] text-black font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Hoàn Thành Profile
          </button>
        </div>
      </div>
    );
  }

  // Handle Tarot Draw
  const handleTarotDraw = async (index) => {
    setFlippedCard(index);
    setLoading(true);
    const result = await askLoveAI("Tôi vừa rút được lá bài THE LOVERS trong bói Tarot tình yêu. Hãy đưa ra giải mã 3 câu sâu sắc, lãng mạn và tinh tế.", userProfile);
    setTarotReading(result);
    setLoading(false);
  };

  // Handle Match Analysis
  const handleRunMatch = () => {
    setAnalyzingMatch(true);
    setTimeout(() => {
      setMatchResult({
        score: 87,
        attraction: 94,
        communication: 76,
        emotional: 89,
        chemistry: 96,
        longTerm: 72,
        insight: "Hai bạn có sự thu hút mãnh liệt từ cái nhìn đầu tiên. Cần chú ý lắng nghe chân thành hơn trong các cuộc trò chuyện hàng ngày để duy trì thấu hiểu lâu dài."
      });
      setAnalyzingMatch(false);
    }, 1800);
  };

  // Handle Send AI Message
  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || chatInput;
    if (!prompt || hearts < 5) return;
    
    setHearts(prev => prev - 5);
    const newMessages = [...messages, { sender: "user", text: prompt }];
    setMessages(newMessages);
    setChatInput("");
    setLoading(true);

    const aiResponse = await askLoveAI(prompt, userProfile);
    setMessages([...newMessages, { sender: "ai", text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#180E29] via-[#0D0B14] to-[#08040C] text-white font-sans max-w-md mx-auto relative pb-20 shadow-2xl">
      
      {/* 1. TODAY TAB */}
      {activeTab === "today" && (
        <div className="p-5 space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-white">Chào buổi tối, {userProfile.name} ♡</h2>
            <p className="text-xs text-[#C8B6FF] mt-1">Hôm nay, nạp năng lượng cho trái tim của bạn.</p>
          </div>

          {/* Core Gauge */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#F4A8C4]/10 rounded-full blur-2xl"></div>
            <p className="text-xs uppercase tracking-widest text-[#E6CA65] mb-2 font-serif">Today's Love Energy</p>
            <div className="text-5xl font-serif text-white my-3">82%</div>
            
            <div className="grid grid-cols-4 gap-2 my-4 pt-4 border-t border-white/10 text-center">
              <div>
                <span className="text-[10px] text-gray-400 block">Tình yêu</span>
                <span className="text-sm font-semibold text-[#F4A8C4]">86</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Sức hút</span>
                <span className="text-sm font-semibold text-[#E6CA65]">92</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Giao tiếp</span>
                <span className="text-sm font-semibold text-[#C8B6FF]">71</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Cảm xúc</span>
                <span className="text-sm font-semibold text-rose-300">78</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 italic">"Sức hút của bạn đang rất cao, hãy tự tin thể hiện cảm xúc thật."</p>
          </div>

          {/* Entrance Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveTab("tarot")} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-[#E6CA65]/50 transition">
              <span className="text-lg">🔮</span>
              <p className="text-sm font-medium mt-1">Tarot Tình Yêu</p>
            </button>
            <button onClick={() => setActiveTab("match")} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-[#F4A8C4]/50 transition">
              <span className="text-lg">💖</span>
              <p className="text-sm font-medium mt-1">Love Match</p>
            </button>
            <button onClick={() => setActiveTab("ai")} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-[#C8B6FF]/50 transition">
              <span className="text-lg">✨</span>
              <p className="text-sm font-medium mt-1">Love AI Companion</p>
            </button>
            <button onClick={() => setActiveTab("me")} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-white/30 transition">
              <span className="text-lg">📜</span>
              <p className="text-sm font-medium mt-1">Tử Vi & Horoscope</p>
            </button>
          </div>
        </div>
      )}

      {/* 2. TAROT TAB */}
      {activeTab === "tarot" && (
        <div className="p-5 space-y-5">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-[#E6CA65]">Tarot Tình Yêu</h2>
            <p className="text-xs text-gray-300 mt-1">Hãy nghĩ về người ấy... Chọn một lá bài.</p>
          </div>

          {/* Cards Ceremony */}
          <div className="flex justify-center gap-3 my-6">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx}
                onClick={() => handleTarotDraw(idx)}
                className={`w-24 h-38 h-36 rounded-xl border border-[#E6CA65]/40 bg-gradient-to-br from-[#180E29] to-black flex items-center justify-center cursor-pointer transition-all duration-500 shadow-xl ${flippedCard === idx ? "bg-white/10 border-[#E6CA65]" : "hover:-translate-y-2"}`}
              >
                {flippedCard === idx ? (
                  <span className="text-xs text-[#E6CA65] font-serif p-2 text-center">THE LOVERS</span>
                ) : (
                  <div className="w-16 h-28 border border-white/10 rounded-lg flex items-center justify-center text-[#E6CA65]/40 text-xs font-serif">LUVIA</div>
                )}
              </div>
            ))}
          </div>

          {/* Reading Result */}
          {flippedCard !== null && (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-[#E6CA65]/20 text-[#E6CA65]">LOVE</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F4A8C4]/20 text-[#F4A8C4]">ATTRACTION</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C8B6FF]/20 text-[#C8B6FF]">CHOICE</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-200">{loading ? "LUVIA đang đọc lá bài của bạn..." : tarotReading}</p>

              {/* Follow-up Chips */}
              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <p className="text-[10px] text-gray-400">Gợi ý hỏi tiếp AI:</p>
                {["Anh ấy có nhớ tôi không?", "Chúng tôi còn cơ hội không?", "Tôi nên chủ động không?"].map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setActiveTab("ai"); handleSendMessage(q); }}
                    className="block w-full text-left text-xs p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#C8B6FF]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. LOVE AI TAB */}
      {activeTab === "ai" && (
        <div className="p-4 flex flex-col h-[88vh]">
          {/* Header Status */}
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg text-[#E6CA65]">Love AI Companion</h3>
              <p className="text-[10px] text-gray-400">Love Profile: {userProfile.status} • Hearts: {hearts}♡</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#E6CA65]/20 text-[#E6CA65] border border-[#E6CA65]/30">Ask AI · 5♡</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${m.sender === "user" ? "bg-[#E6CA65] text-black font-medium rounded-br-none" : "bg-white/10 backdrop-blur-md text-gray-100 rounded-bl-none border border-white/10"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-gray-400 italic">LUVIA đang lắng nghe và phác thảo câu trả lời...</p>}
          </div>

          {/* Quick Chips */}
          <div className="flex gap-2 overflow-x-auto py-2">
            {["Anh ấy đang nghĩ gì về tôi?", "Tôi có nên nhắn trước không?", "Mối quan hệ này sẽ đi đâu?"].map((chip, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-[#E6CA65]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2 pt-2">
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Hỏi LUVIA về chuyện tình cảm..." 
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#E6CA65]"
            />
            <button 
              onClick={() => handleSendMessage()}
              className="bg-[#E6CA65] text-black px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition"
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* 4. MATCH TAB */}
      {activeTab === "match" && (
        <div className="p-5 space-y-5">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-[#F4A8C4]">Love Match</h2>
            <p className="text-xs text-gray-300 mt-1">Kiểm tra chỉ số thấu hiểu giữa bạn và người ấy</p>
          </div>

          {/* Inputs */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" 
                value={matchData.self} 
                onChange={(e) => setMatchData({...matchData, self: e.target.value})}
                className="bg-white/10 border border-white/10 p-2 text-xs rounded-lg text-white" 
                placeholder="Tên bạn"
              />
              <input 
                type="text" 
                value={matchData.partner} 
                onChange={(e) => setMatchData({...matchData, partner: e.target.value})}
                className="bg-white/10 border border-white/10 p-2 text-xs rounded-lg text-white" 
                placeholder="Tên người ấy"
              />
            </div>
            <button 
              onClick={handleRunMatch}
              className="w-full py-2.5 bg-gradient-to-r from-[#F4A8C4] to-[#C8B6FF] text-black text-xs font-semibold rounded-xl hover:opacity-90 transition"
            >
              {analyzingMatch ? "Đang kết nối chòm sao..." : "Phân Tích Độ Tương Hợp"}
            </button>
          </div>

          {/* Match Result Display */}
          {matchResult && (
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center space-y-4">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Soul Connection</span>
              <div className="text-4xl font-serif text-[#F4A8C4]">{matchResult.score}%</div>

              <div className="space-y-2 text-xs text-left pt-2 border-t border-white/10">
                <div className="flex justify-between"><span>Attraction</span><span>{matchResult.attraction}%</span></div>
                <div className="flex justify-between"><span>Communication</span><span>{matchResult.communication}%</span></div>
                <div className="flex justify-between"><span>Emotional</span><span>{matchResult.emotional}%</span></div>
                <div className="flex justify-between"><span>Chemistry</span><span>{matchResult.chemistry}%</span></div>
              </div>

              <p className="text-xs italic text-gray-300 text-left pt-2 border-t border-white/10">{matchResult.insight}</p>

              {/* 9:16 Share Preview CTA */}
              <button className="w-full py-2 bg-white/10 border border-[#F4A8C4]/40 text-[#F4A8C4] rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-white/20 transition">
                ✨ Share our Love Match ♡ (9:16 Story Card)
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. ME / PROFILE TAB */}
      {activeTab === "me" && (
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E6CA65] to-[#F4A8C4] p-0.5">
              <div className="w-full h-full bg-[#180E29] rounded-full flex items-center justify-center font-serif text-lg text-[#E6CA65]">
                {userProfile.name[0]}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg">{userProfile.name}</h3>
              <p className="text-xs text-gray-400">{userProfile.status} • {hearts}♡ Hearts</p>
            </div>
          </div>

          {/* LUVIA+ Premium Card */}
          <div className="bg-gradient-to-r from-[#E6CA65]/20 via-[#F4A8C4]/20 to-[#C8B6FF]/20 border border-[#E6CA65]/40 p-5 rounded-2xl relative overflow-hidden">
            <span className="text-[10px] bg-[#E6CA65] text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">LUVIA+ PREMIUM</span>
            <h4 className="font-serif text-lg mt-2 text-[#E6CA65]">Khai Mở Trọn Vẹn Tình Yêu</h4>
            <ul className="text-xs space-y-1 mt-2 text-gray-200">
              <li>• Unlimited Love AI Chat</li>
              <li>• Full Tarot & Compatibility Analysis</li>
              <li>• Ad-Free Experience</li>
            </ul>
            <button className="mt-4 w-full py-2 bg-[#E6CA65] text-black font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition">
              Nâng cấp VIP · ₫499,000 / tháng
            </button>
          </div>

          {/* Premium Readings Shop */}
          <div className="space-y-2">
            <p className="text-xs font-serif text-[#E6CA65] uppercase tracking-wider">Premium Reading (Một lần)</p>
            {[
              { title: "Love Future Reading", price: "₫50,000" },
              { title: "Will my ex come back?", price: "₫100,000" },
              { title: "Full Tử Vi Tình Duyên", price: "₫499,000" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
                <span>{item.title}</span>
                <button className="px-3 py-1 bg-white/10 rounded-lg text-[#E6CA65] hover:bg-white/20 transition">{item.price}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D0B14]/90 backdrop-blur-lg border-t border-white/10 flex justify-around py-3 text-[11px] z-50">
        {[
          { id: "today", label: "Today", icon: "🌙" },
          { id: "tarot", label: "Tarot", icon: "🃏" },
          { id: "ai", label: "Love AI", icon: "✨", highlight: true },
          { id: "match", label: "Match", icon: "💖" },
          { id: "me", label: "Me", icon: "👤" },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition ${activeTab === tab.id ? "text-[#E6CA65]" : "text-gray-400"} ${tab.highlight ? "font-semibold text-[#F4A8C4]" : ""}`}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
