# GPQA 一手数据快照

本目录随仓库入库，用于离线复核 [benchmarks/gpqa.md](../../benchmarks/gpqa.md) 第 2 节（出题与验证流程）、第 3 节（评测协议与 harness 差异）、第 5 节（已知缺陷）与第 6 节（复现命令）。快照为上游公开文件的**只读副本**，与抓取时逐字节一致。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `gpqa-repo-README.md` | `https://raw.githubusercontent.com/idavidrein/gpqa/main/README.md` | 官方仓库 `main` 分支，抓取日期 `2026-11-05` | canary string 与 dataset.zip 下载方式、只实现 GPT-3.5 / GPT-4 的 baseline 脚本与 6 种 `prompt_type`、开卷检索的 Bing key 要求、题目勘误表单、COLM 2024 bibtex |
| `lm-eval-gpqa-README.md` | `https://raw.githubusercontent.com/EleutherAI/lm-evaluation-harness/main/lm_eval/tasks/gpqa/README.md` | EleutherAI `main` 分支，抓取日期 `2026-11-05` | 数据集 gated 与 `huggingface-cli login` 要求、3 子集 × 5 类共 15 个任务变体、v2.1（PR #3735）与 v2.2（PR #3691）答案预处理括号正则 bug 的一手记录 |
| `hf-dataset-meta.json` | `https://huggingface.co/api/datasets/Idavidrein/gpqa`（本次官方域名不可达，经 `hf-mirror.com` 同源代理访问） | 官方 API 元信息，抓取日期 `2026-11-05`，上游 `lastModified` `2026-09-21T22:29:06Z` | `gated: auto`、`license: cc-by-4.0`、4 个 config 及数据文件名、额外 gated 条款（不得公开题目）；**卡片正文未取到** |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。三份文件合计约 9.8 KB，不含任何题目文本、选项或答案键。

## 入库边界

按 `AGENTS.md` §1 与 GPQA 作者明确的防污染要求，以下材料**不入库**：

- **题目与答案**（`gpqa_diamond.csv` / `gpqa_main.csv` / `gpqa_extended.csv` / `gpqa_experts.csv` 及 `dataset.zip`）。数据集内含 canary string，作者请求不要以纯文本或图片形式在网上复现题目；官方仓库 zip 虽以密码保护，密码却与 README 一起公开，Hugging Face 版本为 `gated: auto` 且需勾选「不公开题目」条款。本仓库不复制题目、选项、答案键或 canary GUID 到任何文档正文。
- 官方仓库源码（`github.com/idavidrein/gpqa`）与评测框架源码（EleutherAI lm-evaluation-harness、OpenAI simple-evals）：体积大且为公开仓库，仅留外链，复现命令见 `benchmarks/gpqa.md` 第 6 节。
- 论文 PDF 与 HTML 全文（arXiv:2311.12022，COLM 2024）：公开文献，仅留外链；论文 Table 2 / 4 / 5 / 6 的数字在文档正文按原值引用。
- 第三方榜单原始宽表（BenchLM、LLMLearner、DataLearner、Epoch AI、gpqa.ai Clean）：均为动态页面，本次未保存快照；正文引用时逐条标注来源类型与访问日期。
- Hugging Face 数据集**卡片正文**：`huggingface.co` 官方域名在本次环境下直连不通（WebFetch 与 curl 均失败），经 `hf-mirror.com` 代理请求 `/datasets/Idavidrein/gpqa/raw/main/README.md` 返回 **HTTP 401**（gated，需登录），**未取到**。本目录保留的只是同源官方 API 元信息；镜像仅为代理通道，引用时应注明访问路径。
