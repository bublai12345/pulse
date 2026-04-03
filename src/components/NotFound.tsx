import { Button } from "@/components/ui/button";

export function NotFound({ children }: { children?: React.ReactNode }) {
	return (
		<div className="size-full flex flex-col items-center justify-center gap-4">
			<div className="text-gray-600 dark:text-gray-400">
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className="flex items-center gap-2 flex-wrap">
				<Button variant="outline" onClick={() => window.history.back()}>
					Go back
				</Button>
			</p>
		</div>
	);
}
