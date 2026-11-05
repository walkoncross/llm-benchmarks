# DeepSWE 一手数据快照

本目录对应 `benchmarks/deepswe.md`，用于离线复核第 4 节「榜单结果与版本演进」中的 v1.1 分数。快照只收录榜单聚合行，不收录题目、镜像与轨迹。

| 文件 | 上游来源 | 版本 / 日期 | 用途 |
| --- | --- | --- | --- |
| `leaderboard-v1.1-2026-09-22.csv` | `https://deepswe.datacurve.ai/`（首页 Leaderboard，v1.1 标签） | 页面标注 `113 tasks · updated September 22, 2026` | 每模型最佳 reasoning effort 的 pass@1、95% 置信区间、单任务均价、输出 token 与 agent 步数，共 21 行；官网该视图默认显示 `Models (21/28)` |

抓取 / 入库日期 `2026-11-05`，一手核验日期 `2026-11-05`。CSV 由官网服务端渲染的 HTML 表格逐个单元格解析生成，未做四舍五入之外的处理：官网 `Pass@1` 与 `±` 均按整数百分点发布，`Out tok` 保留 `k` 单位原文。

## 版本说明

- 官网首页当前为 **v1.1**（2026-06-14 发布，2026-09-22 更新榜单）；论文 `arXiv:2607.07946v1`（2026-07-08 提交）描述的是 **v1**，其榜单运行于 2026-05 完成。
- 官网共记录 28 个模型 / 70 个 effort 配置；本快照是默认「每模型最佳配置」视图的 21 行，另有 7 个模型未出现在该视图。
- v1 榜单快照见发布博客 `https://deepswe.datacurve.ai/blog/deepswe`（2026-05-26，仅展示 16 个配置中的 12 个）；v1 → v1.1 的同配置对比见 `https://deepswe.datacurve.ai/blog/deepswe-v1-1`。

## 入库边界

按 `AGENTS.md` §1，以下材料**不入库**：

- 113 个任务的题目、验证器与参考解：在 GitHub 仓库 `datacurve-ai/deep-swe`（Apache-2.0）与 Hugging Face 数据集 `datacurve/deep-swe`（gated auto）中，体积与镜像依赖不适合入仓；复现命令见 `benchmarks/deepswe.md` 第 6 节。
- 任务 Docker 镜像、Agent 轨迹与完整 trial 表：官方放在 `datacurve/deep-swe-leaderboard`（CC-BY-4.0，2026-06-09 更新）及官网 trajectory browser；未随本快照入库。
- 官网前端 bundle 与榜单 JSON 接口：核验时未取到稳定的静态 JSON 端点（`/data/leaderboard.json` 重定向回 HTML），故以服务端渲染表格解析结果入仓。
- 论文 PDF（32 页）与 Epoch AI 审计页：只在正文引用，不存副本。
