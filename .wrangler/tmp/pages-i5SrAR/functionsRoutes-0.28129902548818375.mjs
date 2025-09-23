import { onRequest as __api_favorites_js_onRequest } from "/Users/pingyangliao/Desktop/convert_to_pinyin/functions/api/favorites.js"

export const routes = [
    {
      routePath: "/api/favorites",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_favorites_js_onRequest],
    },
  ]