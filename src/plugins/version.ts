import type { App } from 'vue'
import packageInfo from '../../package.json'

export default {
  install(_app: App) {
    console.log(`== Application version: ${packageInfo.version} ==`);
  }
}