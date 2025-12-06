import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { type AppContext, createAppContext } from './lib/ctx'
import { applyTrpcExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()

    const expressApp = express()
    expressApp.use(cors())

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    applyTrpcExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(3000, () => {
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
