# CHANGELOG

* v0.0.4 2019-8-22

  * fix: 当 `append` 的值中有类似 `100%` 这样带百分号的字符串时, 在 `decodeURIComponent` 时会报错, 因为这个不是 URL 编码, 修复逻辑为 `try/catch decodeURIComponent` 操作, 报错时保留原始值

* v0.0.3 2019-6-27

  * 解析 querystring 时将空值解析为空字符串
  * 修改 `toString` 方法的 `includeUndefinedValue` 参数为 `includeEmptyStringValue`
  * 修改 `toString` 方法, 当没有 `url` 值时只返回 querystring(不包含问号)

* v0.0.2 2019-3-1

  * 重构为 `ES2015` 的版本

* v0.0.1 2019-3-1

  * 初始版本