# 项目结构概览

## 📁 完整目录结构

```
BuysingAgent/
├── __init__.py                          # 项目入口
├── README.md                             # 项目文档
├── requirements.txt                       # 依赖包列表
├── .env.example                         # 环境变量示例
├── .gitignore                           # Git忽略文件
├── test_system.py                       # 快速测试脚本
│
├── core/                                # 核心架构层
│   ├── __init__.py
│   ├── agents/                          # Agent基类
│   │   └── base_agent.py               # 基础Agent类定义
│   ├── orchestrator/                     # 大脑层
│   │   └── orchestrator.py             # 任务编排器
│   ├── memory/                          # 记忆层
│   │   └── memory_layer.py             # 记忆管理系统
│   └── tools/                          # 工具层
│       └── base_api_adapter.py          # API适配器基类
│
├── agents/                              # 功能模块Agent层
│   ├── __init__.py
│   ├── product/                         # 选品Agent
│   │   └── product_selection_agent.py
│   ├── marketing/                       # 营销Agent
│   │   └── marketing_agent.py
│   ├── logistics/                       # 物流Agent
│   │   └── logistics_agent.py
│   ├── customer/                        # 客服Agent
│   │   └── customer_service_agent.py
│   └── compliance/                      # 合规Agent
│       └── compliance_agent.py
│
├── api/                                 # API集成层
│   ├── __init__.py
│   ├── amazon/                          # 亚马逊API
│   │   └── amazon_adapter.py
│   ├── tiktok/                          # TikTok API
│   │   └── tiktok_adapter.py
│   ├── temu/                            # Temu API
│   ├── meta/                            # Meta API
│   │   └── meta_adapter.py
│   └── google/                          # Google API
│
├── data/                                # 数据存储层
│   ├── knowledge/                        # 知识库
│   └── vector/                          # 向量存储
│
├── utils/                               # 工具函数
│
├── config/                              # 配置文件
│   ├── __init__.py
│   └── config.py                       # 系统配置
│
├── tests/                               # 测试文件
│
└── examples/                            # 示例代码
    └── basic_example.py                 # 基础示例
```

## 🏗️ 架构层次说明

### 1. 核心架构层 (core/)

#### Agent基类 (core/agents/)
- **base_agent.py**: 定义所有Agent的基础接口和通用功能
  - 任务处理 (process)
  - 思考过程 (think)
  - 动作执行 (act)
  - 记忆存储与检索
  - Agent间协作

#### 大脑层 (core/orchestrator/)
- **orchestrator.py**: 系统的大脑，负责协调所有Agent
  - 解析高级指令
  - 任务拆解与分发
  - Agent选择与调度
  - 执行监控与历史记录

#### 记忆层 (core/memory/)
- **memory_layer.py**: 统一的记忆管理系统
  - 向量记忆 (VectorMemory): 语义搜索和相似度匹配
  - 知识图谱 (KnowledgeGraph): 实体和关系存储
  - 记忆层 (MemoryLayer): 统一的记忆管理接口

#### 工具层 (core/tools/)
- **base_api_adapter.py**: API适配器基类
  - 统一的API调用接口
  - 速率限制管理
  - 错误处理

### 2. 功能模块Agent层 (agents/)

#### 选品Agent (agents/product/)
- **product_selection_agent.py**: 智能选品与研发
  - 全网趋势分析
  - 竞品分析
  - AI测款
  - 选品推荐

#### 营销Agent (agents/marketing/)
- **marketing_agent.py**: 营销与内容
  - 内容生成（图片、视频、文案）
  - 广告活动创建
  - 广告优化
  - 多语言翻译
  - SEO优化

#### 物流Agent (agents/logistics/)
- **logistics_agent.py**: 物流与供应链
  - 库存检查
  - 补货管理
  - 物流跟踪
  - 需求预测
  - 供应商管理

#### 客服Agent (agents/customer/)
- **customer_service_agent.py**: 客户服务
  - 消息回复
  - 图片分析
  - 问题解决
  - 退款处理
  - 情感分析

