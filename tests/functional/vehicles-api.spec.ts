import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Search vehicle', (group) => {
  group.each.setup(async () => {
    // Use a global transaction and rollback after each test to
    // have a clean database state in-between tests
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('With success', async ({ client }) => {
    const response = await client.get('/vehicles')

    response.assertStatus(200)
    response.assertBodyContains([
      {
        name: 'First Vehicle',
        description: 'This is a description of first vehicle',
        plate: 'DDT-0012',
        is_favorite: 0, // sqlite uses integer to represent booleans
        year: 2018,
        color: '#ff00ff',
        price: 22000,
      },
      {
        name: 'Second Vehicle',
        description: 'This is a description of second vehicle',
        plate: 'DDT-0013',
        is_favorite: 1,
        brand: 'Second Brand',
        year: 2019,
        color: '#ff00ff',
        price: 30000,
      },
    ])
  })
})
