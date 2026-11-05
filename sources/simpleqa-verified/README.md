# SimpleQA Verified 一手数据快照

本目录只对应 `benchmarks/simpleqa-verified.md`（Google DeepMind / Google Research，1,000 题）。OpenAI 原版 4,326 题的快照在 `sources/simpleqa/`，两者分数不可比。两个文件分别服务于正文第 4.1 节（论文基线）与第 4.2 节（现行榜单）。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `paper-table7-v2-2026-03-10.csv` | `https://arxiv.org/html/2509.07968v2` Table 7 | 论文 **v2**（2026-03-10 修订；v1 为 2025-09-09） | 13 个模型行的 F1、Δ SimpleQA、Accuracy、Acc.\|Attempted、Attempted、Hedged 与显著性标记，1,000 题 / 无工具 / `gpt-4.1-2025-04-14` autorater |
| `kaggle-leaderboard-2026-10-20.csv` | `https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified` | 页面标注 `Updated October 20, 2026`、`Showing 48 of 58 models` | 榜单可见前 14 名的分数与 ±置信区间 |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。

## 抓取与解析

- `paper-table7-v2-2026-03-10.csv` 逐格转录论文 Table 7，所有数值单位为 %，`delta_simpleqa_pp` 单位为 %pt；上游 `*` 标记（p<0.05）在 `significant` 列显式写出，未改动任何数字。`Δ SimpleQA` 定义为同一模型在 Verified 与原版 SimpleQA 上的 F1 之差。
- Kaggle 榜单为服务端渲染页面，模型名与分数分列两段，按显示顺序一一对应；`score_pct` 去掉 `%`，`ci_pct` 去掉 `±` 与 `%`。页面**未逐行披露**工具设置、reasoning effort 与 API 快照，本目录只保留可见的前 14 行。
- 两组数字**不可比**：论文 Table 7 是 2026-03 的模型 cohort，Kaggle 榜单是 2026-10 的模型 cohort；前者榜首 Gemini 2.5 Pro 55.6，后者榜首 Gemini 3.1 Pro Preview 77.5%。正文第 4 节已给出统一口径警示块。
- 1,000 题榜单的置信区间（±2.6%–±3.4%）显著宽于 `sources/simpleqa/kaggle-leaderboard-2026-10-20.csv` 中 4,326 题原版的 ±1.3%–±1.7%，是样本量缩小约 4 倍的直接结果。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**，复现命令见 `benchmarks/simpleqa-verified.md` 第 6 节：

- 1,000 题题库本体、Kaggle 评测 Notebook 与 58 行完整榜单：任务数据集与上游代码不入库；本目录只保留两张聚合转录表。
- 论文 Appendix A 的完整 autorater prompt（上游以 `data:text/plain;base64,...` 嵌在 arXiv HTML 中，词数 963 → 1,124）、arXiv PDF 与 v1 版本。
- 独立 GitHub 仓库：**未找到**，论文与 Kaggle 页面均未给出；不存在可作快照的官方仓库文件。
- 二手聚合平台页面（BenchLM / DataLearner / LLMLearner）：BenchLM 条目转录的正是论文 Table 7，属二手，本目录以 arXiv v2 原文为准。

## 交叉引用

- 文档：`benchmarks/simpleqa-verified.md`
- 上游原版文档与快照：`benchmarks/simpleqa.md`、`sources/simpleqa/README.md`
- 官方榜单 / 数据集 / 评测代码：https://www.kaggle.com/benchmarks/deepmind/simpleqa-verified
- 原始论文：https://arxiv.org/abs/2509.07968
