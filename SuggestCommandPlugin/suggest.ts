import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { TextChannel } from 'discord.js';
import { checkIconUrl, greenColor, mainColor } from '../../handlers/locale';
import { discordClient } from '../../main';

class SuggestionCommand extends Command {
    constructor() {
        super({
            trigger: "suggest",
            description: "Suggest a suggestion.",
            type: "ChatInput",
            module: "utilities",
            args: [
              {
                    trigger: 'suggestion',
                    description: 'Say here what you wanna suggest.',
                    isLegacyFlag: false,
                    required: true,
                    type: 'String',
              }
            ]
        });
    }

    async run(ctx: CommandContext) {
      const channel = await discordClient.channels.fetch('886587818049171487') as TextChannel;
      channel.send({
             embeds: [
               {
                 author: {
                     name: 'Suggestion',
                     },
                 description: (ctx.args['suggestion']),
                 color: mainColor,
                 timestamp: new Date(),
                 footer: {
                     text: `Suggested by: ${ctx.user.tag}`,
                     iconURL: ctx.user.displayAvatarURL({dynamic: true})
               },
             }
           ]
       }).then(sentMessage => {
        sentMessage.react('👍')
        sentMessage.react('🤷')
        sentMessage.react('👎')
        sentMessage.startThread({ name: 'Suggestion', autoArchiveDuration: 1440, reason: 'Because someone send a suggestion.' })
      }).catch(console.error);
      
      return ctx.reply({
        embeds: [
          {
            author: {
              name: 'Success!',
              iconURL: checkIconUrl,
            },
            description: 'You Successfully suggested a suggestion.',
            color: greenColor,
          }
         ]
       })
     }
 }

export default SuggestionCommand;
