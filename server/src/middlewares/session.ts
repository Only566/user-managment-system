import { Middleware } from 'koa'
import HttpError from '../core/httpError'
import * as fs from 'fs'

export interface User {
  username: string
  password: string
}

export const sessionMap = new Map<string, User>()
export let curUser: User | null = null

const sessionMapData = JSON.parse(fs.readFileSync('sessionMap.txt').toString())
Object.keys(sessionMapData).forEach(key => sessionMap.set(key, sessionMapData[key]))

export default ((ctx, next) => {
  const token = ctx.header.token as string
  if(token) {
    curUser = sessionMap.get(token)
    if (!curUser)
      throw new HttpError('UNAUTHORIZED', '未授权用户')
  }
  return next()
}) as Middleware

process.on('SIGINT', () => {
  fs.writeFileSync('sessionMap.txt', JSON.stringify(
    [...sessionMap.keys()].reduce((d, key) => {
      d[key] = sessionMap.get(key)
      return d
    }, {})
  ))
})
