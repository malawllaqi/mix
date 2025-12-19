import { createFileRoute } from "@tanstack/react-router";
import { CreateImage } from "@/modules/image/components/create-image";

export const Route = createFileRoute("/(authenticated)/image/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="">
			<CreateImage />
		</div>
	);
}
