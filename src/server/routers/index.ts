import type { InferRouterInputs, InferRouterOutputs } from "@orpc/server";
import { chatRouter } from "./chat";
import { todosRouter } from "./todos";

export const appRouter = {
	todo: todosRouter,
	chat: chatRouter,
};

export type AppRouter = typeof appRouter;
export type Inputs = InferRouterInputs<typeof appRouter>;
export type Outputs = InferRouterOutputs<typeof appRouter>;
