import { appState, appUi } from "@ftmobsquad/collections-app-state"
import { useStores } from "app/models"

export const useAppUi = () => {
  const { todo } = useStores()

  const state = appState(todo)
  const ui = appUi(state)

  return { ui }
}
