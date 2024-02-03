import vine from '@vinejs/vine'

export const createPortfolioImageValidator = vine.compile(
  vine.object({
    title: vine.string(),
    userId: vine.string(),
    image: vine.file()
  })
)