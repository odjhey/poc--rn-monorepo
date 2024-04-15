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
  client: HttpClient
): ReturnType<typeof createTRPCProxyClient<AppRouter>> {
  if (config.url !== url) {
    config.url = url
    trpcClient = null
  }

  if (!trpcClient) {
    trpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${config.url}/rpc`,
          fetch: trpcFetch(client),
        }),
      ],
    })
  }
  return trpcClient
}

export { getTrpcClient as trpcClient }
