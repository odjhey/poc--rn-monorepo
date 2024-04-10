import fastify, {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { z } from 'zod'

const server = fastify({ logger: true })

const HARD_CODED_TOKEN: string = 'Bearer mysecrettoken'

// Middleware to check the Authorization header
const checkAuthHeader = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const authHeader = request.headers.authorization
  if (!authHeader || authHeader !== HARD_CODED_TOKEN) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}

const protectedRoutes: FastifyPluginAsync = async (api) => {
  api.addHook('preHandler', checkAuthHeader)

  let todos: string[] = ['default', 'default']

  api.get('/todos', async (request, reply) => {
    return todos
  })

  api.post('/todos', async (request, reply) => {
    const validatedTodos = z.array(z.string()).safeParse(request.body)
    if (validatedTodos.success === false) {
      return reply.status(400).send(validatedTodos.error)
    }

    todos = validatedTodos.data
    return todos
  })
}

const publicRoutes: FastifyPluginAsync = async (api) => {
  api.post('/login', async (request, reply) => {
    return { token: HARD_CODED_TOKEN }
  })
}

server.register(protectedRoutes, { prefix: '/api' })
server.register(publicRoutes, { prefix: '/public' })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
