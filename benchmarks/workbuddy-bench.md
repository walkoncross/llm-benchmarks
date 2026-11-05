---
name: WorkBuddy Bench
slug: workbuddy-bench
category: agent
scale: 260 题（Code 80 / Web 70 / Office 50 / Security 60）
status: 四个子集评分口径独立，子集间分数不可比
updated: 2026-11-05
verified: 2026-10-20
snapshot: Leaderboard v1.2 / data.js v29（generated / last_verified 2026-10-15）
sources:
  - https://workbuddybench.com/
  - https://workbuddybench.com/data.js
  - https://github.com/Tencent/workbuddy-bench
---

# WorkBuddy Bench：子集评分机制核验 + Token 效率对照

---

## 1. 一句话定义

腾讯 2026-07-23 开源的 **Agent 评测套件**（非办公产品），测的是"编程/办公 Agent 能否端到端完成真实工作"。四个子集 Code 80 / Web 70 / Office 50 / Security 60，共 **260 题**；题目从真实 commit、PR、业务场景逆向改写成口语化、带角色扮演、信息不完整的请求，以此抗污染。用 CodeBuddy Code 2.109.3 与 Claude Code 2.1.187 **两套 harness 交叉验证**，把"模型能力"与"框架能力"拆开；每子集 3 次运行取均值、think 模式、上下文统一 200k、关闭 WebSearch 与 AskUserQuestion。**四个子集评分口径各自独立，官方不提供总分，子集间分数不可直接比较。** 已知缺陷见第 7 节与附录「未按同样深度核验的」。

> **核验说明**：数据快照 Leaderboard **v1.2**（generated / last_verified **2026-10-15**），核验日期 2026-10-20，归档 2026-11-05。一手来源与入库边界见第 9 节参考来源及「附：来源文件与入库边界」；表 5–8 直接取自 `sources/workbuddy-bench/data.js` 的 `subsets` 段，可离线复核。

---

## 2. 四个子集：题量、产物形态、判分入口

题量与代办事项来自 README.zh.md 的官方表格；判分入口来自 `configs/README.zh.md:155-162` 的「最新数据集入口」表，并在本地仓库逐文件核对。

| 子集 | 题量 | 交付物 | 判分入口 | LLM 参与 |
|---|---|---|---|---|
| Code | 80 | 跨模块 patch，过隐藏测试 | task-local `tests/verifier.toml` → pytest 或 native script verifier | 可选（Code v2.3 另有 `scores_judge`，仅参考、不进排名） |
| Web | 70 | 可运行端到端制品（声明的输出路径） | 数据集本地 fixed-judge verifier：rule + LLM/VLM + agent judge → penalty score | **默认开启**，见 `configs/bench/wb-bench-web-v1.0.yaml:32-35` |
| Office | 50 | xlsx/csv/pdf/docx 上的**精确**目标产物 | Office rule verifier，需要时合并 host-side LLM judge | **默认关闭**，见 `configs/bench/wb-bench-office-v1.0.yaml:16-22` |
| Security | 60 | 漏洞 PoC / 恶意代码分析 / 安全运营产出 | task-native：每任务自带 `tests/scoring.py`（或 `test_outputs.py`）直接写 `reward.json` | **无**（完全确定性） |

Security “不使用 workbuddy LLM judge 或 diff_capture”这一约束在 `configs/bench/wb-bench-sec-v1.0.yaml:7-11` 与 `:32-34` 两处交叉确认；`:24-30` 进一步说明它**刻意不接** `CompositeVerifier`，因为 task-native 的 `dataset.toml` 不提供 `[verifier]` composite contract，走 composite 会抛 `VerifierContractError`。

---

## 3. Office 子集：难在哪、怎么判

**难在结构不在行数。** README.zh.md 对 Office 的定义是：在混合格式文件（xlsx / csv / pdf / docx）上操作，产出完全正确的目标产物；难度来自**结构、关系、状态与证据链**，而不是行数。这条决定了它的判分必须两条腿走路：

