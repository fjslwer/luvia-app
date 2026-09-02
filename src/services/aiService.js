const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

export const askLoveAIStream = async (prompt, userProfile = {}, onChunk) => {
  if (!apiKey) {
    onChunk("Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY.");
    return;
  }

  const systemPrompt = `Bạn là LUVIA, người đồng hành tình yêu AI cho phụ nữ trẻ Việt Nam. Tên user: ${userProfile.name || "Linh"}. Phong cách: Ấm áp, tinh tế, thêm icon ♡, ✨. Trả lời ngắn gọn, đi thẳng vào tâm tư.`;

  // 使用 streamGenerateContent 接口实现秒级首字响应
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:streamGenerateContent?key=${apiKey}&alt=sse`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500 // 限制长度，大幅提速
        }
      })
    });

    if (!response.ok) throw new Error("Stream connection failed");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const json = JSON.parse(line.replace("data: ", ""));
            const textChunk = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textChunk) {
              fullText += textChunk;
              onChunk(fullText); // 实时回调，前端逐字更新
            }
          } catch (e) {
            // 忽略分片解析中断的 SSE 空行
          }
        }
      }
    }
  } catch (err) {
    console.error("Stream error:", err);
    onChunk("LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡");
  }
};
