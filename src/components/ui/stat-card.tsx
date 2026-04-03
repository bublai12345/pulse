type StatCardProps = {
	title: string;
	stat: number;
	color: string;
};

export const StatCard = ({ title, stat, color }: StatCardProps) => {
	return (
		<div className="flex flex-col gap-0.5 border p-2 justify-center items-center rounded-sm">
			<h2 className="text-xl font-bold">{stat}</h2>
			<div className="flex items-center gap-1">
				<div className={`size-2 rounded-full bg-${color}-500`} />
				<span className="text-sm font-medium">{title}</span>
			</div>
		</div>
	);
};

export default StatCard;
