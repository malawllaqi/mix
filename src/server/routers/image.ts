import { experimental_generateImage as generateImage } from "ai";

import { z } from "zod";
import { protectedProcedure } from "../orpc";

const create = protectedProcedure
	.input(
		z.object({
			prompt: z.string(),
		})
	)
	.handler(async ({ input }) => {
		const { image } = await generateImage({
			model: "google/imagen-4.0-generate",
			// model: openai.image("dall-e-3"),
			prompt: input.prompt,
			size: "1024x1024",
		});

		return {
			base64: image.base64,
			uint8Array: image.uint8Array,
			mediaType: image.mediaType,
		};
	});

export const imageRouter = {
	create,
};
