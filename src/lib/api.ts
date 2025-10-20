
export async function sendToAI(prompt: string): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.reply || "No response from AI";
  } catch (err) {
    console.error("AI API error:", err);
    return "Error connecting to the AI service.";
  }
}
