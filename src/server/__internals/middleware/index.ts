/**
 * Internal middlewares
 * Do not modify unless you know what you're doing
 */

import { MiddlewareHandler } from "hono"

/**
 * Middleware to parse GET-request using SuperJSON
 */
export const queryParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawQuery = c.req.query()
  c.set("parsedQuery", rawQuery)
  await next()
}

/**
 * Middleware to parse POST-requests using SuperJSON
 */
export const bodyParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawBody = await c.req.json()
  c.set("parsedBody", rawBody)
  await next()
}
