export const CONFIG = {
  collectionsApi: {
    localProxy: process.env.COLLECTIONS_PROXY_LOCAL || 'http://localhost:8080',
    localUrl: process.env.COLLECTIONS_LOCAL || '', // rw
  },
}
