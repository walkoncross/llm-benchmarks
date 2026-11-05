# SQuAD 1.1 一手数据快照

本目录对应 [benchmarks/squad-v1-1.md](../../benchmarks/squad-v1-1.md)。按 `AGENTS.md` §2.1，多版本基准的快照目录与文档一一对应、不共用；**本目录无快照文件入库**，仅记录来源版本、用途与未入库边界。入库日期 `2026-11-05`：本次为文档拆分，内容按 single source of truth 重组自拆分前的单文档，未新增一轮上游抓取与核验。

| 来源 | URL | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| SQuAD Explorer 官方首页 | https://rajpurkar.github.io/SQuAD-explorer/ | 官网当前版（1.1 / 2.0 双榜并存） | 1.1 leaderboard 的人类表现与榜首成绩、dataset 目录文件名、许可 |
| EMNLP 2016 论文 | https://arxiv.org/abs/1606.05250 | 2016-06 | 536 篇文章 / 23,215 段 / 107,785 问答对、众包构造流程 |
| ACL 2018 论文 | https://arxiv.org/abs/1806.03822 | 2018-06 | Table 2 重列的 1.1 train/dev/test 划分（口径对照） |

入库日期 `2026-11-05`；**一手核验日期未标注**——既有文档未记录 `verified`，本次拆分不擅自补写。

## 入库边界

按 `AGENTS.md` §1，`sources/` 只收小体积、可离线复核的快照；以下材料**不入库**：

- `train-v1.1.json` / `dev-v1.1.json`：任务数据集本身，由官网 dataset 目录或 Hugging Face `rajpurkar/squad` 提供；文件体积**未取到 / 未按同样深度核验**。
- 论文 PDF 与补充材料：公开文献，仅留外链。
- 官网 leaderboard 后端数据与 CodaLab 提交系统：非可离线复核的小体积文件，**未取到**快照。

复现命令见 `benchmarks/squad-v1-1.md` 第 6 节（`datasets.load_dataset("rajpurkar/squad")`）。本目录不含任何分数数据；榜单成绩引用时须标注 test split 与「微调 + 隐藏集」harness，且与 `sources/squad-v2-0/README.md` 对应的 2.0 版本分数不可比。
