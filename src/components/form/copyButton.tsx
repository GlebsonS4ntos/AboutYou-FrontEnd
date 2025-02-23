import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";

interface CopyButtonProps {
  infoId: string;
  className?: string;
}

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <div
      className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg 
                 flex items-center gap-2 animate-slide-up"
    >
      <CheckCircle className="w-4 h-4 text-green-500" />
      <span>{message}</span>
    </div>
  );
}

export default function CopyButton({
  infoId,
  className = "",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${infoId}`);
    setIsCopied(true);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className={`
          inline-flex items-center gap-2 px-3 py-2 
          rounded transition-all duration-200
          ${
            isCopied
              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }
          ${className}
        `}
        title={isCopied ? "Copiado!" : "Copiar"}
      >
        {isCopied ? (
          <>
            <CheckCircle className="w-4 h-4" />
            <span>Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copie seu About You {"❤️"}</span>
          </>
        )}
      </button>

      {showToast && (
        <Toast
          message="Copiado com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
