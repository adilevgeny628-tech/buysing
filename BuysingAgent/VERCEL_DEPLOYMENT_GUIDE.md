# Vercel部署快速指南

## 📋 部署前准备

✅ Vercel CLI已安装完成
✅ 项目文件已准备完成
✅ 配置文件已创建完成

---

## 🚀 部署步骤

### 步骤1：登录Vercel账号

在PowerShell中执行以下命令：

```bash
cd c:\Users\Administrator\Documents\trae_projects\BuysingAgent
vercel login
```

按照提示操作：
1. 选择登录方式：
   - GitHub（推荐）
   - GitLab
   - Bitbucket
   - Email

2. 如果选择GitHub：
   - 会打开浏览器
   - 授权Vercel访问您的GitHub账号
   - 授权完成后返回终端

3. 登录成功后会显示：
   ```
   ✓ Logged in as your-username
   ```

---

### 步骤2：初始化Vercel项目

```bash
vercel
```

按照提示配置项目：

```
? Set up and deploy “~/BuysingAgent”? [Y/n] Y
? Which scope do you want to deploy to? Your Username
? Link to existing project? [y/N] N
? What’s your project’s name? buysing-saas
? In which directory is your code located? ./
? Want to modify these settings? [y/N] N
```

**配置说明：**
- **Set up and deploy**: 选择 `Y`（是）
- **Scope**: 选择您的用户名
- **Link to existing project**: 选择 `N`（否，创建新项目）
- **Project name**: 输入 `buysing-saas`
- **Directory**: 输入 `./`（当前目录）
- **Modify settings**: 选择 `N`（否，使用默认设置）

**部署成功后会显示：**
```
✅  Production: https://buysing-saas.vercel.app [2m]
✅  Preview: https://buysing-saas-git-username.vercel.app
```

---

### 步骤3：部署到生产环境

```bash
vercel --prod
```

**部署成功后会显示：**
```
✅  Production: https://buysing-saas.vercel.app [1m]
```

---

## 🌐 访问部署后的网站

### 临时域名（立即可用）
```
https://buysing-saas.vercel.app
```

### 自定义域名（需要配置DNS）

#### 1. 在Vercel Dashboard添加域名

1. 访问 https://vercel.com/dashboard
2. 选择 `buysing-saas` 项目
3. 点击 `Settings` → `Domains`
4. 点击 `Add Domain`
5. 输入域名：`buysing.com`
6. 点击 `Add`

#### 2. 配置DNS记录

在域名注册商（阿里云/腾讯云/GoDaddy等）添加以下记录：

**主域名（@）：**
```
类型: CNAME
名称: @
值: cname.vercel-dns.com
TTL: 600
```

**www子域名：**
```
类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 600
```

#### 3. 等待DNS生效

DNS生效时间：5分钟 - 24小时（通常10-30分钟）

#### 4. 验证域名

在Vercel Dashboard中，域名状态会从 `Configuring` 变为 `Valid Configuration`

---

## 🔄 更新部署

### 方法一：自动部署（推荐）

将代码推送到GitHub后，Vercel会自动部署：

```bash
git add .
git commit -m "Update website"
git push origin main
```

Vercel会自动检测到推送并部署新版本。

### 方法二：手动部署

```bash
vercel --prod
```

---

## 📊 Vercel Dashboard功能

访问 https://vercel.com/dashboard 可以：

### 1. 查看部署历史
- 每次部署都会记录
- 可以回滚到之前的版本
- 查看部署日志

### 2. 查看域名设置
- 添加自定义域名
- 配置DNS
- 查看SSL证书状态

### 3. 查看环境变量
- 添加API密钥
- 配置环境参数
- 管理敏感信息

### 4. 查看使用情况
- 带宽使用量
- 函数调用次数
- 存储使用量

---

## 🔧 常见问题

### 1. 登录失败

**问题：** 浏览器未打开或授权失败

**解决：**
- 检查网络连接
- 尝试使用Email登录
- 清除浏览器缓存

### 2. 部署失败

**问题：** 构建或部署过程中出现错误

**解决：**
- 检查 `vercel.json` 配置
- 查看部署日志
- 确认文件路径正确

### 3. 域名无法访问

**问题：** 配置域名后无法访问

**解决：**
```bash
# 检查DNS解析
nslookup buysing.com

# 检查Vercel状态
# 在Dashboard查看域名状态

# 等待DNS生效
# DNS生效需要5分钟-24小时
```

### 4. HTTPS证书问题

**问题：** 浏览器显示证书错误

**解决：**
- 等待Vercel自动签发证书（通常5-10分钟）
- 检查DNS配置是否正确
- 在Dashboard查看证书状态

### 5. 页面404

**问题：** 访问页面显示404

**解决：**
- 检查 `vercel.json` 路由配置
- 确认文件在正确位置
- 查看部署日志

---

## 📱 测试部署后的网站

### 1. 基础功能测试

访问 https://buysing-saas.vercel.app 并测试：

- ✅ 主页正常加载
- ✅ 导航菜单可点击
- ✅ 所有页面可访问
- ✅ 响应式设计正常

### 2. 功能测试

- ✅ 工作台订单汇总正常
- ✅ 产品SKU数据正常显示
- ✅ 货币切换功能正常
- ✅ 自动刷新功能正常
- ✅ 筛选和搜索功能正常

### 3. 性能测试

使用以下工具测试性能：

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 4. 移动端测试

- 使用手机浏览器访问
- 测试触摸交互
- 检查响应式布局

---

## 📊 Vercel免费计划限制

### Hobby计划（免费）

- ✅ 无限部署次数
- ✅ 100GB带宽/月
- ✅ 自动HTTPS
- ✅ 全球CDN
- ✅ 自定义域名
- ❌ 无服务器端函数（需要Pro计划）

### Pro计划（付费）

- $20/月
- ✅ 1000GB带宽/月
- ✅ 无限函数调用
- ✅ 优先支持
- ✅ 更长的构建时间

---

## 🎯 下一步

### 1. 测试临时域名
访问 https://buysing-saas.vercel.app 测试所有功能

### 2. 配置自定义域名
按照上述步骤配置 buysing.com 域名

### 3. 设置自动部署
将代码推送到GitHub，实现自动部署

### 4. 配置监控
添加Google Analytics等监控工具

### 5. 优化性能
根据测试结果优化网站性能

---

## 📞 技术支持

如有问题，请联系：
- Vercel文档：https://vercel.com/docs
- Vercel社区：https://vercel.com/community
- 项目文档：https://github.com/yourusername/buysing-saas

---

**🎉 祝您部署顺利！**
