import { getSystemStats } from "@/lib/actions/get-system-stats";
import { createFileRoute } from "@tanstack/react-router";
import { WidgetGeneral } from "@/components/widget-general";
import { AppSectionHeader } from "@/components/app-section-header";
import { WidgetSandboxesByChain } from "@/components/widget-sandboxes-by-chain";

export const Route = createFileRoute("/_app/statistics/sandboxes")({
	component: RouteComponent,
	loader: async () => await getSystemStats(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const sandboxes = data.data.sandboxes;

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Sandboxes"
					description="Statistics about the sandboxes running on the system."
				/>

				<div className="grid grid-cols-4 gap-3">
					<WidgetGeneral
						title="Total"
						stat={sandboxes?.total}
						color="blue"
						description="Total sandboxes running on the system"
					/>
					<WidgetGeneral
						title="Live"
						stat={sandboxes?.live}
						color="green"
						description="Live sandboxes running on the system"
					/>
					<WidgetGeneral
						title="Stopped"
						stat={sandboxes?.stopped}
						color="red"
						description="Stopped sandboxed due to inactivity"
					/>
					<WidgetGeneral
						title="Removed"
						stat={sandboxes?.removed}
						color="gray"
						description="Sandboxes removed from the system"
					/>
				</div>
			</div>

			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Chains"
					description="Statistics about the sandboxes on specific chains running on the system."
				/>

				<WidgetSandboxesByChain chains={sandboxes?.byChain} />
			</div>
		</div>
	)
}
