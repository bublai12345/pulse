import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getSystemStats } from "@/lib/actions/get-system-stats";
import { createFileRoute } from "@tanstack/react-router";
import WidgetStatsSandboxes from "@/components/widget-stats-sandboxes";

export const Route = createFileRoute("/_app/statistics/system")({
	component: RouteComponent,
	loader: async () => await getSystemStats(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const sandboxes = data.data.sandboxes;

	return (
		<div>
			<div className="grid grid-cols-1 gap-4">
				<WidgetStatsSandboxes sandboxes={sandboxes} />
				<WidgetStatsSandboxes sandboxes={sandboxes} />
				<WidgetStatsSandboxes sandboxes={sandboxes} />
			</div>
			<pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
