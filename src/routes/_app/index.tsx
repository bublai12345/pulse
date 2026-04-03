import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: Page,
});

function Page() {
	return (
		<div className="flex flex-col gap-4 p-4 w-full h-full items-center justify-center">
			<h1 className="text-base">No widgets yet...</h1>
		</div>
	);
}
