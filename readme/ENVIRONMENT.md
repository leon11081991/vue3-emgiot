# 環境變數說明

參考檔案 **.env.example**

- `VITE_APP_PORT`:  
  預設伺服器的啟動端口，例如 3000。
- `VITE_API_BASE_URL`:  
  API 的基礎 URL，例如 `https://api.example.com`。
- `VITE_API_VERSION`:  
  API 的版本號，目前後端無設置。
- `VITE_GOOGLE_CLIENT_ID`:  
  GCP後台設定，用於 Google 登入的 Client ID。


## 其他說明

參考檔案  ***vite.config.ts** 及 **env.ts**


**vite.config.ts** 中的環境變數是使用loadEnv()做讀取。  

其他地方需要使用到環境變數，皆會從 **env.ts** 統一由 ***env物件***做導出。  
**env.ts** 中引入所有 .env檔中的設定。  

***apiBaseUrl*** 和 ***googleClientId*** 如果抓不到變數的情況下，會在console出現錯誤訊息。