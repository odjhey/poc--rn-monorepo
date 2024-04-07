import { AppState } from '../index'
import type { Screens } from './screens.types'
import { todoScreens } from './screens/todo'

export const appUi = (app: AppState) => {
  const screens = {
    ...todoScreens(app),
  } as const

  // type-check workaround since i can't seem to infer the type of screens
  type InferredScreens = typeof screens
  type ValidateScreensCoverage = {
    [K in Screens]: K extends keyof InferredScreens ? InferredScreens[K] : never
  }
  // Compile-time validation (won't be used at runtime)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _screen_definition_completeness_check: ValidateScreensCoverage = screens

  return {
    globals: {
      timer: {
        get: app.timer.value,
      },
    },
    screens,
  }
}
