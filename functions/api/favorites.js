export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
        return new Response("Missing ID", { status: 400 });
    }

    async function getFavorites() {
        return JSON.parse(await env.CONVERT_PINYIN_FAVORITES_KV.get("user:" + userId) || "[]");
    }

    async function saveFavorites(favs) {
        await env.CONVERT_PINYIN_FAVORITES_KV.put("user:" + userId, JSON.stringify(favs));
    }

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
}
