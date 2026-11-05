# Terminal-Bench 4.0 一手数据快照

本目录对应 [benchmarks/terminal-bench-v4-0.md](../../benchmarks/terminal-bench-v4-0.md)，用于离线复核第 3 节「数据与任务构造」与第 5 节「榜单结果与成本」。快照只收**小体积、可离线复核**的官方数据，上游题库、容器镜像与运行日志不入库。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `leaderboard-4-0-0.json` | `https://www.tbench.ai/` 首页榜单所调用的 `leaderboard-read` 接口（`package=terminal-bench/terminal-bench`、`name=4-0-0`） | 榜单 `4-0-0`；接口 `updated_at` 2026-10-23；抓取 2026-11-05 | 官方榜 35 行的原始字段：rank、model/agent/effort、accuracy、95% CI、tokens、cost、n_trials；正文表 5 的直接来源 |
| `tasks-v4.0.0.json` | `https://raw.githubusercontent.com/harbor-framework/terminal-bench/v4.0.0/tasks/<name>/task.toml` | tag `v4.0.0`（2026-08-26）；抓取 2026-11-05 | 66 个任务的 category / subcategory、专家耗时估计、agent / verifier 超时、CPU / 内存 / 存储 / GPU 声明；正文表 2、表 3 的直接来源 |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。

榜单接口的调用方式（页面 bundle 中的 `fetchLeaderboard`）：

```bash
curl -sS -X POST \
  'https://ofhuhcpkvzjlejydnvyd.supabase.co/functions/v1/leaderboard-read' \
  -H 'Content-Type: application/json' \
  -d '{"package":"terminal-bench/terminal-bench","name":"4-0-0"}'
```

`tasks-v4.0.0.json` 是**派生数据**，不是上游逐字节副本：每个任务取 `task.toml` 的 `[task].name`、`[metadata].category`、`[metadata].subcategory`、`[metadata].expert_time_estimate_hours`、`[agent].timeout_sec`、`[verifier].timeout_sec`、`[verifier].environment_mode` 与 `[environment]` 资源字段。上游文件本身不入库（66 份小文件，可按上述 URL 重新取）。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 完整任务数据集：Harbor Hub `terminal-bench/terminal-bench@4.0.0`；Zenodo 软件包 `harbor-framework/terminal-bench-v4.0.0.zip` 为 455.9 MB（仓库归档），可离线下载。
- 任务容器镜像与运行产物：含 GPU / 多容器任务，镜像体积远大于数据包；官方建议在 Modal 或 Daytona 上运行。
- 官方榜单的运行日志、逐 trial 结果与 agent trace：Harbor Hub 上的 job 页面可查，未归档。
- 4.0 专属论文：**未找到**。学术引用仍是 arXiv:2601.11868（描述 2.0 的 89 题）与 Zenodo 的 v4.0.0 软件记录。
- 第三方 harness 的原始结果（Artificial Analysis、Vals AI）：正文只引用其公开汇总页，未逐行归档。

## 时效性提醒

- 官方榜是持续更新的：`leaderboard-4-0-0.json` 冻结的是 2026-10-23 的接口状态；之后新增或重跑的行不会出现在本快照里。
- 同一模型在不同 harness 下的分数差异可达 3–7 分（官方榜、Artificial Analysis、Vals AI 三套口径），引用时必须同时写 harness、effort、trial 数与抓取日期。
