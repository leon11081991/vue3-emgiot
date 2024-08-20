# 基本專案規範

## 專案架構(待調整)

```bash
.
├── .git                     # Git 版本控制目錄
│
├── .vscode                  # 統一開發人員 VS Code 套件及設定檔
│   ├── extensions.json      # 編輯器套件推薦配置
│   ├── settings.json        # 編輯器設定
│   └── xxx.code-snippets    # 自定義的程式碼模板
│
├── public                   # 靜態資源
│   ├── images               # 共用圖片
│   ├── sounds               # 共用音效
│   └── ...
│
├── readme                   # 其他專案說明
├── src                      # 開發資源
│   ├── assets               # 共用資源
│   │   └── styles           # 共用樣式 (感覺放這不太理想)
│   │
│   ├── components           # 共用組件
│   │
│   ├── composables          # 共用 Vue 組合式函數
│   │
│   ├── constants            # 共用常數
│   │   ├── enums            # 共用枚舉
│   │   ├── initials         # 初始常數
│   │   ├── mappings         # 映射常數
│   │   └── ...              # 其他常數
│   │
│   ├── lang                 # 共用語言包
│   │   ├── en.json          # 英語語言包
│   │   ├── tw.json          # 中文語言包
│   │   └── ...              # 其他語言包
│   │
│   ├── layouts              # 佈局組件
│   │   └── ...              # 各式佈局
│   │
│   │
│   ├── models               # 共用型別
│   │   ├── interfaces       # 共用介面（未來再區分api相關與一般）
│   │   └── types            # 共用型別定義
│   │
│   ├── plugins              # 插件
│   │   ├── i18n             # 多國語系
│   │   ├── version          # 當前版本號
│   │   └── ...
│   │
│   ├── router               # 路由設定
│   │   ├── index.ts         #
│   │   └──middleware        # 中間件，用於頁面或路由的前置處理
│   │        ├── authMiddleware.ts     # 處理登入 token
│   │        └── layoutMiddleware.ts   # 處理頁面布局
│   │
│   ├── services             # API Services
│   │   ├── xxxView.ts       # 頁面使用到的API
│   │   └── xxx.ts           # 功能分類的API
│   │
│   ├── stores               # 狀態管理
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── utils                # 共用工具
│   ├── views                # 頁面組件
│   │   └── xxxView.vue      # 各頁面組件
│   │
│   ├── App.vue              # 根組件
│   ├── env.ts               # 全域型別
│   └── main.ts              # 進入點
│
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
