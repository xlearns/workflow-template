# 代码检查工具

## [eslint](https://eslint.org/docs/user-guide/getting-started)

- 安装 `npm install -D eslint`
- 生成配置文件 `npm install @eslint/config` or `npx eslint --init` 自动生成 .eslintrc.js
- roles [根据 eslint 提示去搜索文档](https://eslint.org/docs/rules/)
  ```
  "off"或者0    //关闭规则
  "warn"或者1    //在打开的规则作为警告（不影响退出代码）
  "error"或者2
  ```

### [自定义 EsLint 规则](https://www.jianshu.com/p/1c805c52c51d)

- `mkdir eslint_rules`
- `touch test.js`
- `vi test.js`
- `修改.eslintrc.js`

```json
"rules": {
       "no-eval": "error",
       "no-compare-neg-zero":"off",
       "no-empty": "off",
       "@typescript-eslint/no-unused-vars":0,
       "test":'error'
}
```

- 运行 `npx eslint --rulesdir ./eslint_rules_test src/`

#### `test.js`代码：

```js
// no-hello-in-identifie.js
// 自定义规则
var _ = require('lodash');
module.exports = {
  // 设置我们想要输出的错误信息
  meta: {
    messages: {
      invalidName: '提示的错误信息'
    }
  },
  create(context) {
    return {
      //Identifier: 任何标识符
      Identifier(node) {
        if (_.includes(node.name, 'hello')) {
          // 匹配到输出上面定义的错误
          context.report({
            node,
            messageId: 'invalidName'
          });
        }
      }
    };
  }
};
```

# 代码风格工具

## [prettier](https://prettier.io/docs/en/install.html)

- 集成 ESLint `npm i prettier eslint-config-prettier eslint-plugin-prettier -D `
- `在.eslintrc 中,extend中添加 "prettier" 解决 eslint 和 prettier 的冲突`
- 格式化所有文件 `npx prettier --write .`

### [配置文件](https://prettier.io/docs/en/configuration.html)

- json 写法：`.prettierrc`

### [配置选项](https://prettier.io/docs/en/options.html)

# git 规范

- 常用的一些 Git hooks:
  - pre-commit:判断提交的代码是否符合规范
  - commit-msg：判断 commit 信息是否符合规范
- Git hooks 原理：
- git 允许在各种操作之前添加一些 hook 脚本，如未正常运行则 git 操作不通过。最出名的还是以下两个
  - precommit
  - prepush
- hook 脚本置于目录 ~/.git/hooks,以可执行文件的形式存在。
- `git hooks`可使用 `core.hooksPath `自定义脚本位置。

  - `git config 'core.hooksPath' .husky`
  - 通过写入文件配置`core.hooksPath`
  - `cat .git/config`

    ```
    [core]
          ignorecase = true
          precomposeunicode = true
          hooksPath = .husky
    ```

## 工具

- husky:操作 git 钩子的工具
- lint-staged:本地暂存代码检查工具
- commitlint:commit 信息校验工具
- commitizen:辅助 commit 信息,通过选择输入,规范提交信息

### [husky](https://typicode.github.io/husky/#/)

- 安装：`npm install lint-staged husky -D`
- 在 package.json 中添加脚本:`npm set-script prepare "husky install`
- 初始化 husky,将 git hooks 钩子交由,husky 执行`npm run prepare`
  - 初始化 husky, 会在根目录创建 .husky 文件夹
  - 创建 commit 钩子【commit 的时候会触发这个钩子】`npx husky add .husky/pre-commit "npx lint-staged"`
- `git commit -m "fix: xxxx"`

### [lint-staged](https://www.npmjs.com/package/lint-staged)

- 根目录创建`.lintstagedrc.json`文件控制检查和操作方式
- 写入配置

```json
{
  //对.js、jsx、ts、tsx执行prettier格式化、然后并且执行eslint进行全局语法检测
  "*.{js,jsx,ts,tsx}": ["prettier --write .", "eslint  --fix"],
  "*.md": ["prettier --write"]
}
```

### [commitlint](https://commitlint.js.org/#/)

- 创建 commit-msg 钩子：`npx husky add .husky/commit-msg "npx --no-install commitlint --edit "$1""`

#### [commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)

- 这是一个规范配置,标识采用什么规范来执行消息校验, 这个默认是 Angular 的提交规范
- `[ 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test' ]`
