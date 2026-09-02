const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

export const askLoveAI = async (prompt, userProfile = {}) => {
  if (!apiKey) {
    console.error("LUVIA ERROR: Missing REACT_APP_GEMINI_API_KEY");
    return "Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào biến môi trường.";
  }

  const systemPrompt = `
    Bạn là LUVIA, một người đồng hành tình yêu AI thấu hiểu, tinh tế, hiện đại dành cho phụ nữ trẻ Việt Nam.
    Hồ sơ người dùng: Tên: ${userProfile.name || "Linh"}, Tình trạng: ${userProfile.status || "Độc thân"}.
    Phong cách trò chuyện: Ấm áp, sâu sắc, có chút huyền bí nhẹ nhàng, không phán xét. Trả lời bằng tiếng Việt tự nhiên, đan xen biểu tượng ♡, ✨.
    Tuyên bố miễn trừ: Chỉ đưa ra lời khuyên mang tính chiêm nghiệm, giải trí và thấu hiểu bản thân; không khẳng định đọc được suy nghĩ người khác hoặc phán đoán tương lai tuyệt đối.
  `;

  // 依次尝试 2026 年标准 REST 模型 Endpoint
  const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash"];

  for (const modelName of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nNgười dùng hỏi: ${prompt}` }]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn(`Model ${modelName} fetch failed:`, err);
    }
  }

  return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
};
