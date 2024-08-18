# 基本專案規範

[TOC]

## 專案版本規範
版本號皆為遞增。

-版本格式：
**主版本號.次版本號.修訂版本號**

-規則：
[tab]主版本號：修改或新增不兼容的功能。
[tab]次版本號：新增向下兼容的功能。
[tab]修訂版本號：修正向下兼容的問題。 

## 專案架構(待調整)

```bash
.
├── .git                   # Git 版本控制目錄
│
├── .vscode                # 統一開發人員 VS Code 套件及設定檔
│   ├── extensions.json    # 編輯器套件推薦配置
│   ├── settings.json      # 編輯器設定
│   └── xxx.code-snippets  # 自定義的程式碼模板
│
├── public                 # 靜態資源
│   ├── images             # 共用圖片
│   ├── sounds             # 共用音效
│   └── ...
│
├── readme                 # 其他專案說明
├── src                    # 開發資源
│   ├── assets             # 共用資源
│   │   └── styles         # 共用樣式 (感覺放這不太理想)
│   │ 
│   ├── components         # 共用組件
│   │ 
│   ├── composables        # 共用 Vue 組合式函數
│   │ 
│   ├── constants          # 共用常數
│   │   ├── enums          # 共用枚舉
│   │   ├── initials       # 
│   │   ├── mappings       # 
│   │   └── ...            # 其他常數
│   │
│   ├── lang               # 共用語言包
│   │   ├── en.json        # 英語語言包
│   │   ├── tw.json        # 中文語言包
│   │   └── ...            # 其他語言包
│   │
│   ├── layouts            # 佈局組件 
│   │   └── ...            # 各式佈局
│   │ 
│   ├── middleware         # 中間件，用於頁面或路由的前置處理
│   │   ├── auth.ts        # 處理登入 token
│   │   └── ... 
│   │ 
│   ├── models             # 共用型別
│   │   ├── interfaces     # 共用介面（未來再區分api相關與一般）
│   │   └── types          # 共用型別定義
│   │ 
│   ├── plugins            # 插件
│   │   ├── i18n           #
│   │   ├── version        #
│   │   └── ... 
│   │ 
│   ├── router             # 路由設定
│   │   └── index.ts       #
│   │
│   ├── services           # API Services
│   │   ├── xxxView.ts     # 頁面使用到的API
│   │   └── xxx.ts         # 功能分類的API
│   │
│   ├── stores             # 狀態管理
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── utils              # 共用工具
│   ├── views              # 頁面組件
│   │   └── xxxView.vue    # 各頁面組件
│   │
│   ├── App.vue            # 根組件
│   ├── env.ts             # 全域型別
│   └── main.ts            # 進入點
│   
├── .eslintrc.cjs          # eslint 設定
├── .gitignore             # git 忽略檔案設定
├── .prettierrc.js         # prettier 設定
├── commitlint.config.js   #
├── env.d.ts               # 
├── index.html             # index.html
├── package-lock.json      # NPM 鎖定文件，記錄當前安裝的具體依賴版本
├── package.json           # 項目配置文件，記錄項目依賴和腳本命令
├── README.md              # 專案說明主頁
├── tsconfig.app.json      # tsconfig 設定
├── tsconfig.json          # tsconfig 設定
├── tsconfig.node.json     # tsconfig 設定
└── vite.config.ts         # vite 設定
```