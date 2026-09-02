import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const askLoveAI = async (prompt, userProfile = {}) => {
  if (!apiKey) {
    return "Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào biến môi trường.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = `
      Bạn là LUVIA, một người đồng hành tình yêu AI thấu hiểu, tinh tế, hiện đại dành cho phụ nữ trẻ Việt Nam.
      Hồ sơ người dùng: Tên: ${userProfile.name || "Linh"}, Tình trạng: ${userProfile.status || "Độc thân"}.
      Phong cách trò chuyện: Ấm áp, sâu sắc, có chút huyền bí nhẹ nhàng, không phán xét. Trả lời bằng tiếng Việt tự nhiên, đan xen biểu tượng ♡, ✨.
      Tuyên bố miễn trừ: Chỉ đưa ra lời khuyên mang tính chiêm nghiệm, giải trí và thấu hiểu bản thân; không khẳng định đọc được suy nghĩ người khác hoặc phán đoán tương lai tuyệt đối.
    `;
    const result = await model.generateContent(`${systemPrompt}\n\nNgười dùng hỏi: ${prompt}`);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI API Error:", error);
    return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
  }
};
