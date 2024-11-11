import { type PiniaPluginContext } from 'pinia'
import { useUserStorage } from '@/stores/storage-plugin/user-storage'

export const storagePlugin = (context: PiniaPluginContext) => {
  useUserStorage(context)
}
