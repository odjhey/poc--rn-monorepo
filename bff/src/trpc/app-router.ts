import { publicProcedure, router } from './trpc'
import { mobileConfigRoute } from '../services/mobile-config/mobile-config'
import { todoRoute } from '../services/todo/todo.services'

export const appRouter = router({
  a: publicProcedure.query(() => 'a'),
  b: router({
    c: publicProcedure.query(() => 'c'),
  }),
  'mobile-config': mobileConfigRoute,
  'todo': todoRoute
})

export type AppRouter = typeof appRouter
