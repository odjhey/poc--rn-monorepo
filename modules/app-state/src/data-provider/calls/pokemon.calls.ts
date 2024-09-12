import { Calls } from './calls.types'

type PokemonCalls = {
  fetchPokemon: () => Promise<string[]>
}

export const pokemonCalls: Calls<PokemonCalls> = (
  { url, client },
  context
) => ({
  fetchPokemon: async () => {
    try {
      const result = await client.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100&offset=1000'
      )

      const data: any = await result.json()
      console.log(data.results.map((r: any) => r.name))

      // const response = await client.get(`${url}/api/todos`, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // @todo fixme
      //     Authorization: token || '',
      //   },
      //   body: undefined,
      // })

      // console.log(response.status)
      // // @todo validate this of course
      // return (await response.json()) as string[]
      return []
    } catch (e) {
      console.error(e)
    }
    // this is much better than have the app crash
    return []
  },
})
