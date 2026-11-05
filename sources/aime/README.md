# sources/aime

AIME（American Invitational Mathematics Examination）评测配置的一手快照。AIME 本身不是论文提出的基准，没有 origin paper，可比性完全由 harness 定义，所以这里存的是**各家 harness 的任务定义**，而不是题库。

## 来源与版本

| 项 | 内容 |
| --- | --- |
| MathArena 仓库 | https://github.com/eth-sri/matharena（MIT） |
| MathArena 平台论文 | https://arxiv.org/abs/2605.00674 |
| lm-evaluation-harness | https://github.com/EleutherAI/lm-evaluation-harness（`lm_eval/tasks/aime/`） |
| inspect_evals | https://github.com/UKGovernmentBEIS/inspect_evals（`src/inspect_evals/aime2026/`） |
| 抓取日期 | 2026-11-05（取各仓库 `main` 分支当时的文件内容） |
| 数据集元信息 | 经 Hugging Face 数据集 API 读取；本机 `huggingface.co` 直连超时，实际走 `hf-mirror.com` 镜像 API，字段与许可值同上游 |

## 入库内容

| 文件 | 关键信息 |
| --- | --- |
| `matharena-aime-2025.yaml` | `n_problems: 30`、`\boxed{}` 作答、`strict_parsing: false`、`date: "2025-02-12"`、数据集 `MathArena/aime_2025` |
| `matharena-aime-2026.yaml` | 同上，`date: "2026-02-06"`、数据集 `MathArena/aime_2026` |
| `lm-eval-aime.yaml` | 数据集 `gneubig/aime-1983-2024`（覆盖 1983–2024，不止单年）、`do_sample: false` / `temperature: 0.0`、`max_gen_toks: 32768`、指标 `exact_match`、`num_fewshot: 0` |
| `inspect-evals-aime2026.yaml` | `version: "3-A"`、`dataset_samples: 30`、数据集 `math-ai/aime26` 以 `pinned` 方式固定 |

四份文件合计 59 行。三者对同一赛事的处理差异是可复现的：**prompt 不同**（MathArena 要求 `\boxed{}`，lm-eval 用 `Question: … Answer:` 模板，inspect_evals 在 `utils/aime_common.py` 里按末行 `ANSWER:` 抽取）、**采样不同**（MathArena 每题 4 次取均值并给 CI，lm-eval 单次 greedy）、**题集不同**（MathArena 按年取 30 题，lm-eval 是 1983–2024 的历史合集）。同一模型跨这些口径的读数不可直接比较。

## 未入库边界

- **题目正文与官方答案不入库**：版权归 MAA，且题库本身就是污染源。仓库只存评测配置，不存题干。
- **榜单分数不入库**：MathArena 的排行榜表由前端异步加载，抓不到可冻结的静态表；正文的分数逐条取自单模型页 `/models/<slug>`，来源 URL 写在 `benchmarks/aime.md` 附录第 7 项。
- **Hugging Face 数据集条目不落盘**：`AI-MO/aimo-validation-aime`、`MathArena/aime_2025`、`math-ai/aime26` 等只读了元信息（条数、字段、许可），未下载 parquet；正文引用处已标注读取方式。
- **MAA 官方政策 PDF 未入库**：`2026-27-AIME-Policies.pdf` 被 Cloudflare 拦截，取不到原文，故「每题 1 分、满分 15」在正文标注为二手。

## 复现命令

```bash
# 1) 三个 harness 的任务定义
curl -s https://raw.githubusercontent.com/eth-sri/matharena/main/configs/competitions/aime/aime_2026.yaml
curl -s https://raw.githubusercontent.com/EleutherAI/lm-evaluation-harness/main/lm_eval/tasks/aime/aime.yaml
curl -s https://raw.githubusercontent.com/UKGovernmentBEIS/inspect_evals/main/src/inspect_evals/aime2026/eval.yaml

# 2) 数据集规模与字段（直连不通时换镜像域名）
curl -s https://hf-mirror.com/api/datasets/math-ai/aime26
```

> 口径提醒：AIME 的「分数」至少被三个维度切开——**年份**（2024/2025/2026 是不同题集）、**卷别与题数**（单卷 15 题 vs I+II 合卷 30 题）、**harness**（prompt / 采样次数 / 答案抽取）。引用任何 AIME 数字都必须同时写清这三项，详见 `benchmarks/aime.md` 第 3 节与第 5.1 节的颗粒度换算。
