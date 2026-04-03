import { ChartNoAxesCombined, Home, MonitorCog, Puzzle, Users } from "lucide-react";

export const getIcon = (icon: string) => {
	switch (icon) {
		case "monitor-cog":
			return MonitorCog;
		case "puzzle":
			return Puzzle;
		case "home":
			return Home;
		case "chart-no-axes-combined":
			return ChartNoAxesCombined;
		case "users":
			return Users;
	}
};

export const Icon = ({ icon, ...props }: { icon: string } & React.ComponentProps<'svg'>) => {
	const IconComponent = getIcon(icon);
	if (!IconComponent) return null;
	return <IconComponent {...props} />;
};
