const https = require('https')
const fs = require("fs")

exports.get = (uuid, key) => {
    return getPlayer = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/player?uuid=${uuid}`,
        headers: {
          'API-Key': key
        }
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let playerdata = JSON.parse(Buffer.concat(chunks).toString())
          if (playerdata.success) {
            resolve(playerdata)
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}

exports.friends = (uuid, key) => {
    return getFriends = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/friends?uuid=${uuid}`,
        headers: {
          'API-Key': key
        }
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let playerdata = JSON.parse(Buffer.concat(chunks).toString())
          if (playerdata.success) {
            resolve(playerdata)
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}

exports.game = (uuid, key) => {
    return getFriends = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/status?uuid=${uuid}`,
        headers: {
          'API-Key': key
        }
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let playerdata = JSON.parse(Buffer.concat(chunks).toString())
          if (playerdata.success) {
            resolve(playerdata)
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}

exports.skyblockProfiles = (uuid, key) => {
    return getSkyblockProfiles = new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        hostname: 'api.hypixel.net',
        path: `/skyblock/profiles?uuid=${uuid}`,
        headers: {
          'API-Key': key
        }
      }
      let request = https.request(options, (res) => {
        let chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", chunk => {
          let profiles = JSON.parse(Buffer.concat(chunks).toString())
          if (profiles.success) {
            resolve(profiles)
          } else {
            throw new Error('hi')
          }
        })
      })
      request.end()
    })
}
