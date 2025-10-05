// Worker 入口文件
// 由于 Workers 不直接支持 HTML 导入，我们需要将 HTML 作为字符串导入
import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理 API 路由
    if (url.pathname.startsWith('/api/favorites')) {
      return handleFavoritesAPI(request, env);
    }
    
    // 返回 HTML 页面
    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};

// 处理收藏夹 API
async function handleFavoritesAPI(request, env) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return new Response("Missing ID", { status: 400 });
  }

  console.log(`Received request for userId: ${userId}, method: ${request.method}`);

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
