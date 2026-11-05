# AA Intelligence Index v5.0 一手数据快照

本目录对应 `benchmarks/aa-intelligence-index-v5.md`，用于离线复核第 5 节的 v5.0.1 榜单与分项分数。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `leaderboard-v5.0.1-2026-11-05.csv` | `https://artificialanalysis.ai/leaderboards/models` | 页面标注 `Artificial Analysis Intelligence Index v5.0.1`；抓取 / 核验日期 `2026-11-05` | 前 10 名 + 关键开源 / 成本档位，共 18 行；含 Index 精确值、Cost per Task、时间与九项组件分数 |

## 抓取与解析

- 官网 LLM Leaderboard 为服务端渲染的 React 页面，同时在 RSC payload 中嵌入完整模型数组。本快照从该数组读取 `intelligenceIndex`、`intelligenceIndexCostPerTask`、`intelligenceIndexTimePerTask`、`timeToFirstAnswerToken`、`isOpenWeights` 与 `scores` 字段。
- 页面表格把 Index 显示为整数；CSV 的 `index_display` 是页面显示值，`index_raw` 保留 4 位小数。二者差异只来自四舍五入。
- 组件分数原为 0–1 比例，CSV 转为百分数并保留 1 位；`aa_briefcase_elo` 保留 Elo 原值；`aa_omniscience_net` 是 AA-Omniscience 的 Net Score 字段，不是 Index 的单一权重项。
- `cost_per_task_usd` 与 `time_per_task_min` 由官网字段换算；官网表格显示的时间为分钟，CSV 保留 1 位。

## 覆盖范围

- 当前榜单共 **96 个配置行**（同一模型不同 effort 各占一行），其中 **37 个开源权重行**；本快照只取文中引用的 18 行，不是完整榜单。
- 前 10 名：Gemini 4 Carbon（high）、Claude Opus 5.5（max）、Gemini 4 Carbon（medium）、Claude Opus 5.5（xhigh）、GPT-6 Astra（max）、GPT-6 Astra（xhigh）、GPT-6 Astra（high）、GPT-6.1 Sol（max）、Claude Sonnet 5.5（max）、Gemini 4 Carbon（low）。
- 额外参考行：GPT-6.1 Terra（max）、Muse Wonder Full（max）、Claude Fable 5.1（max）、Kimi K3.1 Pro、Claude Haiku 5.5（max）、DeepSeek V4.1 Flash 1017（max）、GLM-5.3（max）、MiMo-V2.6-Pro。
- `Kimi K3.1 Pro` 在 AA 数据中 `isOpenWeights=false`（权重未发布）；`Claude Haiku 5.5`、`DeepSeek V4.1 Flash 1017`、`GLM-5.3`、`MiMo-V2.6-Pro` 的 `open_weights` 按 AA 字段填写。
- `Muse Wonder Full (max)` 官网未给 Cost / Time，CSV 留空。

## 版本说明

- 官网当前为 **v5.0.1**（方法页 Version History：2026-11 起，按 CritPt 作者反馈改进评分稳健性并重跑全部模型的 CritPt v2）。
- v5.0.1 与 2026-10-27 的 v5.0 发布文不是同一组分数：发布文头部的 Gemini 4 Carbon / Opus 5.5 为 59 / 58，当前官网为 60 / 59；CritPt 分项变化更大。引用时必须绑定版本。
- 二手聚合平台的 v5.0 页面（LLMLearner、DataLearner）最后更新停留在 2026-10-29，不能当作 v5.0.1 的现行分数。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 官方 96 行完整榜单与组件全量矩阵：只在正文引用，不存完整副本。
- 私有题集与私有 split：AA-Briefcase 全量 91 题、AA-Omniscience 私有 3,000 题、CritPt v2 hard subset 40 题、FrontierCode 2.0 的 132 题、AutomationBench-AA 的 657 题私有 split。
- 公开数据集本体：`AA-Briefcase-Lite`（约 103 MB）、`AA-Omniscience-Public-v1.1`（约 1.1 MB）、`cais/hle-diamond`（约 224 MB）、`CritPt-Benchmark/CritPt`（约 330 KB）均不入库，复现命令见正文第 7 节。
- 各组件 Docker 镜像、Agent 轨迹、模型输出与完整 trial 表。
- GDP.pdf 数据：方法页标注 `surgeai/GDP.pdf`，Hugging Face 直接访问返回 401，本次未取到。
- 二手平台页面与 heise 评论：只在参考来源中引用。

## 交叉引用

- 文档：`benchmarks/aa-intelligence-index-v5.md`
- 官方方法页：https://artificialanalysis.ai/methodology/intelligence-benchmarking
- 官方发布文：https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5
- 官方 Gemini 4 Carbon 登顶文：https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1
