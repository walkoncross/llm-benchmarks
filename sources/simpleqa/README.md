# SimpleQA（OpenAI 原版）一手数据快照

本目录只对应 `benchmarks/simpleqa.md`（OpenAI 原版，4,326 题）。Google DeepMind 的 1,000 题清洗版另见 `sources/simpleqa-verified/`。三个文件分别服务于正文第 2.3 节（数据构成）、第 4.2 节（厂商自报基线）与第 4.3 节（现行榜单）。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `dataset-metadata-summary.json` | `https://openaipublic.blob.core.windows.net/simple-evals/simple_qa_test_set.csv` | 抓取 / 核验 `2026-11-05`；文件 2,012,910 bytes，SHA-256 `feee3f7e…d5fc032` | 官方 CSV 的题数、列名、10 类主题计数、5 类答案类型计数与占比、每题 `urls` 长度分布、首条样例，以及论文 2.3 节数字的对照字段 |
| `simple-evals-results.csv` | `https://github.com/openai/simple-evals/blob/main/README.md`（Benchmark Results 表的 SimpleQA 列） | 仓库 README 顶部 Deprecation Notice 标注 `July 2025` 起不再更新 | 34 个模型行的 SimpleQA 分数，`prompt` 与 `notes` 保留上游的 system prompt / 无工具 / n/a 标注；供 4.2 节核对同模型跨来源差异 |
| `kaggle-leaderboard-2026-10-20.csv` | `https://www.kaggle.com/benchmarks/openai/simpleqa` | 页面标注 `Updated October 20, 2026`、`Showing 42 of 49 models`、标题带 `Deprecated` | 榜单可见前 15 名的分数与 ±置信区间 |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。

## 抓取与解析

- `dataset-metadata-summary.json` 由本仓库下载官方 CSV 后用 Python 标准库 `csv` + `ast.literal_eval` 统计生成，`metadata` 列是字符串化 dict；题数 4,326、主题前三位 858/709/550、五类答案类型占比 32.8/24.1/18.0/15.3/9.9 与论文 2.3 节逐项吻合。
- 一处一手差异：论文 2.2 节称每题保留 2–4 个来源，实际 CSV 的 `urls` 长度分布为 2–7（4 条占 3,134 题）。JSON 保留原始分布，正文 2.3 节已注明以 CSV 为准。
- 两张 CSV 均为**逐单元格转录**：Kaggle 榜单为服务端渲染页面，模型名与分数在页面中分列两段，按显示顺序一一对应；`score_pct` 去掉 `%`，`ci_pct` 去掉 `±` 与 `%`。`simple-evals-results.csv` 中上游 `07.6` 等前导零写法统一为数值 `7.6`，供第 4.2 节核对同模型跨来源差异，`n/a` 留空并在 `notes` 标注。
- BenchLM 镜像的「SimpleQA (Kaggle)」49 行表在前列多出 Gemini 3.7 Flash / Gemini 3.5 Flash 等行，与 Kaggle 页面可见顺序不一致；属二手转述，本目录未采信其排序与数字。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**，复现命令见 `benchmarks/simpleqa.md` 第 6 节：

- 题库本体 `simple_qa_test_set.csv`（1.9 MB / 4,326 行）：任务数据集，仅记录体积、SHA-256 与 URL。
- `openai/simple-evals` 源码全量（含 `simpleqa_eval.py` 的 `GRADER_TEMPLATE`）：上游源码不入库；正文按符号名锚定，因核验当日 `raw.githubusercontent.com` 直连超时，未使用行号。
- 论文 PDF（`https://cdn.openai.com/papers/simpleqa.pdf`）、Kaggle 榜单 49 行全量、Kaggle Notebook 与模型输出。
- Hugging Face 社区镜像 `MAISAAI/openai_simple_qa_test_set`：非官方渠道，只在参考来源中列为二手。
- 二手聚合平台页面（BenchLM / DataLearner / LLMLearner）：只在参考来源中引用。

## 交叉引用

- 文档：`benchmarks/simpleqa.md`
- 衍生基准快照：`sources/simpleqa-verified/README.md`
- 官方介绍：https://openai.com/index/introducing-simpleqa/
- 原始论文：https://arxiv.org/abs/2411.04368
- 官方仓库：https://github.com/openai/simple-evals