1. **确定性规则检查**（主体）——`tests/verifier.toml` 指定在 `/workspace` 下跑 `pytest /tests/grading`，由 `eval_core.evaluate()` 产出 `checks: [{name, passed, detail, group}]`，最终 `pass_rate = passed_count / total_count`（见 3.2）。
2. **证据驱动的 LLM judge**（补充）——评定规则难以穷举的"自查/结论"类产出，且只读 **verifier 产出的 `artifact_manifest.json` + `artifact_text/*` 冻结证据**（`shared/verifier/README.md:15`），不是让 judge 重跑 Agent。
3. **融合权重**：`weighted_sum(rule × rule_weight + llm × llm_weight)`，**已逐题核实**（见 3.1）。

### 3.1 一手核验：50 道题的 `judge.yaml` 全量统计

`rule_weight` **精确地落在 0.70–0.95 区间**（此前二手资料只说区间，这里给出分布）：

| rule_weight | 0.70 | 0.75 | 0.80 | 0.85 | 0.90 | 0.95 |
|---|---|---|---|---|---|---|
| 题数 | **8** | 1 | **33** | 6 | 1 | 1 |

- 均值 **0.794**，中位 **0.80**；对应 `llm_weight` = 1 − rule_weight，**50 题全部互补和为 1.0000**（脚本逐题校验，无一例外）。
- `score_merge.method`：**50/50 均为 `weighted_sum`**，无一题豁免。
- rubric 条数：最少 1 条、中位 **10 条**、最多 **22 条**——LLM 那部分不是"一句话印象分"，是 rubric_binary_mean（`shared/verifier/scoring.py:141-147` 取值顺序：`llm_judge` → `rubric_binary_mean` → `overall`）。
- 难度分布：easy 13 / medium 24 / hard 13（`dataset.toml` `[stats].difficulties`）。
- 类别分布：`data-file-ops` 24、`doc-ops` 17、`automation-workdir` 9。
- 一道题声明的待查产物（artifacts）：半数(25 题)只交 1 个文件，最多的一题要交 10 个。

**一道真实指令长什么样**（`analyst-forecast-extract-L3-018/instruction.md`，共 11 行、无空话）：

> 你是投研数据库维护助理。当前工作区里已经放好一组合成静态投研资料包……请只使用当前工作区提供的静态文件，不运行脚本、不联网、不查询真实行情……然后精确到列地规定 `forecast_fields` 的 8 个列名、`rating_changes` 的 7 个列名，并指定"缺失目标价……不要补猜缺失值"。

这就是「逆向改写」的落地形态：**角色 + 严禁外部依赖 + 逐列/逐字段的精确契约**，而不是一句"帮我整理一下"。考生的失分点集中在"补猜缺失值""-sheet 汇总与明细口径不一致"，这些又恰好由 rubric 里 `forecast_missing_fields_are_not_inferred_from_context`、`expanded_summary_is_reconcilable_to_details` 这类条款逐条兜住。

**一个需要修正的认知**：所谓"禁联网"是在 **harness 工具层**关闭 WebSearch / AskUserQuestion 实现的；Office 样例任务的 `task.toml` 里 `[environment] network_mode = "public"`，任务容器本身并非断网隔离。真正防止作弊的是**任务禁令 + 静态 fixtures + gold 比对**，以及 instruction 里那句"不联网、不查询真实行情"。

### 3.2 规则侧真实长相：check 组 + 安全护栏

以 `analyst-forecast-extract-L3-018/tests/grading/eval_core.py`（386 行）为例，规则不是"比对一个唯一答案"，而是**分层 check**：

| check 组 | 检查什么 |
|---|---|
| `output_contract` | 四个 sheet 是否存在、每一列是否按序存在、`json_summary_count` 是否与 gold 的行数一致 |
| 逐 sheet 业务规则 | 公司别名归一（`company_dictionary` active alias）、评级标准化（`rating_codebook`）、日期统一 `YYYY-MM-DD`、单位统一 CNY_mn / CNY /share |
| `safety_partition` | 产物里**不得出现** `联网` / `发送` / `交易` / `IM` / `投资建议` / `买入建议` 等 token 或短语 |
| 缺失值处理 | 缺失目标价、缺失预测数值、非目标公司行必须进 `missing_fields`，不补猜 |

