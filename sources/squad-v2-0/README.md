# SQuAD 2.0 一手数据快照

本目录对应 [benchmarks/squad-v2-0.md](../../benchmarks/squad-v2-0.md)。按 `AGENTS.md` §2.1，多版本基准的快照目录与文档一一对应、不共用；**本目录无快照文件入库**，仅记录来源版本、用途与未入库边界。入库日期 `2026-11-05`：本次为文档拆分，内容按 single source of truth 重组自拆分前的单文档，未新增一轮上游抓取与核验。

| 来源 | URL | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| SQuAD Explorer 官方首页 | https://rajpurkar.github.io/SQuAD-explorer/ | 官网当前版（1.1 / 2.0 双榜并存） | 2.0 leaderboard 的人类表现与榜首成绩、`Evaluation Script v2.0`、dataset 目录、许可 |
| ACL 2018 论文 | https://arxiv.org/abs/1806.03822 | 2018-06 | 对抗式不可回答题构造、Table 2 划分、Table 3 基线、86% → 66% F1 对照实验 |
| 题目可视化探索 | https://rajpurkar.github.io/SQuAD-explorer/explore/v2.0/dev/ | 官网当前版 | 逐题对照模型输出做错误分析 |
| Hugging Face 数据集卡 | `rajpurkar/squad_v2` | 数据集当前版 | train 130,319 / validation 11,873 的字段结构交叉核验（**二手**） |

入库日期 `2026-11-05`；**一手核验日期未标注**——既有文档未记录 `verified`，本次拆分不擅自补写。

## 入库边界

按 `AGENTS.md` §1，`sources/` 只收小体积、可离线复核的快照；以下材料**不入库**：

- `train-v2.0.json`（**40 MB**）/ `dev-v2.0.json`（**4 MB**）：任务数据集本身体积较大，由官网 dataset 目录或 Hugging Face `rajpurkar/squad_v2` 提供；隐藏测试集不公开，**未取到**。
- 官方评测脚本 `evaluate-v2.0.py`：上游源码不入库，仅留官网首页 `Evaluation Script v2.0` 入口；运行命令见 `benchmarks/squad-v2-0.md` 第 3.2 节。
- 论文 PDF 与补充材料：公开文献，仅留外链。
- 官网 leaderboard 后端数据与 CodaLab 提交系统：非可离线复核的小体积文件，**未取到**快照。

复现命令见 `benchmarks/squad-v2-0.md` 第 6 节（`datasets.load_dataset("rajpurkar/squad_v2")` 与 `evaluate-v2.0.py`）。本目录不含任何分数数据；榜单成绩引用时须标注 test split 与「微调 + 隐藏集」harness，且与 `sources/squad-v1-1/README.md` 对应的 1.1 版本分数不可比。
