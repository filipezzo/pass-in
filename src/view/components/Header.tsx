import { Ticket } from "lucide-react";

export function Header() {
	return (
		<header className="flex items-center gap-5">
			<div className="flex size-8 items-center justify-center rounded-lg bg-emerald-300">
				<Ticket className="text-white" />
			</div>

			<nav className="flex items-center gap-5">
				<a className="text-sm font-medium">Eventos</a>
				<a className="text-sm font-bold">Participantes</a>
			</nav>
		</header>
	);
}
