/**
  * Represents an item on the auction house on skyblock.
  * @hideconstructor
*/
class AuctionItem {
  constructor(itemdata) {
    /**
      * The item name.
      * @type {string}
    */
    this.name = itemdata["item_name"]
    /**
      * The item lore.
      * @type {string}
    */
    this.lore = itemdata["item_lore"]
    /**
      * The item tier.
      * @type {string}
    */
    this.tier = itemdata["tier"]
  }
}

/**
  * Represents a single auction. Usually from an auction page.
  * @hideconstructor
*/
class Auction {
  constructor(auctiondata) {
    /**
      * The auction UUID. Every auction has a unique UUID on Hypixel. This doesn't have to do with player UUIDs.
      * @type {string}
    */
    this.uuid = auctiondata["uuid"]
    /**
      * The uuid of the player who began the auction.
      * @type {uuid}
    */
    this.auctioneer = auctiondata["auctioneer"]
    /**
      * The ID of the profile this was posted on.
      * @type {string}
    */
    this.profileID = auctiondata["profile_id"]
    /**
      * The co-op members. If the profile isn't co-op it's just an array of 1 member.
      * @type {Array<uuid>}
    */
    this.coop = auctiondata["coop"]
    /**
      * If the auction is a bin auction.
      * @type {Boolean}
    */
    this.bin = false
    if (auctiondata["bin"]) { this.bin = true }
    /**
      * The time the auction began.
      * @type {Date}
    */
    this.startTime = new Date(auctiondata["start"])
    /**
      * The time the auction will end.
      * @type {Date}
    */
    this.endTime = new Date(auctiondata["end"])
    /**
      * The item that is being auctioned.
      * @type {AuctionItem}
    */
    this.item = new AuctionItem(auctiondata)
  }
}

/**
  * Represents a bin auction.
  * @hideconstructor
  * @extends Auction
*/
class BinAuction extends Auction {
  constructor(auctiondata) {
    super(auctiondata)
    /**
      * The price the item is going for.
      * @type {Number}
    */
    this.price = auctiondata["starting_bid"]
    /**
      * If the auction was sold. Sold auctions won't appear using skyblock.auctions().
      * @type {Boolean}
    */
    this.sold = auctiondata["claimed"]
  }
}

/**
  * Represents a standard auction bid.
  * @hideconstructor
*/
class StandardAuctionBid {
  constructor(auctionbid) {
    /**
      * The ID of the auction.
      * @type {String}
    */
    this.id = auctionbid["auction_id"]
    /**
      * The bidder's uuid.
      * @type {uuid}
    */
    this.bidder = auctionbid["bidder"]
    /**
      * The profile ID of the bidder.
      * @type {string}
    */
    this.profile = auctionbid["profile_id"]
    /**
      * The bid value.
      * @type {Number}
    */
    this.value = auctionbid["amount"]
    /**
      * The time of the bid.
      * @type {timestamp}
    */
    this.time = new Date(auctionbid["timestamp"])
  }
}

/**
  * Represents a standard auction.
  * @hideconstructor
  * @extends Auction
*/
class StandardAuction extends Auction {
  constructor(auctiondata) {
    super(auctiondata)
    /**
      * The starting bid for the item.
      * @type {Number}
    */
    this.startingBid = auctiondata["starting_bid"]
    /**
      * The highest bid value.
      * @type {Number}
    */
    this.highestBid = auctiondata["highest_bid_amount"]
    /**
      * The bids on this auction.
      * @type {Array<StandardAuctionBid>}
    */
    this.bids = []
    auctiondata["bids"].forEach((bid) => this.bids.push(new StandardAuctionBid(bid)))
  }
}

/**
  * Represents a page of auctions. Each page has up to 1k auctions so to fetch more than that, multiple pages need to be fetched by using client.skyblock.auctions(pagenumber).
  * @constructor
  * @hideconstructor
*/
class AuctionPage {
  constructor(rawauctionpage) {
    /**
      * The page that was loaded.
      * @type {Number}
    */
    this.page = rawauctionpage["page"]
    /**
      * The total amount of auction pages.
      * @type {Number}
    */
    this.pageCount = rawauctionpage["totalPages"]
    /**
      * The total amount of auctions on the network.
      * @type {Number}
    */
    this.auctionCount = rawauctionpage["totalAuctions"]
    /**
      * When the auction page was last updated.
      * @type {Date}
    */
    this.lastUpdate = new Date(rawauctionpage["lastUpdated"])
    /**
      * An array of auctions from the page.
      * @type {Array<BinAuction, StandardAuction>}
    */
    this.auctions = []
    rawauctionpage["auctions"].forEach((auction) => {
      if (auction.bin) {
        this.auctions.push(new BinAuction(auction))
      } else {
        this.auctions.push(new StandardAuction(auction))
      }
    })
  }
}

/**
  * Represents an offer to buy/sell an item on the bazaar. **This includes all of the offers, of a specific price per unit.**
  * @hideconstructor
*/
class BazaarOffer {
  constructor (offer) {
    /**
      * The item amount that are willing to be bought/sold.
      * @type {Number}
    */
    this.amount = offer["amount"]
    /**
      * The price to pay per unit, or to sell per unit.
      * @type {Number}
    */
    this.pricePerUnit = offer["pricePerUnit"]
    /**
      * The amount of orders with this price per unit.
      * @type {Number}
    */
    this.orders = offer["orders"]
  }
}

