import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

export function Auth({
	actionText,
	onSubmit,
	status,
	afterSubmit,
}: {
	actionText: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	status: "pending" | "idle" | "success" | "error";
	afterSubmit?: React.ReactNode;
}) {
	return (
		<div className="flex justify-center items-center h-screen w-screen">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">{actionText}</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className="grid gap-4"
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit(e);
						}}
					>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="m@example.com"
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input type="password" name="password" id="password" required />
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={status === "pending"}
						>
							{status === "pending" ? (
								<Loader2
									size={16}
									aria-label="Loading..."
									className="animate-spin"
								/>
							) : (
								actionText
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
