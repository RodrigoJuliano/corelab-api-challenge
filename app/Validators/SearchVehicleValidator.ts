import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SearchVehicleValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    quantityPerPage: schema.number.optional([
      rules.range(0, Number.MAX_SAFE_INTEGER),
    ]),
    page: schema.number.optional([
      rules.range(0, Number.MAX_SAFE_INTEGER),
      rules.requiredIfExists('quantityPerPage'),
    ]),
    searchString: schema.string.optional(),
    filters_brand: schema.string.optional(),
    filters_color: schema.string.optional(),
    filters_year: schema.number.optional(),
    filters_priceMin: schema.number.optional([
      rules.range(0, Number.MAX_SAFE_INTEGER),
    ]),
    filters_priceMax: schema.number.optional([
      rules.range(0, Number.MAX_SAFE_INTEGER),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
