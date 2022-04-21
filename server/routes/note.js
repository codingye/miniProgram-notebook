const router = require('koa-router')()
const userService = require('../controllers/mySqlConfig')
const utils = require('../controllers/utils')


router.prefix('/note')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//存放笔记
router.post('/publishNote',async (ctx,next) => {
    //拿到前端输入的参数，判断是否已有
    let _noteContent = ctx.request.body.noteContent
    let _nickname = ctx.request.body.nickname
    let _noteTitle = ctx.request.body.noteTitle
    let _noteType = ctx.request.body.noteType
    let _noteImg = ctx.request.body.noteImg
    let _userId = ctx.request.body.userId
    let c_time = utils.getNowFormatDate()
    let m_time = utils.getNowFormatDate()
    console.log(_userId);
    console.log(c_time);
    if(!_userId || !_nickname || !_noteContent || _noteTitle || _noteType || _noteImg) {
      ctx.body = {
        code:'80004',
        data: 'error',
        mess:'输入错误'
      }
    }
  
    await  userService.insertNote([_userId,_noteTitle,_noteType,_noteContent,_noteImg,c_time,m_time,_nickname])
    .then(res => {
        console.log(res);
        if(res.affectedRows) {
          ctx.body = {
            code:200,
            mess:'发表成功'
          }
        }else{
          ctx.body = {
            code:'80004',
            data: 'error',
            mess:'发表失败'
          }
        }
      })
      .catch(err => {
        // console.log(err);
        ctx.body = {
          code:'80002',
          data: err
        }
      })
  })

module.exports = router
