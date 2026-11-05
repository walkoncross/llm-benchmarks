# WorkBuddy Bench 一手数据快照

本目录随仓库入库，用于离线复核 [benchmarks/workbuddy-bench.md](../../benchmarks/workbuddy-bench.md) 第 6 节「Token 效率对照表」的表 5–8。快照为**只读副本**，更新时需连同版本、日期与正文表格一起改。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `data.js` | `https://workbuddybench.com/data.js` | 文件内嵌 `leaderboard_version: v1.2`、`generated` / `last_verified` 均为 `2026-10-15`；核验文档记为 `v29` | `subsets` 段给出每模型 score / avgTurns / avgInputK / avgOutputK / cachedInputK / refusals，是表 5–8 的直接数据来源 |
| `roster.js` | 官网榜单前端共享的模型名册脚本 | 文件内无内嵌版本号，核验文档记为 `v15` | 定义榜单在册模型、厂商与 harness 可用性；用于核对效率表与总榜名单不一致的问题 |

入库日期 `2026-11-05`（见 git 历史），一手核验日期 `2026-10-20`。

## 入库边界

按 AGENTS.md §1，以下材料**不入库**，复现方式见 workbuddy-bench.md「本地复现」一节：

- 评测框架上游仓库 `github.com/Tencent/workbuddy-bench`（核验时浅克隆，HEAD `625b223`，2026-08-20）。
- 四个子集任务数据集：Office ~10MB（实际 2.89MB）/ Web ~22MB / Code ~196MB / Security ~479MB，以及 `wb-bench-office-v1.0.tar.gz` 归档。
- 技术报告 `https://workbuddybench.com/report/main.pdf`：>9MB 且该 host 速率约 17KB/s，核验时两次下载均被截断，**未取到**。
- Web / Security 任务包未拉取，故这两节结论来自上游配置与官方描述，未按逐题深度核验。

时效性提醒：效率表 roster 落后于主页总榜 roster，Security 有两家模型数据处于暂扣状态；引用时必须带上 `data.js` 版本与时间戳。
