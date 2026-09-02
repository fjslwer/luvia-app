const apiKey = process.env.REACT_APP_GEMINI_API_KEY || "";

export const askLoveAI = async (prompt, userProfile = {}) => {
  if (!apiKey) {
    console.error("LUVIA ERROR: Missing REACT_APP_GEMINI_API_KEY");
    return "Chưa cấu hình API Key. Vui lòng thêm REACT_APP_GEMINI_API_KEY vào biến môi trường.";
  }

  try {
    // 1. 第一步：先向 Google 查询你这个 Key 究竟支持哪些模型
    const listRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      method: "GET",
      headers: { "x-goog-api-key": apiKey }
    });

    const listData = await listRes.json();
    console.log("=== 你的 Key 拥有的可用模型列表 ===", listData);

    if (!listRes.ok || !listData.models || listData.models.length === 0) {
      console.error("Key 鉴权失败或无任何可用模型:", listData);
      return "API Key 无效或未开启 Gemini API 服务，请检查 Google AI Studio 权限 ♡";
    }

    // 2. 第二步：从列表中自动匹配支持对话（generateContent）的模型
    const activeModelObj = listData.models.find(m => 
      m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
    );

    if (!activeModelObj) {
      return "当前账号没有支持对话生成的 Gemini 模型 ♡";
    }

    const modelName = activeModelObj.name; // 例如 "models/gemini-xxx"
    console.log("=== 自动匹配到的有效模型 ===", modelName);

    // 3. 第三步：用查到的真实模型路径发起对话
    const systemPrompt = `Bạn là LUVIA, một người đồng hành tình yêu AI thấu hiểu, tinh tế dành cho phụ nữ trẻ Việt Nam. Hồ sơ người dùng: Tên: ${userProfile.name || "Linh"}. Trả lời bằng tiếng Việt tự nhiên, đan xen biểu tượng ♡, ✨.`;

    const chatRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    const chatData = await chatRes.json();

    if (chatRes.ok && chatData?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return chatData.candidates[0].content.parts[0].text;
    } else {
      console.error("请求失败详情:", chatData);
      return `LUVIA đang kết nối với các vì sao... (Lỗi: ${chatData?.error?.message || "请求失败"}) ♡`;
    }

  } catch (err) {
    console.error("网络异常:", err);
    return "LUVIA đang kết nối với các vì sao... Hãy thử lại sau một chút nhé ♡";
  }
};
