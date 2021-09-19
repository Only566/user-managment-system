import Router from 'koa-router'
import HttpError from '../core/httpError'
import crypto from 'crypto'
import { curUser, sessionMap, User } from '../middlewares/session'

const md5 = crypto.createHash('md5')
export const router = new Router({
  prefix: '/user'
})

const users: User[] = [{
  username: 'a',
  password: '1'
},{
  username: 'b',
  password: '1'
},{
  username: 'c',
  password: '1'
},{
  username: 'ad',
  password: '1'
},{
  username: 'd',
  password: '1'
},]

router.post('/login', (ctx, next) => {
  const { username, password } = ctx.request.body
  const [user] = users.filter(u => u.username === username)
  if(!user)
    throw new HttpError('NOT_FOUND', '用户不存在')
  if(user.password !== password)
    throw new HttpError('UNPROCESSABLE_ENTITY', '密码错误')
  const token = md5.update(username + password).digest('hex')
  sessionMap.set(token, user)
  ctx.body = token
  return next()
}).get('/friends', (ctx, next) => {
  ctx.body = users.filter(u => u.username !== curUser.username)
  return next()
})
