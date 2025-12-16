import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({});

export type AppRouter = typeof appRouter;

// export const todosRouter = {
// 	list: publicProcedure.query(
// 		async ({ ctx }) => await ctx.db.query.todo.findMany()
// 	),
// 	add: publicProcedure
// 		.input(z.object({ name: z.string() }))
// 		.mutation(({ input }) => {
// 			const newTodo = { id: todos.length + 1, name: input.name };
// 			todos.push(newTodo);
// 			return newTodo;
// 		}),
// } satisfies TRPCRouterRecord;
