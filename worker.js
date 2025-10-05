// 处理收藏夹 API
async function handleFavoritesAPI(request, env) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return new Response("Missing ID", { status: 400 });
  }

  async function getFavorites() {
    try {
      return JSON.parse(await env.CONVERT_PINYIN_FAVORITES_KV.get("user:" + userId) || "[]");
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  }

  async function saveFavorites(favs) {
    try {
      await env.CONVERT_PINYIN_FAVORITES_KV.put("user:" + userId, JSON.stringify(favs));
    } catch (error) {
      console.error("Error saving favorites:", error);
      throw error;
    }
  }

  try {
    // 处理 CORS
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // 处理 OPTIONS 请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method === "GET") {
      return new Response(JSON.stringify(await getFavorites()), { headers });
    }

    if (request.method === "POST") {
      const { text } = await request.json();
      if (!text) return new Response("invalid", { status: 400 });
      let favs = await getFavorites();
      if (!favs.includes(text)) favs.unshift(text);
      await saveFavorites(favs);
      return new Response(JSON.stringify(favs), { headers });
    }

    if (request.method === "DELETE") {
      const { text } = await request.json();
      let favs = await getFavorites();
      favs = favs.filter(item => item !== text);
      await saveFavorites(favs);
      return new Response(JSON.stringify(favs), { headers });
    }

    return new Response("Method Not Allowed", { status: 405 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// 导入 Workers Sites 的资源处理器
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// 声明全局变量
/* global ASSET_MANIFEST */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 API 路由
    if (url.pathname.startsWith('/api/favorites')) {
      return handleFavoritesAPI(request, env);
    }
    
    // 处理静态资源
    try {
      // 检查是否有 ASSET_MANIFEST
      const assetManifest = typeof ASSET_MANIFEST !== 'undefined' ? JSON.parse(ASSET_MANIFEST) : {};
      
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // 如果不是404错误，返回错误
      if (!e.status || e.status !== 404) {
        console.error('Error loading asset:', e);
        return new Response('Error loading resource', { status: 500 });
      }
    }

    // 404处理 - 返回 index.html (用于SPA路由)
    try {
      const assetManifest = typeof ASSET_MANIFEST !== 'undefined' ? JSON.parse(ASSET_MANIFEST) : {};
      
      const notFoundResponse = await getAssetFromKV(
        {
          request: new Request(new URL('/index.html', request.url).toString()),
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 200,
      });
    } catch (e) {
      console.error('Error loading index.html:', e);
      return new Response('Not Found', { status: 404 });
    }
  }
};
