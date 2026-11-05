# LiveBench v1 一手数据快照

本目录随仓库入库，用于离线复核 [benchmarks/livebench-v1.md](../../benchmarks/livebench-v1.md) 第 3 节「抗污染机制与版本沿革」及第 6 节「已知缺陷」中的 release 日期与变更内容。快照为上游仓库公开文件的**只读副本**，与抓取时逐字节一致。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `changelog.md` | `https://raw.githubusercontent.com/LiveBench/LiveBench/main/changelog.md` | GitHub `main` 分支，抓取日期 `2026-11-05` | 逐次 release 的一手变更记录：首发 2024-06-12、题量从 960→1,000、第 7 类 agentic coding 的加入、2025-10-03 换 Mini-SWE-Agent 并全量重跑 |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**，复现命令见 `benchmarks/livebench-v1.md` 第 7 节：

- v1 题库与模型答案（`huggingface.co/datasets/livebench`）。官网 README 自述最新**全部公开**的题目只到 release `2024-11-25`，2025 年后的 release 题目未完整公开；第三方条目称 2026-06-25 榜单击基于外界看不到的题目，此说法**未取到一手佐证**。
- 评测框架源码 `github.com/LiveBench/LiveBench`（Apache 2.0）；其中 agentic coding 任务需按任务构建 Docker 镜像，官方说明合计可达 150 GB。
- v1 论文 PDF 与补充材料（arXiv:2406.19314，ICLR 2025 Spotlight）：体积较大且为公开文献，仅留外链。
- 官网 v1 时代的 `table_<release>.csv` / `categories_<release>.json`：本次核验时 `2024_06_24`、`2026_06_25` 等多种命名均返回 HTTP 404，`livebench.ai` 已在 2.0 改版后下线旧端点，**未取到**一手榜单快照。

排行榜历史分数与末期题量分布来自二手来源（见 `benchmarks/livebench-v1.md` 第 9 节标注为**二手**的条目），本目录不含其快照，引用时必须标明来源与口径，不得当作一手数据。
