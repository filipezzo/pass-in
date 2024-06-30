import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface Props {
	onDefiningSearch(e: ChangeEvent<HTMLInputElement>): void;
	search: string;
}

export function Heading({ onDefiningSearch, search }: Props) {
	return (
		<div className="flex items-center gap-3">
			<h1 className="text-2xl font-bold text-white">Participantes</h1>
			<div className="flex h-8 w-[280px] items-center gap-3 rounded-lg border border-white/10 px-4 py-3">
				<Search className="size-4 text-emerald-300" />
				<input
					value={search}
					onChange={(e) => onDefiningSearch(e)}
					placeholder="Buscar participante..."
					className="flex-1 bg-transparent outline-none"
				/>
			</div>
		</div>
	);
}
