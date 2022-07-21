import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import VehicleFactory from 'Database/factories/VehicleFactory'

test.group('Delete vehicle', (group) => {
  group.each.setup(async () => {
    // Use a global transaction and rollback after each test to
    // have a clean database state in-between tests
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('With success', async ({ client }) => {
    const vehicle = await VehicleFactory.create()

    const response = await client.delete(`/vehicles/${vehicle.id}`)

    response.assertStatus(200)
  })
})
