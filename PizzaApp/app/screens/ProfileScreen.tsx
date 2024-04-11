import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const screen = useAppScreens()["screens/auth/profile"]({
    navigate: () => {
      // none
    },
  })
  return (
    <Screen style={$root} preset="scroll">
      <Text text="profile" />
      <Button
        onPress={() => {
          screen.actions.logout()
        }}
        text="logout"
      ></Button>
      <Button
        onPress={() => {
          screen.actions.wipe()
        }}
        text="wipe"
      ></Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
