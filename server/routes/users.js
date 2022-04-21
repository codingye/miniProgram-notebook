const router = require('koa-router')()
const userService = require('../controllers/mySqlConfig')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar',  (ctx, next) => {
  ctx.body = 'this is a users/bar response'
})

//定义登入接口 ,请求体方法 => post
router.post('/userLogin',async (ctx, next) => {
  let _username = ctx.request.body.username
  let _userpwd = ctx.request.body.userpwd
  // console.log(_username,_userpwd);
  //去数据库匹配账号密码是否正确
await  userService.userLgoin(_username,_userpwd)
.then(res => {
  // console.log(res);
  if (res.length > 0) {
    let result = {
      id: res[0].id,
      nickname: res[0].nickname,
      username: res[0].username
    }
    ctx.body = {
      code:200,
      data: result,
      mess:'登入成功'
    }
  }else{
    ctx.body = {
      code:'80004',
      data: 'error',
      mess:'账号或密码错误'
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

//注册接口
router.post('/userRegister',async (ctx,next) => {
  //拿到前端输入的参数，判断是否已有
  let _username = ctx.request.body.username
  let _nickname = ctx.request.body.nickname
  let _userpwd = ctx.request.body.userpwd
  if(!_username || !_nickname || !_userpwd) {
    ctx.body = {
      code:'80004',
      data: 'error',
      mess:'输入错误'
    }
  }

  await userService.findUsers(_username)
  .then(async (res) => {
    console.log(res);
    if (res.length) {
      ctx.body = {
        code:'80005',
        mess:'账号已存在'
      }
    }else {
      //往数据库添加数据
    await  userService.insertUsers([_username,_userpwd,_nickname])
    .then(res => {
      console.log(res);
      if(res.affectedRows) {
        ctx.body = {
          code:200,
          mess:'注册成功'
        }
      }else{
        ctx.body = {
          code:'80004',
          data: 'error',
          mess:'注册失败'
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
    }
  })
  .catch(err => {
    ctx.body = {
      code:'8009',
      data: err,
      mess:'查找失败'
    }
  })
  
})

//获取数据bycontent
router.post('/findNoteListByType',async (ctx, next) => {
let  _notetype = ctx.request.body.note_type
console.log(_notetype);
if(!_notetype) {
    ctx.body = {
      code:'80004',
      mess:'参数错误'
    }
}
  await  userService.findData(_notetype)
  .then(res => {
    if (res.length) {
      ctx.body = {
        code:200,
        data:res,
        mess:'获取成功'
      }
    }else {
      ctx.body = {
        code:'8888',
        mess:'获取失败'
      }
    }
  })
  .catch(err => {
    ctx.body = {
      code:'80002',
      data: err
    }
  })
})

//获取数据byid
// router.post('/findNoteDetailById',async (ctx, next) => {
//   let  _id = ctx.request.body.id
//   console.log(_id);
//   if(!_id) {
//       ctx.body = {
//         code:'80004',
//         mess:'参数错误'
//       }
//   }
//     await  userService.findDetail(_id)
//     .then(res => {
//       // console.log(res.data.data.note_content);
//       if (res.length) {
//         ctx.body = {
//           code:200,
//           data:res,
//           mess:'获取成功'
//         }
//       }else {
//         ctx.body = {
//           code:'8888',
//           mess:'获取失败'
//         }
//       }
//     })
//     .catch(err => {
//       ctx.body = {
//         code:'80002',
//         data: err
//       }
//     })
//   })

//获取数据byID，get请求
router.get('/findNoteDetailById',async (ctx, next) => {
  // request('GET',`/users/findNoteDetailById?id=${options.id}`)
  // let _id = ctx.query.id

  let _id = ctx.request.query.id
  console.log(_id);
    if(!_id) {
      ctx.body = {
        code:'80004',
        mess:'参数错误'
      }
  }
    await  userService.findDetail(_id)
    .then(res => {
      // console.log(res.data.data.note_content);
      if (res.length) {
        ctx.body = {
          code:200,
          data:res,
          mess:'获取成功'
        }
      }else {
        ctx.body = {
          code:'8888',
          mess:'获取失败'
        }
      }
    })
    .catch(err => {
      ctx.body = {
        code:'80002',
        data: err
      }
    })
})

module.exports = router
