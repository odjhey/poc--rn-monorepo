import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape
  },
})

export const authedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts
  if (!ctx.req.headers.authorization) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  if (ctx.req.headers.authorization !== 'Bearer mysecrettoken') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next()
})

export const router = t.router
export const publicProcedure = t.procedure
