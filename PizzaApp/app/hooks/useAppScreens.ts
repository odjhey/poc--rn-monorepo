import { useAppCore } from "app/core/useAppCore"

export const useAppScreens = () => {
  const { appUi } = useAppCore()

  return appUi().screens
}
