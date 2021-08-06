/**
  * A convenient way to access a player's rank(s).
  * @hideconstructor

*/

class PlayerRanks {
  constructor(rank, role, playerdata) {
    /** The staff rank. Can be "ADMIN" "MODERATOR" "HELPER" or "NORMAL".*/
    this.staff = role
    /** The purchased rank. Can be "YOUTUBER" "MVP_PLUS" "MVP" "VIP_PLUS" "VIP" or "NONE"*/
    this.package = rank
    /** The display rank. Can be "ADMIN" "MODERATOR" "HELPER" "MVP_PLUS" "MVP" "VIP_PLUS" "VIP" or "NONE"*/
    this.display = rank
    /** The users monthlyPackageRank */
    this.monthlyPackageRank = playerdata["monthlyPackageRank"]
    /**
      * The users latest rank purchase (applies for vip, vip+, mvp, and mvp+).
      * @type {Date}
    */
    this.latestPurchase = new Date(playerdata["firstLogin"])
    if (playerdata["levelUp_VIP"]) this.latestPurchase = new Date(playerdata["levelUp_VIP"])
    if (playerdata["levelUp_VIP_PLUS"]) this.latestPurchase = new Date(playerdata["levelUp_VIP_PLUS"])
    if (playerdata["levelUp_MVP"]) this.latestPurchase = new Date(playerdata["levelUp_MVP"])
    if (playerdata["levelUp_MVP_PLUS"]) this.latestPurchase = new Date(playerdata["levelUp_MVP_PLUS"])
    if (this.staff && this.staff !== "NORMAL") this.display = role
  }
}

/**
  * A Hypixel Player.
  * @hideconstructor
*/
class Player {
  constructor(playerdata) {
    /** The player's Minecraft UUID
      * @type {uuid}
    */
    this.uuid = playerdata["uuid"]
    /**
      * The player's hypixel rank(s).
      * @type {PlayerRanks}
      * @example
      * console.log(player.rank.display)
    */
    this.rank = new PlayerRanks(playerdata["rank"], playerdata["role"], playerdata)
    /** The player's username.
      * @type {String}
    */
    this.displayName = playerdata["displayname"]
    /** When the player first logged on Hypixel.
      * @type {Date}
    */
    this.firstLogin = new Date(playerdata["firstLogin"])
    /** The most recent time the player logged on Hypixel.
      * @type {Date}
    */
    this.lastLogin = new Date(playerdata["lastLogin"])
    /** The most recent time the player logged out of Hypixel.
      * @type {Date}
    */
    this.lastLogout = new Date(playerdata["lastLogout"])
    /** A collection of user's usernames while they were logged on hypixel.
      * @type {Array}
    */
    this.knownAliases = playerdata["knownAliases"]
    /** A collection of user's one-time hypixel achievements.
      * @type {Array}
    */
    this.oneTimeAchievements = playerdata["achievementsOneTime"]
    /** A collection of user's hypixel achievements.
      * @type {Array}
    */
    this.achievements = playerdata["achievements"]
    /** The channel that the user is talking in.
      * @type {String}
    */
    this.channel = playerdata["channel"]
    /** The user's hypixel karma.
      * @type {Number}
    */
    this.karma = playerdata["karma"]
    /** The user's friend requests in a UUID array.
      * @type {Number}
    */
    this.friendRequests = playerdata["friendRequestsUuid"]
    /** The user's pets.
      * @type {Array}
    */
    this.pets = playerdata["petConsumables"]
    /** The user's quest completions.
    */
    this.quests = playerdata["quests"]
    /** The user's most recent game.
    */
    this.game = playerdata["mostRecentGameType"]
    /** The user's language. */
    this.language = playerdata["userLanguage"]
    /** The user's Minecraft version. */
    this.version = playerdata["mcVersionRp"]
    /** The user's RAW game stats for each game. */
    this.rawStats = playerdata["stats"]
  }
}

