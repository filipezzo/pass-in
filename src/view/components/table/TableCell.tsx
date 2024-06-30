import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface CellProps extends ComponentProps<"td"> {}

export function TableCell({ className, ...props }: CellProps) {
	return (
		<td {...props} className={twMerge("px-4 py-3 text-gray-400", className)} />
	);
}
