import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WidgetSandboxesByChainProps {
	chains: Record<string, number>;
}

export const WidgetSandboxesByChain = ({
	chains,
}: WidgetSandboxesByChainProps) => {
	const data = Object.entries(chains).map(([chain, count]) => ({
		chain,
		count,
	}));

	return (
		<div className="grid grid-cols-3 gap-1">
			{data.map((chain) => (
				<Card
					key={chain.chain}
					className="flex items-center flex-row px-3 py-1.5 justify-between gap-2"
				>
					<span className="text-sm">{chain.chain}</span>
					<span className="text-sm font-medium">{chain.count}</span>
				</Card>
			))}
		</div>
	);
};

WidgetSandboxesByChain.displayName = "WidgetSandboxesByChain";
