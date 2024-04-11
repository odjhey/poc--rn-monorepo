import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'

import { appRouter } from './app-router'
import { createContext } from './context'

export default async (fastify: FastifyInstance) => {
  const prefix = '/'

  fastify.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  })
}
