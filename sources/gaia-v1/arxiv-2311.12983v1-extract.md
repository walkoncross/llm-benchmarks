# arXiv:2311.12983v1 原文摘录（GAIA, 2023）

- **来源**：https://arxiv.org/abs/2311.12983 · https://arxiv.org/html/2311.12983v1
- **版本**：arXiv v1，Submitted Tue, 21 Nov 2023 20:34:47 UTC；正式发表于 ICLR 2024（OpenReview `fibxvahvs3`）
- **抓取 / 核验日期**：2026-11-06
- **用途**：离线复核 `benchmarks/gaia-v1.md` 第 2、3、4.1、5 节的题量、split、Level 定义、评分方式、基线数字与局限性。
- **摘录方式**：`> ` 引用块为论文英文原文逐字摘录；「要点」为中文转述，不是原文。表号 / 节号按论文原标注。

## 1. 题量与 split（Abstract / §1 Introduction）

> Using GAIA's methodology, we devise 466 questions and their answer. We release our questions while retaining answers to 300 of them to power a leader-board hereby accessible.

> We release a developer set of 166 annotated questions and release the remaining 300 questions without annotations: the benchmark will be notably hosted as a leaderboard.

页首脚注：`Code: https://huggingface.co/gaia-benchmark`（官方代码入口是 Hugging Face 组织页，不是 GitHub 仓库）。

## 2. 三级难度（§3.3 Composition of GAIA / Increasing difficulty）

> The questions can be sorted into three levels of increasing difficulty depending on the number of steps required to solve the questions, and the number of different tools needed to answer the question.

> There is naturally not a single definition of step or tool...

> We loosely use the following definitions...

> Those definitions are not hard constraints...

> we rely as a proxy on the number of steps and tools used by our annotators when crafting the questions.

| Level | 原文定义（逐字） |
| --- | --- |
| 1 | `generally require no tools, or at most one tool but no more than 5 steps.` |
| 2 | `generally involve more steps, roughly between 5 and 10 and combining different tools is needed.` |
| 3 | `questions for a near perfect general assistant, requiring to take arbitrarily long sequences of actions, use any number of tools, and access to the world in general.` |

## 3. 评分（§3.2 Evaluation）

> each question calls for an answer that is either a string (one or a few words), a number, or a comma separated list of strings or floats, unless specified otherwise. There is only one correct answer.

> evaluation is done via quasi exact match between a model's answer and the ground truth (up to some normalization that is tied to the "type" of the ground truth).

> A system (or prefix) prompt is used to inform the model about the required format, see Figure 2.

> We provide our scoring function along with the leaderboard.

要点：评测是 `automated, fast, and factual`；没有 LLM 裁判、没有部分得分；论文未列出归一化的具体规则。

## 4. 基线（§1 / §4 / Appendix D Table 3 / Appendix D.1 Table 4）

> Even equipped with tools, GPT4 does not exceed a 30% success rate for the easiest of our tasks, and 0% for the hardest. In the meantime, the average success rate for human respondents is 92%.

Abstract 的 overall 口径：`human respondents obtain 92% vs. 15% for GPT-4 equipped with plugins.`

`Appendix D / Table 3: Statistics on the validation phase.`：`Human score (aggregated) 92%`；`Human score for Level 1 94%`；`Level 2 92%`；`Level 3 87%`。

`Appendix D.1 / Table 4: Score and average time to answer for various baselines on GAIA in %.`

| Method | L1 (%) | L2 (%) | L3 (%) | 平均用时 L1 / L2 / L3（分钟） |
| --- | ---: | ---: | ---: | --- |
| GPT4 | 9.1±2.5 | 2.6±0.6 | 0 | 0.19 / 0.15 / N.A. |
| GPT4 Turbo | 13.0±2.1 | 5.5±1.4 | 0 | 0.24 / 0.12 / N.A. |
| AutoGPT (GPT4 backend) | 14.4 | 0.4 | 0 | 7.6 / 11.7 / N.A. |
| GPT4 + plugins* | 30.3 | 9.7 | 0 | 0.65 / 0.53 / N.A. |
| Search engine | 7.4 | 0 | 0 | 7.4 / N.A. / N.A. |
| Human annotator** | 93.9 | 91.8 | 87.3 | 6.8 / 10.5 / 17.7 |

表头 `Number of questions`：`Level 1 146` / `Level 2 245` / `Level 3 75`（合计 466，是全量分布，不是 dev / test 各自的分布）。

表注逐字摘录：

> `*: GPT4 + plugins scores were obtained by manually selecting plugins, and cannot be reproduced exactly for the reasons described in the main text.`

> `**: Human score corresponds to the portion of correct answers by validation annotators for valid questions.`

> Whenever we have direct API access, we run the model three times and report the average.

Figure 4 说明逐字摘录：

> GPT4 + plugins score should be seen as an oracle since the plugins were chosen manually depending on the question. Human score refers to the score obtained by our annotators when validating the questions.

§4 逐字摘录：

> there is currently no API for GPT4 with plugins, and we resort to manual ChatGPT queries.

> a set of at most three third party plugins.

## 5. 设计原则（§1 Introduction bullet / §3.1 Design choices）

四条 bullet 标签：`Real-world and challenging questions.` / `Easy interpretability through conceptually simple tasks—non experts annotators exhibit a near perfect score—, associated reasoning trace, and few but highly curated questions.` / `Non-gameability.` / `Simplicity of use.`

§3.1 要点（转述）：真实世界且对 AI 有挑战、可解释、抗记忆 / 抗刷榜、易用；答案「factoid, concise and unambiguous」，零样本提问。

> we estimate the annotator's success rate to be 92% when aggregated on all levels of difficulty, and report this as the human score for GAIA.

## 6. 制题成本与局限性（§3.4 / §5 / §6 / Appendix B）

§3.4：`two hours of annotator time`（单题含验证与修复）；`68% of the questions were good as is, while the rest had to be corrected or removed.`

§6 `Missing evaluations.` 要点（转述）：不评估 leading to the answer 的推理轨迹；不同路径可通向同一答案，难以简单评分；当时 OpenAI API 不提供工具调用明细日志。

§6 `On the cost of designing unambiguous questions.` 要点（转述）：需两轮标注（设计者 + 两名补充标注者独立作答），`possible ambiguities remain`；为保证唯一正确答案，部分题目显得不自然。

§6 `Lack of linguistic and cultural diversity.`：

> all questions are asked in 'standard' English only

Appendix B Datacard / Language variety：

> they were all based in the US

§5 Discussion 要点（转述）：闭源 API 能力与插件生态随时间变化，时点评测未必可复现；静态基准可能因预训练数据污染或网页信息消失而退化。

> Static benchmarks are broken benchmarks in the making

## 7. 提交规则

论文**没有**给出正式的榜单提交规则（提交格式、次数限制、API / 工具限制等）。唯一相关的协议性表述：零样本提问、system / prefix prompt 指定答案格式、答案短且唯一、评分函数随榜单提供；300 题答案保密用于驱动榜单。
