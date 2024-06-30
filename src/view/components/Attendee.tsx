import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { sleep } from "../../app/helpers/sleep";
import { IAttendee } from "../../app/model/attendee";
import { Heading } from "./Heading";
import { IconBtn } from "./IconBtn";
import { Table } from "./table/Table";
import { TableCell } from "./table/TableCell";
import { TableHeader } from "./table/TableHeader";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function Attendee() {
	const [page, setPage] = useState(() => {
		const url = new URL(window.location.toString());
		if (url.searchParams.has("page")) {
			return Number(url.searchParams.get("page"));
		}
		return 1;
	});
	const [attendees, setAttendees] = useState<IAttendee[]>([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [search, setSearch] = useState(() => {
		const url = new URL(window.location.toString());
		if (url.searchParams.has("search")) {
			return url.searchParams.get("search") ?? "";
		}
		return "";
	});

	function setURLPage(page: number) {
		const url = new URL(window.location.toString());
		url.searchParams.set("page", String(page));

		window.history.pushState({}, "", url);
		setPage(page);
	}

	const setURLSearch = (search: string) => {
		const url = new URL(window.location.toString());
		url.searchParams.set("search", search);

		window.history.pushState({}, "", url);
		setSearch(search);
	};

	const handleFirstPage = () => {
		setURLPage(1);
	};

	const handlePrevPage = () => {
		setURLPage(page - 1);
	};

	const handleNextPage = () => {
		setURLPage(page + 1);
	};

	const handleLastPage = () => {
		setURLPage(maxPage);
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setURLSearch(e.target.value);
		setURLPage(1);
		setPage(1);
	};

	const maxPage = Math.max(1, Math.ceil(total / 10));

	useEffect(() => {
		const controller = new AbortController();
		const url = new URL(
			"http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees",
		);
		url.searchParams.set("pageIndex", String(page - 1));
		if (search && search.length > 0) {
			url.searchParams.set("query", search);
		}

		const fetchAttPage = async () => {
			setLoading(true);

			await sleep();
			try {
				const data = await fetch(url, {
					signal: controller.signal,
				});
				if (!data.ok) {
					setError("Erro ao realizar o fetch");
					return;
				}
				const json = await data.json();
				setAttendees(json.attendees);
				setTotal(json.total);
			} catch (err) {
				if (err instanceof Error) {
					if (err.name !== "AbortError") {
						setError(err.message);
					}
				} else {
					throw err;
				}
			} finally {
				setLoading(false);
			}
		};

		fetchAttPage();
		return () => controller.abort();
	}, [page, search]);

	return (
		<main className="flex flex-col gap-6">
			<Heading onDefiningSearch={handleSearch} search={search} />
			<Table>
				<thead>
					<tr className="border-b border-b-white/10">
						<TableHeader className="w-[16px] px-4 py-3">
							<input type="checkbox" />
						</TableHeader>
						<TableHeader>Código</TableHeader>
						<TableHeader>Participante</TableHeader>
						<TableHeader>Data de inscrição</TableHeader>
						<TableHeader>Data do check-in</TableHeader>
						<TableHeader style={{ width: "64px" }}></TableHeader>
					</tr>
				</thead>
				<tbody>
					{loading && (
						<tr className="w-full">
							<td>
								<div className="flex w-full justify-center p-5">
									<div className="mx-auto size-8 max-w-[32px] animate-spin rounded-full border-r border-t border-r-blue-500 border-t-blue-500" />
								</div>
							</td>
						</tr>
					)}
					{error && (
						<tr>
							<td>
								<p>{error}</p>
							</td>
						</tr>
					)}
					{!loading &&
						!error &&
						attendees.length > 0 &&
						attendees.map(({ checkedInAt, createdAt, email, id, name }) => {
							return (
								<tr
									key={id}
									className="border-b border-b-white/10 transition-colors hover:bg-zinc-900"
								>
									<TableCell>
										<input type="checkbox" />
									</TableCell>
									<TableCell>{id}</TableCell>
									<TableCell className="flex flex-col gap-1">
										<strong className="text-sm font-semibold">{name}</strong>
										<span className="text-[12px] text-zinc-300">{email}</span>
									</TableCell>
									<TableCell>{dayjs().to(createdAt)}</TableCell>
									<TableCell>
										{checkedInAt === null ? (
											<span>Não fez check-in</span>
										) : (
											dayjs().to(checkedInAt)
										)}
									</TableCell>
									<TableCell>
										<IconBtn variant>
											<MoreHorizontal size={16} />
										</IconBtn>
									</TableCell>
								</tr>
							);
						})}
					{!loading && attendees.length === 0 && (
						<tr>
							<td className="p-5">
								<p className="text-nowrap text-sm text-gray-500">
									Usuario não encontrado
								</p>
							</td>
						</tr>
					)}
				</tbody>
				<tfoot>
					<tr>
						<TableCell colSpan={3}>
							Mostrando {attendees.length} de {total} items
						</TableCell>
						<TableCell className="text-right" colSpan={3}>
							<div className="inline-flex items-center gap-8">
								<span>
									Pag {page} de {maxPage}
								</span>
								<div className="flex gap-2 px-4 py-3 text-right text-gray-400">
									<IconBtn disabled={page <= 1} onClick={handleFirstPage}>
										<ChevronsLeft />
									</IconBtn>
									<IconBtn disabled={page <= 1} onClick={handlePrevPage}>
										<ChevronLeft />
									</IconBtn>
									<IconBtn disabled={page === maxPage} onClick={handleNextPage}>
										<ChevronRight />
									</IconBtn>
									<IconBtn disabled={page === maxPage} onClick={handleLastPage}>
										<ChevronsRight />
									</IconBtn>
								</div>
							</div>
						</TableCell>
					</tr>
				</tfoot>
			</Table>
		</main>
	);
}
