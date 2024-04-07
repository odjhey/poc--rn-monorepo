import { useAppUi } from "./useAppUi"

export const useAppScreens = () => {
  const { ui } = useAppUi()

  return ui.screens
}
