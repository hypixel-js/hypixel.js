Read [Home](index.html) first

To fetch a player's data, we can do the following which fetches a user's hypixel data based on their [uuid](uuid).
```js
client.players.get('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((player) => {
  console.log(player)
})
```

The [player](Player) class has a lot of elements.
<br>[`player.achievements`](Player.html#achievements)
<br>[`player.channel`](Player.html#channel)
<br>[`player.displayName`](Player.html#displayName)
<br>[`player.firstLogin`](Player.html#firstLogin)
<br>[`player.friendRequests`](Player.html#friendRequests)
<br>[`player.game`](Player.html#game)
<br>[`player.karma`](Player.html#karma)
<br>[`player.knownAliases`](Player.html#knownAliases)
<br>[`player.language`](Player.html#language)
<br>[`player.lastLogin`](Player.html#lastLogin)
<br>[`player.lastLogout`](Player.html#lastLogout)
<br>[`player.oneTimeAchievements`](Player.html#oneTimeAchievments)
<br>[`player.pets`](Player.html#pets)
<br>[`player.quests`](Player.html#quests)
<br>[`player.rank`](Player.html#rank)
<br>[`player.rawStats`](Player.html#rawStats)
<br>[`player.uuid`](Player.html#uuid)
<br>[`player.version`](Player.html#version)
<br>Be sure to check out the player [documentation](Player) before using one of these.
