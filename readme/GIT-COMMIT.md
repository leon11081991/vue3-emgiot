# Git Commit 規範

[TOC]

## 規範說明

1. 使用 commitizen + husky + commitlint 來執行 commit message。
2. 使用 standard-version 來執行版本發佈。

規範依循[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

- `commitizen`：使用 git cz 取代 git commit，目的：引導填寫符合規範的 commit message。
- `husky + commitlint`：在 git commit 時，檢驗 commit message，不符合規範，則不能提交。
- `standard-version`：自動升級本版號，自動打 tag，自動生成 changelog。


## 提交類型說明

### 基本
1. 不使用句號
2. 內容盡量解釋 what and why vs. how

### 1.選擇提交類型(必填)

Select the type of change that you're committing: (Use arrow keys)

Type | Description
--- | ---
feat |     A new feature 
fix |    A bug fix 
docs |    Documentation only changes 
style |    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
refactor | A code change that neither fixes a bug nor adds a feature 
perf |     A code change that improves performance 
test |    Adding missing tests or correcting existing tests 
build |    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) 
ci |       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) 
chore |    Other changes that don't modify src or test files 
revert |   Reverts a previous commit 


類型 | 說明 | 程式碼改動
--- | ---
feat |     新功能  |     有
fix |    錯誤修正 |     有
docs |    更新文件，如 README.md |     沒有
style |    不影響程式碼的格式調整(空格, formatting, 缺少分號, 等等...)  |     沒有
refactor | 重構。針對已上線的功能程式碼調整與優化，且不改變記有邏輯。 |     有
perf |     提升效能  |     
test |    測試。新增測試、重構測試等 |     
build |    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)  |     
ci |       改變 CI 配置檔案或 script (example scopes: Travis, Circle, BrowserStack, SauceLabs)  |     
chore |    Other changes that don't modify src or test files  |     沒有
revert |   Reverts a previous commit  |     有

### 2.選擇 scope 範圍名(選填)
What is the scope of this change (e.g. component or file name): (press enter to skip) 

### 3.填寫標題Header Subject(必填)
Write a short, imperative tense description of the change (max 86 chars):

### 4.填寫補充內容Body(選填)
Provide a longer description of the change: (press enter to skip) 

### 5.是否有破壞性更新(默認為：no)
Are there any breaking changes?

**破壞性更新為跟上一版有衝突的變動**

### 6.是否關係到為 open 狀態的 issue(默認為：no)
Does this change affect any open issues?

可以關閉 github issue，**但注意 commit message 的末尾也要加 '(#issue編號)'**，方便在 github 中查找


## 範例

### docs 類型提交範例
```bash
# 修改 README.md
git add . # 增加到 git
git cz # 提交
# npm run commit 如果為本地安裝commitizen，則使用此項，但請先在package.json的script中設置

# ? Select the type of change that you're committing: docs:     Documentation only changes
# ? What is the scope of this change (e.g. component or file name): (press enter to skip) readme
# ? Write a short, imperative tense description of the change (max 86 chars):
# (46) update readme.md, add init project description
# ? Provide a longer description of the change: (press enter to skip) 

# ? Are there any breaking changes? No
# ? Does this change affect any open issues? No
# [main caae82e] docs(readme): update readme.md, add init project description
# 1 file changed, 7 insertions(+)
```

## 套件工具說明 

### Commitizen

**commitizen**

[commitizen](https://github.com/commitizen)
建立符合規範的 commit message。

**cz-conventional-changelog**

[cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
commitizen 家族出的適配器。
遵循 Conventional Commits 的規範格式編寫 commit message，方便自動生成語意化版本號和更新日誌。

- 安裝(本地)
```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

- 安裝(全域)
```bash
npm install -g commitizen cz-conventional-changelog
```

- 配置
```bash
echo '{"path": "cz-conventional-changelog"}' > ~/.czrc 
```

- 未來建立 commit 的方式
[Tab]如果沒有全域安裝，需要使用 npx 指令。
```bash
npx cz | npx git-cz
```
[Tab]或是在 package.json 的"script"中設置
```json
{
  "script":{
    "commit": "cz"
  }
}
```

### CommitLint
Commitlint + config-conventional + husky 可以在 git commit 時檢驗 commit message 是否符合 conventional commits 規範

**@commitlint/cli**

[@commitlint/cli](https://github.com/marionebl/commitlint) 
檢查 commit message 的 linter 工具。
可以搭配不同的規範 (convention)。

**@commitlint/config-conventional**

[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
是根據 conventional commit 建立的規範

- 安裝 commitlint-cli 和 config-conventional
- 建立 commitlint.config.js 檔案並設定配置
```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```
**husky**

在不同的 git hook 執行不同的動作。
例如：建立 commit(pre-commit) 前執行 commit message 的檢查。

- 自動 安裝 husky 和設定 git hook(和手動擇一)
```bash
npm install && npx husky-init
```

- 手動 安裝 husky 和設定 git hook(和自動擇一)
```bash
npx husky install
npm run prepare
```

- 使用 husky 在 git hook 中新增 commit-msg
- 在建立 commit message 時，自動使用 commitlint 進行檢查，如果不符合規範的話，就無法成功建立 commit：
```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

### standard-version
可以有 npm run version 的功能，且符合 commitizen 的規範格式
並且會自動生成 changelog、 自動打 tag，自動 commit

- 安裝
```bash
npm install standard-version --save-dev
```

- package.json 設置
```json
{
  "script":{
    "release": "standard-version"
  }
}
```

可以 release 特定版本

範例
```bash
# 第一次發布
npx run release --first-release

# 0.4.1
npm run release # 0.4.1 => 0.4.2
npm run release -- --prerelease # 0.4.2 to 0.4.3-0
npm run release # 0.4.3-0 to 0.4.3
npm run release -- --prerelease alpha # 0.4.3 to 0.4.4-alpha.0

# patch補丁、minor次版本號、major主版本號
npm run release -- --release-as minor  # 0.4.4-alpha.0 to 0.5.0
npm run release -- --release-as patch # 0.5.0 to 0.5.1
npm run release -- --release-as major # 0.5.1 to 1.0.0
npm run release -- --release-as prepatch # 1.0.0 to 1.0.1-0
npm run release -- --release-as preminor # 1.0.1-0 to 1.1.0-0
npm run release -- --release-as premajor # 1.1.0-0 to 2.0.0-0

# 手動指定版本
npm run release -- --release-as 2.1.3-alpha.1 # 2.0.0-0 to 2.1.3-alpha.1
# ✔ bumping version in package.json from 2.0.0-0 to 2.1.3-alpha.1
# ✔ bumping version in package-lock.json from 2.0.0-0 to 2.1.3-alpha.1
# ✔ tagging release v2.1.3-alpha.1

npm run release # 2.1.3-alpha.1 to 2.2.0
```


## 其他

**cz-emoji**

[cz-emoji](https://www.npmjs.com/package/cz-emoji)


- 安裝
```bash
npm install --save-dev cz-emoji
```
- 配置
```bash
echo '{ "path": "cz-emoji" }' > ~/.czrc
```

