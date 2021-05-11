const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('x-response-time', `${ms}ms`);
});

// log
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// app.use(async ctx => {
//   ctx.body = 'hello world!';
// });

const home = new Router();
home.get('/', async (ctx) => {
  const html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

const page = new Router();
page.get('/helloworld', (ctx) => {
  ctx.body = 'hello!';
}).get('/404', (ctx) => {
  ctx.body = '404 not found!';
});

// 装载所有路由
const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
  console.log('[demo] start-quick is starting at port 3000')
});

