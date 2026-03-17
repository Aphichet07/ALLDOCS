import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "sdsdssdal@gmail.com",
            name: "sdfs",
            number: 454877
        }
    });

    console.log("Created user:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("เกิดข้อผิดพลาด:", e); 
    await prisma.$disconnect();
    process.exit(1);
  });