/**
  * A friend on Hypixel. Usually part of a friend manager.
  * @hideconstructor

*/
class Friend {
  constructor(rawdata) {
    /** The UUID of the person who initiated the hypixel friend request (the request sender)
      * @type {uuid}
    */
    this.sender = rawdata["uuidSender"]
    /** The UUID of the person who accepted the hypixel friend request (the request sender)
      * @type {uuid}
    */
    this.receiver = rawdata["uuidReceiver"]
    /** The time the friend request was accepted.
      * @type {Date}
    */
    this.started = new Date(rawdata["started"])

  }
}

/**
  * A hypixel friend manager which contains all of the friends of a player
  * @hideconstructor

*/
class FriendManager {
  constructor(friendlist) {
    this.raw = friendlist
    /** The UUID of the user which this friend manager belongs to.
      * @type {uuid}
    */
    this.uuid = friendlist["uuid"]
    /** All of the friends of the user
      * @type {Array<Friend>}
    */
    this.all = []
    friendlist["records"].forEach((friend) => this.all.push(new Friend(friend)))
  }
}


/**
  * Represents a skyblock profile's community upgrade name. [Refer here.](https://hypixel-skyblock.fandom.com/wiki/Account_%26_Profile_Upgrades)
  * @hideconstructor

*/
class CommunityUpgradeName {

}

/**
  * Represents a skyblock profile's community upgrade in progress.
  * @hideconstructor

*/
class PendingCommunityUpgrade {
  constructor(rawupgrade) {
    /**
      * The upgrade's name.
      * @type {CommunityUpgradeName}
    */
    if (!rawupgrade) return
    this.name = rawupgrade.upgrade ?? undefined
    /**
      * The tier it's upgrading to.
      * @type {Number}
    */
    this.tier = rawupgrade.new_tier ?? undefined
    /**
      * The time the upgrade began.
      * @type {Date}
    */
    this.start = new Date(rawupgrade.start_ms) ?? undefined
    /**
      * The uuid of the player who began it.
      * @type {uuid}
    */
    this.initiater = rawupgrade.who_started ?? undefined
  }
}

/**
  * Represents a completed community upgrade.
  * @hideconstructor

*/
class CompletedUpgrade {
  constructor(rawupgrade) {
    /**
      * The upgrade's name.
      * @type {CommunityUpgradeName}
    */
    this.name = rawupgrade["upgrade"] ?? undefined
    /**
      * The tier that it was upgraded to.
      * @type {CommunityUpgradeName}
    */
    this.tier = rawupgrade["tier"] ?? undefined
    /**
      * The start time.
      * @type {Date}
    */
    this.startTime = new Date(rawupgrade["started_ms"]) ?? undefined
    /**
      * The player who started the upgrade's UUID.
      * @type {uuid}
    */
    this.startedBy = rawupgrade["started_by"] ?? undefined
    /**
      * The claim time.
      * @type {Date}
    */
    this.claimTime = new Date(rawupgrade["claimed_ms"]) ?? undefined
    /**
      * The player who claimed the upgrade's UUID.
      * @type {uuid}
    */
    this.claimedBy = rawupgrade["claimed_by"] ?? undefined
  }
}

/**
  * Represents a skyblock profile's community upgrades.
  * @hideconstructor

*/
class CommunityUpgrades {
  constructor(rawupgrades) {
    if (rawupgrades == undefined) return
    if (rawupgrades["currently_upgrading"]) {
      /**
        * The pending upgrade.
        * @type {PendingCommunityUpgrade}
      */
      if (rawupgrades["currently_upgrading"] != undefined) this.pending = new PendingCommunityUpgrade()
    }
    if (rawupgrades["upgrade_states"]) {
      /**
        * The completed upgrades, in chronoogical order.
        * @type {Array<CompletedUpgrade>}
      */
      var allupgrades = []
      rawupgrades["upgrade_states"].forEach((upgrade) => { allupgrades.push(new CompletedUpgrade(upgrade)) })
      this.completed = allupgrades
    }
  }
}

/**
  * Represents a skyblock pet.
  * @hideconstructor

*/
class SkyblockPet {
  constructor (rawdata) {
    /**
      * The skyblock pet type.
      * @type {String}
    */
    this.type = rawdata["type"]
    /**
      * The skyblock pet exp.
      * @type {Number}
    */
    this.xp = rawdata["exp"]
    /**
      * If the skyblock pet is active.
      * @type {Boolean}
    */
    this.active = rawdata["active"]
    /**
      * The skyblock pet's tier/rarity.
      * @type {string}
    */
    this.tier = rawdata["tier"]
  }
}

