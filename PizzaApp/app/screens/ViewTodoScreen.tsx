import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useStores } from "app/models"
import { appState } from "@ftmobsquad/collections-app-state"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ViewTodoScreenProps extends AppStackScreenProps<"ViewTodo"> {}

export const ViewTodoScreen: FC<ViewTodoScreenProps> = observer(function ViewTodoScreen() {
  const app = appState(useStores().todo)
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const todo = app.todo.getIdx(0)

  return (
    <Screen style={$container}>
      <View style={$topContainer}>
        <Text>{todo}</Text>
      </View>
      <View style={[$bottomContainer, $bottomContainerInsets]}></View>
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
