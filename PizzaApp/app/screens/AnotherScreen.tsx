import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Text, TextField } from "app/components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { appState } from "@ftmobsquad/collections-app-state"
import { useStores } from "app/models"

interface AnotherScreenProps extends AppStackScreenProps<"Another"> {}

export const AnotherScreen: FC<AnotherScreenProps> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const store = useStores()
  const state = appState(store.todo)

  const [newTodo, setNewTodo] = useState("")

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text>{JSON.stringify(state.todo.get())}</Text>
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          onPress={() => {
            state.todo.add(newTodo)
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
