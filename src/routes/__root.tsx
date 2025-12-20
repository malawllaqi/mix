import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useTranslation } from "react-i18next";
import { AppProviders } from "@/components/providers/app-provider";
import { setSSRLanguage, syncLanguage } from "@/lib/i18n";
import { AVAILABLE_LANGUAGES } from "@/lib/i18n/config";
import appCss from "../styles.css?url";

type MyRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		await setSSRLanguage();
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { i18n } = useTranslation();
	syncLanguage(i18n.language);

	const languageConfig = AVAILABLE_LANGUAGES.find(
		({ key }) => key === i18n.language
	);
	return (
		<html
			dir={languageConfig?.dir ?? "ltr"}
			lang={i18n.language}
			suppressHydrationWarning
		>
			<head>
				<HeadContent />
			</head>
			<body>
				<AppProviders>{children}</AppProviders>
				<TanStackDevtools
					plugins={[
						{
							name: "TanStack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
