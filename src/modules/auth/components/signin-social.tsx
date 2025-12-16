import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type SignInSocialProps = {
	provider: "github" | "google";
	icon: ReactNode;
	disabled?: boolean;
	callbackURL: string;
};

export function SignInSocial(props: SignInSocialProps) {
	const mutation = useMutation({
		mutationFn: async () => {
			await authClient.signIn.social(
				{
					provider: props.provider,
					callbackURL: props.callbackURL,
				},
				{
					onError: ({ error }) => {
						toast.error(
							error?.message ||
								`An error occurred during ${[props.provider]} sign-in.`
						);
					},
				}
			);
		},
	});
	return (
		<Button
			className="w-full"
			disabled={mutation.isPending || mutation.isSuccess || props.disabled}
			onClick={() => mutation.mutate()}
			type="button"
			// variant="outline"
		>
			{props.icon}

			<span className="">
				Continue with <span className="capitalize">{props.provider}</span>
			</span>
		</Button>
	);
}
