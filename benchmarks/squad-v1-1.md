---
name: SQuAD 1.1
slug: squad-v1-1
category: qa
scale: "107,785 个问答对（536 篇文章 / 23,215 段，论文口径）"
status: "抽取式 QA 已饱和，官网榜首 F1 95.719（2021-07）"
updated: 2026-11-05
sources:
  - https://rajpurkar.github.io/SQuAD-explorer/
  - https://arxiv.org/abs/1606.05250
  - https://arxiv.org/abs/1806.03822
---

# SQuAD 1.1：每题必有答案的抽取式阅读理解基准

---

## 1. 一句话定义

**SQuAD**（**S**tanford **Qu**estion **A**nswering **D**ataset）是斯坦福 NLP 组发布的**抽取式阅读理解（extractive reading comprehension）**基准：给定一段维基百科段落和一个由众包工作者撰写的自然语言问题，模型必须从段落中**截取一段连续文本（span）**作为答案。本文只覆盖 **1.1（2016）**——这一版**每题都有答案**，任务就是找 span；2018 年加入对抗式不可回答题、要求模型弃答的 [SQuAD 2.0](squad-v2-0.md) 是另一个评测构念，两者分数不可比。

它之所以是 NLP 史上最重要的基准之一，不在于数据本身有多难，而在于它首次把「大规模人工标注数据 + 可自动计算的双指标 + 隐藏测试集公开排行榜」三件事打包成一套基础设施，直接催生了 2016–2020 年阅读理解模型的竞赛期，并为后来的 GLUE / SuperGLUE 等基准提供了方法论模板。

> **共用背景说明**：SQuAD 的品牌沿革、众包构造流程、EM / F1 指标定义与榜单机制在本文完整叙述；[SQuAD 2.0](squad-v2-0.md) 只写它自己新增的部分，需要通用机制时回指本文，不重复。

---

## 2. 数据与任务构造

### 2.1 规模与划分

官网首页的表述是 "100,000+ pairs on 500+ articles"；EMNLP 2016 论文的统计更精确：536 篇文章、23,215 个段落、107,785 个问答对。按论文 Table 2 的划分：

| 划分 | 题数 |
| --- | ---: |
| 训练集 `train-v1.1.json` | 87,599 |
| 开发集 `dev-v1.1.json` | 10,570 |
| 测试集（隐藏） | 9,533 |
| 按划分合计 | 107,702 |

> **口径说明**：官网首页写的是 "100,000+ pairs on 500+ articles"，论文给出 536 篇 / 23,215 段 / 107,785 对，而 SQuAD 2.0 论文 Table 2 中 1.1 的 train/dev/test 为 87,599 / 10,570 / 9,533（合计 107,702）。三者统计口径略有差异，引用时须注明来源，不要混用。

数据文件为 `train-v1.1.json` / `dev-v1.1.json`，许可 **CC BY-SA 4.0**（商用需遵守署名与相同方式共享）。

### 2.2 众包构造流程

1. **选文**：从英文维基百科按主题多样性抽取 536 篇高质量文章，切成单个段落（passage）。
2. **提问**：Amazon Mechanical Turk 众包工作者阅读段落后自行提出问题，并**在段落中高亮标出答案**（必须是原文逐字连续片段），因此答案天然可自动核验。
3. **校验**：开发集与测试集的每道可回答题由多人独立标注，通常有约 3 个参考答案；评测时对多个参考答案取最高分。
4. **划分**：按文章（而非按题目）切分 train/dev/test，避免同文章段落泄漏；测试集不公开，需提交预测或模型由官方在隐藏集上跑分。

[SQuAD 2.0](squad-v2-0.md) 第 2.2 节在此流程的第 3 步与第 4 步之间插入了「对抗式不可回答题」标注，1.1 不含这一环节。

---

## 3. 评测方式

官网用两个指标，均为**隐藏测试集**上的百分制分数；2.0 沿用同一套定义（见 [SQuAD 2.0](squad-v2-0.md) 第 3.1 节）：

| 指标 | 定义 |
| --- | --- |
| **EM**（Exact Match） | 归一化后（统一大小写、去标点、去冠词 a/an/the、压缩空白）预测与任一参考答案**逐字完全相同**则记 1，否则 0 |
| **F1** | 把预测与参考答案切成 token 袋，计算 precision / recall 的调和平均；允许部分匹配（如答 "Obama" 而标答 "Barack Obama" 仍得部分分） |
| 多参考答案 | 逐个参考答案计算，取 **max** 后在全集上求平均 |

### 3.1 榜单机制

官方 leaderboard 的口径是「**在 SQuAD 上微调 + 隐藏测试集**」：测试集不公开，研究者提交预测文件或模型，由官方在隐藏集上跑分并公示 EM / F1。官网另提供 `Explore v2.0 / 1.1 and model predictions` 可视化页面，可逐题对照各模型输出做错误分析。1.1 的榜单只按上述 EM / F1 两项排名；[SQuAD 2.0](squad-v2-0.md) 第 3 节另描述它特有的无答案题判定与分组指标。

---

## 4. 榜单结果与演进

### 4.1 关键成绩

| 项 | 模型 / 说明 | EM | F1 |
| --- | --- | ---: | ---: |
| 人类表现（官网，test） | 人类标注参考值 | 82.304 | 91.221 |
| 官网榜首（test） | ANNA（单模型，LG AI Research，2021-07） | **90.622** | **95.719** |

