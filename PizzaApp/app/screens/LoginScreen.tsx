import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const screen = useAppScreens()["screens/auth/login"]({
    navigate: () => {
      // none
    },
  })

  return (
    <Screen style={$root} preset="scroll">
      <Text size="lg" text="login" />

      <Button
        onPress={() => {
          screen.actions.login({ username: "test", password: "test" })
        }}
        text="login"
      ></Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
