# Buysing 跨境一站式AGI智能体 SAAS系统

## 项目简介

Buysing是一个基于多智能体（Multi-Agent）架构的跨境一站式AGI智能体SAAS系统，提供从选品、Listing优化、库存管理到采购计划的全链路智能运营解决方案。

## 功能特性

### 核心功能
- 🏠 **主页** - 品牌展示、功能介绍、客户案例、定价方案
- 📊 **工作台** - 订单汇总、产品SKU管理、实时数据监控
- 📦 **产品管理Agent** - 选品分析、视觉创作、Listing生成
- 📦 **库存管理Agent** - 库存监控、预警提醒、补货建议
- 📝 **Listing优化Agent** - 关键词管理、优化效果跟踪
- 🛒 **采购计划Agent** - 供应商管理、采购订单、预算跟踪

### 技术特点
- 🌐 响应式设计，支持多终端访问
- 💱 支持USD/CNY货币切换
- 🔄 实时数据刷新（每10秒自动更新）
- 🎨 现代化UI设计，科技蓝+霓虹紫配色
- ⚡ 纯前端实现，无需后端服务器

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/buysing-saas.git
cd buysing-saas

# 启动本地服务器
python -m http.server 8000

# 访问
# 打开浏览器访问 http://localhost:8000
```

### 使用Node.js启动

```bash
# 安装依赖（可选）
npm install

# 启动开发服务器
npm run dev
```

## 部署指南

### 方案一：Vercel部署（推荐用于测试）

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署到生产环境
vercel --prod
```

**优势：**
- ✅ 完全免费
- ✅ 自动HTTPS
- ✅ 全球CDN加速
- ✅ 自动部署和回滚

### 方案二：Netlify部署（推荐用于快速部署）

1. 访问 https://app.netlify.com
2. 注册/登录账号
3. 点击 "Add new site" → "Deploy manually"
4. 将 `homepage` 文件夹拖拽到上传区域
5. 等待部署完成

**优势：**
- ✅ 完全免费
- ✅ 拖拽部署
- ✅ 自动HTTPS
- ✅ 表单处理

### 方案三：云服务器部署（推荐用于生产）

#### 使用Nginx部署

```bash
# 1. 安装Nginx
sudo apt update
sudo apt install nginx

# 2. 配置Nginx
sudo nano /etc/nginx/sites-available/buysing

# 3. 添加配置
server {
    listen 80;
    server_name buysing.com www.buysing.com;
    
    root /var/www/buysing/homepage;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. 启用配置
sudo ln -s /etc/nginx/sites-available/buysing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. 配置SSL证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d buysing.com -d www.buysing.com
```

### 方案四：Docker容器化部署

```bash
# 1. 构建镜像
docker build -t buysing-saas .

# 2. 运行容器
docker run -d -p 80:80 --name buysing-saas buysing-saas

# 3. 使用Docker Compose
docker-compose up -d
```

## 项目结构

```
BuysingAgent/
├── homepage/                 # 前端页面
│   ├── index.html          # 主页
│   ├── saas-console.html  # 工作台
│   ├── product-agent.html  # 产品管理Agent
│   ├── inventory-agent.html  # 库存管理Agent
│   ├── listing-optimization.html  # Listing优化Agent
│   ├── procurement-agent.html  # 采购计划Agent
│   ├── styles.css         # 主页样式
│   ├── script.js          # 主页脚本
│   ├── saas-styles.css   # 工作台样式
│   ├── saas-script.js    # 工作台脚本
│   └── ...
├── core/                 # 核心架构（Python后端）
│   ├── agents/           # 智能体实现
│   ├── orchestrator/      # 任务编排
│   └── memory/          # 记忆层
├── package.json          # 项目配置
├── Dockerfile           # Docker配置
├── docker-compose.yml   # Docker Compose配置
└── README.md           # 项目文档
```

## 环境要求

- Python 3.7+ （用于本地开发服务器）
- Node.js 14+ （可选，用于某些部署工具）
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能优化

- 使用CDN加速静态资源
- 启用Gzip压缩
- 图片懒加载
- 代码分割和按需加载

## 安全建议

- 使用HTTPS加密传输
- 配置CORS策略
- 实施内容安全策略（CSP）
- 定期更新依赖包

## 监控和日志

- 配置错误追踪（如Sentry）
- 设置性能监控（如Google Analytics）
- 实施用户行为分析

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件

## 联系方式

- 官网：https://buysing.com
- 邮箱：contact@buysing.com
- 微信：BuysingOfficial

## 更新日志

### v1.0.0 (2024-01-19)
- ✨ 初始版本发布
- ✅ 实现主页和工作台
- ✅ 添加产品管理Agent
- ✅ 添加库存管理Agent
- ✅ 添加Listing优化Agent
- ✅ 添加采购计划Agent
- ✅ 实现订单汇总和SKU管理
- ✅ 支持USD/CNY货币切换
- ✅ 实现实时数据刷新

## 致谢

感谢所有为本项目做出贡献的开发者！

---

**Buysing 跨境一站式AGI智能体 - 让跨境电商更智能**
