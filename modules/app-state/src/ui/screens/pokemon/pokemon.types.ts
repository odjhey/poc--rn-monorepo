import { ScreenConfigFn } from '../../screens.types'

// Define the structure of all screens and their possible navigation targets
export type ScreenConfigs = {
  'screens/pokemon/list': ScreenConfigFn<
    never,
    {
      viewSingle: (params: { id: string }) => void
    },
    { pokemons: string[] }
  >
}
