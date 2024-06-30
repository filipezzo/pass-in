import { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table({ ...props }: TableProps) {
	return (
		<div className="rounded-xl border border-white/10">
			<table className="w-full table-auto" {...props} />
		</div>
	);
}
