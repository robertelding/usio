import { classNames } from "@cap/utils/helpers";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const buttonVariants = cva(
	"flex items-center justify-center transition-colors duration-200 rounded-[10px] disabled:cursor-not-allowed cursor-pointer font-medium px-5 ring-offset-transparent relative gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lens focus-visible:ring-offset-2",
	{
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
		variants: {
			variant: {
				primary:
					"bg-signal-strong text-on-signal hover:bg-signal-hover disabled:bg-gray-6 disabled:text-gray-10",
				blue: "bg-signal-strong text-on-signal border border-transparent hover:bg-signal-hover disabled:bg-gray-6 disabled:text-gray-10",
				destructive:
					"bg-danger text-on-signal border border-transparent hover:bg-signal-hover disabled:bg-gray-6 disabled:text-gray-10",
				outline:
					"border border-line-strong hover:bg-gray-3 text-ink disabled:bg-gray-6 disabled:text-gray-10",
				white:
					"bg-surface border border-line-strong text-ink hover:bg-gray-3 disabled:bg-gray-6 disabled:text-gray-10",
				ghost: "hover:bg-white/20 hover:text-white",
				gray: "bg-surface-sunken hover:bg-gray-4 border border-line-strong text-ink disabled:border-gray-7 disabled:bg-gray-6 disabled:text-gray-10",
				dark: "bg-ink text-paper border border-transparent hover:bg-gray-11 disabled:cursor-not-allowed disabled:text-gray-10 disabled:bg-gray-6",
				darkgradient:
					"bg-linear-to-t button-gradient-border from-[#0f0f0f] to-[#404040] shadow-[0_0_0_1px] hover:brightness-110 shadow-[#383838] text-gray-50 hover:bg-[#383838] disabled:bg-[#383838] border-transparent",
				radialblue:
					"text-gray-50 border button-gradient-border shadow-[0_0_0_1px] shadow-blue-400 disabled:bg-gray-1 border-0 [background:radial-gradient(90%_100%_at_15%_12%,#9BC4FF_0%,#3588FF_100%)] border-transparent hover:opacity-80",
				transparent:
					"bg-transparent text-gray-10 hover:underline transition-all duration-200 hover:text-gray-12",
			},
			size: {
				xs: "text-xs h-[32px]",
				sm: "text-sm h-[40px]",
				md: "text-sm h-[44px]",
				lg: "text-md h-[48px]",
				icon: "h-9 w-9",
			},
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	spinner?: boolean;
	href?: string;
	spinnerColor?: string;
	spinnerBorderColor?: `rgba(${number},${number},${number},${number})`;
	spinnerClassName?: string;
	kbd?: string;
	icon?: React.ReactNode;
	target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			spinner = false,
			spinnerColor = "white",
			spinnerBorderColor = "rgba(255, 255, 255, 0.2)",
			spinnerClassName,
			href,
			kbd,
			icon,
			target,
			...props
		},
		ref,
	) => {
		const Comp = href ? "a" : asChild ? Slot : ("button" as any);
		return (
			<Comp
				className={classNames(buttonVariants({ variant, size, className }))}
				ref={ref as any}
				target={target || undefined}
				href={href || undefined}
				{...props}
			>
				{spinner && (
					<LoadingSpinner
						className={classNames("mr-1", spinnerClassName)}
						color={spinnerColor}
						borderColor={spinnerBorderColor}
						size={16}
					/>
				)}
				{icon && icon}
				{props.children}
				{kbd && (
					<kbd className="hidden justify-center items-center ml-1 text-xs rounded-full border md:flex size-5 bg-gray-11 border-gray-10">
						{kbd}
					</kbd>
				)}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
