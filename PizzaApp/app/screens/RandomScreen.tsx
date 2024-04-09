import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface RandomScreenProps extends AppStackScreenProps<"Random"> {}

export const RandomScreen: FC<RandomScreenProps> = observer(function RandomScreen() {
  const screen = useAppScreens()["screens/todo/add"]({
    navigate: (_) => {
      // none
    },
  })

  const [s, ss] = useState("")

  return (
    <Screen style={$container} preset="scroll">
      <View style={$topContainer}>
        <Button
          onPress={() => {
            ss(screen.actions.random().value)
          }}
        ></Button>
      </View>
      <View style={$bottomContainer}>
        <Text>{s}</Text>
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
