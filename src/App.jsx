import React, { useState, useEffect, useRef } from 'react';
import { askLoveAIStream } from './services/aiService';

export default function App() {
  const [activeTab, setActiveTab] = useState('loveAI');
  const [userProfile] = useState({ name: 'Linh', status: 'Độc thân', sign: 'Bọ Cạp' });

  // Tab 1: Love AI State
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Chào Linh, hôm nay các vì sao thì thầm điều gì với trái tim bạn? ♡' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Tab 2: Tarot State
  const [isFlipped, setIsFlipped] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);

  // Tab 4: Match State
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

  // AI 流式对话处理
  const handleSend = async () => {
    if (!inputMsg.trim() || loading) return;
    const userText = inputMsg;
    setInputMsg('');
    
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: userText },
      { role: 'assistant', text: '' }
    ]);
    setLoading(true);

    await askLoveAIStream(userText, userProfile, (currentText) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = currentText;
        return updated;
      });
    });

    setLoading(false);
  };

  const handleDrawTarot = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setDrawnCard(randomCard);
      setIsFlipped(true);
    }, 250);
  };

  const handleCalculateMatch = () => {
    const score = Math.floor(Math.random() * 20) + 80;
    setMatchResult({
      score,
      advice: `Chỉ số hòa hợp giữa ${userProfile.sign} và ${partnerSign} là ${score}%. Năng lượng hoàng đạo cho thấy sự hút nhau tự nhiên nhưng cần thấu hiểu để đồng điệu.`
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#07040F',
      color: '#E6E1F3',
      maxWidth: '430px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: '1px solid rgba(212, 175, 55, 0.2)',
      borderRight: '1px solid rgba(212, 175, 55, 0.2)',
      boxShadow: '0 0 80px rgba(100, 40, 180, 0.25)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* 顶芒光晕背景 */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '360px',
        height: '360px',
        background: 'radial-gradient(circle, rgba(147,51,234,0.25) 0%, rgba(7,4,15,0) 70%)',
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <header style={{
        padding: '40px 20px 15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        backgroundColor: 'rgba(7, 4, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 20,
        position: 'sticky',
        top: 0
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#D4AF37', fontSize: '12px' }}>✦</span>
            <h1 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: '800',
              letterSpacing: '3px',
              background: 'linear-gradient(135deg, #FFF8DC 0%, #D4AF37 50%, #AA7C11 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>LUVIA</h1>
          </div>
          <p style={{ margin: '2px 0 0 0', fontSize: '9px', color: '#A699C7', letterSpacing: '2px', textTransform: 'uppercase' }}>Celestial Love Companion</p>
        </div>
        
        <div style={{
          backgroundColor: '#160B2B',
          padding: '6px 14px',
          borderRadius: '20px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '12px' }}>💎</span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFF8DC' }}>120</span>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto', zIndex: 10 }}>
        
        {/* TAB 1: TODAY */}
        {activeTab === 'today' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '20px',
            padding: '20px',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '10px', color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' }}>Dự Báo Hôm Nay</span>
              <span style={{ fontSize: '11px', color: '#A699C7' }}>{userProfile.sign}</span>
            </div>
            <h2 style={{ fontSize: '16px', color: '#D4AF37', marginTop: 0 }}>Tần Số Trái Tim & Hoàng Đạo</h2>
            <p style={{ fontSize: '12px', color: '#E6E1F3', lineHeight: '1.6' }}>
              Hôm nay Mặt Trăng di chuyển qua cung hoàng đạo của bạn, mang lại trực giác mạnh mẽ trong tình cảm. Hãy lắng nghe cảm xúc chân thật nhất của bản thân.
            </p>
            <div style={{ paddingTop: '12px', marginTop: '12px', borderTop: '1px solid rgba(212, 175, 55, 0.15)', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Chỉ số may mắn: <strong style={{ color: '#D4AF37' }}>88%</strong></span>
              <span>Màu may mắn: <strong style={{ color: '#D4AF37' }}>Tím Thạch Anh</strong></span>
            </div>
          </div>
        )}

        {/* TAB 2: TAROT */}
        {activeTab === 'tarot' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '16px', color: '#D4AF37', margin: 0 }}>Rút Quẻ Tarot Định Mệnh</h2>
              <p style={{ fontSize: '11px', color: '#A699C7', margin: '4px 0 0 0' }}>Tập trung suy nghĩ về câu hỏi tình cảm của bạn</p>
            </div>

            <div 
              onClick={handleDrawTarot}
              style={{
                width: '170px',
                height: '270px',
                borderRadius: '16px',
                background: isFlipped ? 'linear-gradient(180deg, #2B154C 0%, #120A24 100%)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {isFlipped && drawnCard ? (
                <div>
                  <span style={{ fontSize: '28px' }}>✨</span>
                  <h3 style={{ fontSize: '14px', color: '#FFF8DC', margin: '10px 0 6px 0' }}>{drawnCard.name}</h3>
                  <p style={{ fontSize: '10px', color: '#A699C7', lineHeight: '1.5' }}>{drawnCard.desc}</p>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '36px' }}>🔮</span>
                  <p style={{ fontSize: '11px', color: '#D4AF37', marginTop: '10px' }}>Chạm để rút lá bài</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LOVE AI */}
        {activeTab === 'loveAI' && (
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', gap: '15px' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>🔮</div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>Tần Số Tình Yêu Chiêm Tinh</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#A699C7' }}>LUVIA đang thấu cảm năng lượng của bạn</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, #2E1650 0%, #43217B 100%)' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: msg.role === 'user' ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(212, 175, 55, 0.2)',
                    color: '#E6E1F3',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* TAB 4: MATCH */}
        {activeTab === 'match' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '16px', color: '#D4AF37', margin: 0 }}>Bói Độ Hòa Hợp Hoàng Đạo</h2>
              <p style={{ fontSize: '11px', color: '#A699C7', margin: '4px 0 0 0' }}>Khám phá sự tương thích giữa hai chòm sao</p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#A699C7' }}>Bạn</span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#D4AF37' }}>{userProfile.sign}</p>
                </div>
                <span style={{ color: '#D4AF37' }}>✦</span>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#A699C7' }}>Đối Phương</span>
                  <select 
                    value={partnerSign} 
                    onChange={(e) => setPartnerSign(e.target.value)}
                    style={{
                      display: 'block',
                      marginTop: '4px',
                      backgroundColor: '#120A24',
                      color: '#FFF',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '11px'
                    }}
                  >
                    {['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleCalculateMatch}
                style={{
                  background: 'linear-gradient(135deg, #FFF8DC 0%, #D4AF37 50%, #AA7C11 100%)',
                  color: '#07040F',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Xem Kết Quả Hòa Hợp ✨
              </button>

              {matchResult && (
                <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(212, 175, 55, 0.2)', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#D4AF37', margin: 0 }}>{matchResult.score}%</p>
                  <p style={{ fontSize: '11px', color: '#E6E1F3', marginTop: '6px', lineHeight: '1.5' }}>{matchResult.advice}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ME */}
        {activeTab === 'me' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '20px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              margin: '0 auto 12px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>👑</div>
            <h3 style={{ margin: 0, fontSize: '15px', color: '#FFF8DC' }}>{userProfile.name}</h3>
            <p style={{ margin: '4px 0 16px 0', fontSize: '11px', color: '#A699C7' }}>{userProfile.sign} • {userProfile.status}</p>

            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '12px', fontSize: '11px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Loại tài khoản:</span>
                <span style={{ color: '#D4AF37' }}>Premium Member</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>LUVIA Hearts:</span>
                <span style={{ color: '#D4AF37' }}>120 💎</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Input Field (Love AI Only) */}
      {activeTab === 'loveAI' && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(7, 4, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          zIndex: 20
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#120A24',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '25px',
            padding: '6px 6px 6px 14px'
          }}>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chia sẻ suy nghĩ của bạn với LUVIA..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                flex: 1,
                fontSize: '11px',
                color: '#FFF'
              }}
            />
            <button 
              onClick={handleSend}
              style={{
                background: 'linear-gradient(135deg, #FFF8DC 0%, #D4AF37 50%, #AA7C11 100%)',
                color: '#07040F',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Gửi ✦
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav style={{
        backgroundColor: '#040208',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 30
      }}>
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
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#D4AF37' : '#5C4E78',
              transform: activeTab === tab.id ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '16px' }}>{tab.icon}</span>
            <span style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
