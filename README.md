# llm-benchmarks

大模型评测基准的整理与笔记。每份文档覆盖：定位、评测机制、数据规模、成绩现状、已知缺陷。

## 目录结构

| 路径 | 内容 |
| --- | --- |
| `benchmarks/` | 基准文档，一篇一个 `<slug>.md`，按 front matter 的 `category` 分类 |
| `sources/` | 可离线复核的一手数据快照，每个子目录带来源与版本说明 |
| `AGENTS.md` | 命名、格式、引用口径与提交前校验清单 |
| `.gitignore` / `.editorconfig` | 忽略规则与编辑器格式约定 |
| `README.md` | 本文件：索引与阅读约定 |

## 基准索引

| 基准 | 类型 | 规模 | 状态 | 文档 |
| --- | --- | --- | --- | --- |
| SQuAD | 阅读理解 / QA (`qa`) | 1.1 107,785 题 / 2.0 约 150K 题 | 抽取式 QA 已饱和，仍是 RAG 拒答基线 | [squad.md](benchmarks/squad.md) |
| HotpotQA | 阅读理解 / QA (`qa`) | 112,779 题，dev / test 各 7,405 | Distractor 区分度下降，仍适合作 RAG 证据归因 sanity check | [hotpotqa.md](benchmarks/hotpotqa.md) |
| SWE-bench | 代码修复 (`code`) | Full 2,294 / Verified 500 | Verified 已饱和，主信号转向 Pro / Live | [swe-bench.md](benchmarks/swe-bench.md) |
| CL-bench | 上下文学习 (`context`) | 500 上下文 / 1,899 任务 / 31,607 rubrics | 前沿模型 Overall 最高 27.9%，远未饱和 | [cl-bench.md](benchmarks/cl-bench.md) |
| IFBench | 精确指令遵循 (`instruction`) | 300 prompts / 58 个 OOD 约束 / 344 个约束实例 | 未饱和，统计功效受限（有效样本 58 个约束） | [ifbench.md](benchmarks/ifbench.md) |
| WorkBuddy Bench | Agent 端到端 (`agent`) | 260 题（Code 80 / Web 70 / Office 50 / Security 60） | 四个子集评分口径独立，子集间分数不可比 | [workbuddy-bench.md](benchmarks/workbuddy-bench.md) |
| LiveBench | Agent 端到端 (`agent`) | 2.0：471 任务 / 7 suite；v1：18→23 任务 / 6→7 类 | 2.0 加权 Overall（2026-10-25），与 v1 分数不可跨版本比较 | [livebench.md](benchmarks/livebench.md) |

一手数据快照见 [sources/workbuddy-bench/README.md](sources/workbuddy-bench/README.md) 与 [sources/livebench/README.md](sources/livebench/README.md)。

## 阅读约定

- 分数一律标注**口径**：数据集 split、评测 harness、是否厂商自报。
- 跨口径的数字不直接比较；只看同一 harness 下的相对排序。
- 引用上游代码 / 配置时行号精确锚定，时效性数据带版本号与日期。
- 新增或修订文档前先读 [AGENTS.md](AGENTS.md)，按其提交前校验清单逐项核对。
