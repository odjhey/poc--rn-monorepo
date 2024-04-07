import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ViewTodoScreenProps extends AppStackScreenProps<"ViewTodo"> {}

export const ViewTodoScreen: FC<ViewTodoScreenProps> = observer(function ViewTodoScreen({
  navigation,
  route: {
    params: { index },
  },
}) {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const { actions, views } = useAppScreens()["screens/todo/single"]({
    navigate: (target) => {
      switch (target) {
        case "screens/todo/list":
          navigation.navigate("Another")
          break
      }
    },
  })

  return (
    <Screen style={$container}>
      <View style={$topContainer}>
        <Text>This is view single</Text>
        <Text>{views.todo(index)}</Text>
      </View>
      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button onPress={actions.list}>home</Button>
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
