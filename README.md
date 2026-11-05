# llm-benchmarks

大模型评测基准的整理与笔记。每份文档覆盖：定位、评测机制、数据规模、成绩现状、已知缺陷。

## 目录结构

| 路径 | 内容 |
| --- | --- |
| `benchmarks/` | 基准文档，一篇一个 `<slug>.md`，按 front matter 的 `category` 分类 |
| `sources/` | 可离线复核的一手数据快照，每个子目录带来源与版本说明 |
| `AGENTS.md` | 命名、格式、引用口径与提交前校验清单 |
| `.claude/skills/` | 跨 harness 复用的 Agent skill（如基准调研流程） |
| `.gitignore` / `.editorconfig` | 忽略规则与编辑器格式约定 |
| `README.md` | 本文件：索引与阅读约定 |

## 聚合平台

调研新基准时先查下列平台，拿到定位、分类与上下游链接，再回一手来源（官网 / GitHub / 论文）核验。平台内容是二手整理，**分数与结论不直接当作一手来源引用**。

| 平台 | 覆盖 | 用途 |
| --- | --- | --- |
| [BenchLM](https://benchlm.ai/benchmarks) | 目录（2026-11-05 访问时为 739 个 benchmark / 11 类，含知识、代码、数学、推理、Agent 等），每个基准附榜单、方法论与论文入口 | 英文基准的横向索引 |
| [LLMLearner](https://llmlearner.com/benchmarks) | 按能力、活跃度与覆盖度组织的 LLM 评测基准，说明测什么、谁发布、哪些模型报过分 | 判断基准是否仍活跃、谁在报分 |
| [DataLearner](https://www.datalearner.com/benchmarks) | 中文主流评测基准榜单（MMLU、GSM8K、HumanEval、SWE-bench、AIME 等），附难度、类别与发布机构 | 中文对照与快速定位 |

## 基准索引

| 基准 | 提出时间 | 类型 | 规模 | 状态 | 文档 |
| --- | --- | --- | --- | --- | --- |
| SQuAD 1.1 | 2016-06 | 阅读理解 / QA (`qa`) | 107,785 个问答对（536 篇文章 / 23,215 段，论文口径） | 抽取式 QA 已饱和，官网榜首 F1 95.719（2021-07） | [squad-v1-1.md](benchmarks/squad-v1-1.md) |
| SQuAD 2.0 | 2018-06 | 阅读理解 / QA (`qa`) | 约 150K 题，其中 53,775 条不可回答 | 已饱和（榜单末次新条目约 2022-05），仍是 RAG 拒答基线 | [squad-v2-0.md](benchmarks/squad-v2-0.md) |
| HotpotQA | 2018-09 | 阅读理解 / QA (`qa`) | 112,779 题，dev / test 各 7,405 | Distractor 区分度下降，仍适合作 RAG 证据归因 sanity check | [hotpotqa.md](benchmarks/hotpotqa.md) |
| MMLU | 2020-09 | 综合知识 / 多项选择 (`qa`) | 57 学科 / 15,908 题（论文口径；test 14,079） | 已饱和：独立 harness 头名 95.2%，Kaggle 标为 Deprecated，官方榜停更 | [mmlu.md](benchmarks/mmlu.md) |
| SWE-bench | 2023-10 | 代码修复 (`code`) | Full 2,294 / Verified 500 | Verified 已饱和，主信号转向 Pro / Live | [swe-bench.md](benchmarks/swe-bench.md) |
| CL-bench | 2026-02-03 | 上下文学习 (`context`) | 500 上下文 / 1,899 任务 / 31,607 rubrics | 前沿模型 Overall 最高 27.9%，远未饱和 | [cl-bench.md](benchmarks/cl-bench.md) |
| IFBench | 2025-07 | 精确指令遵循 (`instruction`) | 300 prompts / 58 个 OOD 约束 / 344 个约束实例 | 未饱和，统计功效受限（有效样本 58 个约束） | [ifbench.md](benchmarks/ifbench.md) |
| DeepSWE | 2026-05-26 | 代码修复 (`code`) | 113 任务 / 91 仓库 / 5 种语言（v1.1） | v1.1 现行榜单（2026-09-22 更新），头部 73–74% 且置信区间重叠；Epoch AI 于 2026-09-07 评为 Flawed | [deepswe.md](benchmarks/deepswe.md) |
| FrontierCode 2.0 | 2026-10-27 | 代码修复 (`code`) | 132 个私有任务（单一 Main 子集） | 现行榜单（2026-11-04 更新，28 个 model-agent 行）；Claude Opus 5.5 最高 45.5%，未饱和 | [frontiercode-v2.md](benchmarks/frontiercode-v2.md) |
| WorkBuddy Bench | 2026-07-23 | Agent 端到端 (`agent`) | 260 题（Code 80 / Web 70 / Office 50 / Security 60） | 四个子集评分口径独立，子集间分数不可比 | [workbuddy-bench.md](benchmarks/workbuddy-bench.md) |
| Terminal-Bench 4.0 | 2026-08-28 | Agent 端到端 (`agent`) | 66 个终端任务 / 7 类；每题 5 次 trial（330 trials） | 连续基准（语义化版本）；官方榜首 Opus 5.5 64.85%，Epoch 评审为 Flawed | [terminal-bench-v4-0.md](benchmarks/terminal-bench-v4-0.md) |
| LiveBench v1 | 2024-06-12 | 抗污染客观题 (`qa`) | 23 任务 / 7 类（末次 release 2026-06-25；题库未完整公开） | 已冻结，官网已切换至 2.0；分数须绑定 release 日期 | [livebench-v1.md](benchmarks/livebench-v1.md) |
| LiveBench 2.0 | 2026-10-14 | Agent 端到端 (`agent`) | 471 任务 / 7 suite（release 20261025） | 加权 Overall（2026-10-25），官网当前版 | [livebench-v2.md](benchmarks/livebench-v2.md) |

一手数据快照见 [sources/workbuddy-bench/README.md](sources/workbuddy-bench/README.md)、[sources/livebench-v1/README.md](sources/livebench-v1/README.md)、[sources/livebench-v2/README.md](sources/livebench-v2/README.md)、[sources/deepswe/README.md](sources/deepswe/README.md) 与 [sources/terminal-bench-v4-0/README.md](sources/terminal-bench-v4-0/README.md)、[sources/frontiercode-v2/README.md](sources/frontiercode-v2/README.md)。SQuAD 两版无快照文件入库，来源版本与未入库边界见 [sources/squad-v1-1/README.md](sources/squad-v1-1/README.md) 与 [sources/squad-v2-0/README.md](sources/squad-v2-0/README.md)。

## 阅读约定

- 「提出时间」取论文首发或官网首发 release 日期（能精确到日则精确到日），仅用于了解基准年代，不代表当前榜单版本或末次更新时间。
- 分数一律标注**口径**：数据集 split、评测 harness、是否厂商自报。
- 跨口径的数字不直接比较；只看同一 harness 下的相对排序。
- 引用上游代码 / 配置时行号精确锚定，时效性数据带版本号与日期。
- 同一基准差别较大的多个版本各占一行索引、各自标注口径，分数不可跨版本比较（拆分规则见 [AGENTS.md](AGENTS.md) §2.1）。
- 调研新基准时先查上面的聚合平台定位，再以官网 / GitHub / 论文为准；聚合平台属二手整理，不作为分数口径的一手来源。
- 调研与写作流程见 [AGENTS.md](AGENTS.md) §6；Claude Code 中可直接触发 `benchmark-research` skill。
- 新增或修订文档前先读 [AGENTS.md](AGENTS.md)，按其提交前校验清单逐项核对。
