const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

// 自动获取当前 API Key 允许调用的可用模型列表
const getAvailableModel = async () => {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (res.ok) {
      const data = await res.json();
      // 筛选出支持 generateContent 的模型
      const validModel = data.models?.find(m => m.supportedGenerationMethods?.includes("generateContent"));
      if (validModel) {
        // 提取模型短名称（如 "gemini-1.5-flash"）
        return validModel.name.replace("models/", "");
      }
    }
  } catch (e) {
    console.warn("Failed to list models:", e);
  }
  // 备用兜底模型
  return "gemini-1.5-flash";
};

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

  // 1. 获取一个可用的模型名称
  const targetModel = await getAvailableModel();

  // 2. 发起内容生成请求
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;
    
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
    } else {
      const errData = await response.json().catch(() => ({}));
      console.error(`Gemini Error (${targetModel}):`, errData);
    }
  } catch (err) {
    console.error("Fetch Execution Error:", err);
  }

  return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
};
