  // 流式 AI 响应处理，解决延迟慢的问题
  const handleSend = async () => {
    if (!inputMsg.trim() || loading) return;
    const userText = inputMsg;
    setInputMsg('');
    
    // 1. 先追加用户消息，并预留一条空的 AI 消息卡片
    setMessages(prev => [
      ...prev, 
      { role: 'user', text: userText },
      { role: 'assistant', text: '' }
    ]);
    setLoading(true);

    // 2. 调用流式接口，实时逐字填入最后一条消息
    await askLoveAIStream(userText, userProfile, (currentText) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].text = currentText;
        return updated;
      });
    });

    setLoading(false);
  };
