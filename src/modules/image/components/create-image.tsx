"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Image } from "@/components/ai-elements/image";
import {
	PromptInput,
	PromptInputSubmit,
	PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Spinner } from "@/components/ui/spinner";
import { orpc } from "@/lib/client";

export const CreateImage = () => {
	const queryClient = useQueryClient();

	const [prompt, setPrompt] = useState("A futuristic cityscape at sunset");
	const { mutate, isPending, data } = useMutation(
		orpc.image.create.mutationOptions({
			onSuccess: async (data) => {
				console.log(data);
				toast.success("created image");
				await queryClient.invalidateQueries({
					queryKey: orpc.image.key(),
					type: "all",
				});
			},
			onError: (err) => {
				console.log(err);
			},
		})
	);
	return (
		<div className="relative mx-auto size-full h-[600px] max-w-4xl rounded-lg border p-6">
			<div className="flex h-full flex-col">
				<div className="flex-1 overflow-y-auto p-4">
					{data && (
						<div className="flex justify-center">
							<Image
								{...data}
								alt="Generated image"
								className="aspect-square h-[300px] rounded-lg border"
							/>
						</div>
					)}
					{isPending && <Spinner />}
				</div>
				<PromptInput
					className="mt-4"
					globalDrop
					multiple
					onSubmit={() => mutate({ prompt })}
				>
					<PromptInputTextarea
						className="pr-12"
						onChange={(e) => setPrompt(e.currentTarget.value)}
						placeholder="Describe the image you want to generate..."
						value={prompt}
					/>
					<PromptInputSubmit
						className="absolute right-1 bottom-1"
						disabled={!prompt.trim()}
						status={isPending ? "submitted" : "ready"}
					/>
				</PromptInput>
			</div>
		</div>
	);
};
