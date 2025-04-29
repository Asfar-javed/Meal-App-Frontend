export const fetchGeminiReply = async (prompt) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("❌ Gemini API key is missing. Check your .env file.");
    return "Gemini API key not found.";
  }

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, // ✅ fixed model name
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Gemini API response error:", errorData);
      return "Oops! Failed to get a proper response from Gemini.";
    }

    const data = await response.json();
    console.log("✅ Gemini API response:", data);

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "Sorry, I couldn't find an answer.";
  } catch (error) {
    console.error("❌ Gemini API fetch error:", error);
    return "Oops! Something went wrong while contacting Gemini.";
  }
};
