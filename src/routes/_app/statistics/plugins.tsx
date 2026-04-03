import { getSystemStats } from "@/lib/actions/get-system-stats";
import { createFileRoute } from "@tanstack/react-router";
import { WidgetGeneral } from "@/components/widget-general";
import { AppSectionHeader } from "@/components/app-section-header";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/statistics/plugins")({
	component: RouteComponent,
	loader: async () => await getSystemStats(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const plugins = data.data.plugins;

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Plugins"
					description="Statistics about the plugins on the system."
				/>

				<div className="grid grid-cols-3 gap-3">
					<WidgetGeneral
						title="Total Installs"
						stat={plugins?.totalInstalls}
						color="blue"
						description="Total installs of the plugins"
					/>
					<WidgetGeneral
						title="Live Installs"
						stat={plugins?.liveInstalls}
						color="green"
						description="Total live installs of the plugins"
					/>
					<WidgetGeneral
						title="Unique Plugins"
						stat={plugins?.uniquePlugins}
						color="red"
						description="Total unique plugins installed"
					/>
				</div>
			</div>

			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Top Plugins"
					description="Statistics about the top plugins on the system."
				/>

				<div className="grid grid-cols-1 gap-1">
					<div className="grid grid-cols-4 gap-1 px-4 py-1.5">
						<span className="text-sm">Name</span>
						<span className="text-sm text-center font-medium">
							Total Installs
						</span>
						<span className="text-sm text-center font-medium">
							Live Installs
						</span>
						<span className="text-sm text-center font-medium">
							Unique Users
						</span>
					</div>

					{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
					{plugins?.topPlugins.map((plugin: any) => (
						<Card
							key={plugin.pluginId}
							className="grid grid-cols-4 gap-1 px-4 py-1.5"
						>
							<span className="text-sm">{plugin.pluginName}</span>
							<span className="text-sm text-center font-medium">
								{plugin.totalInstalls}
							</span>
							<span className="text-sm text-center font-medium">
								{plugin.liveInstalls}
							</span>
							<span className="text-sm text-center font-medium">
								{plugin.uniqueUsers}
							</span>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}
