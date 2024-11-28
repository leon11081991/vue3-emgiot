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