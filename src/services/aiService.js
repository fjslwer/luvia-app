const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

export const askLoveAI = async (prompt, userProfile = {}) => {
  if (!apiKey) {
    console.error("LUVIA ERROR: Missing REACT_APP_GEMINI_API_KEY");
    return "Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào biến môi trường.";
  }

  const systemPrompt = `Bạn là LUVIA, một người đồng hành tình yêu AI thấu hiểu, tinh tế, hiện đại dành cho phụ nữ trẻ Việt Nam. Hồ sơ người dùng: Tên: ${userProfile.name || "Linh"}, Tình trạng: ${userProfile.status || "Độc thân"}. Phong cách trò chuyện: Ấm áp, sâu sắc, có chút huyền bí nhẹ nhàng, không phán xét. Trả lời bằng tiếng Việt tự nhiên, đan xen biểu tượng ♡, ✨. Tuyên bố miễn trừ: Chỉ đưa ra lời khuyên mang tính chiêm nghiệm, giải trí và thấu hiểu bản thân.`;

  // 严格按照 Google 官方报错指引使用 gemini-3.6-flash
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
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
      console.error("Gemini Request Error:", response.status, errData);
      return `LUVIA đang kết nối với các vì sao... (Lỗi: ${errData?.error?.message || response.status}) ♡`;
    }
  } catch (err) {
    console.error("Network Exception:", err);
  }

  return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
};
