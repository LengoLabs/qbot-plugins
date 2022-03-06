import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { mainColor } from '../../handlers/locale';

class EightballCommand extends Command {
    constructor() {
        super({
            trigger: "8ball",
            description: "Ask some questions to magic 8-ball!",
            type: "ChatInput",
            module: "utillities",
            args: [
              {
                    trigger: 'question',
                    description: 'Put your question here.',
                    isLegacyFlag: false,
                    required: true,
                    type: 'String',
              }
            ]
        });
    }

    async run(ctx: CommandContext) {
      
    const answers = ['It is certain.', 'Reply hazy, try again.', "Don't count on it.", 'It is decidedly so.', 'Ask again later.', 'My reply is no.', 'Without a doubt.', 'Better not tell you now.', 'My sources say no.', 'Yes - definitely.', 'Cannot predict now.', 'Outlook not so good.', 'You may rely on it.', 'Concentrate and ask again.', 'Very doubtful.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'No.'
    ];
      const result = Math.floor((Math.random() * answers.length));
      
      return ctx.reply({
        embeds: [
          {
            author: {
              name: '🎱 Magic 8-ball',
            },
            fields: [
              {
                name: 'Question',
                value: ctx.args['question']
              },
              {
                name: 'Answer',
                value: answers[result]
              },
            ],
          color: mainColor, 
            footer: {
              text: ctx.user.tag,
              iconURL: ctx.user.displayAvatarURL({ dynamic: true })
            }
          }
        ]
      })
    }
}

export default EightballCommand;
