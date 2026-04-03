interface AppSectionHeaderProps {
	title: string;
	description: string;
}

export const AppSectionHeader = ({
	title,
	description,
}: AppSectionHeaderProps) => {
	return (
		<div className="flex flex-col">
			<h2 className="text-xl font-medium">{title}</h2>
			<span className="text-sm text-muted-foreground">{description}</span>
		</div>
	);
};

AppSectionHeader.displayName = "AppSectionHeader";