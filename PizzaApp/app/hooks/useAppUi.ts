import { appState, appUi } from "@ftmobsquad/collections-app-state"
import { useStores } from "app/models"
// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid } from "react-native"

export const useAppUi = () => {
  const { todo } = useStores()

  const state = appState(todo, {
    online: {
      fetchTodos: async () => {
        // #todo: extract this to own module/service for better error handling
        try {
          const response = await fetch("http://localhost:8080/todos", {
            method: "GET",
          })

          // @todo validate this of course
          return await response.json()
        } catch (e) {
          console.error(e)
        }
        // this is much better than have the app crash
        return []
      },

      sync: async (todos: string[]) => {
        try {
          const result = await fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(todos),
          })
          console.log(result.status)
        } catch (e) {
          console.error(e)
        }
      },
    },

    notifications: {
      info: (message: string) => {
        // Alert.alert("Info", message)
        ToastAndroid.show(message, ToastAndroid.SHORT)
      },
    },
  })
  const ui = appUi(state)

  return { ui }
}