`safety_partition` 这一组值得单独拎出来说：它把"Agent 越界做了外部动作"（发邮件、发 IM、给交易建议）当成**确定性失败项**写进 `pass_rate` 分母，而不是靠 LLM 裁判打分。这是 Office 子集在"确定性"上比 Web 更彻底的地方。

### 3.3 为什么 Office 是四个子集里最稳的

运行参数（`configs/bench/wb-bench-office-v1.0.yaml`）：

| 行号 | 键 | 值 | 含义 |
|---|---|---|---|
| `:3` | `n_attempts` | 3 | 每任务重复 3 次取均值（估方差） |
| `:4` | `timeout_multiplier` | 2.0 | 任务声明超时的全局倍数 |
| `:8` | `verifier_user` | root | 校验器可能需要 root 暂存路径；但**Agent 侧仍非 root**（`:6-7` 注释），因为 Claude Code 拒绝以 root 运行 |
| `:10-11` | `context_window` / `context_compact_pct` | 200000 / 92 | 自动压缩触发阈值 |
| `:13-14` | `verifier.import_path` | `workbuddy_bench.judge:CompositeVerifier` | 走 composite engine |
| `:16-21` | `llm_judge` | `enabled: false`，`mode: in_container` | rubric judge 在容器内作为 verifier 的一个 step 跑；默认不启用第二套 host-side 白盒 judge |

实测证据（与“换 harness 影响有限”一致）：公开评测中 Office 七个模型得分落在 **77.47–82.37**，换一套 harness 后多数模型变化不到 2 分，**中位绝对变化 0.86 分**——Office 是四个子集里最“稳”的，因为它几乎不吃 harness 的工具链差异。

---

## 4. Security 子集：四个子集里最硬的一个

**配置就写着“不得接入 LLM judge”**（`configs/bench/wb-bench-sec-v1.0.yaml:32`：`# No LLM judge for sec — scoring is fully programmatic.`）。判分链路：

```
tests/test.sh  →  tests/scoring.py（或 test_outputs.py）  →  reward.txt / reward.json
```

脚本做的事是**客观比对**，不是主观打分：PoC 是否真的触发、YARA 规则是否命中、产出是否与 ground truth 一致。`n_attempts: 3`（`:13`），每任务跑 3 次取均值；`verifier_user: root`（`:19`），因为要把目标二进制/服务编进镜像、verifier 常需要 root 暂存路径。

代价是**它最贵**：Token 效率小节指出 Security 是消耗最大的子集，中游成绩在 CodeBuddy Code 下平均每次运行可达约 **90 轮交互**、约 **1,100 万**输入 token（含缓存）。本文件第 6 节的表 8 能直接看到这个量级。

另一个只有 Security 才报的字段是 **`refusals`（拒答计数）**：GPT-5.5 在 cbc 下 2 次、Gemini-3.5-Flash 两次均为 4、Claude Opus 4.8 在 cc 下 **13 次**。这是把“模型不肯干”从分数里显式剥离出来——不然拒答会伪装成分低。

---

## 5. 代码级核验：共享的 `PassRateScoringPolicy`

所有走 `CompositeVerifier` 的子集共用 `judge/core/scoring.py` 里的打分策略。要点全部锚定行号：

| 位置 | 机制 | 实际作用 |
|---|---|---|
| `judge/core/scoring.py:235-249` | 分母 = **plan 声明的每一个 item**，不是被 judge 覆盖到的 item | 未被覆盖的检查项记 0 分，防止“只跑被覆盖的子集冒充满分” |
| `judge/core/scoring.py:57-67` | 同一 item 有多个 judge 时取 **min** | 一个 FAIL 不会被另一个 PASS 稀释成部分分 |
| `judge/core/scoring.py:225-233` | BUILD_ERROR / JUDGE_ERROR → 致命 | 直接 reward = 0，不做部分给分 |
| `judge/core/scoring.py:273-287`、`314-315` | **gate**（`pass_gate` / `required`）失守 → reward 归零 | 硬性必要项没过，整题报废 |
| `judge/core/scoring.py:289-317` | **cap**（`hard_fail_cap` / `score_cap`）→ `min(reward, cap)` | 关键项失败把总分压到上限，不能靠其他项拉高 |
| `scorer/metrics.py:193-222` | **分母回填**（`_rebase_shrunken_denominators`） | 纯通过率的 attempt 重打为 `tests_passed / max(tests_total)`，**漏报测试题无法抬高通过率** |
| `scorer/metrics.py:247-263` | 未产出 trial 的期望任务 → 合成 0 分 build_error | 崩溃/未跑的任务计入分母，而不是静默消失 |
| `scorer/metrics.py:43-53` | `DEFINITIONS` | reward = 各 trial verifier 分均值；pass_rate = trial 满分率；先任务内平均再跨任务平均 |

