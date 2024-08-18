# .vue 檔撰寫規範

## 1. 基本架構

參照以下基本格式，可將下列格式新增至 **User Snippets**，即可使用快捷鍵快速初始。
**三大主要標籤**中間，使用 **空白行**做分隔。

參考檔案 **.vscode/vue.code-snippets**

## 2. script 程式碼順序

1. import
2. type
3. interface
4. [defineOptions](https://vue-macros.sxzz.moe/macros/define-options.html)
5. [Props (defineProps)](https://cn.vuejs.org/guide/components/props.html)
6. [Emits Events (defineEmits)](https://cn.vuejs.org/guide/components/events.html#component-events)
7. [route/router](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)
8. [store 相關](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)
9. 非響應式變數
10. [子組件 ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)
11. [ref 變數](https://cn.vuejs.org/api/reactivity-core.html#ref)
12. ~~[reactive 變數](https://cn.vuejs.org/api/reactivity-core.html#reactive)~~ //全部使用 ref 
12. [computed](https://cn.vuejs.org/api/reactivity-core.html#computed)
13. function
14. async/await function
15. [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)
16. ~~[watch](https://cn.vuejs.org/api/reactivity-core.html#watch)~~ //為了效能避免使用
17. [生命週期 (Lifecycle hooks)](https://cn.vuejs.org/api/composition-api-lifecycle.html)

## 3. 說明 & 範例

待補充。

#### 1. import

import 的檔案也依照**程式碼順序**的規則引入

#### 2. type

1. Type 命名請使用 PascalCase 命名方式
2. Type 命名請加入 Type，範例：ScheduleType

`type 和 interface 除非完全耦合，不然一率放置model資料夾 (內有type與interface兩個資料夾，一類型不同放置)`

##### 2.1. 範例

```ts
type Value = string | number
```

#### 3. interface

1. Interface 命名請使用 PascalCase 命名方式
2. Interface 命名不需要加 I
3. Interface 如果為 request，在後面加上 Request，範例：ScheduleRequest
   [Tab]如果為 response，在後面加上 Data，範例：ScheduleData

##### 3.1. 範例

```ts
interface User {
  id: string
  name: string
}
```

#### 4. defineOptions

#### 5. Props (defineProps)

#### 6. Emits Events (defineEmits)

#### 7. route/router

#### 8. store 相關

#### 9. 非響應式變數

#### 10. 子組件 ref

#### 11. ref 變數

#### 12. reactive 變數

請全部使用 ref

#### 13. computed

#### 14. function

#### 15. async/await function

#### 16. defineExpose

#### 17. watch

請已事件觸發取代 watch；如有真的必須使用的狀況，請使用 watchEffect

#### 18. 生命週期 (Lifecycle hooks)
