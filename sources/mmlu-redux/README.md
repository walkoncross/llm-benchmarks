# sources/mmlu-redux

MMLU-Redux（Gema et al.，NAACL 2025）的一手数据快照。对应文档：`benchmarks/mmlu-redux.md`。

## 来源与版本

| 项 | 内容 |
| --- | --- |
| 数据集仓库 | Hugging Face `edinburgh-dawg/mmlu-redux-2.0` |
| 数据集 SHA | `372ea425445d51e1ba1188c56e5e893f8138621f` |
| 数据集最后修改 | 2025-02-25 |
| 论文 | https://arxiv.org/abs/2406.04127（v3，2025-01-10；NAACL 2025） |
| 代码仓库 | https://github.com/aryopg/mmlu-redux |
| 抓取日期 | 2026-11-05 |
| 许可 | CC-BY-4.0（数据集卡 `license: cc-by-4.0`） |

## 入库内容

| 文件 | 上游 | 用途 |
| --- | --- | --- |
| `dataset_info.json` | HF API `/api/datasets/edinburgh-dawg/mmlu-redux-2.0` | 57 个 config 各 100 题、总 5,700；7 个字段；SHA 与最后修改时间 |
| `paper-table5-errors.csv` | 论文 v3 附录 F Table 5（arXiv HTML） | 57 个学科的 original size、OK 与 5 类错误计数；逐格转录，未改写 |

## 抓取与解析说明

- `paper-table5-errors.csv` 的 `ok` + 5 类错误 = 100（每科抽样 100 题）；57 行合计 **5,362 OK + 338 错误 = 5,700**。`raw_error_rate_pct` 是 **样本原始比例**（338 / 5,700 = 5.93%）。
- 论文的 **6.49%** 不是 338/5,700，而是按各科原题量分层加权后的全 MMLU 估计：`Σ(每科错误率 × 该科原题数) / 14,042 = 6.49%`。两者都保留，正文第 2.3 节已明确区分。
- `dataset_info.json` 的 `configs` 是 config 名 → 题数；57 个 config 全部为 `test` split、各 100 题。原 MMLU test 总量 14,042 来自 `cais/mmlu`，不是本数据集的行数。
- 数据集版本是 **2.0**（5,700 题 / 57 科）；论文 v1 的 3,000 题 / 30 科是旧版，GitHub README 仍写 30 科，属未同步说明。

## 未入库边界

按 `AGENTS.md` §1，以下材料不入库：

- **5,700 题正文、choices 与标注文本**：属题库本体；复现命令见 `benchmarks/mmlu-redux.md` 第 6 节。
- **官方 leaderboard**：不存在。论文与 HF 数据集均未托管榜单；本目录不保存任何第三方榜单，避免把未定义协议的数字固化成「官方口径」。
- **BenchLM 的 21 行展示表**：二手，且页面把 MMLU-Redux 误标为 2026 年的「harder refresh / Quarterly refresh」，本仓库不采信、不入库；正文第 4.2 节保留该错误作为聚合平台不可靠的证据。
- **llm-stats 的 50 行表**：二手且全部 self-reported，仅作交叉参考，不入库。
- **`lm-eval` 使用的社区副本 `fxmarty/mmlu-redux-2.0-ok`**：不是官方发布版，不入库；正文已注明该 harness 口径为 0-shot 生成式。
- **Zenodo 镜像 `11624987`**：与 HF 数据集同源，不重复保存。

## 复现命令

```bash
# 单个学科
python -c "
from datasets import load_dataset
d = load_dataset('edinburgh-dawg/mmlu-redux-2.0', 'virology', split='test')
print(len(d), d.features)
"

# 57 个 config 的总题数
python -c "
from datasets import get_dataset_config_names, load_dataset
cs = get_dataset_config_names('edinburgh-dawg/mmlu-redux-2.0')
print(len(cs), sum(len(load_dataset('edinburgh-dawg/mmlu-redux-2.0', c, split='test')) for c in cs))
"
# 期望：57 5700

# 复算论文的分层加权 6.49%
python -c "
import csv
rows = list(csv.DictReader(open('sources/mmlu-redux/paper-table5-errors.csv')))
tot = sum(int(r['original_size']) for r in rows)
w = sum(int(r['total_errors']) / 100 * int(r['original_size']) for r in rows)
print(round(w / tot * 100, 2), 'raw:', round(338 / 5700 * 100, 2))
"
```

> 口径提醒：`error_type == ok` 只表示「题面与答案无问题」，不代表题目变简单；`expert` 表示标注者仍不确定，不应并入 `ok` 或任一类错误。详见 `benchmarks/mmlu-redux.md` 第 2.3、3.1 节。
