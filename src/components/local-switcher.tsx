import { CheckIcon, ChevronsUpDownIcon, LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { AVAILABLE_LANGUAGES, type LanguageKey } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export const LocalSwitcher = (props: { iconOnly?: boolean }) => {
	const { i18n, t } = useTranslation(["common"]);
	const mounted = useMounted();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size={props.iconOnly ? "icon" : "default"}
					variant={props.iconOnly ? "ghost" : "link"}
				>
					<LanguagesIcon className="opacity-50" />
					{mounted ? (
						<span className={cn(props.iconOnly && "sr-only")}>
							{t(`common:languages.values.${i18n.language as LanguageKey}`)}
						</span>
					) : (
						<Skeleton className={cn("h-4 w-16", props.iconOnly && "sr-only")} />
					)}
					{!props.iconOnly && <ChevronsUpDownIcon className="opacity-50" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{AVAILABLE_LANGUAGES.map((language) => (
					<DropdownMenuItem
						key={language.key}
						onClick={() => {
							i18n.changeLanguage(language.key);
						}}
					>
						<CheckIcon
							className={cn(
								"mt-0.5 size-4 self-start text-current",
								mounted && i18n.language === language.key
									? "opacity-100"
									: "opacity-0"
							)}
						/>
						<span className="flex flex-col">
							<span>{t(`common:languages.values.${language.key}`)}</span>
							{mounted && language.key !== i18n.language && (
								<span className="text-xs opacity-60">
									{t(`common:languages.values.${language.key}`, {
										lng: language.key,
									})}
								</span>
							)}
						</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
