import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { hashPassword, prismaClient } from "~/utils/prisma";
import { Login } from "~/components/Login";
import { useAppSession } from "~/utils/session";
import { useLocation } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { Outlet } from "@tanstack/react-router";

export const loginFn = createServerFn({ method: "POST" })
	.validator((d: { email: string; password: string }) => d)
	.handler(async ({ data }) => {
		// Find the user
		const user = await prismaClient.user.findUnique({
			where: {
				email: data.email,
			},
		})

		// Check if the user exists
		if (!user) {
			return {
				error: true,
				userNotFound: true,
				message: "User not found",
			}
		}

		// Check if the password is correct
		const hashedPassword = await hashPassword(data.password);

		if (user.password !== hashedPassword) {
			return {
				error: true,
				message: "Incorrect password",
			}
		}

		// Create a session
		const session = await useAppSession();

		// Store the user's email in the session
		await session.update({
			userEmail: user.email,
		})
	})

export const Route = createFileRoute("/aauthed")({
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw new Error("Not authenticated");
		}
	},
	errorComponent: ({ error }) => {
		if (error.message === "Not authenticated") {
			return <Login />;
		}

		throw error;
	},
	component: Page,
});

function Page() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<SiteHeader />

				<div className="flex flex-1 flex-col gap-4 py-6 px-6 bg-muted">
					<Outlet />

					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
					</div>
					<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
