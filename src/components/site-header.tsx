import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { Bell, Cog, Download, Settings } from "lucide-react";

export function SiteHeader() {
	const { routes } = useBreadcrumbs();

	return (
		<header className="bg-background sticky top-0 z-50 flex w-full items-center h-14 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
			<div className="flex h-(--header-height) w-full items-center gap-2 px-4">
				<SearchForm className="w-full sm:mr-auto sm:w-auto" />

		 		<div className="flex gap-1 items-center">
					<div className="flex items-center gap-1">
						<Button variant="outline" size="sm">
							<Bell className="size-3.5" />
						</Button>
						<Button variant="outline" size="sm">
							<Settings className="size-3.5" />
						</Button>
					</div>
					<Button variant="outline" size="sm">
						<Download className="size-3.5" />
						<span>Export</span>
					</Button>
				</div>

				{/* <Breadcrumb className="hidden sm:block">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>

						{routes.length > 1 && <BreadcrumbSeparator />}

						{routes.map((route) => (
							<div key={route.path} className="group flex items-center gap-2">
								<BreadcrumbItem>
									<BreadcrumbLink href={route.path}>
										{route.name}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="group-last-of-type:hidden" />
							</div>
						))}
					</BreadcrumbList>
				</Breadcrumb> */}
			</div>
		</header>
	);
}
