# Buysing SAAS系统部署指南

## 📋 目录

1. [快速开始](#快速开始)
2. [部署方案对比](#部署方案对比)
3. [方案一：Vercel部署](#方案一vercel部署)
4. [方案二：Netlify部署](#方案二netlify部署)
5. [方案三：云服务器部署](#方案三云服务器部署)
6. [方案四：Docker部署](#方案四docker部署)
7. [域名和SSL配置](#域名和ssl配置)
8. [监控和优化](#监控和优化)
9. [常见问题](#常见问题)

---

## 🚀 快速开始

### 前置要求

- ✅ 已有域名（buysing.com）
- ✅ Git账号（GitHub/GitLab/Bitbucket）
- ✅ 现代浏览器

### 推荐部署方案

| 场景 | 推荐方案 | 成本 | 难度 | 时间 |
|------|---------|------|------|------|
| 快速测试 | Vercel/Netlify | 免费 | 简单 | 5分钟 |
| 小型生产 | 云服务器（1核2G） | ¥50-100/月 | 中等 | 30分钟 |
| 中型生产 | 云服务器（2核4G） | ¥100-200/月 | 中等 | 30分钟 |
| 企业级 | Docker + K8s | 按需 | 复杂 | 1小时+ |

---

## 📊 部署方案对比

### Vercel vs Netlify vs 云服务器

| 特性 | Vercel | Netlify | 云服务器 |
|------|---------|---------|---------|
| **成本** | 免费 | 免费 | ¥50-500/月 |
| **部署时间** | 1-2分钟 | 2-3分钟 | 30分钟+ |
| **HTTPS** | 自动 | 自动 | 手动配置 |
| **CDN** | 全球 | 全球 | 需配置 |
| **自定义域名** | 支持 | 支持 | 支持 |
| **后端支持** | Serverless | Serverless | 完全控制 |
| **数据库** | 需第三方 | 需第三方 | 自建/云数据库 |
| **扩展性** | 自动 | 自动 | 手动 |
| **控制权** | 中等 | 中等 | 完全 |
| **适用场景** | 测试/小型 | 测试/小型 | 生产/企业 |

---

## 方案一：Vercel部署

### 优势
- ✅ 完全免费（Hobby计划）
- ✅ 自动HTTPS和CDN
- ✅ 全球边缘网络
- ✅ 自动部署和回滚
- ✅ 预览环境
- ✅ 支持自定义域名

### 步骤详解

#### 1. 安装Vercel CLI

```bash
# 使用npm安装
npm install -g vercel

# 或使用yarn
yarn global add vercel

# 或使用pnpm
pnpm add -g vercel
```

#### 2. 登录Vercel

```bash
vercel login
```

按照提示选择：
- 登录方式：GitHub/GitLab/Bitbucket/Email
- 授权Vercel访问您的代码仓库

#### 3. 初始化项目

```bash
cd c:\Users\Administrator\Documents\trae_projects\BuysingAgent
vercel
```

按照提示配置：
- 设置项目名称：buysing-saas
- 选择框架：Other
- 构建命令：留空
- 输出目录：homepage
- 是否覆盖：Yes

#### 4. 部署到生产环境

```bash
vercel --prod
```

#### 5. 配置自定义域名

1. 访问 https://vercel.com/dashboard
2. 选择您的项目
3. 点击 "Settings" → "Domains"
4. 添加域名：buysing.com
5. 按照提示配置DNS记录

#### 6. DNS配置

在域名注册商处添加以下记录：

```
类型: CNAME
名称: @
值: cname.vercel-dns.com
TTL: 3600

类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 3600
```

### Vercel配置文件

项目根目录的 `vercel.json` 已配置好，包含：
- 路由配置
- 安全头设置
- 静态资源缓存

### 环境变量（可选）

```bash
vercel env add NODE_ENV production
vercel env add API_URL https://api.buysing.com
```

---

## 方案二：Netlify部署

### 优势
- ✅ 完全免费
- ✅ 拖拽部署
- ✅ 自动HTTPS
- ✅ 表单处理
- ✅ 无服务器函数
- ✅ 分支部署

### 步骤详解

#### 方法一：拖拽部署（最简单）

1. 访问 https://app.netlify.com
2. 注册/登录账号
3. 点击 "Add new site" → "Deploy manually"
4. 将 `homepage` 文件夹拖拽到上传区域
5. 等待部署完成（1-2分钟）
6. 获得随机域名：https://random-name.netlify.app

#### 方法二：Git集成部署

1. 将代码推送到GitHub/GitLab/Bitbucket
2. 访问 https://app.netlify.com
3. 点击 "Add new site" → "Import an existing project"
4. 选择代码仓库
5. 配置构建设置：
   - Build command: 留空
   - Publish directory: homepage
6. 点击 "Deploy site"

#### 配置自定义域名

1. 在Netlify Dashboard点击 "Domain settings"
2. 点击 "Add custom domain"
3. 输入域名：buysing.com
4. 按照提示配置DNS

#### DNS配置

```
类型: CNAME
名称: @
值: your-site-name.netlify.app

类型: CNAME
名称: www
值: your-site-name.netlify.app
```

### Netlify配置文件

`homepage/netlify.toml` 已配置好，包含：
- 路由重定向
- 安全头设置
- 缓存策略

---

## 方案三：云服务器部署

### 推荐配置

| 规模 | CPU | 内存 | 带宽 | 存储 | 成本 |
|------|-----|------|------|------|------|
| 测试 | 1核 | 1GB | 1Mbps | 20GB | ¥50/月 |
| 小型 | 1核 | 2GB | 3Mbps | 40GB | ¥100/月 |
| 中型 | 2核 | 4GB | 5Mbps | 60GB | ¥200/月 |
| 大型 | 4核 | 8GB | 10Mbps | 100GB | ¥400/月 |

### 推荐云服务商

| 服务商 | 优势 | 价格 |
|--------|------|------|
| 阿里云 | 国内访问快 | ¥50-500/月 |
| 腾讯云 | 稳定可靠 | ¥50-500/月 |
| 华为云 | 企业级 | ¥100-600/月 |
| AWS | 全球覆盖 | $10-100/月 |
| DigitalOcean | 简单易用 | $5-80/月 |

### 步骤详解（以阿里云为例）

#### 1. 购买云服务器

1. 访问 https://www.aliyun.com
2. 注册/登录账号
3. 购买ECS实例：
   - 地域：选择离用户最近的
   - 实例规格：2核4G
   - 镜像：Ubuntu 20.04 LTS
   - 存储：40GB SSD
   - 带宽：5Mbps
4. 设置安全组：
   - 开放端口：80（HTTP）、443（HTTPS）、22（SSH）
5. 完成购买

#### 2. 连接服务器

```bash
# 使用SSH连接
ssh root@your-server-ip

# 或使用PuTTY（Windows）
```

#### 3. 安装Nginx

```bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装Nginx
sudo apt install nginx -y

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 验证安装
nginx -v
```

#### 4. 配置Nginx

```bash
# 创建站点配置
sudo nano /etc/nginx/sites-available/buysing

# 添加以下内容
server {
    listen 80;
    server_name buysing.com www.buysing.com;
    
    root /var/www/buysing/homepage;
    index index.html;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}

# 保存并退出（Ctrl+X, Y, Enter）
```

#### 5. 启用配置

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/buysing /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

#### 6. 上传文件

**方法一：使用SCP**

```bash
# 在本地执行
scp -r c:\Users\Administrator\Documents\trae_projects\BuysingAgent\homepage \
    root@your-server-ip:/var/www/buysing/
```

**方法二：使用SFTP工具**

推荐工具：
- FileZilla
- WinSCP
- Cyberduck

连接信息：
- 主机：your-server-ip
- 用户名：root
- 端口：22
- 密码：your-password

**方法三：使用Git**

```bash
# 在服务器上
cd /var/www
git clone https://github.com/yourusername/buysing-saas.git buysing
```

#### 7. 配置SSL证书（HTTPS）

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取并安装SSL证书
sudo certbot --nginx -d buysing.com -d www.buysing.com

# 按照提示：
# 1. 输入邮箱
# 2. 同意服务条款
# 3. 选择是否重定向HTTP到HTTPS（选择2）

# 验证自动续期
sudo certbot renew --dry-run
```

#### 8. 配置防火墙

```bash
# 允许HTTP和HTTPS
sudo ufw allow 'Nginx Full'

# 允许SSH
sudo ufw allow OpenSSH

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status
```

#### 9. 配置自动重启

```bash
# 安装PM2（用于进程管理）
sudo npm install -g pm2

# 创建启动脚本
nano /var/www/buysing/start.sh

# 添加内容
#!/bin/bash
cd /var/www/buysing
python3 -m http.server 8000

# 保存并退出

# 添加执行权限
chmod +x /var/www/buysing/start.sh

# 使用PM2启动
pm2 start /var/www/buysing/start.sh --name buysing

# 设置开机自启
pm2 startup
pm2 save
```

---

## 方案四：Docker部署

### 优势
- ✅ 环境一致性
- ✅ 快速部署
- ✅ 易于扩展
- ✅ 版本控制
- ✅ 隔离性

### 步骤详解

#### 1. 安装Docker

**Ubuntu/Debian:**

```bash
# 更新软件包
sudo apt update

# 安装依赖
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加Docker仓库
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y

# 启动Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

**CentOS/RHEL:**

```bash
# 安装依赖
sudo yum install -y yum-utils

# 添加Docker仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker
sudo yum install docker-ce docker-ce-cli containerd.io -y

# 启动Docker
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. 安装Docker Compose

```bash
# 下载Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

#### 3. 构建Docker镜像

```bash
cd c:\Users\Administrator\Documents\trae_projects\BuysingAgent

# 构建镜像
docker build -t buysing-saas:latest .

# 查看镜像
docker images
```

#### 4. 运行容器

**方法一：使用docker run**

```bash
# 运行容器
docker run -d \
  --name buysing-saas \
  -p 80:80 \
  -p 443:443 \
  --restart unless-stopped \
  buysing-saas:latest

# 查看运行状态
docker ps

# 查看日志
docker logs buysing-saas

# 停止容器
docker stop buysing-saas

# 启动容器
docker start buysing-saas

# 删除容器
docker rm buysing-saas
```

**方法二：使用Docker Compose（推荐）**

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看状态
docker-compose ps
```

#### 5. 配置Nginx反向代理（可选）

如果需要与其他服务共存，可以配置Nginx反向代理：

```nginx
server {
    listen 80;
    server_name buysing.com www.buysing.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔐 域名和SSL配置

### 域名购买

推荐域名注册商：
- 阿里云：https://wanwang.aliyun.com
- 腾讯云：https://dnspod.cloud.tencent.com
- Namecheap：https://www.namecheap.com
- GoDaddy：https://www.godaddy.com

### DNS配置

#### 基础DNS记录

```
类型: A
名称: @
值: your-server-ip
TTL: 600

类型: A
名称: www
值: your-server-ip
TTL: 600
```

#### 使用CDN（可选）

推荐CDN服务商：
- 阿里云CDN
- 腾讯云CDN
- Cloudflare（免费）

### SSL证书配置

#### Let's Encrypt（免费）

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取证书
sudo certbot --nginx -d buysing.com -d www.buysing.com

# 自动续期
sudo certbot renew --dry-run
```

#### 商业SSL证书（可选）

推荐SSL证书提供商：
- DigiCert
- Comodo
- GlobalSign
- 阿里云SSL证书

---

## 📊 监控和优化

### 性能监控

#### 1. Google Analytics

在 `homepage/index.html` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### 2. 性能监控工具

- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse

### 错误追踪

#### Sentry

```bash
# 安装Sentry SDK
npm install @sentry/browser

# 在代码中初始化
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "your-dsn-url",
  environment: "production"
});
```

### 日志管理

#### Nginx日志

```bash
# 查看访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 日志轮转
sudo logrotate /etc/logrotate.d/nginx
```

### 备份策略

```bash
# 创建备份脚本
nano /root/backup.sh

# 添加内容
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup"
SOURCE_DIR="/var/www/buysing"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份文件
tar -czf $BACKUP_DIR/buysing_$DATE.tar.gz $SOURCE_DIR

# 删除7天前的备份
find $BACKUP_DIR -name "buysing_*.tar.gz" -mtime +7 -delete

echo "Backup completed: buysing_$DATE.tar.gz"

# 保存并退出

# 添加执行权限
chmod +x /root/backup.sh

# 设置定时任务（每天凌晨2点备份）
crontab -e

# 添加以下行
0 2 * * * /root/backup.sh >> /var/log/backup.log 2>&1
```

---

## ❓ 常见问题

### 1. 部署后页面404

**原因：** 路由配置错误

**解决：**
- Vercel：检查 `vercel.json` 路由配置
- Netlify：检查 `netlify.toml` 重定向配置
- Nginx：检查 `try_files` 配置

### 2. HTTPS证书申请失败

**原因：** DNS未生效或端口未开放

**解决：**
```bash
# 检查DNS
nslookup buysing.com

# 检查端口
telnet buysing.com 80
telnet buysing.com 443

# 检查防火墙
sudo ufw status
```

### 3. 页面加载慢

**原因：** 未启用CDN或Gzip

**解决：**
- 启用CDN（Cloudflare免费版）
- 启用Gzip压缩
- 优化图片大小
- 使用浏览器缓存

### 4. 跨域问题

**原因：** CORS配置错误

**解决：**
```nginx
# Nginx配置
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
add_header Access-Control-Allow-Headers "Content-Type, Authorization";
```

### 5. 内存不足

**原因：** 服务器配置过低

**解决：**
- 升级服务器配置
- 启用Swap
- 优化Nginx配置

---

## 📞 技术支持

如有问题，请联系：
- 邮箱：support@buysing.com
- 微信：BuysingSupport
- 文档：https://docs.buysing.com

---

**祝您部署顺利！🎉**
