const chalk = require('chalk')
const dedent = require('dedent')
const uuid = require('uuid/v4')

const generateList = () => {
  const prizeItems = ['Solcellsladdare', 'Tröstpris']

  const output = prizeItems
    .map(item => {
      const numberOfPrizes = item === 'Solcellsladdare' ? 25 : 70

      return [...Array(numberOfPrizes).keys()].map(() => {
        return {
          item,
          id: uuid(),
          found: false,
        }
      })
    })
    .reduce((prev, curr) => prev.concat(curr), [])

  return JSON.stringify(output, null, 2)
}

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Output prize and stats in console
 */
let NUMBER_OF_SPINS = 0

const displayStats = ({ prize, availablePrizes, allPrizes, spinsLeft }) => {
  process.stdout.write('\x1B[2J\x1B[0f')

  const prizeAsString = JSON.stringify(prize, null, 2)

  NUMBER_OF_SPINS += 1

  console.log(
    dedent(`
      ${chalk.blue('LOTTERY STATISTICS')}
      ${chalk.gray('======================================')}
      Number of available prizes: ${availablePrizes.length} 
      Number of spins: ${NUMBER_OF_SPINS}
      Spins left: ${spinsLeft}
      Change of winning: ${(availablePrizes.length / allPrizes.length) * 100}%
  
      ${chalk.blue('LAST SPIN')}
      ${chalk.gray('======================================')}
      ${
        prize.item === 'Nitlott'
          ? chalk.red(prizeAsString)
          : chalk.green(prizeAsString)
      }
    `)
  )
}

module.exports = {
  displayStats,
  generateList,
  shuffle,
}
