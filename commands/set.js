const Discord = require("discord.js");
const fs = require('fs-extra')
let config = require('../config.json')

module.exports.run = async(client, message, args) => {

    let config = JSON.parse(fs.readFileSync('./config.json'))

    let ex = config.phrase
    config.phrase = args.join(" ")

    fs.writeFileSync('./config.json', JSON.stringify(config))

    let embed = new Discord.MessageEmbed()
        .addField('Ancien message :', ex)
        .addField('Nouveau message :', config.phrase)

    message.channel.send(embed)
}

module.exports.help = {
    name: "set"
}