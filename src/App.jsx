import { askLoveAIStream } from './services/aiService';

const handleSend = async () => {
  if (!inputMsg.trim() || loading) return;
  const userText = inputMsg;
  setInputMsg('');
  
  // 先插入用户消息和一条空的 AI 占位消息
  setMessages(prev => [
    ...prev, 
    { role: 'user', text: userText },
    { role: 'assistant', text: '' }
  ]);
  setLoading(true);

  // 流式接收文字并实时刷到页面上
  await askLoveAIStream(userText, userProfile, (currentText) => {
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1].text = currentText;
      return updated;
    });
  });

  setLoading(false);
};
