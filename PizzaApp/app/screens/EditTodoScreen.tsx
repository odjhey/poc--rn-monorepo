import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, TextField } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppScreens } from "app/hooks/useAppScreens"

interface AnotherScreenProps extends AppStackScreenProps<"EditTodo"> {}

export const EditTodoScreen: FC<AnotherScreenProps> = observer(function WelcomeScreen({
  navigation,
}) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const screen = useAppScreens()["screens/todo/add"]({
    navigate: (target) => {
      switch (target) {
        case "screens/todo/list":
          navigation.navigate("Another")
          break
      }
    },
  })

  const [newTodo, setNewTodo] = useState("")

  return (
    <View style={$container}>
      <View style={$topContainer}></View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          onPress={() => {
            screen.actions.add(newTodo)
          }}
        >
          add
        </Button>
        <TextField
          onChange={(e) => {
            setNewTodo(e.nativeEvent.text)
          }}
        ></TextField>
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
