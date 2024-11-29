# store資料夾說明

**storage-plugin** 中的檔案為自定義外掛，其餘皆為一般 pinia 使用方法。

## storage-plugin

自定義 pinia 外掛。

**index.ts** 統一管理新增的外掛內容。

### user-storage.ts

自定義 user store persistent。

會在頁面刷新或重整時，將 store id 為 user 的 state 內容，儲存在 localStorage 的 "storage-user"。  
檔案中有相關備註可參考。