import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import VehicleFactory from 'Database/factories/VehicleFactory'

test.group('Update vehicle', (group) => {
  group.each.setup(async () => {
    // Use a global transaction and rollback after each test to
    // have a clean database state in-between tests
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('With success', async ({ client }) => {
    const vehicle = await VehicleFactory.create()

    // Create the update payload
    const vehicle2 = await VehicleFactory.make()
    const payload = vehicle2.toObject()
    payload.id = vehicle.id
    delete payload['$extras'] // clean for the assertion

    const response = await client.patch(`/vehicles/${vehicle.id}`).json(payload)

    response.assertStatus(200)
    response.assertBodyContains(payload)
  })
})
