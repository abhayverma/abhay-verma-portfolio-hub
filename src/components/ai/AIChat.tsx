import { useState } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      // ⚠️ For production: route through a secure backend endpoint instead
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with real key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant for website visitors." },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: newMessage.text },
          ],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ Error connecting to AI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-3 text-center">AI Chat Assistant 🤖</h2>

      <div className="h-64 overflow-y-auto border rounded-md p-2 mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded-md ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-green-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm italic">Thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-md px-2 py-1"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
