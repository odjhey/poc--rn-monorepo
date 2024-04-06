export const appState = {
  sayHello: () => 'gg 32',
  setJohn: (setV: (v: string) => void, effect : () => void) => {
    setV('john')
    effect()
  }
}
