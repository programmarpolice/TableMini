const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");
const seed = async (numRestaurants = 3, numReservations = 5) => {
  // TODO: Create 3 restaurants with 5 reservations each
  for (let i = 0; i < numRestaurants; i++) {
    const reservations = Array.from({ length: numReservations }, (_, j) => {
      const name = faker.internet.displayName();
      return {
        name,
        email: `${i}${j}@foo.bar`,
        partySize: faker.number.int({ min: 1, max: 10 }),
      };
    });
    await prisma.restaurant.create({
      data: {
        name: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
        reservations: {
          create: reservations,
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
