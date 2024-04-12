import type { AppState } from '../../../index'
import { ScreenConfigs } from './pokemon.types'

// Main function to generate screen configurations
export const pokemonScreens = (
  _app: AppState
): {
  [K in keyof ScreenConfigs]: ScreenConfigs[K]
} => ({
  'screens/pokemon/list': () => ({
    actions: {
      viewSingle: ({ id }) => {
        console.log('view single pokemon with id: ', { id })
      },
    },
    views: {
      pokemons: ['psyduck', 'bulbasaur', 'john cena'],
    },
  }),
})
