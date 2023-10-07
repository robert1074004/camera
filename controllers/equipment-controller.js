const { Equipment, Record, User } = require('../models')
const { google } = require('googleapis')
const { OAuth2Client } = require('google-auth-library')

const equipmentController = {
  getCategories: (req, res, next) => {
    const category = req.params.category
    Equipment.findAll({
      where: { category }, raw: true
    })
      .then(equipments => res.render('index', {
        equipments
      }))
      .catch(err => next(err))
  },
  getEquipment: (req, res, next) => {
    Equipment.findByPk(req.params.id, { raw: true })
      .then(equipment => {
        if (!equipment.quantity) throw new Error('這個器材目前無庫存')
        res.render('show', {
          equipment
        })
      })
      .catch(err => next(err))
  },
  postRecord: (req, res, next) => {
    const { date, quantity, deadline } = req.body
    const userEmail = req.user.email
    const userName = req.user.name
    const userId = req.user.id
    Equipment.findByPk(req.params.id)
      .then((equipment) => {
        const { name, category, price } = equipment.toJSON()
        Promise.all([equipment.decrement('quantity', { by: quantity }), Record.create({ userName, userEmail, userId, date, category, quantity, equipmentName: name, totalPrice: quantity * price, deadline })])
          .then(() => {
            req.flash('success_msg', '租借成功!')
            res.redirect('/equipments/records')
          })
          .catch(err => next(err))
      })
  },
  getRecords: (req, res, next) => {
    const userId = req.user.id
    Record.findAll({ where: { userId }, raw: true, order: [['id', 'DESC']] })
      .then((records) => {
        res.render('record', { records })
      })
      .catch(err => next(err))
  },
  addEvent: (req, res, next) => {
    const { rentDay, backDay } = req.query
    req.session.calendar = [{ summary: 'TWT預借器材提醒', description: "你有器材需要今天到場租借，請到官網確認租借器材<br><a href = 'https://camera1074004.herokuapp.com/equipments/records'>官網網址</a>", date: rentDay, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }, { summary: 'TWT歸還器材提醒', description: "你有器材需要今天到場歸還，請到官網確認租借器材<br><a href = 'https://camera1074004.herokuapp.com/equipments/records'>官網網址</a>", date: backDay, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }]
    const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.CALENDAR_CALLBACK_URL)
    return User.findByPk(req.user.id, { raw: true })
      .then(user => {
        if (!user) throw new Error("User didn't exist !")
        return oauth2Client.refreshToken(user.refreshToken)
      })
      .then(token => {
        oauth2Client.setCredentials(token.tokens)
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
        const Event = req.session.calendar
        return Promise.all([calendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: Event[0].summary,
            description: Event[0].description,
            start: {
              date: Event[0].date,
              timeZone: Event[0].timeZone // 請替換為您的時區
            },
            end: {
              date: Event[0].date,
              timeZone: Event[0].timeZone // 請替換為您的時區
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 5 * 60 }
              ]
            }
          }
        }), calendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: Event[1].summary,
            description: Event[1].description,
            start: {
              date: Event[1].date,
              timeZone: Event[1].timeZone // 請替換為您的時區
            },
            end: {
              date: Event[1].date,
              timeZone: Event[1].timeZone // 請替換為您的時區
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 5 * 60 }
              ]
            }
          }
        })])
      })
      .then(([res1, res2]) => {
        delete req.session.calendar
        req.flash('success_msg', '新增Google calendar成功!')
        res.redirect('/equipments/records')
      })
      .catch(err => {
        if (err.message === 'invalid_grant' || err.message === 'No refresh token is set.') {
          // 設定要訪問的範圍，這裡是 Google Calendar 權限
          const SCOPES = ['https://www.googleapis.com/auth/calendar']

          // 生成授權 URL 以進行用戶身份驗證
          const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
          })

          // 導向GOOGLE授權URL
          res.redirect(authUrl)
        } else {
          if (err instanceof Error) {
            req.flash('error_msg', `${err.name}: ${err.message}`)
          } else {
            req.flash('error_msg', `${err}`)
          }
          res.redirect('/equipments/records')
        }
      })
  },
  callback: (req, res, next) => {
    const authorizationCode = req.query.code // 替換為實際的授權碼
    // 使用授權碼獲取訪問令牌
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.CALENDAR_CALLBACK_URL
    )

    return Promise.all([oauth2Client.getToken(authorizationCode), User.findByPk(req.user.id)])
      .then(([token, user]) => {
        if (!user) throw new Error("User didn't exist !")
        oauth2Client.setCredentials(token.tokens)
        return user.update({ refreshToken: token.tokens.refresh_token })
      })
      .then(user => {
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
        const Event = req.session.calendar
        return Promise.all([calendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: Event[0].summary,
            description: Event[0].description,
            start: {
              date: Event[0].date,
              timeZone: Event[0].timeZone // 請替換為您的時區
            },
            end: {
              date: Event[0].date,
              timeZone: Event[0].timeZone // 請替換為您的時區
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 5 * 60 }
              ]
            }
          }
        }), calendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: Event[1].summary,
            description: Event[1].description,
            start: {
              date: Event[1].date,
              timeZone: Event[1].timeZone // 請替換為您的時區
            },
            end: {
              date: Event[1].date,
              timeZone: Event[1].timeZone // 請替換為您的時區
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 5 * 60 }
              ]
            }
          }
        })])
      })
      .then(([res1, res2]) => {
        delete req.session.calendar
        req.flash('success_msg', '新增Google calendar成功!')
        res.redirect('/equipments/records')
      })
      .catch(err => {
        if (err instanceof Error) {
          req.flash('error_msg', `${err.name}: ${err.message}`)
        } else {
          req.flash('error_msg', `${err}`)
        }
        res.redirect('/equipments/records')
      })
  }
}

module.exports = equipmentController
