import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { appState, appUi } from "@ftmobsquad/collections-app-state"
import { useStores } from "app/models"

interface AnotherScreenProps extends AppStackScreenProps<"Another"> {}

export const AnotherScreen: FC<AnotherScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const store = useStores()
  const state = appState(store.todo)
  const ui = appUi(state, {
    navigate: (target) => {
      // @todo fix the type
      switch (target) {
        case "screens/todo/list":
          navigation.navigate("Another")
          break
        case "screens/todo/add":
          navigation.navigate("AddTodo")
          break
      }
    },
  })

  const { actions } = ui.screens["screens/todo/list"]

  return (
    <View style={$container}>
      <View style={$topContainer}>
        {state.todo.get().map((todo, index) => {
          return (
            <Text
              onPress={() => {
                navigation.navigate("ViewTodo", { index })
              }}
              key={index}
            >
              {todo}
            </Text>
          )
        })}
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          onPress={() => {
            actions.add()
          }}
        >
          add
        </Button>
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
