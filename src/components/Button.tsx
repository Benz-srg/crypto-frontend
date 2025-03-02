import React from "react";

export enum ButtonTheme {
  add = "add",
  edit = "edit",
  delete = "delete",
}

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  theme?: ButtonTheme;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  theme = ButtonTheme.add,
}) => {
  const themeClasses: Record<ButtonTheme, string> = {
    [ButtonTheme.add]: "bg-green-500 hover:bg-green-600 text-white",
    [ButtonTheme.edit]: "bg-yellow-500 hover:bg-yellow-600 text-white",
    [ButtonTheme.delete]: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg cursor-pointer transition ${themeClasses[theme]}`}
    >
      {children}
    </button>
  );
};

export default Button;