/**
  * Represents a sell or buy summary on the bazaar.
  * @hideconstructor
*/
class ItemSummary {
  constructor(summarydata) {
    /**
      * The top 30 bazaar offers by priceperunit. There can be multiple orders per price.
      * @type {Array<BazaarOffer>}
    */
    this.allItems = []
    summarydata.forEach((summary) => {
      this.allItems.push(new BazaarOffer(summary))
    })
  }
}

/**
  * Represents a sell summary on the bazaar.
  * @hideconstructor
  * @extends {ItemSummary}
*/
class SellSummary extends ItemSummary {
  constructor(summarydata) {
    super(summarydata)
  }
}

/**
  * Represents a buy summary on the bazaar.
  * @hideconstructor
  * @extends {ItemSummary}
*/
class BuySummary extends ItemSummary {
  constructor(summarydata) {
    super(summarydata)
  }
}

/**
  * Represents a product on the bazaar.
  * @hideconstructor
*/
class BazaarProduct {
  constructor(product) {
    /**
      * Represents the sell summary of the item.
      * @type {SellSummary}
    */
    this.sellSummary = new SellSummary(product["sell_summary"])
    /**
      * Represents the buy summary of the item.
      * @type {BuySummary}
    */
    this.buySummary = new BuySummary(product["buy_summary"])
    /**
      * Represents the product ID.
      * @type {string}
    */
    this.id = product.product_id
  }
}

/**
  * Represents the Skyblock Bazaar.
  * @constructor
  * @hideconstructor
*/
class Bazaar {
  constructor(bazaar) {
    /**
      * Represents when the bazaar was last updated.
      * @type {Date}
    */
    this.lastUpdate = new Date(bazaar["lastUpdated"])
    /**
      * An array of every product on the bazaar.
      * @type {Array<BazaarProduct>}
    */
    this.products = []
    var keys = Object.keys(bazaar["products"])
    for (var k in keys) {
      this.products.push(new BazaarProduct(bazaar["products"][keys[k]]))
    }
  }
}

/**
  * The SkyblockManager which can get information about the current version of the game (such as a list of collections or skills), skyblock news, player information, the bazaar, or the auction house. Accessed through the client, although it doesn't require an API key.
  * @constructor
  * @hideconstructor
*/
class Skyblock {
  constructor(key) {
    this.key = key
  }
  /**
    * The current skyblock collections.
  */
  get collections() { return new Promise((resolve, reject) => {
      require('./skyblock/base.js').collections().then((collections) => {
        resolve(collections)
      })
    })}
  /**
    * The current skyblock skills.
  */
  get skills() { return new Promise((resolve, reject) => {
      require('./skyblock/base.js').skills().then((skills) => {
        resolve(skills)
      })
    })}
  /**
    * The current skyblock news.
  */
  get news() { return new Promise((resolve, reject) => {
      require('./skyblock/base.js').news(this.key).then((news) => {
        resolve(news)
      })
  })}
  /**
    * Gets the current skyblock auctions (on a specific page). If you want to know how many auctions there are, check the metadata from page 0. This **doesn't** count towards your api key requests!
    * @param {Number} page - The auction house page to get auctions from.
    * @return {Promise<AuctionPage>}
  */
  auctions(page) { return new Promise((resolve, reject) => {
    require('./skyblock/base.js').auctions(page).then((auctions) => {
      resolve(new AuctionPage(auctions))
    })
  })}

  /**
    * Gets (an) auction(s) based on the auction id, auctioneer uuid, or the skyblock profile id.
    * @param {string} type - The type of query
    * @param {string} param - The query.
    * @return {Promise<Array<StandardAuction, BinAuction>>}
    * @example
    * client.skyblock.auctionsOf('player', '16751f79-c0b1-4e53-a0b5-90d31fc1d80d') //gets a player's auctions
    * @example
    * client.skyblock.auctionsOf('profile', '7fc500db5f8f4e81916ce77bbab9a8a8') //gets a skyblock profile's auctions
    * @example
    * client.skyblock.auctionsOf('auction_uuid', '8baabb83baa04bfabf26b430f68be90b') //gets an auction based on it's uuid (this still returns an array)
  */
  auctionsOf(type, param) { return new Promise((resolve, reject) => {
    require('./skyblock/base.js').auctionsOf(type, param, this.key).then((auctions) => {
      var allauctions = []
      auctions.auctions.forEach((auction) => {
        if (auction.bin) {
          allauctions.push(new BinAuction(auction))
        } else {
          allauctions.push(new StandardAuction(auction))
        }
      })
      resolve(allauctions)
    })
  })}
  /**
    * Get a profile by a profile UUID.
    * **Every profile has it's own UUID. The UUID is not the uuid of a member.**
    * Use players.skyblockProfiles(uuid) to get a player's profiles. This will already load the information of all of their profiles. Then check the profile.uuid to get the profile's uuid. If you already fetched a player's profile, you don't need to use this command. The use of this command is recommended if you want to run timely checks on a specific profile. This does not count towards the api-key limit.
  */
  /**
    * Get the hypixel bazaar data. Including all of the products, 30 top orders, and quick status values.
    * @type {Promise<Bazaar>}
  */
  get bazaar() { return new Promise((resolve, reject) => {
    require('./skyblock/base.js').bazaar().then((bazaar) => {
      resolve(new Bazaar(bazaar))
    })
  })}
}

exports.sb = Skyblock;
