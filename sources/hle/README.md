# HLE 一手数据快照

本目录对应 `benchmarks/hle.md`，用于离线复核第 2 节（题集构造与防污染）、第 3 节（判分链路）、第 4 节（榜单口径与演进）、第 6 节（复现命令）及附录（版本沿革）。三份文件均为上游公开文件的**只读副本**，与抓取时逐字节一致；不含任何题目、选项、答案键或图片。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `hle-repo-README.md` | `https://raw.githubusercontent.com/centerforaisafety/hle/main/README.md` | 官方仓库 `main` 分支，抓取日期 `2026-11-06`（该 README 末次提交 `2025-04-04`） | `load_dataset("cais/hle", split="test")`、canary string、两步评测命令、`temperature 0` / `max_completion_tokens ≥ 8192` 约定、sample output 的 `n = 2700` 历史口径 |
| `hf-dataset-meta.json` | `https://huggingface.co/api/datasets/cais/hle`（官方域名本次直连不通，经 `hf-mirror.com` 同源代理访问） | 官方 API 元信息，抓取日期 `2026-11-06`，上游 `lastModified` `2026-01-20`、`createdAt` `2025-01-23` | `gated: auto`、`license: mit`、单 `test` split 2,500 行、12 个字段、`download_size` 274,276,147 字节、文件清单；**卡片正文未取到** |
| `hle-rolling-changes.txt` | `https://raw.githubusercontent.com/centerforaisafety/hle/main/hle-rolling-changes.txt` | 官方仓库 `main` 分支，抓取日期 `2026-11-06`（末次提交 `2026-08-01`，对应 `07/27/2026` release） | HLE-Rolling 换题日志，286 行：`02/20/2026` 201 行、`07/27/2026` 85 行；按动作计 166 `readd` / 79 `add` / 33 `remove` / 8 `update` |

抓取 / 入库日期 `2026-11-06`，一手核验日期 `2026-11-06`。三份文件合计约 17 KB。

## 快照的已知边界

- `hle-rolling-changes.txt` **不是完整沿革**：文件只记录 `2026-02-20` 与 `2026-07-27` 两轮，既不含官网 `2025-10-08` 的 HLE-Rolling 首发记录，也不含 Scale 榜单页 `2026-09-17` 所引的新版本。引用时只能说「日志覆盖的两轮」，不能当作全部 release 次数。
- `huggingface.co` 官方域名在本次环境下直连不通（WebFetch 与 curl 均失败）；元信息经 `hf-mirror.com` 代理读取**官方 API 的同一路径**，镜像仅为代理通道。数据集卡片正文（gated）**未取到**，题量、字段与许可均以 API 元信息为准。
- 官方榜单 `https://labs.scale.com/leaderboard/humanitys_last_exam` 为动态页面，本次**未保存快照**；正文第 4 节的数字为访问日 `2026-11-06` 的人工转录，非逐字节副本。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- **题目、答案键与图片**：2,500 道题含 canary string，官方数据集卡片明确请求「不要公开分享、再上传或分发数据集」；本目录不复制任何题目文本、选项、答案或图像。
- **官方仓库源码**：`hle_eval/run_model_predictions.py`、`hle_eval/run_judge_results.py` 等为公开源码，仅留外链。正文按上游仓库 `main` 分支的精确行号锚定（核验日期 `2026-11-06`），不存副本。
- **论文与网页全文**：arXiv:2501.14249、Nature 649:1139–1146、官网首页、HLE-Diamond 博客、Epoch AI / FutureHouse 评审页均为公开页面，只在正文引用，不存副本。
- **第三方榜单宽表**：Artificial Analysis、BenchLM、LLMLearner、DataLearner、BenchLeader 均为动态页面，未保存快照；正文逐条标注来源类型与访问日期。
- **私有 held-out 集**：官方未公开，无法入库。
