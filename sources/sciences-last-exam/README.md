# Science's Last Exam 一手数据快照

本目录对应 `benchmarks/sciences-last-exam.md`，用于离线复核第 2 节（题量与学科分布）、第 3 节（聚合口径）、第 4 节（榜单）与第 5 节（口径缺陷）。首次抓取 / 入库 `2026-11-06`，增量拉取与复核 `2026-11-08`。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `tasks-index-v1.jsonl` | `https://raw.githubusercontent.com/Gen-Verse/Science-Last-Exam/main/tasks/index.jsonl` | 仓库 `main` 分支，抓取 2026-11-06；**2026-11-08 重新下载逐字节比对无变化**；113 行 / 24,984 字节；SHA-256 `b6d30fa8fa84d783290603ecedb91acfc2b9dc3761b3fb0e3cc81f07ce5ce840` | 逐任务的 `id` / `capability` / `capability_name` / `domain` / `path` / `level`。正文表 1（九学科分布）与表 2（七类评估题量）均由本文件的 `domain` / `capability` 字段计数得出，与 `docs/releases/v1.md` 的官方口径逐项一致；Wet-lab Execution 因索引中无任务条目而记为 0，其「In construction / 不计分」状态取自官方 release notes，非本文件字段。原样保存，未重排。 |
| `site-data-2026-11-08.js` | `https://sciences-last-exam.org/assets/data.3839fede7a1c3592.js` | 官网当前前端数据源，抓取 2026-11-08；833 行 / 25,871 字节；SHA-256 `3839fede7a1c35927a62d2adfd991387776b894280263bd773d348faed7d909b`（与文件名 hash 一致） | **官网榜单的唯一结构化一手源**。`window.SLE.leaderboard` 含 `updated: "2026-11-08"`、9 个模型的 `harness` / `setting`、7 组 `results`（`hd` / `pp` / `sc` / `so` / `eo` / `e2e` / `all`）、`aggregation`（六项等权、cost/time 定义、precision 与 missing 规则）以及 11 个带 SHA-256 的 `sourceFiles`。顶层 `links.paper` 与 `links.blog` 均为 `null`，`institutions` 共 34 条。原样保存，未重排。 |
| `leaderboard-2026-11-08.csv` | 由 `site-data-2026-11-08.js` 结构化导出 | 对应官网 `9 models · Published 8 November 2026`；导出 2026-11-08 | 9 行榜单：`rank` / `harness` / `model` / `setting` / `composite_score` / `cost_per_task_usd` / `time_per_task`，外加 6 项能力分数列（`hd_score`、`pp_score`、`sc_score`、`so_score`、`eo_score`、`e2e_score`）。供正文表 4 与表 5 复核。 |
| `leaderboard-2026-11-04.csv` | `https://sciences-last-exam.org/leaderboard` | 页面标注 `8 models · Published 4 November 2026`；访问 2026-11-06 | **历史快照，保留用于版本沿革对比**。8 个 model-agent 配置的 Composite score、Cost / task、Time / task，为官网渲染文本的**人工转录**。 |

## 转录方式与精度说明

- `tasks-index-v1.jsonl` 与 `site-data-2026-11-08.js` 是机器下载的一手文件，可直接重算计数与分数矩阵；`leaderboard-2026-11-08.csv` 由后者**程序化导出，非人工转录**，空值表示官网该字段为 `null`，`rank = —` 表示 composite 缺失、不参与排名。
- `leaderboard-2026-11-04.csv` 是从官网榜单页渲染文本人工转录，不是官方导出的结构化数据文件；其 `effort` 列对应 `site-data-2026-11-08.js` 的 `setting` 字段（取值改为官方小写字面量，空字符串写 `—`）。两版 `time_per_task` 均用 `Xm Ys` 格式，便于逐行 diff。
- 官网 `aggregation.precision` 明示：「Protocol Planning、Scientific Computing、Scientific Software Operation、Experiment Observation 的值由**四舍五入后的源图表值**算出；Hypothesis Discovery 值报两位小数」。`aggregation.cost_time` 明示：Cost / task 与 Time / task 是这四项的**等权均值，不是按题量加权的合并均值**。`aggregation.missing` 明示：六项分数不齐则 composite 为 `null`，四项值不齐则 cost / time 为 `null`。因此本快照只用于核对**已发布数字的口径**，不用于重算 composite。
- 逐行核对结果：2026-11-04 快照的 8 行 Composite / Cost / Time 与 2026-11-08 结构化数据**逐值一致**；新增的 Gemini 4 Argon 为 `hd` 缺失、composite 为 `null`，但 4 项能力分数、cost 与 time 有值。

