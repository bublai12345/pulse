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

export const WidgetGeneral = ({
	title,
	stat,
	color,
	description,
}: { title: string; stat: number; color: string; description?: string }) => {
	return (
		<Card className="flex flex-col gap-2 py-4">
			<CardHeader className="gap-0 px-4">
				<CardTitle className="text-md font-medium">{title}</CardTitle>
				{description && (
					<span className="text-xs text-muted-foreground">{description}</span>
				)}
			</CardHeader>
			<CardContent className="px-4">
				<span className="text-2xl font-bold">{stat}</span>
			</CardContent>
		</Card>
	);
};
