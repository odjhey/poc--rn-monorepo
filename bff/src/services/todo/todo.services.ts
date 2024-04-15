import { z } from 'zod'
import { publicProcedure, router } from '../../trpc/trpc'
import { TRPCError } from '@trpc/server'

let todos: string[] = []

export const todoRoute = router({
  todos: publicProcedure.query(() => {
    return todos
  }),

  sync: publicProcedure
    .input(z.object({ todos: z.array(z.string()) }))
    .mutation(({ input: { todos: todosInput } }) => {
      todos = todosInput
    }),

  new: publicProcedure
    .input(z.object({ todo: z.string().min(1) }))
    .mutation(({ input: { todo } }) => {
      const bannedWords = ['lol', 'foo', 'bar']
      if (bannedWords.includes(todo)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Word is banned',
        })
      }

      todos.push(todo)
    }),
})
