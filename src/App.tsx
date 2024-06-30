import { Attendee } from "./view/components/Attendee";
import { Header } from "./view/components/Header";

export function App() {
	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-5 px-8 py-5">
			<Header />
			<Attendee />
		</div>
	);
}
