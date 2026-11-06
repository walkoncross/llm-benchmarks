# Science's Last Exam 一手数据快照

本目录对应 `benchmarks/sciences-last-exam.md`，用于离线复核第 2 节（题量与学科分布）、第 4 节（榜单）与第 5 节（口径缺陷）。抓取 / 入库日期 `2026-11-06`，一手核验日期 `2026-11-06`。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `tasks-index-v1.jsonl` | `https://raw.githubusercontent.com/Gen-Verse/Science-Last-Exam/main/tasks/index.jsonl` | 仓库 `main` 分支，抓取 2026-11-06；113 行 / 24,984 字节；SHA-256 `b6d30fa8fa84d783290603ecedb91acfc2b9dc3761b3fb0e3cc81f07ce5ce840` | 逐任务的 `id` / `capability` / `capability_name` / `domain` / `path` / `level`。正文表 1（九学科分布）与表 2（七类评估题量）均由本文件的 `domain` / `capability` 字段计数得出，与 `docs/releases/v1.md` 的官方口径逐项一致；Wet-lab Execution 因索引中无任务条目而记为 0，其「In construction / 不计分」状态取自官方 release notes，非本文件字段。原样保存，未重排。 |
| `leaderboard-2026-11-04.csv` | `https://sciences-last-exam.org/leaderboard` | 页面标注 `8 models · Published 4 November 2026`；访问 2026-11-06 | 8 个 model-agent 配置的 Composite score、Cost / task、Time / task，供正文表 4 复核。 |

## 转录方式与精度说明

`tasks-index-v1.jsonl` 是机器下载的一手文件，可直接重算计数。`leaderboard-2026-11-04.csv` 是**从官网榜单页渲染文本人工转录**，不是官方导出的结构化数据文件（榜单页未提供下载端点）；`effort` 为空表示该行官网显示 `—`。官方 `docs/TASKS.md` 明确提示：「当前官网数字由四舍五入后的图表值导出，与用未舍入的逐次 trial 结果重新聚合相比，显示精度可能有差异」。因此本快照仅用于核对**已发布数字的口径**，不能用于重算 composite。

## 核验边界

- **Hugging Face 任务卡数据集直连未取到**：`https://huggingface.co/datasets/Gen-Verse/Science-Last-Exam` 及其 `/raw/main/README.md`、HF API 在本次核验中均连接失败（`fetch failed` / HTTP 000），页面正文未取得。该数据集的**存在、用途与字段**由官网 `docs` 的「Code and data」段与官方仓库 README 的 `Data` 段交叉确认；其行数、更新时间、schema 等元信息**未核验**，正文不引用。
- 另外两个数据集（`Science-Last-Exam-data` 16.5 GB、`Science-Last-Exam-reference` 224 MB / gated）的数据卡正文经搜索引擎索引片段取得，未做整页直连核验；体积与 gated 状态在正文标注为该来源口径。
- **无论文**：arXiv 全字段检索 `"Science's Last Exam"` 返回零结果；官方仓库 `Citation` 段只提供 `@misc{aitonomy2026sle}` 网站引用，无预印本或会议出处。方法学依据为官网 docs 与仓库文档自述。
- **三个聚合平台无条目**：BenchLM、LLMLearner、DataLearner 目录（2026-11-06 访问）均无 `Science's Last Exam` / `SLE` / 中文译名条目；DataLearner 页面文本有截断，结论限于可见部分。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 113 个任务的 instruction、输入文件、视频、pinned 科研代码存档与桌面镜像：`Science-Last-Exam-data` 总计 16.5 GB，属大体量数据。
- 隐藏参考答案、solution、hidden test fixtures、verifier 用 reference-generating helper：`Science-Last-Exam-reference`（1,078 个文件 / 224 MB）为 gated 数据集，按官方防污染要求不入库、不转载。
- 六个 Hypothesis Discovery 研究数据库（MIMIC-IV、eICU、内部 HCC 队列、UK Biobank、GEO、ArrayExpress）：须从各自提供方按其访问条款获取，官方明确不随 SLE 数据集再分发。
- Docker/QEMU 镜像、Harbor 与 DiscoveryRSI 运行时、Agent 轨迹与 replay 录屏、官网前端 bundle：只在正文给出复现命令与体积口径。
- 第三方转述、聚合平台页面与社交媒体公告：只在正文作为线索或对照，不存副本。
