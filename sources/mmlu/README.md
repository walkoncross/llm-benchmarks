# sources/mmlu

MMLU（Massive Multitask Language Understanding）的一手数据快照。

## 来源与版本

| 项 | 内容 |
| --- | --- |
| 数据集仓库 | Hugging Face `cais/mmlu`（Center for AI Safety 镜像的官方发布版） |
| 仓库 SHA | `c30699e8356da336a370243923dbaf21066bb9fe` |
| 仓库最后修改 | 2024-03-08 |
| 原始题目与评测代码 | https://github.com/hendrycks/test · 数据包 https://people.eecs.berkeley.edu/~hendrycks/data.tar |
| 论文 | https://arxiv.org/abs/2009.03300（ICLR 2021） |
| 抓取日期 | 2026-11-05 |
| 许可 | MIT（数据集卡 `license: mit`） |

## 入库内容

`dataset_info.json`：只保留 `all` 配置的 split 题数、字段结构、答案标签映射与字节数，取自数据集卡 `README.md` 的 `dataset_info` YAML 段，未做改写。

## 未入库边界

- **题目正文、`auxiliary_train` 语料、`data.tar` 全量包不入库**：`all` 配置的 test+validation+dev 约 7.2 MB，`auxiliary_train` 单 split 约 161 MB，`data.tar` 实测 166,184,960 字节（约 166 MB），均超出本仓库「小体积、可离线复核」的边界。
- **榜单分数不入库**：MMLU 没有官方托管榜单，2023 年后的分数分散在厂商技术报告与第三方聚合页，逐条抓取既无法冻结版本也无法离线复核，正文按来源分类引用、不落快照。
- **`auxiliary_train` 不作为考题**：它是辅助训练池（来自 AGIEval / RACE / 高中考试等外部数据），统计规模时不得计入。

## 复现命令

```bash
# 只取考试用的三个 split（约 7 MB）
python -c "
from datasets import load_dataset
d = load_dataset('cais/mmlu', 'all', split=['test', 'validation', 'dev'])
print({k: len(v) for k, v in zip(['test', 'validation', 'dev'], d)})
"
# 期望：{'test': 14042, 'validation': 1531, 'dev': 285}
```

> 口径提醒：论文写的是 test 14,079 / validation 1,540 / 合计 15,908，发布版为 14,042 / 1,531。两者相差 37 / 9 题，属论文与发布版之间的清洗差异，引用时必须注明用哪套数字，详见 `benchmarks/mmlu.md` 第 2.1 节。
