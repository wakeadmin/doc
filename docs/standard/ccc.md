# CCC 代码规范提案

<br>
版本：2022.V1

> 基于 2022 年上半年前端 CCC 评审过程，整理的常见问题

<br>

[[toc]]

<br>

## 1. 最佳实践

### 1.1 提交版本库前, 删除无效代码

- 【原因 1】代码包超编需要清理时，无效引用未清理，会增加清理废弃代码的困难
- 【原因 2】无效的 console 提示，对生产环境日志分析无正面意义，同时带来了分析困难
- 【原因 3】清理过的代码需要历史参考时，可以通过 commit history or local history 查看

<br>
<br>
<br>

### 1.2 api 使用问题

- 【问题】复杂逻辑未使用新的 api 简化
- 【实践】建议使用较新的 api 降低代码的复杂度，如 findIndex、includes、可选链、解构赋值、模板字符串等

### 1.3 公共组件使用

- 【问题】复杂逻辑未使用新的 api 简化
- 【实践】建议使用较新的 api 降低代码的复杂度，如 findIndex、includes、可选链、解构赋值、模板字符串等

<br>
<br>
<br>
<br>
<br>

## 2. css

### 2.1 class 命名

- 【问题】review 过程中 class 的命名五花八门，不利于理解与维护，友好的命名能帮助我们统一理解业务逻辑与代码结构  
  【方案】小程序/APP/PC 统一使用 BEM 命名规范

### 2.2 CSS 规范

- 【问题】内联样式泛滥  
  【方案】如无特殊情况，不使用内联样式

- 【问题】Vue PC 项目中样式未加 scoped，造成样式污染  
  【方案】style 加上 scoped

- 【问题】BEM 命名超长  
  【方案】单个 class 中 block+element 不应该超过 4 层，可适当减少后面的 element

<br>
<br>
<br>
<br>

## 3. git

### 3.1 git commit message 格式不统一

【问题】缺乏统一的格式约束，导致一部分提交信息模糊、甚至错误，后续维护代码困难

> 【方案】 - 项目必须添加 wkstd - 参考规范：http://www.wakedata-inc.com/pages/viewpage.action?pageId=1802583#%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83

<br>
<br>
<br>
<br>

## 4. 代码复用

### 4.1 mixins 使用问题

- 【问题 1】使用方的 未申明方法，存在 覆盖 和 理解问题
- 【问题 2】mixins 可能有多个方法，调用方只关注需要的方法，连带影响不确定，职责存在不明确的问题

> 【方案】禁用 mixins，可使用如下其中方法替代
>
> - 继承，如 hooks，高阶组件
> - 职责明确的组件
> - api 显示调用

<br>
<br>
<br>

### 4.2 通用的方法、正则、组件未提取到公共文件维护

【方案】统一归类到 src/utils、src/components 里面

<br>

### 4.3 代码复用

【问题】1）迭代维护成本增高，2）遗漏修改，3）项目代码量增加

> 【方案】
> 代码复用合理性判断原则：
>
> 1. 使用者少做代码复制，二次修改，多些代码引用
> 2. 逻辑代码的复用，具备一定差异兼容性，调用方尽可能少的关切其内部逻辑
> 3. 提取公共代码时，慎用更高可见性权限
> 4. 组件类规范 http://www.wakedata-inc.com/pages/viewpage.action?pageId=1803921

<br>
<br>
<br>
<br>

## 5. 反优化

### 5.1 useMemo 的使用场景

- 【问题】useMemo 滥用，直接赋值操作执行效率比 useMemo 更高效
- 【方案】简单的判断不需要放在 useMemo 里，只有处理较为复杂的赋值或计算逻辑才需要

### 5.2 代码书写不规范

- 【问题】返回空值时使用 return void 0
- 【方案】返回空值时直接 return 即可

<br>
<br>
<br>
<br>

## 6 健壮性

### 6.1 数组越界

【问题】使用数组不判断长度就直接下标引用  
【方案】对明确的数组可以不考虑，但后端返回的数据具有不明确性，就需要判断了

### 6.2 相等判断

【问题】判断相等使用了==，而不是严格比较===，如果是判断 null 可以使用 ==  
【方案】规范规定了===，但还是不少人使用了==

### 6.3 组件参数验证

【优化前】

```js
props: {
    pageKey: {
        type: String,
        default: 'cus'
    }
}
```

【优化后】

```js
props:{
    pageKey: {
        type: String,
        validator(val) {
            if (['cus','group','moments'].includes(val) ){
                return true;
            }
            throw new Error('期望接收的值为cus，group，moments');
        }
        default: 'cus'
    }
}
```

### 6.4 模版 for 循环，使用唯一 id 作为 key

<br>
<br>
<br>
<br>

## 7. 健壮性/性能

### 7.1 计算数据

【规范】通过计算某些数据变化而改变的数据，vue 使用 computed，react 使用 useMemo

### 7.2 state 初始化

【规范】使用 useState 时对变量的初始化如果是计算类，不应该直接赋值。可以使用 useState 的函数赋值方式

### 7.3 NoopArray

- 【问题】参数默认值赋值为空数组时，使用了[]
- 【规范】使用 NoopArray、NoopObject、Noop 赋值

### 7.4 其他

【场景】xxxList 被多次使用的参数，没有统一处理。用 useMemo 过滤
【场景】遍历数据获取有效的值代码冗余，可使用 map+filter

<br>
<br>
<br>

## 8. 可维护

### 8.1 代码复用

代码复用合理性判断原则：

