import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppScreens } from "app/hooks/useAppScreens"
import { useAppGlobals } from "app/hooks/useAppGlobals"

interface AnotherScreenProps extends AppStackScreenProps<"Another"> {}

export const AnotherScreen: FC<AnotherScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { timers } = useAppGlobals()

  const screen = useAppScreens()["screens/todo/list"]({
    navigate: (target) => {
      // @todo fix the type
      switch (target) {
        case "screens/todo/add":
          navigation.navigate("AddTodo")
          break
      }
    },
  })

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text>{timers.timer()}</Text>
        {screen.views.todos().map((todo, index) => {
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
            screen.actions.add()
          }}
        >
          add
        </Button>
        <Button
          onPress={() => {
            screen.actions.clear()
          }}
        >
          clear
        </Button>
        <Button
          onPress={() => {
            screen.actions.refresh()
          }}
        >
          refresh
        </Button>
        <Button
          onPress={() => {
            screen.actions.sync()
          }}
        >
          sync
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
