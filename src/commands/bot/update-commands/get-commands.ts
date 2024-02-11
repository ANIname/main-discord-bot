import prisma from '../../../../services/prisma'

export const getSlashCommands = () => prisma.discordBotSlashCommand.findMany({
  select: {
    name: true,
    description: true,
    default_member_permissions: true,
    dm_permission: true,
    nsfw: true,

    name_localizations: {
      select: {
        uk: true,
        ru: true,
      }
    },

    description_localizations: {
      select: {
        uk: true,
        ru: true
      }
    },

    options: {
      select: {
        name: true,
        description: true,
        type: true,
        required: true,

        name_localizations: {
          select: {
            uk: true,
            ru: true,
          }
        },

        description_localizations: {
          select: {
            uk: true,
            ru: true
          }
        },

        choices: {
          select: {
            name: true,
            value: true,

            name_loacalizations: {
              select: {
                uk: true,
                ru: true,
              }
            }
          }
        }
      }
    }
  }
})

export const getContextMenuCommands = () => prisma.discordBotContextMenuCommand.findMany({
  select: {
    name: true,
    type: true,
    default_member_permissions: true,
    dm_permission: true,

    name_localizations: {
      select: {
        uk: true,
        ru: true,
      }
    }
  }
})

export const getCommands = () =>
  Promise
  .all([getSlashCommands(), getContextMenuCommands()])
  .then(([...commands]) => commands.flat())