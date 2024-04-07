import { appUi } from "@ftmobsquad/collections-app-state"
import { useAppCore } from "app/core/useAppCore"

export const useAppUi = () => {
  const { appState } = useAppCore()
  const ui = appUi(appState())

  return { ui }
}