### 5.1 8 月的那次“分数虚高”修复

`judge/runners/rule/script_verifier_resilience.py` 读起来像一份事故复盘。它针对的是「单个 `try` 包住所有检查、`finally: write_reward()` 结算」的脚本 verifier 写法——**任何一条 setup 抛异常，后面所有检查都不执行，分母随之变小，分数反而虚高**。防御手段：

- `transform_script`（`:228-254`）：把每条非检查语句包进 `BaseException` 守卫，异常被吞掉并标记，后续检查继续跑（`:299-374`）。
- `declared_check_count`（`:106-119`）：静态数出声明的检查数，`if/else`、`try/except/else`、字面量列表 `for` 都精确计数，**保守不超数**（超数会误罚正常运行的 verifier）。
- `reconcile_reward_payload`（`:492-533`）：实跑记录少于声明数时，把没跑到的检查以「not executed / failed」补齐，**锁死分母**。

这套最后防线与仓库 HEAD 的那条 commit（`fix/script-verifier-inflated-score`，2026-08-20）是同一件事。

### 5.2 三条容易踩的坑

- **`Rebase` 只认纯通过率**：带 `llm_judge_component_score` 标记、或 `overall ≠ test_pass_rate` 的 composite 分不参与分母回填，否则会污染 LLM 与规则的混合比例（`scorer/metrics.py:91-117`）。
- **未跑的任务不是“没数据”而是 0 分**：传 `--manifest` 让 `selected_tasks` 定义期望集合，缺失任务合成 build_error 计入分母（`scorer/metrics.py:247-263`、`:380-388`）。
- **评分不要写在 bench YAML 里**：`configs/README.zh.md:76-78` 明确 bench 层配置的是运行不变量，评分一律由数据集侧 `dataset.toml` 的 `[verifier]` contract + 本地 `shared/verifier/plugin.py` 承担；旧的 `verifier.kwargs.profile` / `[judging]` 已废弃（`configs/README.zh.md:170-171`）。

---

## 6. Token 效率对照表（4 子集 × 2 harness）

> 口径：`data.js` `subsets` 段；3 次运行平均、think 模式；`avgTurns` 计去重后的 assistant 消息（含 subagent）；`avgOutputK` 为每次运行输出 token（千）。
> ⚠️ **不要跨口径比较**：Token 效率表覆盖的模型名单（Opus 4.8 / GPT-5.5 / GLM-5.2 / HY-3 / Kimi K2.6-2.7 / Gemini-3.5-Flash）与主页 v1.2 总榜名单（Opus 5.5 / V4.1-Flash-1017 / GLM-5.3 / Kimi K3 / Hy4 preview …）**不是同一批**。效率结论请只在下表的 roster 内解读，不要跨表和外推到新模型。

### 表 5 · Code（metric: Harbor run-level reward）

| 模型 | cbc 分 | cbc 轮次 | cbc 输出K | cc 分 | cc 轮次 | cc 输出K |
|---|---|---|---|---|---|---|
| Claude Opus 4.8 | 74.43 | 29.51 | 22.3 | 77.90* | 13.2 | 4.7 |
| GPT-5.5 | 72.90 | 26.92 | **6.9** | 76.63 | 30.44 | 8.7 |
| GLM-5.2 | 71.54 | 33.06 | 12.3 | **77.06** | 33.73 | **22.0** |
| Kimi K2.7 | 63.42 | 42.20 | 8.2 | — | — | — |
| HY-3 | 62.90 | 26.02 | 9.3 | 66.26 | 18.07 | 13.9 |
| MiniMax-M3 | 60.14 | 28.89 | 8.5 | 66.42 | 33.90 | 10.6 |
| DeepSeek-V4-Pro | 58.92 | 44.01 | 10.2 | 64.59 | 24.20 | 23.7 |
| DeepSeek-V4-Flash | 55.73 | 40.30 | 9.8 | 61.89 | 23.12 | **28.6** |
| HY-3-preview | 53.57 | 34.65 | 9.7 | 57.71 | 28.63 | 20.9 |

