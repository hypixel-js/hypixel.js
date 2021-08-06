#hypixel.js
Welcome to the official hypixel.js documentation.
Hypixel.js is a new and powerful [Hypixel API](https://api.hypixel.net) wrapper which makes the hypixel api easy to use.

```js
const api = require("hypixel.js")
```

You can fetch your api key by going in game and typing "/api". An api key is ratelimited to 120 requests per minute and sharding is not allowed. Instead if you would like to make more requests, you need to contact the hypixel support desk and explain why you would like to exceed this limit.
A client carries all of the api functionality, because it is always linked to it's api key, so you don't have to specify an api key every time you perform an action.
```js
const client = new api.client('insert apiKey here')
```

[`client.players`](http://hypixeljs-docs.meltedglass.repl.co/PlayerManager.html) carries all functionality relevant to fetching player data. Let's use .get to see a user's version.
```js
client.players.get('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((player) => {
  console.log(`${player.displayName} is playing on Minecraft ${player.version}`)
})
```

Congratulations! You just made your first app that can tell what version a player plays on! Refer to [`client.players`](PlayerManager.html) for more information on players, [`client.skyblock`](http://hypixeljs-docs.meltedglass.repl.co/Skyblock.html) for skyblock information, and [`client`](http://hypixeljs-docs.meltedglass.repl.co/Client.html) to see all of the client actions.
