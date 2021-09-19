import App from 'koa'
import bodyParser from 'koa-bodyparser'
import { router as userRouter } from './views/user.view'
import HttpError from './core/httpError'
import session from './middlewares/session'

const app = new App()
app.use(bodyParser())
app.use(async (ctx, next) => {
  try {
    return await next()
  } catch (e) {
    if(e instanceof HttpError) {
      const [_, status, msg] = /\[(\d{3,4})\]\s(.*)/.exec(e.message)
      ctx.body = msg
      ctx.status = +status
    } else {
      throw e
    }
  }
})
app.use(session)
app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.listen(8080, () => {
    console.log('server is running at http://localhost:8080')
})
