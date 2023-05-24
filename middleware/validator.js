const { body, validationResult } = require('express-validator')

const formError = (req, res, next) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    throw new Error(`${error.errors[0].msg}`)
  }
  next()
}

const signUpValidator = [body('password').trim().isLength({ min: 5 }).withMessage('密碼長度不足!'), body('name').trim().notEmpty().withMessage('名子不得為空白!'), body('email').isEmail().withMessage('不符合email格式!'), body('confirmPassword').trim().custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('密碼與確認密碼不相符!')
  }
  return true
})]

const editUserValidator = [body('password').trim().isLength({ min: 5 }).withMessage('密碼長度不足!'), body('name').trim().notEmpty().withMessage('名子不得為空白!'), body('confirmPassword').trim().custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('密碼與確認密碼不相符!')
  }
  return true
})]

const equipmentValidator = [body('category').trim().notEmpty().withMessage('種類不得為空白!'), body('name').trim().notEmpty().withMessage('名子不得為空白!'), body('price').trim().notEmpty().withMessage('價格不得為空白!'), body('quantity').trim().notEmpty().withMessage('數量不得為空白!')]

const recordValidator = [body('date').trim().notEmpty().custom((value, { req }) => {
  if (!value) throw new Error('日期不得為空白!')
  const now = new Date()
  const rentDate = new Date(value)
  if ((rentDate - now) / (1000 * 60 * 60 * 24) < 1) throw new Error('日期選擇錯誤!')
  req.body.deadline = rentDate.setDate(rentDate.getDate() + 3)
  return true
}), body('quantity').trim().notEmpty().withMessage('數量不得為空白!')]

module.exports = { signUpValidator, equipmentValidator, recordValidator, editUserValidator, formError }
