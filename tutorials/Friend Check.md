In this tutorial we'll run a function which checks if two users are friends on hypixel.

First create your client (as usual).
```js
const client = new api.client('api_key_here')
```

To get a hypixel player's friends, we can use client.players.friends('uuid').
```js
client.players.friends('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((friends) => {
  console.log(friends)
})
```
This logs the [FriendManager](FriendManager) of the hypixel player. The Friend Manager can be used to see all of the player's friends.

Next, we can find the **trimmed** uuid of the other player.

```js
client.players.friends('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((friends) => {
  tocheck = '8e176c5ac26d4c148efe77b598b8b3ea' //the trimmed uuid of the other player
})
```

[friends.all](FriendManager) is an array of [Friends](Friend) on hypixel. The [Friend](Friend) object includes the request reciever, sender, and the time the friend request was accepted.

For each friend we can check if the sender or receiver was the uuid set in **tocheck**.

```js
client.players.friends('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((friends) => {
  tocheck = '8e176c5ac26d4c148efe77b598b8b3ea' //the trimmed uuid of the other player
  friends.all.forEach((friend) => {
    if (friend.sender == tocheck || friend.reciever == tocheck) isFriend = true
  })
  console.log(isFriend)
})
```

That is how you can check if two players are friends on Hypixel.
