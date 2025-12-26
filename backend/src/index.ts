import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { applyCron } from './lib/cron'
import { type AppContext, createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { presetDb } from './scripts/presetSb'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, ctx)
    applyTrpcExpressApp(expressApp, ctx, trpcRouter)
    applyCron(ctx)

    expressApp.listen(env.PORT, () => {
      console.info('Listening at http://192.168.38.147:3000') //work
      // console.info('Listening at http://192.168.43.254:3000') //home
    })
  } catch (error) {
    console.error(error)
    if (ctx) {
      await ctx?.stop()
    }
  }
})()
