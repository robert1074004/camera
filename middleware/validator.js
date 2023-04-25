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

module.exports = { signUpValidator, formError }
