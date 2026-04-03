import * as React from "react";
import type {
	CellContext,
	ColumnDef,
	Header,
	HeaderGroup,
	SortingState,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type {
	UsersListItem,
	UsersListResponse,
	UsersQuery,
} from "@/lib/actions/get-users";

interface UsersTableProps {
	data: UsersListResponse["data"];
	searchState: UsersQuery;
	onSearchStateChange: (next: Partial<UsersQuery>) => void;
}

const columns: ColumnDef<UsersListItem, unknown>[] = [
	{
		accessorKey: "email",
		header: () => "Email",
		cell: ({ row }: CellContext<UsersListItem, unknown>) => (
			<div className="truncate max-w-[240px]">{row.original.email}</div>
		),
	},
	{
		accessorKey: "userName",
		header: () => "Username",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			row.original.userName ?? "—",
	},
	{
		accessorKey: "plan",
		header: () => "Plan",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			row.original.plan ?? "—",
	},
	{
		accessorKey: "sandboxCount",
		header: () => "Sandboxes",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			row.original.sandboxCount,
	},
	{
		accessorKey: "isActive",
		header: () => "Active",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			row.original.isActive ? "Yes" : "No",
	},
	{
		accessorKey: "createdAt",
		header: () => "Created",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			new Date(row.original.createdAt).toLocaleString(),
	},
	{
		accessorKey: "updatedAt",
		header: () => "Updated",
		cell: ({ row }: CellContext<UsersListItem, unknown>) =>
			new Date(row.original.updatedAt).toLocaleString(),
	},
];

export function UsersTable({
	data,
	searchState,
	onSearchStateChange,
}: UsersTableProps) {
	const items = data.items;
	const pagination = data.pagination;

	const sortingFromSearch: SortingState = React.useMemo(() => {
		return searchState.sortBy
			? [
					{
						id: searchState.sortBy,
						desc: (searchState.sortOrder ?? "desc") === "desc",
					},
				]
			: [];
	}, [searchState.sortBy, searchState.sortOrder]);

	const [localSearch, setLocalSearch] = React.useState(
		searchState.search ?? "",
	);

	React.useEffect(
		() => setLocalSearch(searchState.search ?? ""),
		[searchState.search],
	);

	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: sortingFromSearch,
		},
		manualSorting: true,
		onSortingChange: (
			updater: SortingState | ((old: SortingState) => SortingState),
		) => {
			const next =
				typeof updater === "function" ? updater(sortingFromSearch) : updater;
			const first = next[0];
			onSearchStateChange({
				sortBy: (first?.id as UsersQuery["sortBy"]) ?? "createdAt",
				sortOrder: first?.desc ? "desc" : "asc",
				page: 1,
			});
		},
	});

	const goPage = (page: number) => onSearchStateChange({ page });
	const setLimit = (limit: number) => onSearchStateChange({ limit, page: 1 });
	const applySearch = () =>
		onSearchStateChange({ search: localSearch, page: 1 });

	return (
		<div className="flex flex-col gap-3">
			{/* <div className="flex items-center gap-2">
        <Input
          placeholder="Search email, username, wallet..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          className="max-w-[320px]"
        />
        <Button onClick={applySearch} size="sm">
          Search
        </Button>
      </div> */}

			<div className="overflow-x-auto rounded-sm border bg-background">
				<table className="w-full text-sm">
					<thead className="bg-accent/40 sticky top-0">
						{table.getHeaderGroups().map((hg: HeaderGroup<UsersListItem>) => (
							<tr key={hg.id}>
								{hg.headers.map((header: Header<UsersListItem, unknown>) => {
									const isSortable = [
										"createdAt",
										"updatedAt",
										"email",
										"userName",
										"plan",
										"sandboxCount",
									].includes(header.column.id);
									const sort = table.getState().sorting?.[0];
									const isSorted = sort?.id === header.column.id;
									const sortIndicator = isSorted
										? sort?.desc
											? " ↓"
											: " ↑"
										: "";
									return (
										<th
											key={header.id}
											className="text-left font-medium px-3 py-2 select-none"
										>
											{isSortable ? (
												<button
													type="button"
													className="hover:underline"
													onClick={() =>
														header.column.toggleSorting(
															sort?.id === header.column.id
																? !sort.desc
																: false,
														)
													}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													{sortIndicator}
												</button>
											) : (
												flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="border-t">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-3 py-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
						{items.length === 0 && (
							<tr>
								<td
									className="px-3 py-8 text-center text-muted-foreground"
									colSpan={columns.length}
								>
									No users found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between gap-3">
				<div className="text-xs text-muted-foreground">
					Page {pagination.currentPage} of {pagination.totalPages} •{" "}
					{pagination.totalItems} total
				</div>
				<div className="flex items-center gap-2">
					<select
						className="h-8 rounded-sm border bg-transparent px-2 text-sm"
						aria-label="Rows per page"
						value={searchState.limit}
						onChange={(e) => setLimit(Number(e.target.value))}
					>
						{[10, 20, 25, 50, 100].map((n) => (
							<option key={n} value={n}>
								{n} / page
							</option>
						))}
					</select>
					<Button
						size="sm"
						variant="outline"
						onClick={() => goPage(Math.max(1, pagination.currentPage - 1))}
						disabled={!pagination.hasPreviousPage}
					>
						<ChevronLeft className="size-4" /> Prev
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() => goPage(pagination.currentPage + 1)}
						disabled={!pagination.hasNextPage}
					>
						Next <ChevronRight className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
