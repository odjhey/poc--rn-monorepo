import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text, TextField } from "app/components"
import { useAppScreens } from "app/hooks/useAppScreens"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConnectionSetupScreenProps extends AppStackScreenProps<"ConnectionSetup"> {}

export const ConnectionSetupScreen: FC<ConnectionSetupScreenProps> = observer(
  function ConnectionSetupScreen() {
    const [url, setUrl] = React.useState("http://localhost:8080")
    const screen = useAppScreens()["screens/client-selector/select"]({
      navigate: () => {
        // none
      },
    })

    return (
      <Screen style={$root} preset="scroll">
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <Text text="connectionSetup" />
        <TextField
          value={url}
          onChange={({ nativeEvent }) => {
            setUrl(nativeEvent.text)
          }}
        ></TextField>
        <Button
          onPress={() => {
            screen.actions.setSeed({ seed: url })
          }}
          text={"Set Seed"}
        ></Button>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
