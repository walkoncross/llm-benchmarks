# LiveBench 一手数据快照

本目录随仓库入库，用于离线复核 [benchmarks/livebench.md](../../benchmarks/livebench.md) 第 4 节「评测方式与计分链路」及第 7 节「复现与快速上手」。快照为官网公开的静态数据文件**只读副本**，与上游逐字节一致；更新时需连同 release 号、抓取日期与正文数字一起改。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `20261014/categories.json` | `https://livebench.ai/data/20261014/categories.json` | release `20261014`（2026-10-14 首发） | 7 个 suite 的列映射；**不含** `_overall_weights`，是等权口径的一手基线 |
| `20261014/table.csv` | `https://livebench.ai/data/20261014/table.csv` | 同上，55 行 × 8 列 | 首发版 7 个 suite 全部有分，用于排除「因新增 suite 才加权」 |
| `20261014/notes.json` | `https://livebench.ai/data/20261014/notes.json` | 同上 | 首发版发布说明，第 10 条记「Every suite counts equally」 |
| `20261025/categories.json` | `https://livebench.ai/data/20261025/categories.json` | release `20261025`（官网标注最后更新 2026-10-25） | `_overall_weights` 加权配置原文，正文 4.2 节的直接依据 |
| `20261025/table.csv` | `https://livebench.ai/data/20261025/table.csv` | 同上，55 行 × 8 列 | 每模型 7 个 suite 的原始 0–100 分；**无 overall 列**，用于复算 Overall |
| `20261025/breakdown.json` | `https://livebench.ai/data/20261025/breakdown.json` | 同上 | 各 suite 子类的题数与分数，用于验证任务→suite 的两种聚合口径 |
| `20261025/cost.csv` | `https://livebench.ai/data/20261025/cost.csv` | 同上 | `nq_*` 列给出每 suite 题数（合计 471），并给出成本与 token 用量 |
| `20261025/notes.json` | `https://livebench.ai/data/20261025/notes.json` | 同上 | 当前版发布说明；第 10 条仍写等权，是正文 6 节文档冲突的一手证据 |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。官网前端为 hash 路由 SPA，静态数据实际位于 `data/<release>/`（而非方法页文字所写的 `public/table_<date>.csv` 等命名），路径由官网 bundle `static/js/main.1e1ce12d.js` 的 `./data/${release}/` 取文件逻辑确认。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**，复现命令见 benchmarks/livebench.md 第 7 节：

- 官网前端 bundle `static/js/main.1e1ce12d.js`（约 386 KB，单行压缩产物，含 React 运行时，非数据文件）。正文以函数名锚定，不编造行号。
- v1 题库与评测框架（`huggingface.co/datasets/livebench`、`github.com/LiveBench/LiveBench`）；官方说明 agentic coding 任务的 Docker 镜像合计可达 150 GB。
- 2.0 的完整题库、隐藏测试程序、隐藏参考数据与任务专属 rubric：官网**不公开**。
- 2.0 的论文 / 技术报告：官网未给出，核验时**未取到**；仅 v1 有 ICLR 2025 Spotlight 论文（arXiv:2406.19314）。

时效性提醒：榜单分数与成本列会随实例刷新变动，同一日两次抓取曾得到 Claude Fable 5.1 成本 `$7.406` 与 `$6.904` 两个值；引用时必须带 release 号与抓取日期。
