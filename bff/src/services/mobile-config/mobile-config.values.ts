import { CONFIG } from '../../config/config'

type Config = Record<
  string,
  {
    seed: string
    values: {
      version: string
      apiProxy: string
    }
  }
>

export const config: Config = {
  local: {
    seed: 'local',
    values: {
      version: '0.0.0',
      apiProxy: CONFIG.collectionsApi.localProxy,
    },
  },
}
