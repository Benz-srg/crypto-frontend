import { atom, useAtom } from "jotai";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  onClose,
}) => {
  return (
    <div
      className={`fixed z-[999] top-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all 
        ${
          type === "success"
            ? "bg-green-500/90 text-white"
            : "bg-red-500/90 text-white"
        }`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-white cursor-pointer focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

const toastAtom = atom<{ message: string; type?: "success" | "error" } | null>(
  null
);

export const useToast = () => {
  const [, setToast] = useAtom(toastAtom);

  const showToast = (message: string, type?: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { showToast };
};

export const ToastContainer = () => {
  const [toast, setToast] = useAtom(toastAtom);

  return toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
    />
  ) : null;
};
