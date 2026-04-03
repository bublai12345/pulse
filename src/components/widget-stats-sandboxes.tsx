import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import { StatCard } from "@/components/ui/stat-card";

type SandboxesStats = {
	live: number;
	stopped: number;
	removed: number;
	total: number;
};

const WidgetStatsSandboxes = ({ sandboxes }: { sandboxes: SandboxesStats }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sandboxes</CardTitle>
				<CardDescription>Sandboxes running on the system.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-4 gap-2">
					<StatCard title="Live" stat={sandboxes?.live} color="green" />

					<StatCard title="Stopped" stat={sandboxes?.stopped} color="red" />

					<StatCard title="Removed" stat={sandboxes?.removed} color="gray" />

					<StatCard title="Total" stat={sandboxes?.total} color="blue" />
				</div>
			</CardContent>
		</Card>
	);
};

export default WidgetStatsSandboxes;
