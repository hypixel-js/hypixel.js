const https = require("https")
PlayerManager = require('./players.js').players
Skyblock = require('./skyblock.js').sb

/**
  * A client to reach the hypixel api, which contains all of the functions.
  * @constructor
  * @param {string} apiKey - Your hypixel api key. Use /api in-game to get it. The default limit of requests per minute is 120.
  * @example
  * const client = new api.client('api_key_here')
  */
class Client {
  constructor(key) {
    this.key = key
  }
  /**
    * The PlayerManager which executes actions with players.
    * @type {PlayerManager}
  */
  get players() { return new PlayerManager(this.key) }
  /**
    * The SkyblockManager which can get information about the current version of the game (such as a list of collections or skills), skyblock news, player information, the bazaar, or the auction house.
    * @type {Skyblock}
  */
  get skyblock() { return new Skyblock(this.key) }
}

/**
  * A minecraft UUID
  * @hideconstructor
*/
class uuid {

}

/**
  * A NodeJS Date
  * @hideconstructor
*/
class Date {

}

/**
  * A NodeJS Array
  * @hideconstructor
*/
class Array {

}

/**
  * A NodeJS Boolean
  * @hideconstructor
*/
class Boolean {

}

/**
  * A NodeJS Number
  * @hideconstructor
*/
class Number {

}

exports.Client = Client;
