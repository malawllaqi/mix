import type { Icons } from "@/components/icons";
import type { Session } from "./auth";

export type NavItem = {
	title: string;
	url: string;
	disabled?: boolean;
	icon: keyof typeof Icons;
	isActive?: boolean;
};

export type CurrentUserProps = {
	currentUser: Session["user"];
};
