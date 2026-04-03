import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import products from "@/data/products.json";
import { Icon } from "@/utils/icon-map";

export function ProductSwitcher() {
	const { isMobile } = useSidebar();
	const [activeProduct, setActiveProduct] = React.useState(products[0]);

	if (!activeProduct) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
								{activeProduct.icon && (
									<Icon icon={activeProduct.icon} className="size-4" />
								)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{activeProduct.name}
								</span>
								<span className="truncate text-xs">
									{activeProduct.platform}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Products
						</DropdownMenuLabel>
						{products.map((product, index) => {
							return (
								<DropdownMenuItem
									key={product.name}
									onClick={() => {
										setActiveProduct(product);
									}}
									className="gap-2 px-2 py-1"
								>
									{product.icon && (
										<div className="flex size-6 items-center justify-center rounded-sm border">
											<Icon icon={product.icon} className="size-3.5 shrink-0" />
										</div>
									)}
									{product.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