/**
  * Represents a skyblock quest.
  * @hideconstructor

*/
class SkyblockQuest {
  constructor (rawquest, questname) {
    if (rawquest.status != "ACTIVE") return
    if (rawquest.status != "COMPLETE") return
    /**
      * Represents if the quest is "UNLOCKED" or "COMPLETED".
      * @type {string}
    */
    this.status = "?"
    if (rawquest.status == "COMPLETE") this.status = "COMPLETED"
    if (rawquest.status == "ACTIVE") this.status = "UNLOCKED"
    /**
      * Represents when the quest was activated.
      * @type {Date}
    */
    this.unlockedAt = new Date(rawquest["activated_at"])
    /**
      * Represents when the quest was completed (if the quest was completed).
      * @type {Date}
    */
    if (this.status == "COMPLETED") this.completedAt = new Date(rawquest["activated_at"])
    /**
      * Represents the quest name.
      * @type {string}
    */
    this.name = questname
  }
}

/**
  * Represents a dungeon run (from a specific player). Usually only accessed by using catacombfloor.bestRuns.
  * @hideconstructor

*/
class CatacombRun {
  constructor(rundata) {
    /**
      * The time the run took place.
      * @type {Date}
    */
    this.time = new Date(rundata["timestamp"])
    /**
      * The class the player used.
      * @type {DungeonClass}
    */
    this.class = rundata["dungeon_class"]
    /**
      * The amount of times the skyblock player died in the dungeon.
      * @type {Number}
    */
    this.skyblockDungeonRunDeaths = rundata["deaths"]
    /**
      * The amount of skyblock damage dealt.
      * @type {Number}
    */
    this.skyblockDamageDealt = rundata["damage_dealt"]
    /**
      * The amount of mobs the skyblock player killed.
      * @type {Number}
    */
    this.mobKills = rundata.mobs_killed
    /**
      * The amount of damage they mitigated.
      * @type {Number}
    */
    this.mitigatedDamage = rundata.damage_mitigated
    /**
      * The amount of healing they did.
      * @type {Number}
    */
    this.allyHealing = rundata.ally_healing
    /**
      * An array of the player's teammates uuids.
      * @type {Array<uuid>}
    */
    this.teammates = rundata.teammates
    /**
      * The amount of time run took (in seconds).
      * @type {Number}
    */
    this.duration = rundata.elapsed_time/1000
    /**
      * The run score.
      * @type {JSON}
      * @example
      * {
      *   "exploration": 58,
      *   "speed": 100,
      *   "skill": 94,
      *   "bonus": 1
      * }
    */
    this.score = {
      "exploration": rundata.score_exploration,
      "speed": rundata.score_speed,
      "skill": rundata.score_skill,
      "bonus": rundata.score_bonus
    }
  }
}