1. 使用者减少做代码复制，二次修改公共代码。多引用公共代码
2. 逻辑代码的复用，具备一定差异兼容性，调用方尽可能少的关切其内部逻辑
3. 提取公共代码时，慎用更高可见性权限
4. 组件类规范 http://www.wakedata-inc.com/pages/viewpage.action?pageId=1803921

<br>
<br>
<br>
<br>
<br>

### 8.2 定义

- 【枚举】枚举值需要手动定义默认值
- 【枚举常量】要求填写准确的描述注释。
- 【提取不可变的变量】根据使用范围，抽取设置为页面/模块/项目常量或枚举
- 【类属性值定义】严禁随意使用 ！，除非明确在类的生成时该属性值会初始化

<br>
<br>
<br>

### 8.3 外部资源使用规范

-【位置】图片放到本地，工具自动提取到 cdn  
-【压缩】存放到本地的图片，在未失精度的情况下最大化压缩，推荐 tinypng。

<br>
<br>

### 8.4 禁用废弃的 api

- 【react】componentWillReceiveProps 已逐渐弃用，可使用 componentDidUpdate 替换

### 8.5 页面路径

- 【提取】页面路由以硬编码的方式散落在项目各处，不便于维护，需要抽取定义常量统一管理
- 使用命名路由

<br>
<br>
<br>

### 8.6 Typescript: 使用有意义的类型定义替换 any 类型

### 8.7 Typescript: 优先使用 enum，而不是 Union String literal

### 8.8 Typescript: 优先使用 interface，而不是 type

### 8.9 按领域、模块存放资源。比如静态资源就近存放

<br>
<br>
<br>
<br>

## 9. 命名

### 9.1 常量,枚举

- 【规范 1】常量使用`全大写下划线(UPPER_CASE)`形式命名
- 【规范 2】枚举/枚举成员可以使用 `全大写下划线(UPPER_CASE)` 或 `大写驼峰命名(CamelCase)`
- 【规范 3】枚举成员应该属于同一类型
- 【规范 4】枚举成员值，需要显式赋值

<br>

### 9.2 props 命名

【规范】命名跟组件 xxx+props FooterCountProps，并且 export

<br>

### 9.3 视图事件函数命名

【规范】视图事件处理器，统一使用 handle\* 命名

<br>

### 9.4 \_下划线

- 【使用场景 1】在没有访问控制机制的情况下，定义私有变量
- 【使用场景 2】回调函数形参数。
- 【使用场景 3】和上级变量冲突，但找不到更好的命名。
- 【注意】当变量命名冲突的时候，首先要考虑将变量更‘具体化’，\_ 只是一种敷衍的方式。

<br>

### 9.5 变量

【规范】变量命名使用`小写驼峰命名`

<br>

### 9.6 类和组件

【规范】变量命名使用`大写驼峰命名(CamelCase)`

<br>
<br>

### 9.7 文件命名

- 单文件类、组件。使用`大写驼峰式(CamelCase)`，和类名/组件名保持一致。比如 `MyFooter.vue`, `MyClass.tsx`
- 其余使用 `小写横杠分隔(kebab-case)`，例如 `my-image.png`

<br>
<br>
<br>
<br>

## 10. 模块

### 10.1 【规范】不建议混用 commonJs 和 esModule，建议优先使用 esModule

### 10.2 【使用】建议按需导入，使用命名导出，不用默认导出

<br>
<br>
<br>
<br>

## 11. 异常处理

### 11.1 自定义 Error 不规范

【规范】自定义异常统一继承 Error, 禁止继承 SyntaxError、ReferenceError 等本身有语义的内置异常

### 11.2 禁止对捕获的错误不做任何处理

不要给人挖坑，除非你确定，你吞掉的这个错误一定是你想吞掉的错误

<br>
<br>
<br>

## 12. 阅读性

### 12.1 if 判断逻辑太多，层级太复杂

【规范】尽量减少 if 判断层级

### 12.2 switch 的使用场景

【规范】可用对象/枚举或 in map 进行替换，建议不使用 switch

### 12.3 代码书写过于紧凑

- 【规范】适当的换行可以增加代码的可读性  
   譬如：变量与方法间换行、方法与方法间换行

### 12.4 导入语句分组

- 【问题】导入语句混乱，对代码阅读不友好
- 【规范】导入语句按照导入源进行分组，可适当空行

  ```
  node_modules
  @/
  ../
  ./
  ```

### 12.5 if 后面一定要使用 {}

<br>
<br>
<br>

## 13. 注释规范

### 13.1 文件头使用 /\*\* \*/ 注释，说明文件用途；

### 13.2 常量、函数、类、枚举等使用 /\*\* \*/ 注释，无需进入定义的地方即可查看注释内容；

### 13.3 复杂逻辑添加注释说明，方便理解;

### 13.4 推荐使用 jsdoc

### 13.5 代码阅读性

【优化前】

```js
// 推送任务时间是否在5分钟之后的时间
isAhead5Minute() {
  const stamp = new Date(this.form.pushTime).getTime();
  const curTime = new Date().getTime();
  return stamp > curTime + 300000; // 5 * 60 *1000
},
```

【问题】注释表述需要描述清晰，易于理解，如果能用命名表达意思的就不需要写注释

<br>

【优化后】

```js
// 5分钟对应的毫秒数
const FIVE_MINS = 5*60*1000;

/**
* 获取当前时间5分钟后的时间戳
* @reutrn String
*/
isAhead5Minute() {
  const stamp = new Date(this.form.pushTime).getTime();
  const curTime = new Date().getTime();
  return stamp > curTime+ FIVE_MINS;
}
```
