# FrontierCode 2.0 一手数据快照

本目录对应 `benchmarks/frontiercode-v2.md`，用于离线复核第 4 节「榜单结果与演进」中的现行榜单。快照只收录官方聚合结果，不收录题目、rubric、verifier、参考解与 Agent 轨迹。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `data.json` | `https://cognition.com/data/frontier-code-2.0/data.json` | HTTP `last-modified: Thu, 05 Nov 2026 05:14:51 GMT`；ETag `"896bb30cc93d72100b592d984c51ed4a"`；36,234 字节 | 28 个 model-agent 行在 132 题 Main 子集上的聚合结果：`new_score`（Score）、`correct`（Pass rate）、`cost`、`tokens`、`flagged_rate` |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。文件按原样保存，未做重排或四舍五入；正文表格的百分数与成本由该 JSON 复核后保留一位 / 两位小数。

## 字段说明

- 顶层键：`models`、`colors`、`lab_colors`、`harness`、`efforts`、`subsets`、`data`。
- `data[model][effort][subset]`：当前 `subsets` 只有 `main: 132`。
- `new_score`：官方前端定义为 Score，即通过全部阻断项后按 rubric 项加权汇总；任一阻断项失败记 0。
- `correct`：官方前端定义为 Pass rate，即满足全部阻断项的 trial 比例。
- `cost`：每次 rollout 的平均美元支出，按 list API 价格并计入公开折扣。
- `tokens`：每次 rollout 的平均输出 token 数。
- `flagged_rate`：被轨迹扫描器标记为「不公平联网」的 run 比例；被标记 run 记 0。
- `duration_min`、`tool_calls`、`ote` 在当前快照中均为 `null`。

## 版本说明

- 官方榜单页当前为 **FrontierCode 2.0**（2026-10-27 发布，2026-11-04 最后新增模型）。
- 快照含 28 个模型；BenchLM 等二手镜像页仍停留在 2026-10-28 的 20 行发布快照，故两者行数不同。
- 2.0 与 1.1 使用不同题集与评分标准，分数不可跨版本比较；1.1 的 Main / Extended 榜单见 `https://cognition.com/blog/frontier-code-1.1`。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 132 个私有任务、任务描述、仓库快照、参考解、rubric、verifier 与 Agent harness：官方未公开，无法入库。
- 官方榜单页前端 bundle 与逐次 rollout 结果：未公开；本快照仅含官方主动提供的聚合 JSON。
- 官方博客 HTML、第三方独立实现页面（Artificial Analysis）与二手聚合页面：只在正文引用，不存副本。
- 模型 API 与评测运行环境：不涉及。
