const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Creative Writing" },
        { name: "Chemical Engineering" },
        { name: "Fitness" },
        { name: "Public Speaking" },
        { name: "UX Designer" },
        { name: "Mechanical Engineering" },
      ],
    });

    console.log("Success!");
  } catch (error) {
    console.log("Error seeding the database categories: " + error);
  } finally {
    await database.$disconnect();
  }
}