#### 合规Agent (agents/compliance/)
- **compliance_agent.py**: 合规与风险
  - 政策检查
  - 风险评估
  - 内容审查
  - 法规监控
  - 合规报告

### 3. API集成层 (api/)

#### 平台API适配器
- **amazon_adapter.py**: 亚马逊平台API
- **tiktok_adapter.py**: TikTok平台API
- **meta_adapter.py**: Meta (Facebook/Instagram) API
- **google_adapter.py**: Google Ads API
- **temu_adapter.py**: Temu平台API

### 4. 数据存储层 (data/)

- **knowledge/**: 知识库存储
- **vector/**: 向量数据库存储

### 5. 配置层 (config/)

- **config.py**: 系统配置
  - API密钥配置
  - 记忆层配置
  - Agent配置
  - 市场配置
  - 合规配置
  - 营销配置
  - 物流配置
  - 客服配置

## 🔄 数据流

```
用户指令
    ↓
Orchestrator (大脑层)
    ↓
任务拆解
    ↓
Agent分配
    ↓
Agent执行
    ├─→ 记忆层 (存储/检索)
    ├─→ API层 (调用外部服务)
    └─→ 其他Agent (协作)
    ↓
结果返回
    ↓
Orchestrator汇总
    ↓
用户反馈
```

## 🎯 核心特性

1. **多Agent协同**: 多个专业Agent协同工作，各司其职
2. **智能编排**: Orchestrator自动拆解任务并分配给最合适的Agent
3. **记忆系统**: 统一的记忆管理，支持向量搜索和知识图谱
4. **API集成**: 深度集成各大平台API
5. **可扩展性**: 模块化设计，易于添加新Agent和功能
6. **异步处理**: 基于asyncio的异步架构，高并发性能

## 🚀 快速开始

1. 安装依赖
```bash
pip install -r requirements.txt
```

2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入你的API密钥
```

3. 运行测试
```bash
python test_system.py
```

4. 运行示例
```bash
python examples/basic_example.py
```

## 📝 开发指南

### 添加新Agent

1. 在 `agents/` 下创建新目录
2. 继承 `BaseAgent` 类
3. 实现 `process()` 和 `think()` 方法
4. 在 `__init__.py` 中导出

### 添加新API适配器

1. 在 `api/` 下创建新目录
2. 继承 `BaseAPIAdapter` 类
3. 实现必要的API方法
4. 在 `__init__.py` 中导出

### 扩展记忆功能

1. 在 `core/memory/memory_layer.py` 中添加新功能
2. 支持新的记忆类型或存储方式
3. 更新配置文件

## 🔧 配置说明

所有配置都在 `config/config.py` 中：

- **API配置**: 各平台API密钥和端点
- **记忆配置**: 向量维度、最大记忆数等
- **Agent配置**: 并发任务数、超时时间等
- **市场配置**: 支持的市场、货币、语言等
- **业务配置**: 营销预算、物流阈值、客服配置等

## 📊 监控与日志

系统提供完整的监控和日志功能：

- Agent性能指标
- 任务执行历史
- 系统状态统计
- 记忆层统计信息

## 🤝 协作模式

Agent之间可以通过以下方式协作：

1. **直接协作**: 通过 `collaborate()` 方法直接调用其他Agent
2. **记忆共享**: 通过记忆层共享信息
3. **Orchestrator协调**: 通过Orchestrator进行任务协调

## 🎓 学习资源

- [Agent基类](file:///c:/Users/Administrator/Documents/trae_projects/BuysingAgent/core/agents/base_agent.py)
- [Orchestrator](file:///c:/Users/Administrator/Documents/trae_projects/BuysingAgent/core/orchestrator/orchestrator.py)
- [记忆层](file:///c:/Users/Administrator/Documents/trae_projects/BuysingAgent/core/memory/memory_layer.py)
- [示例代码](file:///c:/Users/Administrator/Documents/trae_projects/BuysingAgent/examples/basic_example.py)