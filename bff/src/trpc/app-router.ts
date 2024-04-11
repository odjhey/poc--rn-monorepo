import { publicProcedure, router } from './trpc'
import { mobileConfigRoute } from '../services/mobile-config/mobile-config'

export const appRouter = router({
  a: publicProcedure.query(() => 'a'),
  b: router({
    c: publicProcedure.query(() => 'c'),
  }),
  'mobile-config': mobileConfigRoute,
})

export type AppRouter = typeof appRouter
