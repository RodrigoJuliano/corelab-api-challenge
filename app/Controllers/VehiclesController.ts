import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleM from 'App/Models/Vehicle'
import CreateVehicle from 'App/Validators/CreateVehicleValidator'
import SearchVehicle from 'App/Validators/SearchVehicleValidator'
import UpdateVehicle from 'App/Validators/UpdateVehicleValidator'

export default class VehiclesController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate(SearchVehicle)

    const vehicles = await VehicleM.query()
      // Search term
      .if(payload.searchString, (query) => {
        const terms = payload.searchString?.split(' ')!
        // Search for the first term in each of the given attributes
        query.whereLike('name', `%${terms[0]}%`)
        query.orWhereLike('brand', `%${terms[0]}%`)
        query.orWhereLike('description', `%${terms[0]}%`)
        query.orWhereLike('price', `%${terms[0]}%`)
        query.orWhereLike('plate', `%${terms[0]}%`)
        query.orWhereLike('year', `%${terms[0]}%`)
        terms.shift()
        // Creates an union for search for each additional term
        query.union(
          terms.map((term) => (query) => {
            query.whereLike('name', `%${term}%`)
            query.orWhereLike('brand', `%${term}%`)
            query.orWhereLike('description', `%${term}%`)
            query.orWhereLike('price', `%${term}%`)
            query.orWhereLike('plate', `%${term}%`)
            query.orWhereLike('year', `%${term}%`)
          })
        )
      })
      // Filters
      .if(payload.filters_brand, (query) => {
        query.whereLike('brand', `%${payload.filters_brand}%`)
      })
      .if(payload.filters_color, (query) => {
        query.whereLike('color', `%${payload.filters_color}%`)
      })
      .if(payload.filters_year, (query) => {
        query.whereLike('year', `%${payload.filters_year}%`)
      })
      .if(payload.filters_priceMin, (query) => {
        query.where('price', '>=', payload.filters_priceMin!)
      })
      .if(payload.filters_priceMax, (query) => {
        query.where('price', '>=', payload.filters_priceMax!)
      })
      // Paginations
      .if(payload.quantityPerPage, (query) => {
        query.paginate(payload.page!, payload.quantityPerPage!)
      })

    return vehicles
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateVehicle)

    const vehicle = await VehicleM.create(payload)

    return vehicle
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateVehicle)

    const vehicle = await VehicleM.findOrFail(params.id)

    vehicle.merge(payload)
    await vehicle.save()

    return vehicle
  }

  public async delete({ params }: HttpContextContract) {
    const vehicle = await VehicleM.findOrFail(params.id)
    await vehicle.delete()
  }
}
