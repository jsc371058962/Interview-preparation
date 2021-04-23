import Koa from 'koa';
import path from 'path';
//静态资源中间件
import resource from 'koa-static';
import etag from 'koa-etag';
import conditional from 'koa-conditional-get';
import gzip from "koa-gzip";

const app = new Koa();
const host = 'localhost';
const port = 4398;

app.use(conditional());
app.use(etag());
app.use(gzip());

app.use(async (ctx, next) => {
  ctx.set({
    'Cache-Control': 'max-age=120, no-cache'
  });
  await next();
});

app.use(resource(path.join(__dirname, '../')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});