\* Opus 4.8 的 cc 数据来自一次改指令运行（关闭 AskUserQuestion + 禁止追问/单趟完成），与其他模型口径不完全一致——`data.js` 原文自带注释。

**读出什么**：GPT-5.5 用 6.9K 输出拿到 72.90，GLM-5.2 用 22.0K 换取 cc 下的 77.06；DeepSeek-V4-Flash 在 cc 上输出 28.6K 反而只有 61.89。**输出多 ≠ 分高**，同一模型换 harness 后 token 消耗可以差 3 倍以上（Opus 4.8：22.3K → 4.7K）。

### 表 6 · Web（metric: Rubric-item score）

| 模型 | cbc 分 | cbc 轮次 | cbc 输出K | cc 分 | cc 轮次 | cc 输出K |
|---|---|---|---|---|---|---|
| Claude Opus 4.8 | 68.14 | 15.27 | 16.38 | 69.86 | 13.05 | 15.71 |
| HY-3 | 67.71 | 21.19 | 22.63 | 66.43 | 17.76 | 28.36 |
| GLM-5.2 | 67.43 | 28.37 | **33.50** | 60.71 | 36.72 | **39.56** |
| GPT-5.5 | 61.14 | 19.41 | 13.50 | 64.86 | 19.19 | 15.85 |
| MiniMax-M3 | 58.00 | 38.79 | 25.35 | 52.57 | 38.30 | 28.47 |
| DeepSeek-V4-Pro | 54.57 | 17.38 | 20.35 | 51.57 | 14.70 | 36.02 |
| Kimi K2.7 | 54.29 | 24.97 | 21.77 | — | — | — |
| DeepSeek-V4-Flash | 47.29 | 19.12 | 17.97 | 50.29 | 16.16 | 36.04 |

这是**单次消耗最贵的子集**（普遍 14–40K 输出、500–2100K 输入），因为要交付可运行制品、还要过 rubric + VLM。

### 表 7 · Office（metric: Rubric score）

| 模型 | cbc 分 | cbc 轮次 | cbc 输出K | cc 分 | cc 轮次 | cc 输出K |
|---|---|---|---|---|---|---|
| Claude Opus 4.8 | 82.37 | 19.49 | 13.6 | 83.23 | 16.05 | 14.0 |
| HY-3 | 82.08 | 29.25 | 25.6 | 80.08 | 15.69 | 30.4 |
| GPT-5.5 | 81.96 | 17.12 | **10.2** | **86.05** | 19.01 | 18.4 |
| Kimi K2.7 | 80.88 | 38.61 | 20.0 | — | — | — |
| Kimi K2.6 | 78.98 | 36.67 | 21.6 | 67.72 | 10.68 | 15.8 |
| GLM-5.2 | 79.60 | 27.32 | 28.2 | 79.57 | 24.69 | 19.5 |
| DeepSeek-V4-Pro | 79.11 | 41.63 | 22.0 | 78.71 | 15.94 | 24.0 |
| MiniMax-M3 | 78.28 | 27.83 | 21.1 | 76.30 | 26.80 | **11.9** |
| DeepSeek-V4-Flash | 77.47 | 37.22 | 20.5 | 77.54 | 16.96 | 22.7 |
| HY-3-preview | 76.44 | 24.13 | 20.2 | 76.07 | 22.89 | 18.4 |

**分数最挤**：cbc 上第一名到第十名只隔 5.9 分，印证“确定性规则为主”的判分口径留出的主观空间很小。

### 表 8 · Security（metric: Deterministic scoring）

