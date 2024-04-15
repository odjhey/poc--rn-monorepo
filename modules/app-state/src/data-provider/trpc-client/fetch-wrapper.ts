import { HttpClient } from '../http-client.types'

export function trpcFetch(
  httpClient: HttpClient,
  options: { headers: Record<string, string> }
) {
  return function (
    input: RequestInfo | URL | string,
    init?: RequestInit
  ): Promise<Response> {
    // check type of input whether RequestInfo | URL
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url
    const method = init?.method ?? 'POST' // Default to POST
    const body = init?.body
    const headers = {
      'Content-Type': 'application/json',
      ...init?.headers,
      ...options.headers,
    } as { Authorization: string; 'Content-Type': 'application/json' }

    if (method.toUpperCase() === 'POST') {
      // @todo properly fix response type
      return httpClient.post(url, { body, headers }) as Promise<Response>
    } else {
      // @todo properly fix response type
      return httpClient.get(url, {
        headers,
        body: undefined,
      }) as Promise<Response>
    }
  }
}
