import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/modules/auth/components/login-form";

export const Route = createFileRoute("/(unauthenticated)/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <LoginForm />;
}
