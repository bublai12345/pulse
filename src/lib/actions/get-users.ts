import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const UsersQuerySchema = z.object({
	page: z.number().int().min(1).optional().default(1),
	limit: z.number().int().min(1).max(100).optional().default(20),
	sortBy: z
		.enum([
			"createdAt",
			"updatedAt",
			"email",
			"userName",
			"plan",
			"sandboxCount",
		])
		.optional()
		.default("createdAt"),
	sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
	search: z.string().optional().default(""),
});

export type UsersQuery = z.infer<typeof UsersQuerySchema>;

export interface UsersListItem {
	userId: string;
	email: string;
	walletAddress: string | null;
	userName: string | null;
	authType: string;
	plan: string | null;
	sandboxCount: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface UsersListResponse {
	success: boolean;
	data: {
		items: UsersListItem[];
		pagination: {
			currentPage: number;
			totalPages: number;
			totalItems: number;
			itemsPerPage: number;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
		};
	};
	message?: string;
	timestamp?: string;
}

export const fetchUsers = createServerFn({
	method: "GET",
}).handler(async ({ data: ctxData }): Promise<UsersListResponse> => {
	const parsed = UsersQuerySchema.safeParse(ctxData ?? {});
	const { page, limit, sortBy, sortOrder, search } = parsed.success
		? parsed.data
		: UsersQuerySchema.parse({});

	const qs = new URLSearchParams();
	qs.set("page", String(page));
	qs.set("limit", String(limit));
	if (search) qs.set("search", search);
	if (sortBy) qs.set("sortBy", sortBy);
	if (sortOrder) qs.set("sortOrder", sortOrder);

	const response = await fetch(
		`${process.env.BACKEND_API_BASE}/stats/users/list?${qs.toString()}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch users: ${response.status}`);
	}

	const json = (await response.json()) as UsersListResponse;
	return json;
});

// Helper for typed invocation from loaders/components
export async function getUsers(
	params: UsersQuery,
): Promise<UsersListResponse> {
	const fn = fetchUsers as unknown as (opts: {
		data: UsersQuery;
	}) => Promise<UsersListResponse>;
	return fn({ data: params });
}
