import type { InferRouterInputs, InferRouterOutputs } from "@orpc/server";
import { chatRouter } from "./chat";
import { imageRouter } from "./image";
import { todosRouter } from "./todos";

export const appRouter = {
	todo: todosRouter,
	chat: chatRouter,
	image: imageRouter,
};

export type AppRouter = typeof appRouter;
export type Inputs = InferRouterInputs<typeof appRouter>;
export type Outputs = InferRouterOutputs<typeof appRouter>;