/**
  * Represents a skyblock player's stats (on a specific floor).
  * @hideconstructor

*/
class SkyblockCatacombsFloor {
  constructor(skyblockcatacombsdata, floornumber) {
    if (skyblockcatacombsdata["times_played"]) {
      /**
        * Represents the amount of times the floor was played.
        * @type {Number}
      */
      this.runs = (skyblockcatacombsdata["times_played"][floornumber])
    }
    if (skyblockcatacombsdata["tier_completions"]) {
      /**
        * Represents the amount tier completion amount.
        * @type {Number}
      */
      this.tierCompletions = skyblockcatacombsdata["tier_completions"][floornumber]
    }
    if (skyblockcatacombsdata["fastest_time"]) {
      /**
        * Represents the fastest run time on the floor in seconds.
        * @type {Number}
      */
      this.fastestCompletionTime = skyblockcatacombsdata["fastest_time"][floornumber]/1000
    }
    if (skyblockcatacombsdata["mobs_killed"]) {
      /**
        * Represents the amount of mobs the player killed on the floor.
        * @type {Number}
      */
      this.mobsKilled = skyblockcatacombsdata["mobs_killed"][floornumber]
    }
    if (skyblockcatacombsdata["most_mobs_killed"]) {
      /**
        * Represents the most amount of mobs the player ever killed on the floor on a single run.
        * @type {Number}
      */
      this.mostMobsKilled = skyblockcatacombsdata["most_mobs_killed"][floornumber]
    }
    if (skyblockcatacombsdata["most_damage_mage"]) {
      /**
        * Represents the most damage the player ever did as a mage on this floor.
        * @type {Number}
      */
      this.mostDamageMage = skyblockcatacombsdata["most_damage_mage"][floornumber]
    }
    if (skyblockcatacombsdata["most_damage_beserk"]) {
      /**
        * Represents the most damage the player ever did as a beserk on this floor.
        * @type {Number}
      */
      this.mostDamageBeserk = skyblockcatacombsdata["most_damage_beserk"][floornumber]
    }
    if (skyblockcatacombsdata["most_damage_archer"]) {
      /**
        * Represents the most damage the player ever did as a archer on this floor.
        * @type {Number}
      */
      this.mostDamageArcher = skyblockcatacombsdata["most_damage_archer"][floornumber]
    }
    if (skyblockcatacombsdata["most_damage_healer"]) {
      /**
        * Represents the most damage the player ever did as a healer on this floor.
        * @type {Number}
      */
      this.mostDamageHealer = skyblockcatacombsdata["most_damage_healer"][floornumber]
    }
    if (skyblockcatacombsdata["most_damage_tank"]) {
      /**
        * Represents the most damage the player ever did as a tank on this floor.
        * @type {Number}
      */
      this.mostDamageTank = skyblockcatacombsdata["most_damage_tank"][floornumber]
    }
    if (skyblockcatacombsdata["most_healing"]) {
      /**
        * Represents the most the player ever healed in a single run on this floor.
        * @type {Number}
      */
      this.mostHealing = skyblockcatacombsdata["most_healing"][floornumber]
    }
    var bestRuns = []
    if (skyblockcatacombsdata["best_runs"]) if (skyblockcatacombsdata["best_runs"][floornumber]) skyblockcatacombsdata["best_runs"][floornumber].forEach((run) => { bestRuns.push(new CatacombRun(run)) })
    /**
      * Represents the top 10 runs per floor.
      * @type {Array<CatacombRun>}
    */
    this.bestRuns = bestRuns
  }
}

/**
  * Represents a skyblock player's catacombs stats or master catacombs.
  * @hideconstructor

*/
class SkyblockCatacombs {
  constructor(skyblockcatacombsdata) {
    /**
      * Represents a skyblock player's catacombs xp.
      * @type {Number}
    */
    this.xp = skyblockcatacombsdata["experience"]
    /**
      * Represents a skyblock player's catacombs data for floor 0.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor0 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 0)
    /**
      * Represents a skyblock player's catacombs data for floor 1.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor1 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 1)
    /**
      * Represents a skyblock player's catacombs data for floor 2.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor2 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 2)
    /**
      * Represents a skyblock player's catacombs data for floor 3.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor3 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 3)
    /**
      * Represents a skyblock player's catacombs data for floor 4.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor4 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 4)
    /**
      * Represents a skyblock player's catacombs data for floor 5.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor5 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 5)
    /**
      * Represents a skyblock player's catacombs data for floor 6.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor6 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 6)
    /**
      * Represents a skyblock player's catacombs data for floor 7.
      * @type {SkyblockCatacombsFloor}
    */
    this.floor7 = new SkyblockCatacombsFloor(skyblockcatacombsdata, 7)
  }
}

