import type * as React from "react";
import { Link, useLocation, useRouteContext } from "@tanstack/react-router";
import {
	AudioWaveform,
	Command,
	Frame,
	GalleryVerticalEnd,
	Home,
	LogOut,
	Map as MapIcon,
	PieChart,
	Users,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { ProductSwitcher } from "@/components/product-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarRail,
} from "@/components/ui/sidebar";
import navigation from "@/data/navigation.json";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useRouteContext({ from: "/_app" });

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<ProductSwitcher />
			</SidebarHeader>
			<SidebarContent>
				{/* <SidebarGroup>
					<SidebarGroupLabel>General</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuButton
							tooltip="Dashboard"
							asChild
							isActive={pathname === "/"}
						>
							<Link to="/" activeProps={{ className: "isActive" }}>
								<Home />
								<span>Dashboard</span>
							</Link>
						</SidebarMenuButton>

						<SidebarMenuButton
							tooltip="Users"
							asChild
							isActive={pathname === "/users"}
						>
							<Link to="/users" activeProps={{ className: "isActive" }}>
								<Users />
								<span>Users</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenu>
				</SidebarGroup> */}

				<NavMain items={navigation.system} heading="Information" />
			</SidebarContent>
			<SidebarFooter>
				{user && (
					<NavUser
						user={{
							email: user.email,
						}}
					/>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
