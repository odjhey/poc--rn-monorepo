import { useAppCore } from "app/core/useAppCore"

export const useAppGlobals = () => {
  const { appUi } = useAppCore()

  return appUi().globals
}
