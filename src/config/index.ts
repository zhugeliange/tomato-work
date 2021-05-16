
const isProduction = import.meta.env.PROD
const isDevelopment = !isProduction

const CONFIG = {
  isProduction,
  isDevelopment,
  // 路由 basename
  baseURL: '/',
  // 网页标题
  title: 'Tomato Work',
  http: {
    baseURL: isDevelopment
      ? 'https://work-api.xiejiahe.com/api'
      : 'https://work-api.xiejiahe.com/api'
  },
  github: {
    clientId: isProduction ? '789d87c19dd5ed1dc42e' : '489b39e1f91d934128c8',
    // callbackURL 不可随意更改, 否则需要与服务端配置文件一同修改
    callbackURL: `${isProduction ? 'https://work-api.xiejiahe.com' : window.location.origin}/api/passport/github/callback`,
    repositoryUrl: 'https://github.com/xjh22222228/tomato-work',
    bug: 'https://github.com/xjh22222228/tomato-work/issues'
  }
}

export default CONFIG
