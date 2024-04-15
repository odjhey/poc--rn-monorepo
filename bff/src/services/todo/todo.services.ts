import { z } from 'zod'
import { authedProcedure, router } from '../../trpc/trpc'
import { TRPCError } from '@trpc/server'

let todos: string[] = ['some stuff lol']

export const todoRoute = router({
  todos: authedProcedure.query(() => {
    return todos
  }),

  sync: authedProcedure
    .input(z.object({ todos: z.array(z.string()) }))
    .mutation(({ input: { todos: todosInput } }) => {
      todos = todosInput
    }),

  new: authedProcedure
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
