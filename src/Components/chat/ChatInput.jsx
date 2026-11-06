import { Send } from "lucide-react";

function ChatInput({ message, setMessage, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-[#EAE1D3] bg-white px-4 py-3 sm:px-6 shrink-0">
      <div className="flex items-end gap-3 mx-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-2xl border border-[#EAE1D3] bg-[#FBF6EF] px-4 py-3 text-[15px] text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-1 focus:ring-[#5B8C6E] custom-scrollbar"
        />

        <button
          onClick={onSend}
          disabled={!message.trim()}
          aria-label="Send message"
          className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-full bg-[#5B8C6E] text-white transition hover:bg-[#4A7359] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#5B8C6E]"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="text-center mt-2 hidden sm:block">
        <span className="text-[11px] text-[#8A8178]">
          <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new
          line
        </span>
      </div>
    </div>
  );
}


export default ChatInput