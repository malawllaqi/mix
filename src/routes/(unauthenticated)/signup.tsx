import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/modules/auth/components/signup-form";

export const Route = createFileRoute("/(unauthenticated)/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignupForm />;
}
