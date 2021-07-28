const https = require('https')
const fs = require('fs')
exports.collections = () => {
    return getFriends = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/resources/skyblock/collections`
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let collections = JSON.parse(Buffer.concat(chunks).toString())
          if (collections.success) {
            resolve(collections["collections"])
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}

exports.skills = () => {
    return getSkills = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/resources/skyblock/skills`
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let skills = JSON.parse(Buffer.concat(chunks).toString())
          if (skills.success) {
            resolve(skills["skills"])
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}

exports.news = (key) => {
  return getNews = new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      hostname: 'api.hypixel.net',
      path: `/skyblock/news`,
      headers: {
        'API-Key': key
      }
    }
    let request = https.request(options, (res) => {
      let chunks = []
      res.on("data", chunk => chunks.push(chunk))
      res.on("end", chunk => {
        let news = JSON.parse(Buffer.concat(chunks).toString())
        if (news.success) {
          resolve(news["items"])
        } else {
          throw new Error('hi')
        }
      })
    })
    request.end()
  })
}

exports.auctions = (page) => {
  return auctions = new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      hostname: 'api.hypixel.net',
      path: '/skyblock/auctions',
    }
    let request = https.request(options, (res) => {
      let chunks = []
      res.on("data", chunk => chunks.push(chunk))
      res.on("end", chunk => {
        let auctions = JSON.parse(Buffer.concat(chunks).toString())
        if (auctions.success) {
          resolve(auctions)
        } else {
          reject('An error occured while loading the auctions.')
        }
      })
    })
    request.end()
  })
}

exports.auctionsOf = (type, param, key) => {
  return auctions = new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      hostname: 'api.hypixel.net',
      path: '/skyblock/auction',
      headers: {
        'API-Key': key
      }
    }
    if (type == 'auction_uuid') options['path'] = options['path'] + `?uuid=${param}`
    if (type == 'player') options['path'] = options['path'] + `?player=${param}`
    if (type == 'profile') options['path'] = options['path'] + `?profile=${param}`
    let request = https.request(options, (res) => {
      let chunks = []
      res.on("data", chunk => chunks.push(chunk))
      res.on("end", chunk => {
        let auctions = JSON.parse(Buffer.concat(chunks).toString())
        if (auctions.success) {
          resolve(auctions)
        } else {
          reject('An error occured while loading the auctions.')
        }
      })
    })
    request.end()
  })
}

exports.bazaar = () => {
  return bazaar = new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      hostname: 'api.hypixel.net',
      path: '/skyblock/bazaar'
    }
    let request = https.request(options, (res) => {
      let chunks = []
      res.on("data", chunk => chunks.push(chunk))
      res.on("end", chunk => {
        let bazaar = JSON.parse(Buffer.concat(chunks).toString())
        if (bazaar.success) {
          resolve(bazaar)
        } else {
          reject('An error occured while loading the bazaar.')
        }
      })
    })
    request.end()
  })
}
