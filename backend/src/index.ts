import cors from 'cors'
import express from 'express'
import { applyTrpcExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const expressApp = express()
expressApp.use(cors())

expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

applyTrpcExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  //console.info('Listening at http://192.168.38.147:3000') //work
  console.info('Listening at http://192.168.43.254:3000') //home
})
