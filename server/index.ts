// server/index.ts
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import '../db';
import Comic, { IComic } from '../db/models/Comic';
import Panel, { IPanel } from '../db/models/Panel';

console.log(Panel);

const app = new Koa();
const router = new Router();

router.get('/comics', async (ctx) => {
  try {
    const comics: IComic[] = await Comic.find().populate('panels');
    ctx.body = comics;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching comics.' };
  }
});

router.get('/comics/:id', async (ctx) => {
  try {
    const comic: IComic | null = await Comic.findById(ctx.params.id).populate('panels');
    if (comic) {
      ctx.body = comic;
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Comic not found.' };
    }
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching the comic.' };
  }
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
