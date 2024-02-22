import Category from "#models/category";
import { createCategoryValidator } from "#validators/category";
import { HttpContext } from "@adonisjs/core/http";

export default class CategoriesController {
  public async index(): Promise<Category[]> {
    return await Category.query()
  }

  public async show({ params }: HttpContext): Promise<Category> {
    return await Category.findOrFail(params.id)
  }

  public async store({ request }: HttpContext): Promise<Category> {
    const payload = await request.validateUsing(createCategoryValidator)
    return await Category.create(payload)
  }

  public async destroy({ params }: HttpContext): Promise<void> {
    const category = await Category.findOrFail(params.id)
    return await category.delete()
  }
}