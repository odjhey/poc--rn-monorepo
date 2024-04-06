import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useStores } from "app/models"
import { appState } from "@ftmobsquad/collections-app-state"

interface AnotherScreenProps extends AppStackScreenProps<"Another"> {}

export const AnotherScreen: FC<AnotherScreenProps> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const a = useStores()

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Button
          onPress={() => {
            const v = appState.sayHello()
            a.setValue(v)
          }}
        >
          view
        </Button>
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text>{a.selectedValue}</Text>
      </View>
    </View>
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
