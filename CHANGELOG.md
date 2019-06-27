# CHANGELOG

* v0.0.3 2019-6-27

  * 解析 querystring 时将空值解析为空字符串
  * 修改 `toString` 方法的 `includeUndefinedValue` 参数为 `includeEmptyStringValue`
  * 修改 `toString` 方法, 当没有 `url` 值时只返回 querystring(不包含问号)

* v0.0.2 2019-3-1

  * 重构为 `ES2015` 的版本

* v0.0.1 2019-3-1

  * 初始版本