class DungeonClass {

}
/**
  * Represents a skyblock player's dungeon stats.
  * @hideconstructor

*/
class SkyblockPlayerDungeons {
  constructor(dungeondata) {
    if (dungeondata) if (dungeondata["dungeon_types"]["catacombs"]) if (Object.keys(dungeondata["dungeon_types"]["catacombs"]).length > 0) {
      /**
        * Represents a skyblock player's catacombs stats.
        * @type {SkyblockCatacombs}
      */
      this.catacombs = new SkyblockCatacombs(dungeondata["dungeon_types"]["catacombs"])
    }
    if (dungeondata) if (dungeondata["dungeon_types"]["master_catacombs"]) if (Object.keys(dungeondata["dungeon_types"]["master_catacombs"]).length > 0) {
      /**
        * Represents a skyblock player's master catacombs stats.
        * @type {SkyblockMasterCatacombs}
      */
      this.catacombs = new SkyblockCatacombs(dungeondata["dungeon_types"]["master_catacombs"])
    }
    if (dungeondata) if (dungeondata["player_classes"]) {
      /**
        * Represents a skyblock player's class stats (only shows their xp per class).
        * @type {SkyblockClasses}
      */
      this.classes = dungeondata["player_classes"]
    }
    if (dungeondata != undefined) {
      /**
        * Represents a skyblock player's current class.
        * @type {DungeonClass}
      */
      this.class = dungeondata["selected_dungeon_class"]
    }
  }
}

/**
  * Represents a skyblock bank transaction.
  * @hideconstructor
*/

class SkyblockBankTransaction {
  constructor(skyblockbanktransactiondata) {
    /**
      * The amount of coins transferred.
      * @type {Number}
    */
    this.amount = skyblockbanktransactiondata["amount"]
    /**
      * The time of transferring.
      * @type {Date}
    */
    this.time = new Date(skyblockbanktransactiondata["time"])
    /**
      * The transferring action "WITHDRAW" or "DEPOSIT".
      * @type {string}
    */
    this.action = skyblockbanktransactiondata["action"]
    /**
      * The initiator name (this might not be an exact username, due to name colors or bank interest so keep that in mind).
      * @type {string}
    */
    this.initiator = skyblockbanktransactiondata["initiator_name"]
  }
}

/**
  * Repressents a skyblock profile's bank.
  * @hideconstructor
*/

class SkyblockBank {
  constructor(skyblockbankdata) {
    if (skyblockbankdata["balance"]) {
      /**
        * The coin balance of the bank.
        * @type {Number}
      */
      this.balance = skyblockbankdata["balance"]
    }
    if (skyblockbankdata["transactions"]) {
      if (skyblockbankdata["transactions"].length > 0) {
        var transactions = []
        skyblockbankdata["transactions"].forEach((skyblocktransaction) => {
          transactions.push(new SkyblockBankTransaction(skyblocktransaction))
        })
        /**
          * The last 50 skyblock bank transactions on the profile.
          * @type {Array<SkyblockBankTransaction>}
        */
        this.transactions = transactions
      }
    }
  }
}

/**
  * Represents a skyblock player's progress on a specific profile (accessed from a [skyblock profile](SkyblockProfile)).
  * @hideconstructor
*/
class SkyblockPlayer {
  constructor (playerdata, uuid) {
    /**
      * The UUID of the skyblock player (the same as their minecraft uuid).
      * @type {uuid}
    */
    this.uuid = uuid
    /**
      * The time the player first joined the profile.
      * @type {Date}
    */
    this.join = new Date(playerdata["first_join"])
    /**
      * The time the player first went to the hub.
      * @type {Date}
    */
    this.hubjoin = new Date(playerdata["first_join"] + playerdata["first_join_hub"])
    /**
      * The player's last skyblock death.
      * @type {Date}
    */
    this.lastSkyblockDeath = new Date(playerdata["first_join"] + playerdata["last_death"])
    /**
      * The player's purse balance.
      * @type {Number}
    */
    this.balance = playerdata["coin_purse"]
    /**
      * The player's skyblock death count.
      * @type {Number}
    */
    this.skyblockDeathCount = playerdata["death_count"]
    /**
      * The player's pets on this profile
      * @type {Array<SkyblockPet>}
    */
    this.pets = []
    if (typeof playerdata["pets"] == "object") playerdata["pets"].forEach((pet) => this.pets.push(new SkyblockPet(pet)))

    /**
      * The player's quests completed and not completed.
      * @type {Array<SkyblockQuest>}
    */
    this.quests = []
    var keys = []
    for (var k in playerdata["quests"]) keys.push(k)
    if (playerdata["quests"]) keys.forEach((key) => this.quests.push(new SkyblockQuest(playerdata["quests"][key], key)))
    /**
      * A list of regions the profile player has visited.
      * @type {Array}
    */
    this.regions = playerdata["visited_zones"]
    /**
      * A skyblock player dungeon manager. This can fetch various information about a player's dungeon experience.
      * @type {SkyblockPlayerDungeons}
    */
    this.dungeons = new SkyblockPlayerDungeons(playerdata["dungeons"])
  }
}

