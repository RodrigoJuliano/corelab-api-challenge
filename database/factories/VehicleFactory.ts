import vehicle from 'App/Models/vehicle'
import Factory from '@ioc:Adonis/Lucid/Factory'

const colors = [
  '#f28b82',
  '#fbbc04',
  '#fff475',
  '#ccff90',
  '#a7ffeb',
  '#d7aefb',
  '#fdcfe8',
  '#ffffff',
]

export default Factory.define(vehicle, ({ faker }) => {
  return {
    name: faker.vehicle.model(),
    description: faker.lorem.words(8),
    plate: faker.unique(faker.vehicle.vrm),
    is_favorite: faker.datatype.boolean(),
    brand: faker.vehicle.manufacturer(),
    year: faker.date.past().getFullYear(),
    color: colors[faker.datatype.number({ max: colors.length - 1 })],
    price: faker.datatype.number({ min: 10000, max: 1000000 }),
  }
}).build()
