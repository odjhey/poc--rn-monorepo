import { Calls } from './calls.types'
import { trpcClient } from '../trpc-client/client'

type TodoCalls = {
  fetchTodos: () => Promise<string[]>
  sync: (todos: string[]) => Promise<void>
}

export const todoCalls: Calls<TodoCalls> = ({ url, client }, context) => ({
  fetchTodos: async () => {
    // @todo: extract this to own module/service for better error handling

    try {
      console.log('------try fetch xxx', url)
      const a = await trpcClient(url, client).todo.todos.query()
      console.log({ a })
      const token = await context.getToken()
      const response = await client.get(`${url}/api/todos`, {
        headers: {
          'Content-Type': 'application/json',
          // @todo fixme
          Authorization: token || '',
        },
        body: undefined,
      })

      console.log(response.status)
      // @todo validate this of course
      return (await response.json()) as string[]
    } catch (e) {
      console.error(e)
    }
    // this is much better than have the app crash
    return []
  },

  sync: async (todos: string[]) => {
    try {
      const res = await trpcClient(url, client).todo.sync.mutate({ todos })
      console.log({ res })

      const token = await context.getToken()
      const result = await client.post(`${url}/api/todos`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(todos),
      })
      console.log(result.status)
    } catch (e) {
      console.error(e)
    }
  },
})
