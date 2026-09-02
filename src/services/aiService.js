import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const askLoveAI = async (prompt, userProfile = {}) => {
  if (!apiKey) {
    console.error("LUVIA ERROR: Missing REACT_APP_GEMINI_API_KEY");
    return "Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào biến môi trường.";
  }

  try {
    // 改用标准的 gemini-2.5-flash 或 gemini-1.5-flash-latest 模型标识符
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const systemPrompt = `
      Bạn là LUVIA, một người đồng hành tình yêu AI thấu hiểu, tinh tế, hiện đại dành cho phụ nữ trẻ Việt Nam.
      Hồ sơ người dùng: Tên: ${userProfile.name || "Linh"}, Tình trạng: ${userProfile.status || "Độc thân"}.
      Phong cách trò chuyện: Ấm áp, sâu sắc, có chút huyền bí nhẹ nhàng, không phán xét. Trả lời bằng tiếng Việt tự nhiên, đan xen biểu tượng ♡, ✨.
      Tuyên bố miễn trừ: Chỉ đưa ra lời khuyên mang tính chiêm nghiệm, giải trí và thấu hiểu bản thân; không khẳng định đọc được suy nghĩ người khác hoặc phán đoán tương lai tuyệt đối.
    `;
    
    const result = await model.generateContent(`${systemPrompt}\n\nNgười dùng hỏi: ${prompt}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error Detail:", error);
    
    // 降级备用：如果 2.5-flash 未就绪，自动尝试 flash-latest 方案
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const fallbackResult = await fallbackModel.generateContent(`Trả lời ngắn gọn bằng tiếng Việt: ${prompt}`);
      return fallbackResult.response.text();
    } catch (fallbackError) {
      return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
    }
  }
};
