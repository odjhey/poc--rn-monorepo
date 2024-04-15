import { Calls } from './calls.types'
import { trpcClient } from '../trpc-client/client'

type TodoCalls = {
  fetchTodos: () => Promise<string[]>
  sync: (todos: string[]) => Promise<void>
}

export const todoCalls: Calls<TodoCalls> = ({ url, client }, context) => ({
  fetchTodos: async () => {
    // @todo: extract this to own module/service for better error handling

    const token = await context.getToken()
    try {
      const result = await trpcClient(url, client, {
        authorization: `${token}`,
      }).todo.todos.query()
      // @todo validate this of course
      return result
    } catch (e) {
      console.error(e)
    }
    // this is much better than have the app crash
    return []
  },

  sync: async (todos: string[]) => {
    // @todo: extract this to own module/service for better error handling

    const token = await context.getToken()
    try {
      await trpcClient(url, client, { authorization: token }).todo.sync.mutate({
        todos,
      })
    } catch (e) {
      console.error(e)
    }
    // this is much better than have the app crash
  },
})
