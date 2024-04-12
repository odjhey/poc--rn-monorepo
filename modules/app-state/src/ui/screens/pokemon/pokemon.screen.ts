import type { AppState } from '../../../index'
import { ScreenConfigs } from './pokemon.types'

// Main function to generate screen configurations
export const pokemonScreens = (
  app: AppState
): {
  [K in keyof ScreenConfigs]: ScreenConfigs[K]
} => ({
  'screens/pokemon/list': ({ navigate }) => ({
    actions: {
      addPokemon: () => {
        navigate('screens/pokemon/add')
      },
      viewSingle: ({ id }) => {
        console.log('view single pokemon with id: ', { id })
      },
    },
    views: {
      pokemons: app.pokemon.pokemons(),
    },
  }),

  'screens/pokemon/add': ({ navigate }) => ({
    actions: {
      addPokemon: ({ id }) => {
        console.log('add pokemon with id: ', { id })
        app.pokemon.addPokemon({ id })

        navigate('screens/pokemon/list')
      },
    },
    views: {
      message: 'please add your pokemon',
    },
  }),
})
