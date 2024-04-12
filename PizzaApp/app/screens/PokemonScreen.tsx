import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useAppScreens } from "app/hooks/useAppScreens"
import { colors, spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface PokemonScreenProps extends AppStackScreenProps<"Pokemon"> {}

export const PokemonScreen: FC<PokemonScreenProps> = observer(function PokemonScreen({
  navigation,
}) {
  const screen = useAppScreens()["screens/pokemon/list"]({
    navigate: (target) => {
      switch (target) {
        case "screens/pokemon/add":
          navigation.navigate("PokemonAdd")
          break
      }
    },
  })

  const { actions, views } = screen

  return (
    <Screen style={$container}>
      <View style={$topContainer}>
        {views.pokemons.map((pokemon) => (
          <Text
            key={pokemon}
            text={pokemon}
            onPress={() => {
              actions.viewSingle({ id: pokemon })
            }}
          />
        ))}
      </View>
      <View style={$bottomContainer}>
        <Button
          onPress={() => {
            actions.addPokemon()
          }}
        >
          Add
        </Button>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}
