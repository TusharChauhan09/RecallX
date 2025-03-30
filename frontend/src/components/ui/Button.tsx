import { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement; 
    endIcon?: ReactElement;
    onClick: () => void;
}

const defaultStyle = " rounded-lg flex gap-1 justify-center items-center font-light "

const variantStyles = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-700",
    "secondary": "bg-indigo-300 text-indigo-600 hover:bg-indigo-200"
}; 

const sizeStyle = {
    "sm": "px-4 py-2 text-sm",
    "md": "px-6 py-3 text-md",
    "lg": "px-8 py-4 text-lg",
}; 

const Button = (props: ButtonProps) => {
    return (
      <button className={`${defaultStyle} ${variantStyles[props.variant]} ${sizeStyle[props.size]} `}>
        {props.startIcon}
        {props.text}
        {props.endIcon}
      </button>
    );
};

export default Button;