> ⚠️ **不要跨口径比较**：本表为 SQuAD **1.1 隐藏 test 集**、官方 leaderboard「微调 + 隐藏集」口径，由官网以评测方身份发布（**评测方自报**，非第三方复测），单次提交、无标准差；与 dev 集、第三方零样本 / 少样本或厂商自测数字不可直接比较。与 [SQuAD 2.0](squad-v2-0.md) 的 EM / F1 虽然同名，但题集与判定规则不同，**两代分数不可比**。

### 4.2 演进时间线

| 时间 | 事件 |
| --- | --- |
| 2016-06 / 2016 EMNLP | SQuAD 1.0 / 1.1 发布，逻辑回归基线 F1 ≈ 51，与人类 91.2 差距巨大，Explorer 榜单上线 |
| 2017 | BiDAF、Match-LSTM、R-Net 等注意力架构轮番刷榜；同年 Jia & Liang 用句末干扰句证明模型严重依赖词汇捷径 |
| 2018-10 | BERT（ensemble）官网 test EM 87.433 / F1 93.160，F1 首次明显超过人类参考值 91.221 |
| 2019 | XLNet、SpanBERT、BERT+WWM、ALBERT 等预训练模型把 v1.1 推到 EM 89–90 区间 |
| 2021-07 | ANNA 单模型登顶 1.1 榜（EM 90.622 / F1 95.719） |
| 2023 至今 | 抽取式 QA 基本饱和，官方榜鲜有新提交；1.1 已主要作为教学与 zero- / few-shot 评测基线 |

> ⚠️ **不要跨口径比较**：本表 EM / F1 均指官网隐藏 test 集、微调口径下的成绩（官方榜单**评测方自报**），不同行是不同年份的独立提交、无误差棒，不是同期横评；网络上流传的 2024–2026 年 LLM「SQuAD 得分」多来自第三方零样本 / 少样本测试或厂商自测，与本表口径不同。与 [SQuAD 2.0](squad-v2-0.md) 的弃答榜分数**不可比**。

---

## 5. 已知缺陷

| 局限 | 后果 / 后续工作 |
| --- | --- |
| 答案必须是段落内**连续 span** | 无法覆盖需要归纳、生成、计算的答案 → DROP（离散 / 数值推理） |
| 每题只对应**单个段落** | 不需要多跳与跨文档检索 → HotpotQA、TriviaQA、Natural Questions |
| 提问者看着段落写问题 | 问题与原文词汇高度重叠，模型可靠类型 / 位置线索作弊 → Adversarial SQuAD (AddSent/AddOneSent) |
| 全部英文维基、单轮、事实型 | 领域与语言单一 → CoQA / QuAC（对话式）、TyDi QA / XQuAD / MLQA（多语）、CMRC 2018（中文） |
| **每题都有答案，无需判断段落是否支持回答** | 模型不必学会弃答 → [SQuAD 2.0](squad-v2-0.md) 用对抗式不可回答题补上这一环 |

---

## 6. 复现与快速上手

```python
from datasets import load_dataset

squad = load_dataset("rajpurkar/squad")   # SQuAD 1.1
print(squad)
print(squad["train"][0]["context"][:120], squad["train"][0]["question"])
```

官方资源（均来自 SQuAD Explorer 首页）：

| 资源 | 链接 / 说明 |
| --- | --- |
| 训练集 / 开发集 | 官网 dataset 目录 `train-v1.1.json` · `dev-v1.1.json` |
| 1.1 论文 | https://arxiv.org/abs/1606.05250 |
| 榜单与题目可视化 | https://rajpurkar.github.io/SQuAD-explorer/ 首页 leaderboard 与 `Explore v2.0 / 1.1 and model predictions` |
| 许可 | CC BY-SA 4.0（商用需遵守署名与相同方式共享） |

按 `AGENTS.md` §1，任务数据集不入库；来源版本、复现命令与未入库边界见 `sources/squad-v1-1/README.md`。

---

## 7. 结论

1.1 的历史价值在于把「抽取式答案 + 双指标自动评分 + 隐藏测试集公开榜」标准化，成为后续阅读理解与 GLUE 类基准的方法论模板；代价是题目全都有答案、且答案就在单段落里，模型可以靠词汇重叠走捷径。今天它已不是前沿难度，但仍适合检验抽取式 QA 基本功与教学入门。

需要「段落无依据时是否敢拒答」的口径，请直接看 [SQuAD 2.0](squad-v2-0.md)；两版只是同名，不是同一把尺子。

---

## 8. 参考来源

1. **一手**：SQuAD Explorer 官方首页与 1.1 leaderboard：https://rajpurkar.github.io/SQuAD-explorer/
2. **一手**：Rajpurkar et al., *SQuAD: 100,000+ Questions for Machine Comprehension of Text*, EMNLP 2016：https://arxiv.org/abs/1606.05250
3. **一手**：Rajpurkar, Jia, Liang, *Know What You Don't Know: Unanswerable Questions for SQuAD*, ACL 2018：https://arxiv.org/abs/1806.03822（Table 2 重列了 1.1 的划分数据，用于第 2.1 节口径对照）
4. **二手**：数据划分与字段结构的交叉核验——公开数据集统计与解析实现（GitHub）、Hugging Face `rajpurkar/squad` 数据集卡
5. 同基准另一版本文档：[squad-v2-0.md](squad-v2-0.md)
