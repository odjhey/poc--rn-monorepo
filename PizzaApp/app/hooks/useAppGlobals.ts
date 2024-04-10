import { useAppCore } from "app/core/useAppCore"

export const useAppGlobals = () => {
  const { appUi } = useAppCore()
  const { auth, timers } = appUi()

  return { auth, timers }
}
