const { PrismaClient } = require("@prisma/client")
const { APP_SECRET, getUserId } = require("./utils");

const prisma = new PrismaClient()

async function main() {
//   const allLinks = await prisma.link.findMany()
  // const allLinks = await prisma.link.update({
  //   where: {
  //       id:2
  //       },
  //       data: {
  //           description:'Prisma Tutorial',
  //           url:'www.prisma.com'
  //       }
  // })
//   const newLink = await prisma.link.create({
//       data : {
//           description:'Fullstack Tutorial',
//           url:'www.fullstackTut.com'
//       }
//   })
  // console.log(allLinks)

  const voteChecker = await prisma.link.findMany({ 
    // where: {
    //   linkId_userId : {
    //     linkId: 2,
    //     userId:1
    //   } 
    // },
    skip:1,
    take:1
  }) 



  console.log(voteChecker,"voteChecker")
  console.log(APP_SECRET)

}


main().catch(err => { throw err }).finally(async () => { await prisma.$disconnect()})

