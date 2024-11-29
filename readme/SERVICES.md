# services資料夾說明

檔案名稱依照各 api 做分類，統一在該資料夾中 **index.ts** 的 api物件中使用，再導出 api 物件來使用。

services 繼承 **ApiFactory**，如果該 services 需要不同的 apiUrl的 話，可以使用constructor中的super做覆蓋。  

可以依照需求增加方法，各 api url 的後綴統一在 **src/constants/enums/api** 做管理。
