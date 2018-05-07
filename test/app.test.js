const supertest = require('supertest')

describe('server 服务', () => {
  let app, server

  beforeEach(async () => {
    app = await require('../src/app')
  })

  afterEach(() => {
    if (server) {
      server.close()
    }

    app = null
    server = null
  })

  const request = () => {
    if (!server) {
      server = app.listen(3001)
    }

    return supertest(server)
  }

  it('app 启动正常', async () => {
    expect(request).not.toThrow()
  })

  it('app 抛出异常处理', async () => {
    app.use(async ctx => {
      app.emit('error', new Error('app error'), ctx)
      ctx.body = 'ok'
    })

    await request()
      .get('/throw-error')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('ok')
      })
  })
})