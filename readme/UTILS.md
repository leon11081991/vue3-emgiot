# utils資料夾說明

```bash
├── api
│   ├── dto
│   ├── models
│   │   └── api-response-model.ts
│   ├── axios-factory.ts
│   ├── axios-instance.ts
│   └── error-handler.ts
│
├── i18nUtils.ts
└── utilCommon.ts
```

## api

處理 api 相關。

### dto

處理 api 的資料轉換，皆以檔案名稱作為分類。

### models

處理 axios 的 api response。

**api-response-model.ts** 中 ***ApiResponseModel*** 的資料結構為與後端討論後的結構。

### axios-factory.ts

使用 ApiFactory Class管理呼叫 api 的方法，目前已有 get, post, put, delete。
再讓其他的 api service繼承該Class。

### axios-instance.ts

axios 實例與攔截器流程。

### error-handler.ts

- 處理 api 錯誤時，錯誤代碼的錯誤訊息。  
- 錯誤代碼401的流程處理。

## i18nUtils.ts

讓.ts檔案可以抓取到i18n的設定值。

## utilCommon.ts

是通用工具的Class，各方法皆有備註名稱。