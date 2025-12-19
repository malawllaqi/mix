import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { AtSignIcon, ChevronLeftIcon, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { authQueryOptions } from "../queries";
import { SignInSocial } from "./signin-social";

const formSchema = z.object({
	email: z.email(),
	username: z.string().min(1),
	password: z.string().min(8),
});
export type LoginFormType = z.infer<typeof formSchema>;

export function LoginForm() {
	const { redirectUrl } = useRouteContext({ from: "/(unauthenticated)" });
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (user: LoginFormType) => {
			await authClient.signIn.email(
				{
					email: user.email,
					password: user.password,
					callbackURL: redirectUrl,
				},
				{
					onError: ({ error }) => {
						toast.error(error.message || "An error occurred while login.");
					},
					onSuccess: () => {
						queryClient.removeQueries({
							queryKey: authQueryOptions().queryKey,
						});

						navigate({ to: "/" });
					},
				}
			);
		},
	});
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		} as LoginFormType,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
		},
	});
	return (
		<div className="relative flex min-h-screen flex-col justify-center p-4">
			<div
				aria-hidden
				className="-z-10 absolute inset-0 isolate opacity-60 contain-strict"
			>
				<div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-full rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
				<div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
				<div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
			</div>
			<Button asChild className="absolute top-7 left-5" variant="ghost">
				<Link to="/">
					<ChevronLeftIcon />
					Home
				</Link>
			</Button>
			<div className="mx-auto space-y-4 sm:w-sm">
				<Logo className="h-5 lg:hidden" />
				<div className="flex flex-col space-y-1">
					<h1 className="font-bold text-2xl tracking-wide">
						Sign In or Join Now!
					</h1>
					<p className="text-base text-muted-foreground">
						signup or create your account.
					</p>
				</div>
				<div className="space-y-2">
					<SignInSocial
						callbackURL={redirectUrl}
						disabled={isPending}
						icon={<Icons.google />}
						provider="google"
					/>

					<SignInSocial
						callbackURL={redirectUrl}
						disabled={isPending}
						icon={<Icons.gitHub />}
						provider="github"
					/>
				</div>

				<div className="flex w-full items-center justify-center">
					<div className="h-px w-full bg-border" />
					<span className="px-2 text-muted-foreground text-xs">OR</span>
					<div className="h-px w-full bg-border" />
				</div>

				<form
					className="space-y-2"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<form.Field
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field>
									<FieldLabel
										className="text-start text-muted-foreground text-xs"
										htmlFor={field.name}
									>
										Email
									</FieldLabel>
									<InputGroup>
										<InputGroupInput
											aria-invalid={isInvalid}
											// disabled={isPending}
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="your.email@example.com"
											type="email"
											value={field.state.value}
										/>
										<InputGroupAddon>
											<AtSignIcon />
										</InputGroupAddon>
									</InputGroup>
								</Field>
							);
						}}
						name="email"
					/>
					<form.Field
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field>
									<FieldLabel
										className="text-start text-muted-foreground text-xs"
										htmlFor={field.name}
									>
										Password
									</FieldLabel>
									<InputGroup>
										<InputGroupInput
											aria-invalid={isInvalid}
											// disabled={isPending}
											id={field.name}
											name={field.name}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="password"
											type="password"
											value={field.state.value}
										/>
										<InputGroupAddon>
											<LockKeyhole />
										</InputGroupAddon>
									</InputGroup>
								</Field>
							);
						}}
						name="password"
					/>

					<Button className="w-full" disabled={isPending} type="submit">
						{isPending ? <Spinner /> : "Login"}
					</Button>
				</form>
				<p className="mt-8 text-muted-foreground text-sm">
					By clicking continue, you agree to our{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
}
