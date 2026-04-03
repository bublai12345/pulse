import { createServerFn } from "@tanstack/react-start";

export const getSystemStats = createServerFn({
	method: "GET",
}).handler(async () => {
	const res = await fetch(`${process.env.BACKEND_API_BASE}/stats/system`);

	const data = await res.json();

	return data;
});