| 模型 | cbc 分 | cbc 轮次 | cbc 输入K | cbc 输出K | 缓存K | 拒答 | cc 分 | cc 轮次 | cc 输出K | 拒答 |
|---|---|---|---|---|---|---|---|---|---|---|
| DeepSeek-V4-Pro | **70.04** | 70.1 | 3367.29 | 29.77 | 1334.53 | 0 | 58.73 | 56.1 | 36.20 | 0 |
| DeepSeek-V4-Flash | 67.11 | 69.7 | 3339.06 | 24.20 | 1336.73 | 0 | — | — | — | — |
| HY-3 | 64.50 | 54.5 | 3258.86 | 24.23 | 1595.96 | 0 | 65.59 | 44.1 | 25.11 | 0 |
| GPT-5.5 | 64.39 | 34.6 | 1518.18 | 7.54 | 626.62 | 2 | **77.91** | 29.8 | **7.50** | 0 |
| Claude Opus 4.8 | 64.37 | 32.4 | 1902.39 | 9.99 | 768.85 | 0 | 65.87 | 47.0 | 22.89 | **13** |
| HY-3-preview | 64.17 | 88.6 | 2945.44 | 24.18 | 1160.89 | 0 | 58.63 | 89.9 | 31.56 | 0 |
| Gemini-3.5-Flash | 59.37 | 38.9 | 2492.60 | 8.24 | 56.70 | 4 | 76.99 | 59.8 | 15.46 | 4 |
| Kimi K2.6 | 54.50 | **112.4** | **10030.76** | 20.77 | 4354.29 | 0 | 43.67 | 22.2 | 11.25 | 0 |

GLM-5.2 与 MiniMax-M3 的 Security 数据连同分数一起被官方暂扣（`data.js` 注释：待复核，2026-10-17），故效率表的模型名单与主页新总榜并不一致。

**两个极值**：GPT-5.5 用 **7.50K 输出**拿下 cc 下的 77.91——效率榜的最优点；Kimi K2.6 在 cbc 下 112.4 轮、输入 1,003 万 token 换来的却是全场最低的 54.50。**长 ≠ 好**。

---

## 7. 结论怎么用

1. **别跨子集比**：四个子集度量衡不同，官方明确不提供总分；同理，同一模型的 Code/Web/Office/Security 分不可加权平均。
2. **必须带 harness 读**：GLM-5.2 在 Web 上 67.43（cbc）vs 60.71（cc），Code 上 71.54（cbc）vs 77.06（cc）——两个赛道的方向还相反。官方 Key Takeaways 引用的 DeepSeek-V4-Flash Security 跨 harness 差距（65.65 vs 53.90）比本表 v29 数据的 cbc 值更大，说明该行数据仍在滚动更新，引用前重拉 `data.js`。
3. **先定自己的高频赛道**，再看该赛道里「单位 token 产出」最优的那一档，而不是排行榜最高位。
4. **选型要查拒答**：Security 上 Claude Opus 4.8（cc）13 次拒答、Gemini-3.5-Flash 两次 4 次。安全/红蓝类落地时，拒答率比分数更早撞墙。
5. **数据版本要盯住**：效率 roster 落后于总榜 roster；Security 有 2 个模型的数据处于暂扣状态。引用时务必带上 `data.js` 版本号（当前 `v29`）与时间戳。
6. **别把"禁联网"理解成断网容器**：它在 harness 工具层实现（关 WebSearch / AskUserQuestion），任务容器的 `network_mode` 仍是 `public`。真正兜底的是任务禁令 + 静态 fixtures + gold 比对 + `safety_partition` 那一组确定性 check。

---

## 8. 本地复现

仓库自带 `wbbench-run-setup` skill（`.agents/skills/`，`.claude/skills/` 软链），可由 Agent 端到端带跑。手动路径：

```bash
git clone --depth 1 https://github.com/Tencent/workbuddy-bench.git && cd workbuddy-bench
uv sync && cp .env.example .env
./scripts/dataset/fetch-dataset.sh code   # 或 web / office / sec / all（数据在 HF: tencent/workbuddy-bench）
cp configs/jobs/_template.job.yaml configs/jobs/<slug>.yaml   # 填 model / harness / dataset
uv run ./scripts/run.sh --job <slug> --dry-run
uv run ./scripts/run.sh --job <slug>
python -m workbuddy_bench.scorer.metrics results/<job>/<run> --json
```

