import { streamToEventIterator } from "@orpc/client";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { protectedProcedure } from "../orpc";

const create = protectedProcedure
	.input(
		z.object({
			chatId: z.string(),
			messages: z.custom<UIMessage[]>(),
		})
	)
	.handler(({ input }) => {
		const result = streamText({
			model: "google/gemini-2.0-flash-lite",
			// model: gateway("google/gemini-2.5-flash-image"),
			// model: "google/gemini-2.5-flash-image",
			// providerOptions: {
			// 	google: { responseModalities: ["TEXT", "IMAGE"] },
			// },

			messages: convertToModelMessages(input.messages),
			system:
				"You are a helpful assistant that can answer questions and help with tasks",
		});

		return streamToEventIterator(result.toUIMessageStream());
	});

export const chatRouter = {
	create,
};