## 2026-11-08 增量核验摘要

| 来源 | 11-06 记录 | 11-08 现状 | 结论 |
| --- | --- | --- | --- |
| 官网榜单 | `8 models · Published 4 November 2026` | `9 models · Published 8 November 2026` | **已更新**：新增 Gemini 4 Argon（Codex / `default`），前 8 行分数、成本、时间未变 |
| 官网 `data.js` | 未单独入库 | `updated: "2026-11-08"`，`sourceFiles` 中多个 `measurements` 由 8 变 9，EO 源仍为 `results-20261104.json` | 新增一行评测，EO 数据未重跑 |
| 官方仓库 | 最新 commit `164bf4c`（2026-11-06 19:51 UTC） | `pushed_at` 仍为 `2026-11-06T19:51:42Z`，tag 仅 `v1`，无正式 release，README 未提 Gemini | **仓库未同步榜单更新**；`tasks/index.jsonl` 逐字节未变 |
| 官网首页 / Docs | 113 题 / 6 能力 + 1 端到端 / 9 学科 / 34 机构；下载 11-06 开放 | 逐项一致 | 无变化 |
| 论文 | arXiv 零结果、仓库仅 `@misc` 网站引用 | arXiv 仍零结果；官网 `data.js` 中 `links.paper: null`、`links.blog: null` | 仍无论文，官网自身亦未挂链接 |
| 三个聚合平台 | 均无 SLE 条目 | BenchLM（目录已增至 759）、LLMLearner、DataLearner 仍均无 | 仍无二手交叉校验源 |
| Hugging Face | 直连全部失败 | API / 数据卡 / tree 端点再次全部 `HTTP 000` | **仍未取到**，元信息缺口保留 |

## 核验边界

- **Hugging Face 三个数据集直连未取到**：`https://huggingface.co/datasets/Gen-Verse/Science-Last-Exam` 及其 `/raw/main/README.md`、`/api/datasets/...`、`/api/datasets/.../tree/main` 在 2026-11-06 与 2026-11-08 两次核验中均连接失败（`fetch failed` / HTTP 000），页面正文未取得。任务卡数据集的**存在、用途与字段**由官网 `docs` 的「Code and data」段与官方仓库 README 的 `Data` 段交叉确认；其行数、更新时间、schema 等元信息**未核验**，正文不引用。
- 另外两个数据集（`Science-Last-Exam-data` 16.5 GB、`Science-Last-Exam-reference` 224 MB / gated）的数据卡正文经搜索引擎索引片段取得，未做整页直连核验；体积与 gated 状态在正文标注为该来源口径。
- **无论文**：arXiv 全字段检索 `"Science's Last Exam"` 返回零结果；官方仓库 `Citation` 段只提供 `@misc{aitonomy2026sle}` 网站引用，官网 `data.js` 的 `links.paper` / `links.blog` 均为 `null`。方法学依据为官网 docs 与仓库文档自述。
- **三个聚合平台无条目**：BenchLM、LLMLearner、DataLearner 目录（2026-11-08 访问）均无 `Science's Last Exam` / `SLE` / 中文译名条目；DataLearner 页面文本有截断，结论限于可见部分。
- **Replays 页**：官网展示 42 / 113 个任务的 Agent 运行录屏，本次仅抽读页面片段（含 GPT-6.1 Sol、Claude Opus 5 的单任务 verifier 输出），未核验是否新增 Gemini 录屏，正文沿用仓库 README 的 42 / 113 口径。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 113 个任务的 instruction、输入文件、视频、pinned 科研代码存档与桌面镜像：`Science-Last-Exam-data` 总计 16.5 GB，属大体量数据。
- 隐藏参考答案、solution、hidden test fixtures、verifier 用 reference-generating helper：`Science-Last-Exam-reference`（1,078 个文件 / 224 MB）为 gated 数据集，按官方防污染要求不入库、不转载。
- 六个 Hypothesis Discovery 研究数据库（MIMIC-IV、eICU、内部 HCC 队列、UK Biobank、GEO、ArrayExpress）：须从各自提供方按其访问条款获取，官方明确不随 SLE 数据集再分发。
- 官网其余前端 bundle（`leaderboard.*.js`、`generated.*.js` 等）、Docker/QEMU 镜像、Harbor 与 DiscoveryRSI 运行时、Agent 轨迹与 replay 录屏：只在正文给出复现命令与体积口径。
- 第三方转述、聚合平台页面与社交媒体公告：只在正文作为线索或对照，不存副本。
