const api = require("hypixel")
const client = new api.client('a5a87ae6-3ace-41c0-adaa-066a93361174')
// client.players.game('e80283b3-dbf3-4fe3-b1b6-6f1db48ea526').then((player) => {
//   console.log(player)
// })

// function getauctions(i, current) {
//   client.skyblock.auctions(i).then((auctions) => {
//     auctions.auctions.forEach((auction) => current.push(auction))
//     console.log(current.length)
//     if (i < 10) getauctions(i + 1, current)
//   })
// }
// getauctions(0, [])

client.skyblock.bazaar.then((bazaar) => {
  console.log(bazaar.products[0].sellSummary)
})
