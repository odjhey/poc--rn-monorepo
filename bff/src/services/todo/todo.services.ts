import { z } from 'zod'
import { publicProcedure, router } from '../../trpc/trpc'
import { TRPCError } from '@trpc/server'

let todos: string[] = []

export const todoRoute = router({
    todos: publicProcedure
        .query(() => {
            return todos
        }),

        sync: publicProcedure.input(z.object({todos: z.array(z.string())})).mutation(({input: {todos : todosInput}}) => {
            todos = todosInput
        }),


    new: publicProcedure
        .input(z.object(
            { todo: z.string().min(1) }
        )).mutation(({ input: { todo } }) => {
            todos.push(todo)
        })
})
