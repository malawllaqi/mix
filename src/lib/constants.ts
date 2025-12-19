import type { NavItem } from "./types";

export const navItems: NavItem[] = [
	{
		title: "Chat",
		url: "/chat",
		icon: "chat",
	},
];

export const userMenuItems = [
	{
		title: "Profile",
		href: "/settings/profile",
	},
	{
		title: "Account Settings",
		href: "/dashboard/account",
	},
	{
		title: "Logout",
		href: "/logout",
	},
];
export const restrictedUsernames = [
	"admin",
	"administrator",
	"root",
	"superadmin",
	"system",
	"null",
	"undefined",
	"support",
	"help",
	"contact",
	"info",
	"official",
	"owner",
	"moderator",
	"mod",
	"staff",
	"team",
	"server",
	"api",
	"email",
	"security",
	"test",
	"user",
	"users",
	"username",
	"guest",
	"webmaster",
	"manager",
	"operator",
	"dev",
	"developer",
	"emasaji",
	"me",
	"you",
	"bot",
	"god",
	"jesus",
	"allah",
	"cakfan",
];
