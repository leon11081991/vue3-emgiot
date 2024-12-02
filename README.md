# vue3-emgiot
雲端掌櫃 EmgIot system


## 專案資訊
本專案使用 Vue3 和 Vite 開發。  
UI 框架使用Ant design。


### 相關開發文件、資訊

***功能參考*** 

[(舊版)雲端掌櫃](https://cm.alfaloop.com/Dashboard)

| Account     | Password     |
|-------------|--------------|
| 0935471701  | squirrel0303 |

***UI FLOW***

[UI Flow chart](https://overflow.io/s/KH44MLMA/?node=e76d6eb6)

| Password    |
|-------------|
| Egm123Team  |


## 安裝與設定

### 開發環境需求
- [Node.js](https://nodejs.org) 版本: v18.20.4  
- npm 版本: 10.7.0


### 專案初始化步驟

```bash
git clone <repository-url>
cd <project-folder>
```

```bash
npm install
```


### 安裝依賴套件與依賴文檔

- [pinia](https://pinia.vuejs.org/) - 狀態管理
- [axios](https://axios-http.com/docs/intro) - HTTP請求
- [sass](https://sass-lang.com/) - 樣式
- [vue-i18n](https://vue-i18n.intlify.dev/guide/installation.html) - 多國語系
- [Ant Design Vue](https://antdv.com/) - UI Framework
- [dayjs](https://day.js.org/docs/en/installation/installation) - 日期時間
- [chart.js](https://www.chartjs.org/) - 圖表
- [vue-chartjs](https://vue-chartjs.org/) - 圖表
- [quasar](https://quasar.dev/) - UI Framework（For 日曆UI）
- [@quasar/extras](https://www.npmjs.com/package/@quasar/extras) - UI Framework（For 日曆UI）
- [vue-draggable-plus](https://vue-draggable-plus.pages.dev/) - 拖曳
- [vue-qrcode-reader](https://gruhn.github.io/vue-qrcode-reader/) - QRCode
- [vue-router] - 路由
- [vue3-google-login] - Google 登入


### 環境變數設置

請參照 **.env.example 檔案**  內容做設置

```ts
VITE_APP_PORT=CUSTOM_PORT
VITE_BASE_URL=/
VITE_API_BASE_URL=CUSTOM_BASE_URL
VITE_API_VERSION=''
VITE_GOOGLE_CLIENT_ID=CUSTOM_GOOGLE_CLIENT_ID
```

env.ts 檔會引入 .env 中的設置，統一導出 env 物件。  
目前"VITE_API_BASE_URL"和"VITE_GOOGLE_CLIENT_ID"為設置的話，會在 console 出現錯誤。


## 編譯與運行

##### 開發模式
```ts
npm run dev
```

##### 編譯生產版本
```ts
npm run build
```


## 程式碼風格規範

1. 參考 [Vue 官方程式碼風格規範 Style Guide](https://vuejs.org/style-guide)
2. 程式碼檢查及排版
   - [ESLint](https://eslint.org) - 檢查程式碼語法、統一編寫風格
   - [Prettier](https://prettier.io) - 統一程式碼排版風格
   - [EditorConfig](https://editorconfig.org) - 統一 Visual Studio Code 檔案排版設定
   - [CommitLint](https://commitlint.js.org) - 檢查 commit 訊息
3. 編輯器套件
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - 檢查拼字錯誤


## 目錄結構

- [環境變數說明](./readme/ENVIRONMENT.md)
- [專案架構](./readme/ARCHITECTURE.md)
- [.vue 檔撰寫規範](./readme/BASE-VUE.md)
- [git commit 規範](./readme/GIT-COMMIT.md)
- [Ant Design共用樣式設定](./readme/ANT-DESIGN.md)
- [utils資料夾說明](./readme/UTILS.md)
- [services資料夾說明](./readme/SERVICES.md)
- [store資料夾說明](./readme/STORE.md)
- [composables資料夾說明](./readme/COMPOSABLE.md)

## 除錯
### Vite除錯
#### **1. 模組解析問題**

**問題描述：**

在使用別名或路徑導入組件時，出現「找不到模組」的錯誤，導致專案無法編譯。

**原因分析：**

Vite 預設使用 ES Module 解析規則，如果在 `vite.config.js` 中未正確配置 `resolve.alias`，可能導致無法識別導入的路徑。

**解決方案：**

- **在 `vite.config.js` 中設定別名：**
    
```jsx
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```
    
- **使用別名導入模組：**

```jsx
import MyComponent from '@/components/MyComponent.vue';
```
#### **2. CSS 預處理器無法正常運作**

**問題描述：**

使用 Sass、Less 等 CSS 預處理器時，樣式未生效或報錯。

**原因分析：**

可能是未安裝對應的預處理器依賴，或者組件中的 `<style>` 標籤未正確指定語言。

**解決方案：**

- **安裝預處理器依賴：**

```bash
npm install -D sass
```
    
- **在組件中正確指定語言：**

```
<style lang="scss">
  // Sass 樣式代碼
</style>
```
#### **3. 動態導入語法錯誤**

**問題描述：**

使用 `import()` 懶加載組件時，出現語法錯誤或模組無法加載。

**原因分析：**

動態導入需要正確的路徑或語法，且路徑必須是相對路徑或經過別名配置的路徑。

**解決方案：**

- **正確使用 `import()`：**
    
```jsx
const module = await import('./path/to/module.js');
```

- **確保路徑正確：**
    
確保使用的是相對路徑或已在 `vite.config.js` 中配置的別名。
#### **4. 環境變數無法讀取**

**問題描述：**

在代碼中無法讀取 `.env` 文件中定義的變數。

**原因分析：**

Vite 僅支持以 `VITE_` 為前綴的環境變數。

**解決方案：**

- **正確定義環境變數：**

在 `.env` 文件中使用 `VITE_` 作為變數的前綴。

```
VITE_API_URL=https://api.example.com
```
    
- **在代碼中訪問環境變數：**

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```
#### **5. 熱模塊替換（HMR）失效**

**問題描述：**

修改代碼後，頁面未能即時更新，需手動刷新瀏覽器。

**原因分析：**

可能是由於緩存問題，或某些模組不支持 HMR。

**解決方案：**

- **重啟開發伺服器：**
    
停止並重新啟動 `vite` 伺服器。
    
- **檢查瀏覽器控制台：**
    
查看是否有與 HMR 相關的錯誤。
#### **6. 建構後的資源路徑錯誤**

**問題描述：**

部署到生產環境後，靜態資源加載失敗，出現 404。

**原因分析：**

未在 `vite.config.js` 中正確設置 `base` 選項。

**解決方案：**

- **在 `vite.config.js` 中設置 `base`：**
    
```jsx
export default defineConfig({
  base: '/your-app/',
});
```
#### **7. TypeScript 錯誤提示**

**問題描述：**

在使用 TypeScript 開發時，編譯器提示路徑無法解析或類型錯誤。

**原因分析：**

可能是 `tsconfig.json` 配置不正確，或缺少類型聲明。

**解決方案：**

- **檢查 `tsconfig.json`：**
    
確保 `paths` 和 `baseUrl` 配置正確。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
- **安裝缺少的類型聲明：**
    
安裝 Node.js 的類型聲明包：

```bash
npm install -D @types/node
```
#### **8. ESLint 無法識別語法**

**問題描述：**

在使用最新的 ECMAScript 特性或 TypeScript 語法時，ESLint 報錯無法識別某些語法。

**原因分析：**

可能是因為 ESLint 的解析器未正確配置，導致無法理解新的語法特性。

**解決方案：**

- **安裝並配置正確的解析器：**
    
對於 ECMAScript 2020 以上的特性：

```bash
npm install -D @babel/eslint-parser
```
    
在 `.eslintrc.js` 中配置：
    
```jsx
module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  // 其他配置
};
```
#### **9. 跨域請求問題**

**問題描述：**

開發環境中向後端 API 發送請求時出現跨域（CORS）錯誤。

**原因分析：**

未在 Vite 開發伺服器中配置代理，導致請求被瀏覽器阻止。

**解決方案：**

- **配置代理：**在 `vite.config.js` 中添加代理設置。

```jsx
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```
#### **10. 瀏覽器兼容性問題**

**問題描述：**

在舊版瀏覽器（如 IE11）中，應用無法運行。

**原因分析：**

Vite 預設僅支持現代瀏覽器。

**解決方案：**

- **使用 `@vitejs/plugin-legacy` 插件：**
    
    安裝插件：
    
    ```bash
    npm install -D @vitejs/plugin-legacy
    ```
    
    配置插件：
    
    ```jsx
    import legacy from '@vitejs/plugin-legacy';
    
    export default defineConfig({
      plugins: [
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
      ],
    });
    ```
#### **11. 使用 SVG 時出現編譯錯誤**

**問題描述：**

在導入 SVG 圖片時，出現編譯錯誤，如「Unexpected token」或「Module not found」。

**原因分析：**

Vite 對資源的處理與 Webpack 不同，直接導入 SVG 文件需要使用特定的插件來處理，否則會出現解析錯誤。

**解決方案：**

- **使用 `vite-svg-loader` 插件：**

安裝插件：

```bash
npm install -D vite-svg-loader
```

在 `vite.config.js` 中配置：

```jsx
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [svgLoader()],
});
```

在組件中導入並使用 SVG：

```jsx
<template>
  <MyIcon />
</template>

<script>
import MyIcon from '@/assets/icons/my-icon.svg';

export default {
  components: {
    MyIcon,
  },
};
</script>
```
    

#### **12. 開發環境中的調試問題**

**問題描述：**

在開發環境中，無法正常進行斷點調試，或者 Source Map 無法正確映射到源代碼。

**原因分析：**

可能是因為 Source Map 未正確生成，或者瀏覽器未啟用 Source Map 支持。

**解決方案：**

- **確保瀏覽器已啟用 Source Map：**
    
    在瀏覽器開發者工具中檢查相關設置。
    
- **在 `vite.config.js` 中配置 Source Map：**
    
```jsx
export default defineConfig({
  build: {
    sourcemap: true,
  },
});
```
    

### Vue除錯

程式碼為 Vue 3 Composition API + `<script setup>`

#### **1. 無法在 `<script setup>` 中使用 `this`**

**問題描述：**

在使用 `<script setup>` 時，嘗試在組件中使用 `this`，結果發現 `this` 為 `undefined` 或無法正常工作。

**原因分析：**

在 `<script setup>` 中，組件的頂層代碼會被編譯器編譯為組件的 `setup` 函數內容，因此在這個上下文中，`this` 是未定義的。

**解決方案：**

- **避免在 `<script setup>` 中使用 `this`：**
    
直接使用從 `ref`、`reactive`、`computed` 等函數中返回的響應式變量，無需透過 `this` 訪問。
    
```jsx
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">增加</button>
</template>
```
#### **2. 在 `<script setup>` 中無法使用組件的生命周期鉤子**

**問題描述：**

在 `<script setup>` 中，不知道如何使用組件的生命周期鉤子，例如 `mounted`、`created` 等。

**原因分析：**

在 `<script setup>` 中，生命周期鉤子需要直接導入並使用，而不是像 Options API 那樣定義方法。

**解決方案：**

- **導入並使用對應的生命周期函數：**
    
```jsx
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('組件已掛載');
});
</script>
```
#### **3. 在 `<script setup>` 中無法使用 `async` 函數**

```jsx
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = defineProps<Props>();
</script>

<template>
  <h1>{{ props.title }}</h1>
  <p>{{ props.count }}</p>
</template>
```

**問題描述：**

嘗試將 `<script setup>` 標籤本身定義為 `async`，以便在組件初始化時進行異步操作，但發現這樣做會導致錯誤或組件無法渲染。

**原因分析：**

`<script setup>` 無法被定義為異步函數，因為它不是一個函數，而是組件的編譯時語法糖。

**解決方案：**

- **在組件的生命周期鉤子中執行異步操作：**
    
```jsx
script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  const data = await fetchData();
  // 處理數據
});
</script>
```
#### **4. 在 `<script setup>` 中使用模板引用（`ref`）**

```jsx
<!-- 子組件 MyInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <input :value="props.modelValue" @input="updateValue" />
</template>
```

**問題描述：**

在 `<script setup>` 中使用模板引用（`ref`）時，遇到無法訪問 DOM 元素或引用為 `undefined` 的問題。

**原因分析：**

模板引用需要在 DOM 渲染完成後才能獲取，需要在相關的生命周期鉤子中使用。

**解決方案：**

- **在模板中設置引用：**
    
```jsx
<template>
  <div ref="myElement">內容</div>
</template>
```
    
- **在 `<script setup>` 中使用 `ref` 並在 `onMounted` 中訪問：**
    
```jsx
<script setup>
import { ref, onMounted } from 'vue';

const myElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (myElement.value) {
    console.log(myElement.value); // 可以訪問 DOM 元素
  }
});
</script>
```
#### **5. `<script setup>` 中的響應式數據在模板中未更新**

**問題描述：**

在 `<script setup>` 中定義的響應式數據，在模板中未能隨著數據變化而更新。

**原因分析：**

由於解構了 `ref` 的 `.value`，丟失了原本的響應性，因此 `count` 在模板中無法更新。

```jsx
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

// 錯誤：解構了 ref
const { value } = count;

function increment() {
  value += 1; // 嘗試直接修改解構後的值
}
</script>
```

**解決方案：**

- **不要解構 `ref`，在模板中直接使用變量名：**
    
```jsx
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div>{{ count }}</div>
</template>
```
    
**如果需要解構，使用 `toRefs` 或 `storeToRefs`（如使用 Pinia）：**

```jsx
<script setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  count: 0,
  message: 'Hello',
});

const { count, message } = toRefs(state);
</script>

<template>
  <div>{{ count }}</div>
  <div>{{ message }}</div>
</template>
```