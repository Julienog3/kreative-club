import proxyAddr from 'proxy-addr'
import env from '#start/env'
import { defineConfig } from "@adonisjs/core/http";
import app from '@adonisjs/core/services/app';

export const appKey: string = env.get('APP_KEY')

export const http = defineConfig({
  generateRequestId: false,
  allowMethodSpoofing: false,
  subdomainOffset: 2,
  trustProxy: proxyAddr.compile('loopback'),
  etag: false,
  jsonpCallbackName: 'callback',
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: app.inProduction,
    sameSite: 'lax',
  },
})
