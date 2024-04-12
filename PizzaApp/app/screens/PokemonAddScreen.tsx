import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PokemonAddScreenProps extends AppStackScreenProps<"PokemonAdd"> {}

export const PokemonAddScreen: FC<PokemonAddScreenProps> = observer(function PokemonAddScreen({
  navigation,
}) {
  const screen = useAppScreens()["screens/pokemon/add"]({
    navigate: (target) => {
      switch (target) {
        case "screens/pokemon/list":
          navigation.navigate("Pokemon")
          break
      }
    },
  })

  const { actions, views } = screen

  const [pokemonName, setPokemonName] = useState<string>("")

  return (
    <Screen style={$root} preset="scroll">
      <Text text="pokemonAdd" />
      <Text text="pokemonAdd" />
      <Text text="pokemonAdd" />
      <Text text="pokemonAdd" />
      <Text text="pokemonAdd" />
      <Text text="pokemonAdd" />

      <TextField
        value={pokemonName}
        onChange={(text) => {
          setPokemonName(text.nativeEvent.text)
        }}
      ></TextField>

      <Button
        onPress={() => {
          actions.addPokemon({ id: pokemonName })
        }}
      >
        Save
      </Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
