---
name: benchmark-research
description: 按本仓库规范调研一个 LLM benchmark，生成或更新 benchmarks/<slug>.md。优先在 benchlm.ai、llmlearner.com、datalearner.com 三个聚合平台检索，再回官方站、GitHub、论文与数据集/工具链核验，产出含四类资源链接的文档并同步 README 索引。用户要求调研、新增、补全或更新某个 benchmark 时使用。
---

# Benchmark 调研与文档生成

输入：一个 benchmark 名称（英文名、缩写或中文译名均可）。
输出：`benchmarks/<slug>.md`，必要时加 `sources/<slug>/` 快照，以及 README 索引行。

本 skill 只负责「调研 + 起草 + 自检」。**不执行 `git commit` / `git push`**，除非用户明确要求。

## 1. 前置检查

1. 读 `AGENTS.md` §2–§5，确认命名、front matter、章节与口径要求。
2. 在 `benchmarks/` 与 README 索引中按名称、别名、缩写检索：
   - 已有同名文档 → 转为「更新」：补链接、补缺节，不新建重复文件。
   - 同一基准已有多个版本且满足 AGENTS.md §2.1 的拆分门槛 → 新建 `<slug>-v<N>.md`，按拆分约定处理交叉引用与「不可跨版本比较」警示。
3. 确定 slug：小写 kebab-case，与 `name` 对应，如 `swe-bench`、`livebench-v2`。

## 2. 检索顺序：先聚合平台，再一手来源

### 2.1 三个聚合平台（先查）

| 平台 | 入口 | 怎么用 |
| --- | --- | --- |
| BenchLM | https://benchlm.ai/benchmarks | 目录页搜名称或缩写；条目通常给分类、榜单、方法论与论文链接 |
| LLMLearner | https://llmlearner.com/benchmarks | 看能力分类、活跃度与报分模型，判断基准是否仍在更新 |
| DataLearner | https://www.datalearner.com/benchmarks | 中文条目，含难度、类别、发布机构，适合中文译名与别名 |

操作要点：

- 优先用平台站内搜索；站内搜索不可用时用 `WebSearch` 加 `site:` 限定，如 `site:benchlm.ai SWE-bench`。
- 三个平台都查：英文名、常用缩写、中文名各试一次。
- 记下每个平台的**条目 URL**，写进「参考来源」并标注为二手聚合。
- 聚合平台只提供线索：其中的分数、规模、发布时间一律回一手来源核对；平台打不开就写「未取到」，但不能因此跳过一手核验。

### 2.2 一手来源（逐个核验）

| 要找什么 | 优先查 | 保底 / 交叉检查 |
| --- | --- | --- |
| 官方介绍 / 榜单 | 项目官网、leaderboard 页 | 发布机构博客、官方公告 |
| GitHub | 官网或论文里链出的仓库 | GitHub 搜索 `org/repo`，核对 README 与 release |
| 论文 | arXiv、ACL Anthology、OpenReview、NeurIPS / ICML proceedings | Semantic Scholar / Google Scholar 找 DOI 与正式出处 |
| 数据集 | 官方下载页、Hugging Face Datasets、Zenodo、figshare | 论文附录的数据声明 |
| 工具包 | 官方 eval harness、`lm-evaluation-harness`、`inspect_ai`、Docker 镜像 | 社区复现仓库（须标二手） |

核验规则：

- 每个链接都打开确认可达、内容对得上；打不开或内容不符的不写入，或写「未取到」并注明原因。
- GitHub 必须是官方仓库；fork、个人复现、聚合镜像标为「社区」。
- 论文引用原始页面（arXiv abs / ACL Anthology），不引博客转述；预印本与正式发表版本都记，注明会议与年份。
- 榜单数字必须带 release 版本与日期；不同 harness、不同 split 的数字分开写。

## 3. 撰写文档

按 AGENTS.md §3–§4 写，重点：

- front matter 字段齐全、顺序固定；`sources` 最多 4 条，优先官方站、论文、GitHub。
- 章节从 `## 1.` 连续编号，最后一个编号章节是「参考来源」；每个 `##` 前有 `---`。
- 推荐顺序：一句话定义 → 数据与任务构造 → 评测方式 → 榜单结果与演进 → 已知缺陷 → 复现 / 快速上手 → 结论 → 参考来源。
- 出现分数的表格或章节必须带口径警示块，写明 split、评测 harness、是否厂商自报。
- `scale` / `status` 写本篇的单一口径；多版本拆分时不混写两代数字。

「参考来源」写成编号列表，逐条标类型，例如：

```markdown
1. 官方榜单（Leaderboard v1.2，访问 2026-11-05）：https://...
2. 原始论文（arXiv:2304.xxxxx；ICLR 2024）：https://arxiv.org/abs/...
3. 官方仓库（GitHub）：https://github.com/org/repo
4. 数据集（Hugging Face）：https://huggingface.co/datasets/...
5. 评测工具包（GitHub）：https://github.com/...
6. 二手聚合条目（BenchLM）：https://benchlm.ai/...
```

四类链接（官方介绍 / GitHub / 论文 / 相关资源）缺一不可；确实不存在的写明「未找到」，不得编造 URL 或用相近项凑数。

## 4. 落库与索引

1. 新建或更新 `benchmarks/<slug>.md`。
2. 需要离线复核时，按 `sources/<slug>/README.md` 的约定保存小体积快照，记录来源 URL、版本、抓取日期、用途与未入库边界。
3. README 索引表加或改一行：「规模」「状态」与 front matter 逐字一致。
4. 检查交叉引用：相关文档、README、正文里的「第 N 节」。

## 5. 完成前自检

按 AGENTS.md §7 清单逐项过一遍，尤其：

- [ ] 文件名 = `slug`
- [ ] front matter 必填字段齐全、顺序正确
- [ ] 章节编号连续、参考来源在最后、每节前有 `---`
- [ ] 四类资源链接都已核验，二手 / 未取到已标注
- [ ] 分数表带口径警示块
- [ ] README 索引行与 front matter 一致
- [ ] 没有编造 URL、没有擅自改写一手数字

回报时列出：文档路径、四类链接各自是否取到、README 索引是否已更新、仍未核验的部分。
