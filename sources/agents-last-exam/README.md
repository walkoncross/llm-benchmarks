# Agents' Last Exam 一手数据快照

本目录对应 `benchmarks/agents-last-exam.md`，用于离线复核第 2 节（规模与版本沿革）、第 4 节（两代榜单）与附录（BenchLM 双条目辨析）。抓取 / 入库日期 `2026-11-06`，一手核验日期 `2026-11-06`。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `leaderboard-v1-1-2026-11-05.csv` | `https://agents-last-exam.org/leaderboard` | 页面标注 `All tasks 122`（Linux 86 / Windows 36）、`Results updated Nov 5, 2026 (UTC)`、`Benchmark reference · Oct 27, 2026 · 2e91edd`；访问 2026-11-06 | 正文表 3 的全 15 行：harness / model / effort / Pass Rate / Score / Total Runtime / Output Tokens。 |
| `leaderboard-v1-legacy-overall-full.csv` | `https://agents-last-exam.org/leaderboard/v1` | 页面标注 `Leaderboard v1.0 (Legacy)`，`Best per task — (Jul 4, 2026)`，Runtime 方法 `updated July 10, 2026`；访问 2026-11-06 | legacy 榜前 10 行；正文表 4 引用其中前 6 行，用于核对 BenchLM `alebench` 条目头部 38.2 / 34.2 / 32.2 三行确实来自 v1.0 legacy 榜，并保留 `Best per task` 聚合行的口径。 |

## 转录方式与精度说明

两份 CSV 都是**从官网榜单页渲染文本人工转录**，不是官方导出的结构化数据文件（榜单页未提供下载端点）。`leaderboard-v1-1-2026-11-05.csv` 为当前榜**全部 15 行**；`leaderboard-v1-legacy-overall-full.csv` 为 legacy 榜 46 行中的**前 10 行**（仅作口径对照，不是完整转录）。`effort` 中的 `Max (Best)` / `High (Best)` 表示官网把该配对在全部任务上的最强档作为默认展示，其余档位需通过 Effort 菜单切换。官网未公布重复运行次数或置信区间，因此本快照只用于核对**已发布数字的口径**，不能用于重算 Pass Rate / Score，也不能拼接两代结果。

v1.0 榜的 `Best per task` 是「每题取全体运行中最高分」的聚合上界，**不是任何单一 Agent 的成绩**，转录时以 `rank=-` 单独标注，不应参与逐行排名。

## 核验边界

- **Hugging Face 官方域名直连全部失败**：`https://huggingface.co/datasets/agents-last-exam/agents-last-exam` 与 `https://huggingface.co/agents-last-exam` 在本次核验中 `fetch failed` / HTTP 000（WebFetch 与 curl 各试两次）。数据集卡片的题量、版本、schema、更新时间等元信息**未核验**，正文不引用。其存在、用途与「Hugging Face data packages cover the 122 selected tasks」由官方 2026-06-14 博客、GitHub README 的 HF badge 与 `docs/releases/v1.1.md` 交叉确认。
- **官方自身数字出入，按 `AGENTS.md` §5 并列保留**：公开题集 147（Snorkel ALE-V1 页）vs 152（官方 v1.0 榜 / LLMLearner 转录）；语料库 1,000+（论文 v4 / Docs）vs 1,500+（官网首页 / 博客）；专家 250+ vs 300+；机构 44 vs 100+。官方未解释，本仓库不替其统一。
- **博客内两处最难 tier 数字并列**：2026-06-14 官方博客同一页既写「the best agents pass just 2.6%」，又写「every frontier agent we tested … achieved a 0% success rate」，未标注 split 差异；正文两处并列，未静默取一。
- **grader 类型措辞不一致**：Snorkel v1.1 方法页写「deterministic graders, not LLM-as-a-judge」，官方 Docs 写「Deterministic and judge-based graders」；正文并列保留。
- **三个聚合平台均未采用 v1.1 口径**：BenchLM `agentslastexam`（20 行全自报）、BenchLM `alebench`（v1.0 镜像、display only）、LLMLearner（34 行混合，标注 28 独立 / 6 自报）、DataLearner（中文条目）。它们只作定位与交叉检查，页面副本不入库。
- **同类异名核对**：Sakana AI × AtCoder 的 ALE-Bench（arXiv:2506.09050）与本文基准无关，仅用于附录的命名辨析，不作为 ALE 的一手来源。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 122 个任务的 instruction、输入文件、隐藏参考、专业软件与答案数据：属大体量任务数据，官方通过 Hugging Face archive + SHA-256 校验分发。
- Windows / Linux 沙箱镜像与 GPU 镜像：按 `releases/v1.1/assets.json` 的 pinned image 拉取，体积大且需 provider 凭据。
- Agent trajectory、原始日志、事件流、截图、录屏与官网上榜前端 bundle：只在正文给出复现命令与口径。
- 三个聚合平台页面、厂商发布对比表与 DeepSeek 更新日志：二手 / 自报材料，只在正文作为线索或口径对照，不存副本。

## 复现命令

官方仓库与框架见 `benchmarks/agents-last-exam.md` 第 6 节。本目录两份 CSV 可直接用于核对正文表格：

```bash
wc -l sources/agents-last-exam/leaderboard-v1-1-2026-11-05.csv
column -s, -t sources/agents-last-exam/leaderboard-v1-legacy-overall-full.csv
```
