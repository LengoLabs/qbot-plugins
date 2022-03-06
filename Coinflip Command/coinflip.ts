import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { MessageEmbed, Message } from 'discord.js';
import { mainColor } from '../../handlers/locale';

class CoinflipCommand extends Command {
    constructor() {
        super({
            trigger: "coinflip",
            description: "Play coinflip.",
            type: "ChatInput",
            module: "utillities",
        });
    }

    async run(ctx: CommandContext) {

      var coin = Math.round(Math.random() * 2);

  let coinURL
  let coinflip
if (coin == 1) {
  coinflip = "Heads";
  coinURL = "https://i.gyazo.com/a77fa462ac331b7f8192856e20a8ac76.png";
} else {
  coinflip = "Tails";
  coinURL = "https://gyazo.com/432eba8f2d2ccb758f70d2a2e5f4192a.png";
}

const result = new MessageEmbed()
      .setAuthor({ name: ctx.user.tag, iconURL: ctx.user.displayAvatarURL({ dynamic: true }) })
      .setDescription('**Flipped Coin**')
      .setImage(coinURL)
      .setColor(mainColor)

const flippingCoin = new MessageEmbed()
      .setDescription('**Flipping Coin...**')
      .setColor(mainColor)
      .setFooter(coinflip)
      .setTimestamp()
      
      let msg = await ctx.reply({ embeds: [flippingCoin], fetchReply: true }).then(msg => setTimeout(() => (msg as Message).edit({ embeds: [result] }), 5000));
      
    }
}
export default CoinflipCommand;
