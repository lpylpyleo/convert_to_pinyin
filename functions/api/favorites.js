export async function onRequest(context) {
    const { request, env } = context;
    console.log("KV binding:", env.CONVERT_PINYIN_FAVORITES_KV);
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
        return new Response("Missing ID", { status: 400 });
    }

    // 添加错误处理，记录请求信息以便调试
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
        if (request.method === "GET") {
            return new Response(JSON.stringify(await getFavorites()), {
                headers: { "Content-Type": "application/json" }
            });
        }

        if (request.method === "POST") {
            const { text } = await request.json();
            if (!text) return new Response("invalid", { status: 400 });
            let favs = await getFavorites();
            if (!favs.includes(text)) favs.unshift(text);
            await saveFavorites(favs);
            return new Response(JSON.stringify(favs), { headers: { "Content-Type": "application/json" } });
        }

        if (request.method === "DELETE") {
            const { text } = await request.json();
            let favs = await getFavorites();
            favs = favs.filter(item => item !== text);
            await saveFavorites(favs);
            return new Response(JSON.stringify(favs), { headers: { "Content-Type": "application/json" } });
        }

        return new Response("Method Not Allowed", { status: 405 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}