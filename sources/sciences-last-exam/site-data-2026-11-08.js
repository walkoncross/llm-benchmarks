// Site content that changes over time. Edit this file; the page renders from it.

window.SLE = {
  // Links shown as buttons. Leave a value null and its button shows "Soon".
  links: {
    paper: null,      // e.g. "https://arxiv.org/abs/XXXX.XXXXX"
    github: "https://github.com/Gen-Verse/Science-Last-Exam",
    dataset: "https://huggingface.co/datasets/Gen-Verse/Science-Last-Exam",
    blog: null
  },

  // Institutions on the community orbit. ring: 1 = inner, 3 = outer.
  // To hold an institution back until it is confirmed, set pending: true.
  institutions: [
    { short: "ORNL", name: "Oak Ridge National Laboratory", group: "Institutes", ring: 1, logo: "assets/img/institutions/ornl.svg" },
    { short: "NIH", name: "National Institutes of Health", group: "Institutes", ring: 1, logo: "assets/img/institutions/nih.svg" },
    { short: "Dana-Farber", name: "Dana-Farber Cancer Institute", group: "Institutes", ring: 1, logo: "assets/img/institutions/dana-farber.svg" },
    { short: "Oxford", name: "University of Oxford", group: "International", ring: 1, logo: "assets/img/institutions/oxford.svg" },
    { short: "NUS", name: "National University of Singapore", group: "International", ring: 1, logo: "assets/img/institutions/nus.svg" },
    { short: "CentraleSupélec", name: "CentraleSupélec, Université Paris-Saclay", group: "International", ring: 1, logo: "assets/img/institutions/centralesup-lec.png" },
    { short: "UNIFESP", name: "Universidade Federal de São Paulo", group: "International", ring: 1, logo: "assets/img/institutions/unifesp.png" },

    { short: "Harvard", name: "Harvard University", group: "Universities", ring: 2, logo: "assets/img/institutions/harvard.svg" },
    { short: "MIT", name: "Massachusetts Institute of Technology", group: "Universities", ring: 2, logo: "assets/img/institutions/mit.svg" },
    { short: "Stanford", name: "Stanford University", group: "Universities", ring: 2, logo: "assets/img/institutions/stanford.svg" },
    { short: "Princeton", name: "Princeton University", group: "Universities", ring: 2, logo: "assets/img/institutions/princeton.svg" },
    { short: "Yale", name: "Yale University", group: "Universities", ring: 2, logo: "assets/img/institutions/yale.svg" },
    { short: "Columbia", name: "Columbia University", group: "Universities", ring: 2, logo: "assets/img/institutions/columbia.svg" },
    { short: "Cornell", name: "Cornell University", group: "Universities", ring: 2, logo: "assets/img/institutions/cornell.svg" },
    { short: "UChicago", name: "University of Chicago", group: "Universities", ring: 2, logo: "assets/img/institutions/uchicago.svg" },
    { short: "Johns Hopkins", name: "Johns Hopkins University", group: "Universities", ring: 2, logo: "assets/img/institutions/johns-hopkins.svg" },
    { short: "Duke", name: "Duke University", group: "Universities", ring: 2, logo: "assets/img/institutions/duke.svg" },
    { short: "Northwestern", name: "Northwestern University", group: "Universities", ring: 2, logo: "assets/img/institutions/northwestern.svg" },

    { short: "Michigan", name: "University of Michigan, Ann Arbor", group: "Universities", ring: 3, logo: "assets/img/institutions/michigan.png" },
    { short: "UIUC", name: "University of Illinois Urbana-Champaign", group: "Universities", ring: 3, logo: "assets/img/institutions/uiuc.png" },
    { short: "CMU", name: "Carnegie Mellon University", group: "Universities", ring: 3, logo: "assets/img/institutions/cmu.svg" },
    { short: "UT Austin", name: "University of Texas at Austin", group: "Universities", ring: 3, logo: "assets/img/institutions/ut-austin.png" },
    { short: "USC", name: "University of Southern California", group: "Universities", ring: 3, logo: "assets/img/institutions/usc.svg" },
    { short: "UCLA", name: "University of California, Los Angeles", group: "Universities", ring: 3, logo: "assets/img/institutions/ucla.svg" },
    { short: "Emory", name: "Emory University", group: "Universities", ring: 3, logo: "assets/img/institutions/emory.png" },
    { short: "UW–Madison", name: "University of Wisconsin–Madison", group: "Universities", ring: 3, logo: "assets/img/institutions/uw-madison.svg" },
    { short: "CU Boulder", name: "University of Colorado Boulder", group: "Universities", ring: 3, logo: "assets/img/institutions/cu-boulder.png" },
    { short: "Stony Brook", name: "Stony Brook University", group: "Universities", ring: 3, logo: "assets/img/institutions/stony-brook.png" },
    { short: "Georgetown", name: "Georgetown University", group: "Universities", ring: 3, logo: "assets/img/institutions/georgetown.png" },
    { short: "Virginia Tech", name: "Virginia Polytechnic Institute and State University", group: "Universities", ring: 3, logo: "assets/img/institutions/virginia-tech.svg" },
    { short: "Rochester", name: "University of Rochester", group: "Universities", ring: 3, logo: "assets/img/institutions/rochester.png" },
    { short: "Northeastern", name: "Northeastern University", group: "Universities", ring: 3, logo: "assets/img/institutions/northeastern.png" },
    { short: "Stevens", name: "Stevens Institute of Technology", group: "Universities", ring: 3, logo: "assets/img/institutions/stevens.svg" },
    { short: "UC Berkeley", name: "University of California, Berkeley", group: "Universities", ring: 2, logo: "assets/img/institutions/uc-berkeley.svg" }
  ],

  // All equally weights six assessments, including zero End-to-end research scores.
  leaderboard: {
    "updated": "2026-11-08",
    "models": [
      {
        "id": "gpt",
        "name": "GPT-6.1 Sol",
        "harness": "Codex",
        "setting": "medium",
        "short": "GPT-6.1 Sol",
        "abbr": "GPT",
        "color": "var(--ink)",
        "icon": "assets/img/models/openai.svg",
        "lines": [
          "GPT-6.1 Sol"
        ]
      },
      {
        "id": "claude",
        "name": "Claude Opus 5",
        "harness": "Claude Code",
        "setting": "high",
        "short": "Claude Opus 5",
        "abbr": "Claude",
        "color": "#cd8065",
        "icon": "assets/img/models/claude-color.svg",
        "lines": [
          "Claude Opus 5"
        ]
      },
      {
        "id": "gemini",
        "name": "Gemini 4 Argon",
        "harness": "Codex",
        "setting": "default",
        "short": "Gemini 4 Argon",
        "abbr": "Gemini",
        "color": "#4285f4",
        "icon": "assets/img/models/gemini-color.svg",
        "lines": [
          "Gemini",
          "4 Argon"
        ]
      },
      {
        "id": "deepseek",
        "name": "DeepSeek V4.1 Flash",
        "harness": "Claude Code",
        "setting": "high",
        "short": "DeepSeek V4.1",
        "abbr": "DeepSeek",
        "color": "#4259dc",
        "icon": "assets/img/models/deepseek-color.svg",
        "lines": [
          "DeepSeek",
          "V4.1 Flash"
        ]
      },
      {
        "id": "qwen",
        "name": "Qwen3.8 Max",
        "harness": "Claude Code",
        "setting": "",
        "short": "Qwen3.8 Max",
        "abbr": "Qwen",
        "color": "#8962cb",
        "icon": "assets/img/models/qwen-color.svg",
        "lines": [
          "Qwen3.8 Max"
        ]
      },
      {
        "id": "glm",
        "name": "GLM-5.3 Flash",
        "harness": "Claude Code",
        "setting": "high",
        "short": "GLM-5.3 Flash",
        "abbr": "GLM",
        "color": "#169eac",
        "icon": "assets/img/models/zhipu-color.svg",
        "lines": [
          "GLM-5.3 Flash"
        ]
      },
      {
        "id": "kimi",
        "name": "Kimi K3.1 Pro",
        "harness": "Claude Code",
        "setting": "",
        "short": "Kimi K3.1 Pro",
        "abbr": "Kimi",
        "color": "#2b83db",
        "icon": "assets/img/models/kimi-color.svg",
        "lines": [
          "Kimi K3.1 Pro"
        ]
      },
      {
        "id": "minimax",
        "name": "MiniMax-M3",
        "harness": "Claude Code",
        "setting": "high",
        "short": "MiniMax-M3",
        "abbr": "MiniMax",
        "color": "#df5e83",
        "icon": "assets/img/models/minimax-color.svg",
        "lines": [
          "MiniMax-M3"
        ]
      },
      {
        "id": "mimo",
        "name": "MiMo-V2.6-Pro",
        "harness": "Claude Code",
        "setting": "",
        "short": "MiMo-V2.6-Pro",
        "abbr": "MiMo",
        "color": "#d99b32",
        "icon": "assets/img/models/xiaomimimo.svg",
        "lines": [
          "MiMo-V2.6-Pro"
        ]
      }
    ],
    "capabilities": [
      {
        "id": "all",
        "name": "All",
        "metric": "Composite score",
        "unit": "0–100",
        "summary": "Six-assessment composite"
      },
      {
        "id": "hd",
        "name": "Hypothesis Discovery",
        "metric": "Inspire rate",
        "unit": "%",
        "harness": "DiscoveryRSI"
      },
      {
        "id": "pp",
        "name": "Protocol Planning",
        "metric": "Mean score",
        "unit": "0–100"
      },
      {
        "id": "sc",
        "name": "Scientific Computing",
        "metric": "Pass rate",
        "unit": "%"
      },
      {
        "id": "so",
        "name": "Scientific Software Operation",
        "metric": "Pass rate",
        "unit": "%"
      },
      {
        "id": "eo",
        "name": "Experiment Observation",
        "metric": "Pass rate",
        "unit": "%"
      },
      {
        "id": "e2e",
        "name": "End-to-end research (To be expanded)",
        "metric": "Score",
        "unit": "0–100",
        "summary": "To be expanded"
      }
    ],
    "capabilityExtras": [
      {
        "id": "wl",
        "name": "Wet-lab Execution (In construction)",
        "metric": "Not scored in v1",
        "summary": "In construction",
        "disabled": true
      }
    ],
    "results": {
      "pp": {
        "gpt": {
          "score": 51.0,
          "cost": 0.039,
          "time": 59.0,
          "scoreLabel": "51",
          "costLabel": "$0.039",
          "timeLabel": "59"
        },
        "claude": {
          "score": 55.0,
          "cost": 0.22,
          "time": 53.0,
          "scoreLabel": "55",
          "costLabel": "$0.22",
          "timeLabel": "53"
        },
        "gemini": {
          "score": 46.1,
          "cost": 0.1598,
          "time": 278.3,
          "scoreLabel": "46.10",
          "costLabel": "$0.16",
          "timeLabel": "278"
        },
        "deepseek": {
          "score": 55.0,
          "cost": 0.04,
          "time": 157.0,
          "scoreLabel": "55",
          "costLabel": "$0.040",
          "timeLabel": "157"
        },
        "qwen": {
          "score": 52.0,
          "cost": 0.1,
          "time": 298.0,
          "scoreLabel": "52",
          "costLabel": "$0.10",
          "timeLabel": "298"
        },
        "glm": {
          "score": 58.0,
          "cost": 0.015,
          "time": 246.0,
          "scoreLabel": "58",
          "costLabel": "$0.015",
          "timeLabel": "246"
        },
        "kimi": {
          "score": 58.0,
          "cost": 0.074,
          "time": 160.0,
          "scoreLabel": "58",
          "costLabel": "$0.074",
          "timeLabel": "160"
        },
        "minimax": {
          "score": 43.0,
          "cost": 0.061,
          "time": 488.0,
          "scoreLabel": "43",
          "costLabel": "$0.061",
          "timeLabel": "488"
        },
        "mimo": {
          "score": 49.0,
          "cost": 0.025,
          "time": 424.0,
          "scoreLabel": "49",
          "costLabel": "$0.025",
          "timeLabel": "424"
        }
      },
      "eo": {
        "gpt": {
          "score": 40.0,
          "cost": 0.12,
          "time": 421.0,
          "scoreLabel": "40.00",
          "costLabel": "$0.12",
          "timeLabel": "421"
        },
        "claude": {
          "score": 26.67,
          "cost": 0.85,
          "time": 419.0,
          "scoreLabel": "26.67",
          "costLabel": "$0.85",
          "timeLabel": "419"
        },
        "gemini": {
          "score": 50.0,
          "cost": 0.2805,
          "time": 716.5,
          "scoreLabel": "50.00",
          "costLabel": "$0.28",
          "timeLabel": "717"
        },
        "deepseek": {
          "score": 16.67,
          "cost": 0.078,
          "time": 786.0,
          "scoreLabel": "16.67",
          "costLabel": "$0.078",
          "timeLabel": "786"
        },
        "qwen": {
          "score": 13.33,
          "cost": 0.45,
          "time": 851.0,
          "scoreLabel": "13.33",
          "costLabel": "$0.45",
          "timeLabel": "851"
        },
        "glm": {
          "score": 6.67,
          "cost": 0.18,
          "time": 710.0,
          "scoreLabel": "6.67",
          "costLabel": "$0.18",
          "timeLabel": "710"
        },
        "kimi": {
          "score": 23.33,
          "cost": 0.37,
          "time": 689.0,
          "scoreLabel": "23.33",
          "costLabel": "$0.37",
          "timeLabel": "689"
        },
        "minimax": {
          "score": 3.33,
          "cost": 0.18,
          "time": 694.0,
          "scoreLabel": "3.33",
          "costLabel": "$0.18",
          "timeLabel": "694"
        },
        "mimo": {
          "score": 10.0,
          "cost": 0.053,
          "time": 776.0,
          "scoreLabel": "10.00",
          "costLabel": "$0.053",
          "timeLabel": "776"
        }
      },
      "sc": {
        "gpt": {
          "score": 57.0,
          "cost": 0.39,
          "time": 422.0,
          "scoreLabel": "57",
          "costLabel": "$0.39",
          "timeLabel": "422"
        },
        "claude": {
          "score": 57.0,
          "cost": 7.97,
          "time": 1470.0,
          "scoreLabel": "57",
          "costLabel": "$7.97",
          "timeLabel": "1,470"
        },
        "gemini": {
          "score": 39.13,
          "cost": 2.6217,
          "time": 2123.3,
          "scoreLabel": "39.13",
          "costLabel": "$2.62",
          "timeLabel": "2,123"
        },
        "deepseek": {
          "score": 39.0,
          "cost": 0.48,
          "time": 2226.0,
          "scoreLabel": "39",
          "costLabel": "$0.48",
          "timeLabel": "2,226"
        },
        "qwen": {
          "score": 8.7,
          "cost": 2.24,
          "time": 3246.0,
          "scoreLabel": "8.7",
          "costLabel": "$2.24",
          "timeLabel": "3,246"
        },
        "glm": {
          "score": 8.7,
          "cost": 0.34,
          "time": 2092.0,
          "scoreLabel": "8.7",
          "costLabel": "$0.34",
          "timeLabel": "2,092"
        },
        "kimi": {
          "score": 26.0,
          "cost": 2.44,
          "time": 1700.0,
          "scoreLabel": "26",
          "costLabel": "$2.44",
          "timeLabel": "1,700"
        },
        "minimax": {
          "score": 22.0,
          "cost": 2.47,
          "time": 2765.0,
          "scoreLabel": "22",
          "costLabel": "$2.47",
          "timeLabel": "2,765"
        },
        "mimo": {
          "score": 30.0,
          "cost": 0.24,
          "time": 3233.0,
          "scoreLabel": "30",
          "costLabel": "$0.24",
          "timeLabel": "3,233"
        }
      },
      "so": {
        "gpt": {
          "score": 64.0,
          "cost": 10.87,
          "time": 1864.0,
          "scoreLabel": "64",
          "costLabel": "$10.87",
          "timeLabel": "1,864"
        },
        "claude": {
          "score": 79.0,
          "cost": 69.77,
          "time": 2263.0,
          "scoreLabel": "79",
          "costLabel": "$69.77",
          "timeLabel": "2,263"
        },
        "gemini": {
          "score": 57.14,
          "cost": 13.9869,
          "time": 4213.4,
          "scoreLabel": "57.14",
          "costLabel": "$13.99",
          "timeLabel": "4,213"
        },
        "deepseek": {
          "score": 29.0,
          "cost": 1.09,
          "time": 1894.0,
          "scoreLabel": "29",
          "costLabel": "$1.09",
          "timeLabel": "1,894"
        },
        "qwen": {
          "score": 50.0,
          "cost": 22.94,
          "time": 4150.0,
          "scoreLabel": "50",
          "costLabel": "$22.94",
          "timeLabel": "4,150"
        },
        "glm": {
          "score": 43.0,
          "cost": 1.0,
          "time": 3855.0,
          "scoreLabel": "43",
          "costLabel": "$1.00",
          "timeLabel": "3,855"
        },
        "kimi": {
          "score": 57.0,
          "cost": 8.69,
          "time": 2542.0,
          "scoreLabel": "57",
          "costLabel": "$8.69",
          "timeLabel": "2,542"
        },
        "minimax": {
          "score": 29.0,
          "cost": 1.87,
          "time": 2962.0,
          "scoreLabel": "29",
          "costLabel": "$1.87",
          "timeLabel": "2,962"
        },
        "mimo": {
          "score": 57.0,
          "cost": 1.91,
          "time": 4931.0,
          "scoreLabel": "57",
          "costLabel": "$1.91",
          "timeLabel": "4,931"
        }
      },
      "hd": {
        "gpt": {
          "score": 4.92,
          "cost": null,
          "time": null,
          "scoreLabel": "4.92",
          "positives": 6,
          "versions": 122
        },
        "claude": {
          "score": 7.33,
          "cost": null,
          "time": null,
          "scoreLabel": "7.33",
          "positives": 25,
          "versions": 341
        },
        "gemini": {
          "score": null,
          "cost": null,
          "time": null,
          "scoreLabel": "—",
          "positives": null,
          "versions": null
        },
        "deepseek": {
          "score": 21.28,
          "cost": null,
          "time": null,
          "scoreLabel": "21.28",
          "positives": 116,
          "versions": 545
        },
        "qwen": {
          "score": 15.75,
          "cost": null,
          "time": null,
          "scoreLabel": "15.75",
          "positives": 23,
          "versions": 146
        },
        "glm": {
          "score": 11.63,
          "cost": null,
          "time": null,
          "scoreLabel": "11.63",
          "positives": 5,
          "versions": 43
        },
        "kimi": {
          "score": 9.21,
          "cost": null,
          "time": null,
          "scoreLabel": "9.21",
          "positives": 7,
          "versions": 76
        },
        "minimax": {
          "score": 3.61,
          "cost": null,
          "time": null,
          "scoreLabel": "3.61",
          "positives": 3,
          "versions": 83
        },
        "mimo": {
          "score": 12.41,
          "cost": null,
          "time": null,
          "scoreLabel": "12.41",
          "positives": 17,
          "versions": 137
        }
      },
      "all": {
        "gpt": {
          "score": 36.15333333333333,
          "cost": 2.85475,
          "time": 691.5,
          "scoreLabel": "36.15",
          "costLabel": "$2.85",
          "timeLabel": "692"
        },
        "claude": {
          "score": 37.50000000000001,
          "cost": 19.7025,
          "time": 1051.25,
          "scoreLabel": "37.50",
          "costLabel": "$19.70",
          "timeLabel": "1,051"
        },
        "gemini": {
          "score": null,
          "cost": 4.262225,
          "time": 1832.875,
          "scoreLabel": "—",
          "costLabel": "$4.26",
          "timeLabel": "1,833"
        },
        "deepseek": {
          "score": 26.825000000000003,
          "cost": 0.422,
          "time": 1265.75,
          "scoreLabel": "26.83",
          "costLabel": "$0.42",
          "timeLabel": "1,266"
        },
        "qwen": {
          "score": 23.296666666666667,
          "cost": 6.4325,
          "time": 2136.25,
          "scoreLabel": "23.30",
          "costLabel": "$6.43",
          "timeLabel": "2,136"
        },
        "glm": {
          "score": 21.333333333333332,
          "cost": 0.38375,
          "time": 1725.75,
          "scoreLabel": "21.33",
          "costLabel": "$0.38",
          "timeLabel": "1,726"
        },
        "kimi": {
          "score": 28.923333333333332,
          "cost": 2.8935,
          "time": 1272.75,
          "scoreLabel": "28.92",
          "costLabel": "$2.89",
          "timeLabel": "1,273"
        },
        "minimax": {
          "score": 16.823333333333334,
          "cost": 1.14525,
          "time": 1727.25,
          "scoreLabel": "16.82",
          "costLabel": "$1.15",
          "timeLabel": "1,727"
        },
        "mimo": {
          "score": 26.401666666666667,
          "cost": 0.557,
          "time": 2341.0,
          "scoreLabel": "26.40",
          "costLabel": "$0.56",
          "timeLabel": "2,341"
        }
      },
      "e2e": {
        "gpt": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "claude": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "gemini": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "deepseek": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "qwen": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "glm": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "kimi": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "minimax": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        },
        "mimo": {
          "score": 0,
          "cost": null,
          "time": null,
          "scoreLabel": "0.00",
          "costLabel": "—",
          "timeLabel": "—"
        }
      }
    },
    "aggregation": {
      "members": [
        "pp",
        "eo",
        "sc",
        "so",
        "hd",
        "e2e"
      ],
      "weights": [
        0.16666666666666666,
        0.16666666666666666,
        0.16666666666666666,
        0.16666666666666666,
        0.16666666666666666,
        0.16666666666666666
      ],
      "score": "Equal-weight mean of six assessments on the 0–100 scale: Hypothesis Discovery, Protocol Planning, Scientific Computing, Scientific Software Operation, Experiment Observation and End-to-end research. End-to-end research scores 0 for all listed models; Wet-lab Execution is not included.",
      "cost_time": "Equal-weight mean of the per-task means for Protocol Planning, Scientific Computing, Scientific Software Operation and Experiment Observation. Hypothesis Discovery and End-to-end research report neither. Not a task-count-weighted pooled mean.",
      "precision": "Protocol Planning, Scientific Computing, Scientific Software Operation and Experiment Observation values are calculated from the rounded source chart values; Hypothesis Discovery values are reported to two decimals.",
      "missing": "The score remains null unless all six assessment scores are available; cost and time remain null unless all four reported values are available."
    },
    "sourceFiles": [
      {
        "file": "protocol-planning/intelligence.html",
        "sha256": "649dd62cdd16556ded40e6ec2549b78537d8c9a7f679555c2191ecb665314a7c",
        "measurements": 9
      },
      {
        "file": "protocol-planning/cost.html",
        "sha256": "daac35b06007a0a69066befa195314ed1ddf49fea1d6e5caab9e7784b3b639f5",
        "measurements": 8
      },
      {
        "file": "protocol-planning/speed.html",
        "sha256": "31b8db0c73ff0246ebb79aa26e08682ccca7052411a7d0852e2cbb18894f3c2a",
        "measurements": 9
      },
      {
        "file": "experiment-observation/results-20261104.json",
        "sha256": "e7d61ef3763958f00c4eb27824ea8d6b2cc248d618dbeb6eaaafecdae5bad120",
        "measurements": 8
      },
      {
        "file": "scientific-computing/intelligence.html",
        "sha256": "b1c62cf15ea9f38f53706289b0d88035ff74bf7b1e1545ea6d9d211a1995c5e6",
        "measurements": 8
      },
      {
        "file": "scientific-computing/cost.html",
        "sha256": "8b7c93b361a42167ca0b37b8ba5dd0f33388c98c79038d4174138e80da46be7d",
        "measurements": 8
      },
      {
        "file": "scientific-computing/speed.html",
        "sha256": "9719990b558b579dcf8f88337af105cc7c9c613fc5e37f76aeb39ccec67304a3",
        "measurements": 9
      },
      {
        "file": "scientific-software-operation/intelligence.html",
        "sha256": "cc7c133f3744f312648e16bc0fd6fad362120e652acb93fc27f4f75e929a22c0",
        "measurements": 8
      },
      {
        "file": "scientific-software-operation/cost.html",
        "sha256": "81f891d19e5daab5e2e34a4e52c5307028e334e2267f65fa94d7aa15912adf39",
        "measurements": 8
      },
      {
        "file": "scientific-software-operation/speed.html",
        "sha256": "341ce82842944f2ad1df357afb1cba786f6622fbd207615c628a5d60a2ef94a3",
        "measurements": 9
      },
      {
        "file": "hypothesis-discovery/discovery-results.md",
        "sha256": "ddb090654ca945b23b519dbd576756ab7d9fbda834a6910b9ed24f7706316dd9",
        "measurements": 8
      }
    ]
  }
};
