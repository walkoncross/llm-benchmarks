# llm-benchmarks

大模型评测基准的整理与笔记。每份文档覆盖：定位、评测机制、数据规模、成绩现状、已知缺陷。

| 基准 | 类型 | 规模 | 状态 | 文档 |
| --- | --- | --- | --- | --- |
| SWE-bench | 仓库级 issue 修复 | 2,294 / Verified 500 | Verified 已饱和 | [swe-bench.md](swe-bench.md) |

## 阅读约定

- 分数一律标注**口径**：数据集 split、评测 harness、是否厂商自报。
- 跨口径的数字不直接比较；只看同一 harness 下的相对排序。
