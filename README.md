# 中文转拼音工具 🇨🇳

一个简洁优雅的在线中文转拼音工具，支持多种拼音格式转换和收藏功能。

![中文转拼音工具](public/vite.svg)

## ✨ 功能特点

- 🔤 **多种拼音格式**
  - 带声调符号（默认）：nǐ hǎo
  - 带数字声调：ni3 hao3
  - 不带声调：ni hao
  - 首字母模式：n h

- 💾 **收藏功能**
  - 支持收藏常用文本
  - 通过URL参数 `?id=你的密钥` 启用
  - 云端存储，随时访问

- 🎨 **界面特性**
  - 响应式设计，支持移动端
  - 深色模式支持
  - 实时字数统计
  - 一键复制结果

- ⚡ **性能优化**
  - 防抖输入处理
  - 流畅的动画效果
  - 快速转换响应

## 🚀 在线使用

访问部署地址即可直接使用，无需安装。

### 基础使用

1. 在输入框中输入或粘贴中文文本
2. 选择所需的拼音格式
3. 查看转换结果
4. 点击"复制结果"按钮复制拼音

### 收藏功能

添加 URL 参数来启用收藏功能：
```
https://你的域名/?id=你的密钥
```

密钥可以是任意字符串，用于标识你的收藏列表。

## 🛠️ 本地开发

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📦 技术栈

- **前端框架**: Svelte
- **构建工具**: Vite
- **拼音转换**: pinyin-pro
- **部署平台**: Cloudflare Workers
- **样式**: 原生 CSS with CSS Variables

## 🌐 部署

### Cloudflare Workers 部署

1. 安装 Wrangler CLI
```bash
npm install -g wrangler
```

2. 登录 Cloudflare
```bash
wrangler login
```

3. 部署项目
```bash
npm run deploy
```

### 环境配置

在 `wrangler.toml` 中配置：
- `name`: 你的项目名称
- `compatibility_date`: Workers 兼容性日期
- KV 命名空间用于存储收藏数据

## 🔧 项目结构

```
convert_to_pinyin/
├── public/
│   └── vite.svg          # 项目图标
├── src/
│   ├── App.svelte        # 主应用组件
│   ├── main.js           # 入口文件
│   ├── app.css           # 全局样式
│   └── lib/              # 组件库
│       ├── Header.svelte
│       ├── InputSection.svelte
│       ├── Options.svelte
│       ├── Controls.svelte
│       ├── OutputSection.svelte
│       ├── FavoritesSection.svelte
│       └── Toast.svelte
├── functions/
│   └── api/
│       └── favorites.js  # 收藏功能 API
├── worker.js             # Cloudflare Worker
├── package.json
├── vite.config.js
├── svelte.config.js
└── wrangler.toml
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发指南

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [pinyin-pro](https://github.com/zh-lx/pinyin-pro) - 强大的中文转拼音库
- [Svelte](https://svelte.dev/) - 优秀的前端框架
- [Cloudflare Workers](https://workers.cloudflare.com/) - 边缘计算平台

