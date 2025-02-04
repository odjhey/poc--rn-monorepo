import { AppModel } from "@ftmobsquad/collections-app-state"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    selectedValue: types.optional(types.string, "initial value"),
    todo: types.optional(AppModel, { todo: { todo: [] }, connection: { url: "" } }),
  })
  .actions((self) => ({
    setValue: (value: string) => {
      self.selectedValue = value
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
