# AA LiveCodeBench 一手数据快照

本目录对应 `benchmarks/aa-livecodebench.md`，用于离线复核正文第 4.4 节的「945 个测试实例」观察与第 5 节的 27 行分数。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `leaderboard-2026-11-06.csv` | `https://artificialanalysis.ai/evaluations/livecodebench` | 官网 Legacy 榜，图注 `27 of 343 models`；抓取 / 核验日期 `2026-11-06` | AA 全部 27 行有分数的模型配置：分数、配置档位、发布日、开源权重与 deprecated 标记 |

## 抓取与解析

- 官网为服务端渲染的 Next.js 页面，RSC payload 中嵌入模型数组。本快照读取每个模型对象的 `livecodebench` 字段（0–1 比例），以及同对象的 `name`、`suffix`、`releaseDate`、`isOpenWeights`、`deprecated`。
- 页面 headline 只显示一位小数（如 `91.7%`）；CSV 的 `score_pct` 保留两位，`score_raw` 保留原始浮点值，二者差异只来自四舍五入。
- 27 个 `score_raw` 全部可写成 `x/945`；`numerator_945` 列给出对应分子（榜首 867/945），用于复核正文第 4.4 节的观察。该观察**由快照数值反推，不是 AA 官方口径**；AA 未公开题量与重复次数，不得把 945 当作题量。
- `rank` 为按 `score_pct` 降序的竞争排名（同分并列，如两行并列第 4 后跳到第 6）。`configuration` 取自 `suffix` 字段，空值表示 AA 未给该行配置后缀。
- 配置档位、发布日与开源 / deprecated 标记均为 AA 页面数据字段，未与厂商模型卡逐条交叉核验。

## 方法页要点（未单独存文件）

AA 方法页 `https://artificialanalysis.ai/methodology/intelligence-benchmarking#livecodebench` 的 Legacy Evaluations → LiveCodeBench 小节原文要点，正文第 4.1 节据此撰写：

- 「Removed from the Intelligence Index in v4.0. Retired from our active reporting.」
- 「Python programming to solve programming scenarios derived from LeetCode, AtCoder, and Codeforces.」
- Paper: `https://arxiv.org/abs/2403.07974`；Dataset: `https://huggingface.co/datasets/livecodebench/code_generation_lite`。
- Key details: 「Pass@1 evaluation criteria」；「We do not apply LiveCodeBench custom system prompts」。
- `#livecodebench-prompt` 小节给出带 / 不带 starter code 的两套题面模板与代码提取正则 `(?<=```python\n)((?:\n|.)+?)(?=\n```)`；页面当前标注版本为 `Artificial Analysis Intelligence Index v5.0.1`。

## 覆盖范围

- 27 行 = AA 官网**全部**有 LiveCodeBench 分数的模型配置；官网共 343 个模型，其余 316 个无分数。
- 27 行的 `release_date` 全部落在 `2025-04-16` – `2025-12-23`，无 2026 年模型；其中 23 行 `deprecated=true`、10 行 `is_open_weights=true`。
- 分数区间 `79.79%` – `91.75%`，前 10 跨度 `5.51` 点。

## 版本说明

- AA 官网评测页标 `Legacy`；方法页写明自 Intelligence Index v4.0 起移除并停止主动报分。与 `benchmarks/aa-intelligence-index-v5.md` 表 1 的 v4.0 沿革一致。
- 二手平台 BenchLM 把这批分数标为 `2026-11-05 / Current / Quarterly / display-only`，仅 13 行且全为 secondary reports；与 AA 官方的 Legacy 状态和 27 行覆盖范围都不一致，见正文第 5.2 与 6.2 节。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 官网 343 个模型的完整矩阵、组件全量分数与 Score vs. Release Date 图数据。
- 题目本体、测试用例、`code_generation_lite` 数据集文件或上游 `release_v1` – `release_v6` 归档包（体积大，复现命令见正文第 7.2 节）。
- 模型输出、评测轨迹、AA 内部 harness / 固定配置 / prompt 运行结果。
- 二手平台（BenchLM / LLMLearner / DataLearner）的全量榜单，只在正文与参考来源中引用。
- Hugging Face `livecodebench/code_generation_lite` 页面本次直接访问未取到（网络不可达）；链接由 AA 方法页与上游仓库 README 双向确认。

## 交叉引用

- 文档：`benchmarks/aa-livecodebench.md`
- 相关文档：`benchmarks/aa-intelligence-index-v5.md`
- 官方榜：https://artificialanalysis.ai/evaluations/livecodebench
- 官方方法页：https://artificialanalysis.ai/methodology/intelligence-benchmarking#livecodebench
- 上游仓库：https://github.com/LiveCodeBench/LiveCodeBench
