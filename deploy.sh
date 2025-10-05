#!/bin/bash

# 构建项目
echo "Building project..."
npm run build

# 部署到 Cloudflare Workers
echo "Deploying to Cloudflare Workers..."
wrangler deploy

# 注意：如果上面的命令仍然失败，请尝试以下命令：
# wrangler pages publish dist
