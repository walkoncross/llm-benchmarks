# GAIA (2023) 一手数据快照

本目录对应 `benchmarks/gaia-v1.md`，用于离线复核第 2、3、4.1、4.3、5 节的题量、split、评分方式、论文基线、局限性与 HAL 榜单分数。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `arxiv-2311.12983v1-extract.md` | `https://arxiv.org/abs/2311.12983` · `https://arxiv.org/html/2311.12983v1` | arXiv v1，Submitted 2023-11-21；ICLR 2024；抓取 / 核验 2026-11-06 | 论文英文原文逐段摘录（题量 466、166 dev + 300 test、Level 定义与 146/245/75、准精确匹配、Table 4 基线、四条设计原则、§5 / §6 局限性），带节号与表号锚定 |
| `hal-gaia-2026-11-06.md` | `https://hal.cs.princeton.edu/gaia` · `https://hal.cs.princeton.edu/reliability/agent/gemini-2-5-flash/benchmark/gaia` | 页面读取 2026-11-06；HAL 榜 32 次评测 / 2 种脚手架 / 17 个模型 | 第三方统一脚手架榜的文本快照：450 / 165 题口径、前 10 行 Overall 与 Level 分、API 成本、同模型换脚手架对照、165 题的 53 / 86 / 26 Level 分布 |

## 抓取与解析

- 论文以 arXiv 实验性 HTML 全文为底本，`> ` 引用块为英文原文逐字摘录，中文「要点」为转述；表号 / 节号按论文原标注，未改写一手数字。
- HAL 页面为动态渲染，本次以文本方式读取，只摘录页面统计卡片、前列行与脚注要点，未保存结构化 JSON / CSV；第 2 节的对照表由同一页面不同脚手架行拼出，未做二次计算。
- 相对 GAIA **官方**榜单，HAL 属第三方 harness 口径（公开 165 题 validation + 统一脚手架），与官方隐藏 test 榜不是同一把尺子。

## 版本说明

- 本文只覆盖 2023 年 GAIA。后继 Gaia2（ARE，`arXiv:2509.17158`；Gaia2，`arXiv:2602.11964`）按 `AGENTS.md` §2.1 应另立 `benchmarks/gaia-v2.md` 与独立 `sources/gaia-v2/`，本次未建立。
- 论文口径 466 题 / 166 dev + 300 test；数据集与 HAL 口径 165 validation + 301 test / HAL 自述 450 题。三组数字并列保存在摘录与快照中，**未合并、未取其一**。
- 论文日期：arXiv submitted 2023-11-21；PDF 内页 `Date: November 23, 2023`；arXiv HTML 页首 `date: August 24, 2026` 是渲染时间，不是发表日。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- Hugging Face 官方榜单 Space、数据集卡片、机构页与 Meta AI 发布页：本次直连全部失败（页面抓取 `fetch failed`，本机 `curl` 返回 `CONNECT tunnel 502`），因此没有官方页面快照可存。
- 官方题库本体、题目附件（图片 / 表格 / 文档 / 音频）、隐藏 test 集的答案与元数据：答案按设计不公开，附件体积大且需 gated 授权。
- 官方准精确匹配 scoring function 源码、官方 `results_public` 榜单全量行、agent 提交文件与运行轨迹。
- 三个聚合平台（BenchLM / LLMLearner / DataLearner）页面、Klu 与 DecodeTheFuture 的二手榜单转述、CustomGPT.ai 厂商自报页面：属二手或自报，只在正文「参考来源」列出，不入库。
- 社区 / 个人 GAIA 复现仓库（`github.com/topics/gaia-benchmark` 下全部条目）：非官方，不入库。

## 交叉引用

- 文档：`benchmarks/gaia-v1.md`
- README 索引：`README.md`（GAIA (2023) 一行）
- 官方榜单（未取到）：https://huggingface.co/spaces/gaia-benchmark/leaderboard
- 官方数据集（未取到）：https://huggingface.co/datasets/gaia-benchmark/GAIA
- 原始论文：https://arxiv.org/abs/2311.12983
- 正式发表页：https://openreview.net/forum?id=fibxvahvs3
