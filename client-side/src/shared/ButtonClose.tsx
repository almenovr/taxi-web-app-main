import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import twFocusClass from "@/utils/twFocusClass";

export interface ButtonCloseProps {
  className?: string;
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonCloseProps> = ({
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={
        `w-10 h-10 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl bg-white dark:bg-neutral-800 ${className} ` +
        twFocusClass()
      }
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <XMarkIcon className="w-6 h-6" />
    </button>
  );
};

export default ButtonClose;
