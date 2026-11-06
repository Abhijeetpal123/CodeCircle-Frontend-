import { Loader2, Sparkles } from "lucide-react";


function ConversationStarters({
  starters,
  isLoading,
  error,
  onGenerate,
  onPick,
}) {
  return (
    <div className="shrink-0 border-t border-[#EAE1D3] bg-[#FBF6EF] px-4 py-3 sm:px-6">
      {starters.length === 0 ? (
        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-full border border-[#EAE1D3] bg-white px-4 py-2 text-sm font-semibold text-[#5B8C6E] shadow-sm transition hover:bg-[#F3E9DC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Writing suggestions…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Suggest openers
              </>
            )}
          </button>

          {error && (
            <p className="text-xs font-medium text-[#C4483D]">{error}</p>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#8A8178]">
            <Sparkles className="h-3.5 w-3.5 text-[#5B8C6E]" />
            Tap a suggestion to use it
          </p>
          <div className="flex flex-col gap-2">
            {starters.map((starter, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onPick(starter)}
                className="rounded-2xl border border-[#EAE1D3] bg-white px-4 py-2.5 text-left text-sm text-[#2B2A28] shadow-sm transition hover:border-[#5B8C6E] hover:bg-[#F3E9DC]"
              >
                {starter}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="mt-2 text-xs font-medium text-[#8A8178] transition hover:text-[#5B8C6E] disabled:opacity-50"
          >
            {isLoading ? "Writing…" : "Regenerate"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ConversationStarters