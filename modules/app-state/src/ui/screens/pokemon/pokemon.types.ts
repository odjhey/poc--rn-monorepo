import { ScreenConfigFn } from '../../screens.types'

// Define the structure of all screens and their possible navigation targets
export type ScreenConfigs = {
  'screens/pokemon/list': ScreenConfigFn<
    'screens/pokemon/add',
    {
      viewSingle: (params: { id: string }) => void
      addPokemon: () => void
    },
    { pokemons: string[] }
  >
  'screens/pokemon/add': ScreenConfigFn<
    'screens/pokemon/list',
    {
      addPokemon: (params: { id: string }) => void
    },
    { message: string }
  >
}
