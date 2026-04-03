import { ChevronRight, Home } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Icon } from "@/utils/icon-map";
import { Link, useLocation } from "@tanstack/react-router";

export function NavMain({
	items,
	heading,
}: {
	items: {
		title: string;
		url: string;
		icon?: string;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			icon?: string;
		}[];
	}[];
	heading: string;
}) {
    const { pathname } = useLocation();

    return (
		<SidebarGroup>
			{heading && <SidebarGroupLabel>{heading}</SidebarGroupLabel>}

			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <Icon icon={item.icon} />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
                                    {item.items?.map((subItem) => {
                                        const subIsActive = pathname === subItem.url;
                                        return (
										<SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild isActive={subIsActive}>
                                                <Link to={subItem.url} activeProps={{ className: "isActive" }}>
													{subItem?.icon && <Icon icon={subItem?.icon} />}
													<span>{subItem.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
                                        );
                                    })}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
