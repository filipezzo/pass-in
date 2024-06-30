import { ComponentProps } from "react";

interface IconBtnProps extends ComponentProps<"button"> {
	variant?: boolean;
}

export function IconBtn({ variant, ...props }: IconBtnProps) {
	return (
		<button
			{...props}
			className={
				variant
					? "flex size-7 items-center justify-center rounded-md border border-white/10 bg-transparent transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-10"
					: "flex size-7 items-center justify-center rounded-md border border-white/10 bg-gray-700 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-10"
			}
		/>
	);
}
