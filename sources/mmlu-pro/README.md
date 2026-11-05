# sources/mmlu-pro

MMLU-Pro（TIGER-Lab，2024）的一手数据快照。对应文档：`benchmarks/mmlu-pro.md`。

## 来源与版本

| 项 | 内容 |
| --- | --- |
| 数据集仓库 | Hugging Face `TIGER-Lab/MMLU-Pro` |
| 数据集 SHA | `b189ec765aa7ed75c8acfea42df31fdae71f97be` |
| 数据集最后修改 | 2026-05-02 |
| 官方榜单数据仓 | Hugging Face `TIGER-Lab/mmlu_pro_leaderboard_submission` |
| 榜单数据 SHA | `4623b7c68d2276218d487464b0608dc978f4b301` |
| 榜单数据最后修改 | 2026-03-11 |
| 论文 | https://arxiv.org/abs/2406.01574（NeurIPS 2024 D&B Spotlight） |
| 官方仓库 | https://github.com/TIGER-AI-Lab/MMLU-Pro |
| 抓取日期 | 2026-11-05 |
| 许可 | MIT（数据集卡 `license: mit`） |

## 入库内容

| 文件 | 上游 | 用途 |
| --- | --- | --- |
| `dataset_info.json` | HF API `/api/datasets/TIGER-Lab/MMLU-Pro` | 记录 split 题数、字段、字节数、SHA 与最后修改时间；未改写数值 |
| `leaderboard-results-2026-03-11.csv` | `https://huggingface.co/datasets/TIGER-Lab/mmlu_pro_leaderboard_submission/raw/main/results.csv` | 官方榜单原始 CSV，262 个数据行；原样保存，未改动任何分数 |

## 抓取与解析说明

- `dataset_info.json` 只保留可离线复核的元数据：`test` 12,032 / `validation` 70，`download_size` 121,157,475 字节，`dataset_size` 8,775,905 字节。`download_size` 是 HF API 原值，与实际 parquet 文件大小（test 约 4.1 MB）不一致；引用时以 API 字段为准，不要把它当作题库体积。
- `leaderboard-results-2026-03-11.csv` 的 `Overall` 与 14 个领域列都是 **0–1 的小数**，转百分比需 ×100；`Model Size(B)` 为 `unk` 表示未提供。`Data Source` 列只有 `TIGER-Lab`（官方自跑）与 `Self-Reported`（自报）两类语义，另有 `TIGER-LAb` / `Sefl-Reported` 各 1 行拼写异常。
- 262 行中 136 行为 `Self-Reported`，通常只有 `Overall`，14 个领域列为 `-`；因此不能用这份 CSV 计算「自报行的领域平均」。
- 官方榜单页面（HF Space）最后修改 2025-02-12，但页面运行时从上述数据仓 clone `results.csv`；**数据版本以 2026-03-11 为准**，不是 Space 的构建时间。

## 未入库边界

按 `AGENTS.md` §1，以下材料不入库：

- **12,032 题正文与 `cot_content`**：HF 元数据 `dataset_size` 8,775,905 字节，test parquet 文件约 4.1 MB；属题库本体，不入库；复现命令见 `benchmarks/mmlu-pro.md` 第 6 节。
- **`eval_results/` 预测缓存与官方评测脚本**：上游 GitHub 仓库体积超出快照边界；只保留仓库链接。
- **Kaggle Benchmarks 的 MMLU-Pro 行**：页面服务端渲染，2026-11-05 只取到标题，未取到逐行数据；正文已注明「未取到」。
- **2026 审计的 `MMLU-Pro-Clean` 逐题清单**：属第三方修正数据集，不在本仓库快照范围；只引用论文级统计与 DOI。

## 复现命令

```bash
# 数据集规模（需已安装 datasets）
python -c "
from datasets import load_dataset
d = load_dataset('TIGER-Lab/MMLU-Pro')
print({k: len(v) for k, v in d.items()})
"
# 期望：{'validation': 70, 'test': 12032}

# 榜单行数与来源分布
python -c "
import csv, collections
rows = list(csv.DictReader(open('sources/mmlu-pro/leaderboard-results-2026-03-11.csv')))
print(len(rows), collections.Counter(r['Data Source'] for r in rows))
"
```

> 口径提醒：论文基线是 2024-06 的 5-shot CoT（Gemini 两行为 0-shot）；官方 CSV 混有官方自跑与自报，二者不可直接比较。详见 `benchmarks/mmlu-pro.md` 第 3、4 节。
