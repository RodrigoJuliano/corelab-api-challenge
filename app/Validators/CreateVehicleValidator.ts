import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVehicleValidator {
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
    name: schema.string([rules.maxLength(128), rules.minLength(1)]),
    description: schema.string.optional([rules.maxLength(256)]),
    plate: schema.string([
      rules.maxLength(8),
      rules.minLength(8),
      rules.unique({
        table: 'vehicles',
        column: 'plate',
        caseInsensitive: true,
      }),
    ]),
    is_favorite: schema.boolean.optional(),
    brand: schema.string([rules.minLength(1), rules.maxLength(128)]),
    year: schema.number(),
    color: schema.string([rules.maxLength(7), rules.minLength(7)]),
    price: schema.number([rules.unsigned()]),
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
  // public messages = {}
}
