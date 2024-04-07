import fastify from 'fastify'
import { z } from 'zod'

const server = fastify({ logger: true })

let todos: string[] = ['default', 'default']

server.get('/todos', async (request, reply) => {
  return todos
})

server.post('/todos', async (request, reply) => {
  const validatedTodos = z.array(z.string()).safeParse(request.body)
  if (validatedTodos.success === false) {
    return reply.status(400).send(validatedTodos.error)
  }

  todos = validatedTodos.data
  return todos
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
