# llm-benchmarks

大模型评测基准的整理与笔记。每份文档覆盖：定位、评测机制、数据规模、成绩现状、已知缺陷。

| 基准 | 类型 | 规模 | 状态 | 文档 |
| --- | --- | --- | --- | --- |
| SWE-bench | 仓库级 issue 修复 | 2,294 / Verified 500 | Verified 已饱和 | [swe-bench.md](swe-bench.md) |
| IFBench | 精确指令遵循（可验证约束） | 300 prompts / 58 约束 | 未饱和，统计功效受限 | [IFBench.md](IFBench.md) |
| HotpotQA | 多跳问答 + 证据链归因 | 112,779 / dev·test 各 7,405 | Distractor 区分度下降 | [2026-11-05-HotpotQA数据集介绍.md](2026-11-05-HotpotQA数据集介绍.md) |

## 阅读约定

- 分数一律标注**口径**：数据集 split、评测 harness、是否厂商自报。
- 跨口径的数字不直接比较；只看同一 harness 下的相对排序。
