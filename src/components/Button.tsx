import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends PropsWithChildren {
  alt?: boolean;
  className?: string;
}

const Button = ({ alt, className, children }: ButtonProps) => (
  <button
    className={twMerge(
      `font-medium hover:scale-[1.1] shadow-lg flex items-center bg-black/90 text-white gap-2 active:scale-[0.9] transition-colors transition-transform will-change-transform px-8 py-2 border rounded-lg border-black/90`,
      alt && "bg-transparent text-black hover:bg-black/5",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
