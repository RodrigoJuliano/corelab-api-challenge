import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Vehicle } from 'App/Types/Vehicle'

export default class VehiclesController {
  public async index(_ctx: HttpContextContract) {
    const vehicles: Vehicle[] = [
      {
        id: 1,
        name: 'First Vehicle',
        description: 'This is a description of first vehicle',
        plate: 'DDT-0012',
        isFavorite: false,
        year: 2018,
        color: '#ff00ff',
        price: 22000,
        createdAt: new Date(),
      },
    ]

    return vehicles
  }
}
