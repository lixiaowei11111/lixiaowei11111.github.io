# 评论系统和访问统计设置指南

## 📝 评论系统设置 (Giscus)

### 1. 安装依赖
```bash
pnpm add @giscus/react
```

### 2. GitHub 仓库设置
1. 确保你的 GitHub 仓库是**公开的**
2. 在仓库设置中启用 **Discussions** 功能：
   - 进入仓库 Settings → General → Features
   - 勾选 "Discussions"

### 3. 获取 Giscus 配置
1. 访问 https://giscus.app/zh-CN
2. 输入你的仓库信息：`用户名/仓库名`
3. 选择 Discussion 分类（推荐 "Announcements"）
4. 复制生成的配置信息

### 4. 更新评论组件
在 `components/comments.tsx` 中更新以下配置：

```typescript
<Giscus
  repo="你的用户名/你的仓库名"
  repoId="你的仓库ID"
  category="Announcements" 
  categoryId="你的分类ID"
  // ... 其他配置
/>
```

## 📊 Google Analytics 4 设置

### 1. 创建 GA4 账号
1. 访问 https://analytics.google.com/
2. 创建账号和媒体资源
3. 设置数据流（选择"网站"）
4. 获取测量ID（格式：G-XXXXXXXXXX）

### 2. 环境变量配置
创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. 功能特性
- ✅ 页面访问统计
- ✅ 文章阅读事件追踪
- ✅ 用户行为分析
- ✅ 实时访客监控

## 📈 文章访问次数统计

### 特性
- 基于 localStorage 的客户端统计
- 防止同一会话重复计数
- 实时显示访问次数
- 支持在博客列表和详情页显示

### 使用方法
```typescript
// 在文章详情页自动增加访问次数
<ViewCounter slug={post.slug} />

// 在博客列表中只显示访问次数（不增加）
<ViewCounter slug={post.slug} increment={false} />
```

## 🚀 部署注意事项

### Vercel 部署
确保在 Vercel 项目设置中添加环境变量：
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### GitHub Pages 部署
如果使用 GitHub Actions 部署：
1. 在仓库 Settings → Secrets and variables → Actions
2. 添加 Repository secret: `GA_MEASUREMENT_ID`
3. 在构建脚本中设置环境变量

## 🔧 自定义配置

### 评论系统主题
评论区会自动跟随网站的深浅主题切换。

### 统计数据重置
如果需要重置特定文章的访问次数：
```typescript
import { resetViewCount } from '@/components/view-counter';
resetViewCount('article-slug');
```

### Analytics 事件追踪
可以自定义追踪事件：
```typescript
import { trackEvent } from '@/components/google-analytics';
trackEvent('button_click', 'engagement', 'download_cv');
```

## 📱 移动端优化

- 评论区在移动端自适应
- 访问统计图标在小屏幕上正常显示
- Google Analytics 支持移动端数据收集

## 🔍 数据隐私

- 访问统计数据存储在用户本地
- Google Analytics 遵循 GDPR 规范
- 评论系统基于 GitHub 账号，无额外隐私担忧

---

**需要帮助？** 检查浏览器控制台是否有错误信息，或查看 Google Analytics 实时报告验证数据收集。