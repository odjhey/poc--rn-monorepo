import { z } from 'zod'
import { publicProcedure, router } from '../../trpc/trpc'
import { config } from './mobile-config.values'
import { TRPCError } from '@trpc/server'

export const mobileConfigRoute = router({
  config: publicProcedure
    .input(z.object({ seed: z.string().min(4) }))
    .query(({ input }) => {
      const values = config[input.seed]

      if (!values) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'input invalid',
        })
      }

      return values.values
    }),
})
