import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).unique(async (db, value) => {
      const category = await db
        .from('categories')
        .where('title', value)
        .first()
      return !category
    })
  })  
)