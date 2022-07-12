import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleM from 'App/Models/Vehicle'
import CreateVehicle from 'App/Validators/CreateVehicleValidator'
import UpdateVehicle from 'App/Validators/UpdateVehicleValidator'

export default class VehiclesController {
  public async index(_ctx: HttpContextContract) {
    const vehicles = VehicleM.all()

    return vehicles
  }

  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateVehicle)

    const vehicle = VehicleM.create(payload)

    return vehicle
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateVehicle)

    const vehicle = await VehicleM.findOrFail(params.id)

    vehicle.merge(payload)
    await vehicle.save()

    return vehicle
  }
}
