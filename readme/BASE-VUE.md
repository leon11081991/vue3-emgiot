# .vue 檔撰寫規範

## 基本架構

參照以下基本格式，可將下列格式新增至 **User Snippets**，即可使用快捷鍵快速初始。
**三大主要標籤**中間，使用 **空白行**做分隔。

參考檔案 **.vscode/vue.code-snippets**

## script 程式碼順序

1. import
2. type
3. interface
4. [defineOptions](https://vue-macros.sxzz.moe/macros/define-options.html)
5. [Props (defineProps)](https://cn.vuejs.org/guide/components/props.html)
6. [Emits Events (defineEmits)](https://cn.vuejs.org/guide/components/events.html#component-events)
7. [defineModel](https://vuejs.org/guide/components/v-model.html)
8. [route/router](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)
9. [store 相關](https://pinia.vuejs.org/zh/core-concepts/#using-the-store)
10. 非響應式變數
11. [子組件 ref](https://cn.vuejs.org/guide/essentials/template-refs.html#template-refs)
12. [ref 變數](https://cn.vuejs.org/api/reactivity-core.html#ref)
13. ~~[reactive 變數](https://cn.vuejs.org/api/reactivity-core.html#reactive)~~ //全部使用 ref 
14. [computed](https://cn.vuejs.org/api/reactivity-core.html#computed)
15. function
16. async/await function
17. [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose)
18. ~~[watch](https://cn.vuejs.org/api/reactivity-core.html#watch)~~ //為了效能避免使用
19. [生命週期 (Lifecycle hooks)](https://cn.vuejs.org/api/composition-api-lifecycle.html)

## 說明 & 範例

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

設定 name 或 inheritAttrs
**組件檔名為 index.vue 或其他通用名稱時，需手動設定組件名稱，以便在瀏覽器 Debug 時方便找到有問題的組件**

##### 4.1. 範例

```ts
defineOptions({
  name: 'ExampleComponent'
})
```

#### 5. Props (defineProps)

#### 6. Emits Events (defineEmits)

#### 7. route/router

route 路由相關

##### 7.1. 範例
```ts
const route = useRoute()
const router = useRouter()
const example = route.params.example as string
```

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

1. 定義外部可訪問的變數或方法
2. 如無特殊需求且勿使用，資料流向會難以判斷

##### 16.1. 範例
```ts
defineExpose({ var1, var2, var3, method1, method2 })
```

#### 17. watch

請已事件觸發取代 watch；如有真的必須使用的狀況，請使用 watchEffect

#### 18. 生命週期 (Lifecycle hooks)

##### 18.1. 範例
```ts
onMounted(()=>{
  // ...
})
```