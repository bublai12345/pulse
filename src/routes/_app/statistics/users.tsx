import { getSystemStats } from "@/lib/actions/get-system-stats";
import { createFileRoute } from "@tanstack/react-router";
import { WidgetGeneral } from "@/components/widget-general";
import { AppSectionHeader } from "@/components/app-section-header";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app/statistics/users")({
	component: RouteComponent,
	loader: async () => await getSystemStats(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const users = data.data.users;

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Users"
					description="Statistics about the users on the system."
				/>

				<div className="grid grid-cols-3 gap-3">
					<WidgetGeneral
						title="Total"
						stat={users?.total}
						color="blue"
						description="Total users on the system"
					/>
					<WidgetGeneral
						title="New this month"
						stat={users?.newThisMonth}
						color="green"
						description="Total new users this month"
					/>
					<WidgetGeneral
						title="Active 30 days"
						stat={users?.active30Days}
						color="red"
						description="Total users active in the last 30 days"
					/>
				</div>
			</div>

			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Users by Plan"
					description="Statistics about the users on the system by subscription plan."
				/>

				<div className="grid grid-cols-1 gap-1">
					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Explorer</span>
						<span className="text-sm font-medium">{users?.explorer}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Developer</span>
						<span className="text-sm font-medium">{users?.developer}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Team</span>
						<span className="text-sm font-medium">{users?.team}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Enterprise</span>
						<span className="text-sm font-medium">{users?.enterprise}</span>
					</Card>
				</div>
			</div>
			<div className="flex flex-col w-full gap-4">
				<AppSectionHeader
					title="Users by Plan"
					description="Statistics about the users on the system by subscription plan."
				/>

				<div className="grid grid-cols-1 gap-1">
					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Explorer</span>
						<span className="text-sm font-medium">{users?.explorer}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Developer</span>
						<span className="text-sm font-medium">{users?.developer}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Team</span>
						<span className="text-sm font-medium">{users?.team}</span>
					</Card>

					<Card className="flex items-center flex-row px-3 py-1.5 justify-between gap-2">
						<span className="text-sm">Enterprise</span>
						<span className="text-sm font-medium">{users?.enterprise}</span>
					</Card>
				</div>
			</div>
		</div>
	)
}
