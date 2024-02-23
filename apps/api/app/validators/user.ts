import vine from '@vinejs/vine'

export const enablePortfolioValidator = vine.compile(
  vine.object({
    isEnabled: vine.boolean()
  })  
) 