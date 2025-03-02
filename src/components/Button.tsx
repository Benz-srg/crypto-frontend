import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg cursor-pointer transition"
    >
      {children}
    </button>
  );
};

export default Button;
