# 基本專案規範


## 1.專案架構

各資料夾中容易有重複的檔案名稱，因此子資料夾中的檔案，附檔名前請再加上所在資料夾的前綴。

```bash
.
├── .git                     # Git 版本控制目錄
│
├── .vscode                  # 統一開發人員 VS Code 套件及設定檔
│   ├── extensions.json      # 編輯器套件推薦配置
│   ├── settings.json        # 編輯器設定
│   └── vue.code-snippets    # 自定義的vue程式碼模板
│
├── public                   # 靜態資源
│   └── favicon.ico          # 網站圖示
│
├── readme                   # 其他專案說明
├── src                      # 開發資源
│   ├── assets               # 共用資源
│   │   ├── icons            # 專案icon
│   │   │    └── xxx.svg     # svg圖檔
│   │   │ 
│   │   ├── scss             # 專案scss檔 
│   │   │    ├── _animation.scss  # 動畫樣式
│   │   │    ├── _mixin.scss      # scss mixin
│   │   │    ├── _variables.scss  # scss 變數
│   │   │    └── quasar.scss      # 處理 quasar 的樣式，避免與 Ant-design衝突
│   │   │ 
│   │   ├── normalize.css    # reset css
│   │   └── style.scss       # 集合scss共用樣式(_animation,_mixin,_variables)
│   │
│   ├── components           # 共用組件
│   │
│   ├── composables          # 共用 Vue 組合式函數
│   │
│   ├── constants            # 共用常數
│   │   ├── common           # 共用常數
│   │   ├── configs          # 設定常數
│   │   ├── enums            # 共用枚舉
│   │   ├── initials         # 初始常數
│   │   ├── mappings         # 映射常數
│   │   └── ...              # 其他頁面常數
│   │
│   ├── lang                 # 共用語言包
│   │   ├── en.json          # 英語語言包
│   │   └── tw.json          # 中文語言包
│   │
│   ├── layouts              # 佈局組件
│   │   ├── LayoutBlank.vue   # 空白佈局
│   │   └── LayoutDefault.vue # 基本佈局
│   │
│   ├── models               # 共用型別
│   │   ├── interfaces       # 共用介面
│   │   └── types            # 共用型別定義
│   │
│   ├── plugins              # 插件
│   │   ├── i18n             # 多國語系
│   │   └── version          # 當前版本號
│   │
│   ├── router               # 路由設定
│   │   ├── index.ts         #
│   │   └──middleware        # 中間件，用於頁面或路由的前置處理
│   │        ├── auth.middleware.ts       # 處理登入 token
│   │        ├── memberJoin.middleware.ts # 處理加入成員
│   │        └── layout.middleware.ts     # 處理頁面布局
│   │
│   ├── services             # API Services
│   │   ├── xxxView.services.ts         # 頁面使用到的API
│   │   └── xxx.services.ts             # 功能分類的API
│   │
│   ├── stores               # 狀態管理
│   │   ├── storage-plugin   # store 的自製套件
│   │   │    ├── user-storage.ts # 處理 localStorage 和 store 中的 user 資料
│   │   │    └── index.ts        # 集合
│   │   ├── user.stores.ts
│   │   └── xxx.stores.ts
│   │
│   ├── utils                # 共用工具
│   │   ├── api              # 處理 api
│   │   │    └── dto         # 處理資料轉換
│   │   │  
│   │   ├── i18nUtils.ts     # 處理i18n資料
│   │   └── utilCommon.ts    # 常用共用函數
│   │
│   ├── views                # 頁面組件
│   │   ├── xxxView.vue      # 各頁面組件
│   │   └── xxxPage.vue      # 各頁面組件
│   │
│   ├── App.vue              # 根組件
│   ├── env.ts               # 全域型別
│   └── main.ts              # 進入點
│
├── .editorconfig            # 編輯器設定檔
├── .env                     # 環境設定檔
├── .eslintrc.cjs            # eslint 設定
├── .gitignore               # git 忽略檔案設定
├── .prettierrc.js           # prettier 設定
├── commitlint.config.js     # commitlint 設定
├── env.d.ts                 #
├── index.html               # index.html
├── package-lock.json        # NPM 鎖定文件，記錄當前安裝的具體依賴版本
├── package.json             # 項目配置文件，記錄項目依賴和腳本命令
├── README.md                # 專案說明主頁
├── tsconfig.app.json        # tsconfig 設定
├── tsconfig.json            # tsconfig 設定
├── tsconfig.node.json       # tsconfig 設定
└── vite.config.ts           # vite 設定
```
