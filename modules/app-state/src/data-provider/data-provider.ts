type HttpClient = {
  get: (
    url: string,
    options: {
      body: unknown
      headers: {
        Authorization: string
        'Content-Type': 'application/json'
      }
    }
  ) => Promise<{
    readonly ok: boolean
    readonly status: number
    readonly statusText: string
    readonly json: () => Promise<unknown>
  }>
  post: (
    url: string,
    options: {
      body?: unknown
      headers?: {
        Authorization?: string
        'Content-Type': 'application/json'
      }
    }
  ) => Promise<{
    readonly ok: boolean
    readonly status: number
    readonly statusText: string
    readonly json: () => Promise<unknown>
  }>
}

export const DataProvider = ({
  config,
}: {
  config: {
    url: string
    httpClient: HttpClient
  }
}) => {
  const apiUrl = config.url
  const httpClient = config.httpClient
  const context = {
    // @todo should be a result type?
    getToken: async () => {
      try {
        const result = await httpClient.post(`${apiUrl}/public/login`, {})
        // @todo check payload
        return ((await result.json()) as { token: string }).token
      } catch (e) {
        console.error(e)
        return ''
      }
    },
  } as const

  return {
    context,
    calls: {
      fetchTodos: async () => {
        // @todo: extract this to own module/service for better error handling
        try {
          const token = await context.getToken()
          const response = await httpClient.get(`${apiUrl}/api/todos`, {
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
          const token = await context.getToken()
          const result = await httpClient.post(`${apiUrl}/api/todos`, {
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
    },
  } as const
}

export type Context = ReturnType<typeof DataProvider>['context']
export type Api = ReturnType<typeof DataProvider>['calls']
