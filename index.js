const api = require("hypixel")
const client = new api.client('a5a87ae6-3ace-41c0-adaa-066a93361174')

// client.players.game('e80283b3-dbf3-4fe3-b1b6-6f1db48ea526').then((player) => {
//   console.log(player)
// })

client.players.friends('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((friends) => {
  tocheck = '8e176c5ac26d4c148efe77b598b8b3ea' //the trimmed uuid of the user to check
  isFriend = false
  friends.all.forEach((friend) => {
    if (friend.sender == tocheck || friend.receiver == tocheck) isFriend = true
  })
  console.log(`${isFriend}`) //displays if they are friends or not
})
