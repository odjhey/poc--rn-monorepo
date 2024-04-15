// trpcClient.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from 'client-bff'
import { trpcFetch } from './fetch-wrapper'
import { HttpClient } from '../http-client.types'

const config = {
  url: '',
  headers: {},
}

let trpcClient: ReturnType<typeof createTRPCProxyClient<AppRouter>> | null =
  null

function getTrpcClient(
  url: string,
  client: HttpClient,
  headers: Record<string, string> = {}
): ReturnType<typeof createTRPCProxyClient<AppRouter>> {
  if (
    config.url !== url ||
    JSON.stringify(config.headers) !== JSON.stringify(headers)
  ) {
    config.url = url
    config.headers = headers
    trpcClient = null
  }

  if (!trpcClient) {
    trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.url}/rpc`,
          fetch: trpcFetch(client, { headers }),
        }),
      ],
    })
  }
  return trpcClient
}

export { getTrpcClient as trpcClient }
