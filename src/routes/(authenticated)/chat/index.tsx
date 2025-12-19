import { createFileRoute } from "@tanstack/react-router";
import { ChatBot } from "@/modules/chat/components/chat";

export const Route = createFileRoute("/(authenticated)/chat/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="">
			<ChatBot />
		</div>
	);
}
