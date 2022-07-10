import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Vehicle from 'App/Models/Vehicle'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await Vehicle.createMany([
      {
        name: 'First Vehicle',
        description: 'This is a description of first vehicle',
        plate: 'DDT-0012',
        is_favorite: false,
        brand: 'First Brand',
        year: 2018,
        color: '#ff00ff',
        price: 22000,
      },
      {
        name: 'Second Vehicle',
        description: 'This is a description of second vehicle',
        plate: 'DDT-0013',
        is_favorite: true,
        brand: 'Second Brand',
        year: 2019,
        color: '#ff00ff',
        price: 30000,
      },
    ])
  }
}
