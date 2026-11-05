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

| 基准 | 类型 | 规模 | 状态 | 文档 |
| --- | --- | --- | --- | --- |
| SQuAD | 阅读理解 / QA (`qa`) | 1.1 107,785 题 / 2.0 约 150K 题 | 抽取式 QA 已饱和，仍是 RAG 拒答基线 | [squad.md](benchmarks/squad.md) |
| HotpotQA | 阅读理解 / QA (`qa`) | 112,779 题，dev / test 各 7,405 | Distractor 区分度下降，仍适合作 RAG 证据归因 sanity check | [hotpotqa.md](benchmarks/hotpotqa.md) |
| SWE-bench | 代码修复 (`code`) | Full 2,294 / Verified 500 | Verified 已饱和，主信号转向 Pro / Live | [swe-bench.md](benchmarks/swe-bench.md) |
| CL-bench | 上下文学习 (`context`) | 500 上下文 / 1,899 任务 / 31,607 rubrics | 前沿模型 Overall 最高 27.9%，远未饱和 | [cl-bench.md](benchmarks/cl-bench.md) |
| IFBench | 精确指令遵循 (`instruction`) | 300 prompts / 58 个 OOD 约束 / 344 个约束实例 | 未饱和，统计功效受限（有效样本 58 个约束） | [ifbench.md](benchmarks/ifbench.md) |
| WorkBuddy Bench | Agent 端到端 (`agent`) | 260 题（Code 80 / Web 70 / Office 50 / Security 60） | 四个子集评分口径独立，子集间分数不可比 | [workbuddy-bench.md](benchmarks/workbuddy-bench.md) |
| LiveBench v1 | 抗污染客观题 (`qa`) | 23 任务 / 7 类（末次 release 2026-06-25；题库未完整公开） | 已冻结，官网已切换至 2.0；分数须绑定 release 日期 | [livebench-v1.md](benchmarks/livebench-v1.md) |
| LiveBench 2.0 | Agent 端到端 (`agent`) | 471 任务 / 7 suite（release 20261025） | 加权 Overall（2026-10-25），官网当前版 | [livebench-v2.md](benchmarks/livebench-v2.md) |

一手数据快照见 [sources/workbuddy-bench/README.md](sources/workbuddy-bench/README.md)、[sources/livebench-v1/README.md](sources/livebench-v1/README.md) 与 [sources/livebench-v2/README.md](sources/livebench-v2/README.md)。

## 阅读约定

- 分数一律标注**口径**：数据集 split、评测 harness、是否厂商自报。
- 跨口径的数字不直接比较；只看同一 harness 下的相对排序。
- 引用上游代码 / 配置时行号精确锚定，时效性数据带版本号与日期。
- 同一基准差别较大的多个版本各占一行索引、各自标注口径，分数不可跨版本比较（拆分规则见 [AGENTS.md](AGENTS.md) §2.1）。
- 调研新基准时先查上面的聚合平台定位，再以官网 / GitHub / 论文为准；聚合平台属二手整理，不作为分数口径的一手来源。
- 调研与写作流程见 [AGENTS.md](AGENTS.md) §6；Claude Code 中可直接触发 `benchmark-research` skill。
- 新增或修订文档前先读 [AGENTS.md](AGENTS.md)，按其提交前校验清单逐项核对。