/**
  * Represents a hypixel skyblock profile. A user can have multiple of these depending on their rank. NOTE: Make sure you check if data exists before you run actions on it, players can modify their api settings to block the recieving of some data.
  * @hideconstructor
*/
class SkyblockProfile {
  constructor(profile) {
    /**
      * Every skyblock profile has an ID assigned to it which is used to.
      * @type {id}
    */
    this.uuid = profile.profile_id
    /**
      * The profile name. Usually a food item.
      * @type {String}
    */
    this.name = profile.cute_name
    /**
      * The community upgrades in progress and completed.
      * @type {CommunityUpgrades}
    */
    this.upgrades = new CommunityUpgrades(profile.community_upgrades)
    /**
      * All of the profile members, along with their stats on the profile.
      * @type {Array<SkyblockPlayer>}
    */
    this.members = []
    var keys = []
    for(var k in profile["members"]) this.members.push(new SkyblockPlayer(profile["members"][k], k))
    if (profile["banking"]) {
      /**
        * The bank of the skyblock profile. This holds the current balance, and the last 49 transactions. To check a member's balance use SkyblockPlayer.balance.
        * @type {SkyblockBank}
      */
      this.bank = new SkyblockBank(profile["banking"])
    }
  }
}

/**
  * A hypixel player manager. Accessed from a client.
  * @hideconstructor
*/

class PlayerManager {
  /**
    * The player fetching functionality.
    * If you would like to only use the playerdata api, you can directly input the apiKey here. Otherwise, this can be accessed using client.players.
    * @param {String} apiKey - The api key.
  */
  constructor(key) {
    this.key = key
  }

  /**
    * Fetches a player from hypixel.
    * @param {uuid} uuid - The player's UUID.
    * @return {Promise<Player>}
    * @example
    * const client = new api.client('api_key_here')
    * client.players.get('16751f79-c0b1-4e53-a0b5-90d31fc1d80d').then((player) => {
    *   console.log(`${player.displayName} is playing on ${player.version}.`)
    * })
  */
  get(uuid) {
    return new Promise((resolve, reject) => {
      require(__dirname + '/players/fetch_player').get(uuid, this.key).then((playerdata) => {
        const player = new Player(playerdata.player)
        resolve(player)
      })
    })
  }
  /**
    * Fetches a player's friends.
    * @param {uuid} uuid - The player's UUID.
    * @return {Promise<FriendManager>}
  */
  friends(uuid) {
    return new Promise((resolve, reject) => {
      require(__dirname + '/players/fetch_player').friends(uuid, this.key).then((friendlist) => {
        const friends = new FriendManager(friendlist)
        resolve(friends)
      })
    })
  }

  /**
    * Fetches a player's online status.
    * @param {uuid} uuid - The player's UUID.
    * @return {Promise<JSON>}
    * @example
    * {
    "online": true,
    "gameType": "string",
    "mode": "string",
    "map": "string"
  } //(from the hypixel API documentation)
  */

  game(uuid) {
    return new Promise((resolve, reject) => {
      require(__dirname + '/players/fetch_player').game(uuid, this.key).then((game) => {
        resolve(game.session)
      })
    })
  }

  /**
    * Fetches a player's Skyblock Profiles.
    * **This is a work in progress. Things may malfunction or go wrong.**
    * @param {uuid} uuid - The player's UUID.
    * @return {Promise<Array<SkyblockProfile>>}
  */
  skyblockProfiles(uuid) {
    return new Promise((resolve, reject) => {
      require(__dirname + '/players/fetch_player').skyblockProfiles(uuid, this.key).then((skyblockProfiles) => {
        var skyblockProfileClasses = []
        skyblockProfiles["profiles"].forEach((skyblockProfile) => {
          skyblockProfileClasses.push(new SkyblockProfile(skyblockProfile))
        })
        resolve(skyblockProfileClasses)
      })
    })
  }
}

exports.players = PlayerManager;
