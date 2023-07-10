import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  alt?: boolean;
}

const Button = ({ alt, ...props }: ButtonProps) => (
  <button
    {...props}
    className={twMerge(
      `font-medium hover:scale-[1.1] focus:scale-[1.05] shadow-lg justify-center flex items-center bg-black/90 text-white gap-2 active:scale-[0.95] transition-colors transition-transform will-change-transform px-8 py-2 border rounded-lg border-black/90`,
      alt && "bg-transparent text-black hover:bg-black/5",
      props.className
    )}
  />
);

export default Button;