归档体积（`datasets/README.md:7-12`），决定你能先拉哪个看：**Office ~10MB（实际 2.89MB）** / Web ~22MB / Code ~196MB / **Security ~479MB**。想快速看懂它的任务构造，Office 是性价比最高的入口。

若 HF 主站不可达，可 `WB_BENCH_HF_REPO` 或直接用镜像域名替换 `HF_ENDPOINT`（本文件的数据即经 `hf-mirror.com` 拉取，8 秒完成）。

固定运行不变量（`configs/bench/_default.yaml`）：`agent_user: dev` 非 root（`:18-23`）、`context_window: 200000` + `context_compact_pct: 92`（`:32-33`）、`llm_judge.enabled: false` 兜底（`:37-40`）、`n_concurrent_trials: 8`（`:9`）。

---

## 附：来源文件与入库边界

**随本仓库入库**（可离线复核表 5–8）：

| 路径（本仓库内） | 用途 |
|---|---|
| `sources/workbuddy-bench/data.js` | 官网榜单原始数据，`v29`；`subsets` 段含每模型 score / avgTurns / avgInputK / avgOutputK / cachedInputK / refusals |
| `sources/workbuddy-bench/roster.js` | 官网模型名册，`v15` |

**未入库，按第 8 节自行拉取**（上游源码与任务数据，体积大且可复现）：

| 路径（核验时的工作区） | 用途 |
|---|---|
| `wbb-repo/configs/bench/{_default,office,web,sec,code}*.yaml` | 每子集运行不变量、LLM judge 开关、判分入口 |
| `wbb-repo/src/workbuddy_bench/judge/core/scoring.py` | 共享打分策略（分母/min/gate/cap/致命） |
| `wbb-repo/src/workbuddy_bench/scorer/metrics.py` | job 级 reward/pass_rate 聚合与分母回填 |
| `wbb-repo/src/workbuddy_bench/judge/runners/rule/script_verifier_resilience.py` | 脚本 verifier 抗拉闸 + 分母锁死 |
| `wbb-repo/src/workbuddy_bench/judge/profiles/dispatcher.py` | `CompositeVerifier` 执行链 |
| `wbb-repo/configs/README.zh.md` | 四数据集判分入口官方表（`:155-162`） |
| `office-dataset/wb-bench-office-v1.0/` | Office 50 题解包目录（`dataset.toml` / `shared/verifier/` / `tasks/<id>/{instruction.md,task.toml,tests/{judge.yaml,verifier.toml,grading,gold}}`），第 3.1、3.2 节的统计来源 |
| `wb-bench-office-v1.0.tar.gz` | 上述数据包的原始归档（2.89MB） |

未按同样深度核验的：**Web（22MB）与 Security（479MB）的数据集未拉取**——Security 归档过大，本节关于 Security 的结论来自仓库 `configs/bench/wb-bench-sec-v1.0.yaml` 与 `configs/README.zh.md:162` 的官方描述，若要逐题核实需本地拉取 479MB 的任务包（含各自的目标二进制与服务环境）。

---

## 9. 参考来源

1. 官网榜单（"Key Takeaways" + "Token efficiency" 两节）：https://workbuddybench.com/
2. 榜单原始数据 `data.js`（`v29`，Leaderboard v1.2，generated / last_verified 2026-10-15；`subsets` 段含每模型 score / avgTurns / avgInputK / avgOutputK / cachedInputK / refusals）：https://workbuddybench.com/data.js 。仓库内副本见 `sources/workbuddy-bench/data.js` 与 `roster.js`，用于复核表 5–8。
3. 评测框架仓库（核验时浅克隆，HEAD = `625b223`，2026-08-20；按第 8 节命令可复现，未随本仓库入库）：https://github.com/Tencent/workbuddy-bench
4. 技术报告（**未取到**：>9MB 且该 host 速率约 17KB/s，两次下载均被截断）：https://workbuddybench.com/report/main.pdf
5. Office 任务数据 `wb-bench-office-v1.0.tar.gz`（2.89MB，经 hf-mirror 拉取后逐题解析）——第 3.1 节的全部数字由此得出，非二手引用；原始归档与解包目录按第 8 节自行拉取，未随本仓库入库。
6. 官网模型名册 `roster.js`（`v15`）：版本与入库边界见 `sources/workbuddy-bench/README.md`。
