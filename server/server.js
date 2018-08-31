const cors = require('cors')
const express = require('express')
const fs = require('fs')
const Random = require('random-js')
const random = new Random(Random.engines.mt19937().autoSeed())
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const { displayStats, shuffle } = require('./utils')
const uuid = require('uuid/v4')

let SPINS_LEFT = 100
const PRIZES = `${__dirname}/prizes.json`

const app = express()

app.use(cors())

app.get('/', async (req, res, next) => {
  const prizeList = await readFile(PRIZES, 'utf8')
  const prizes = JSON.parse(prizeList)

  const NUMBER_OF_BLANK_PRIZES = SPINS_LEFT - prizes.length

  const availablePrizes = prizes.filter(prize => prize.found === false)

  if (availablePrizes.length === 0) {
    console.log('ALL PRICES ARE GONE')

    res.send({
      item: 'ALL PRICES ARE GONE',
      id: '2',
      found: true,
    })

    return next()
  }

  const blankPrizes = [...Array(NUMBER_OF_BLANK_PRIZES)].map(() => ({
    item: 'Nitlott',
    id: uuid(),
    found: false,
  }))

  const allPrizes = shuffle(availablePrizes.concat(blankPrizes))

  const randomValue = random.integer(0, allPrizes.length)
  const foundPrize = allPrizes[randomValue]

  const newPrizes = prizes.map(prize => {
    if (prize.id === foundPrize.id) {
      return {
        ...prize,
        found: true,
      }
    }

    return prize
  })

  await writeFile(PRIZES, JSON.stringify(newPrizes, null, 2), 'utf8')

  const prize = {
    ...foundPrize,
    found: true,
  }

  res.send(prize)

  displayStats({ prize, availablePrizes, allPrizes, spinsLeft: SPINS_LEFT })
  SPINS_LEFT -= 1

  return next()
  // try {
  //   const randomValue = random.integer(0, prizes.length * 10)
  //   const foundPrize = prizes[randomValue]

  //   if (foundPrize && foundPrize.found === false) {
  //     const newPrizes = prizes.map(prize => {
  //       if (prize.id === foundPrize.id) {
  //         return {
  //           ...prize,
  //           found: true,
  //         }
  //       }

  //       return prize
  //     })

  //     await writeFile(
  //       `${__dirname}/prizes.json`,
  //       JSON.stringify(newPrizes, null, 2),
  //       'utf-8'
  //     )

  //     res.send({
  //       ...foundPrize,
  //       found: true,
  //     })

  //     return next()
  //   }

  //   res.send({
  //     item: 'Nitlott',
  //     id: '1',
  //     found: true,
  //   })

  //   return next()
  // } catch (error) {
  //   return next(error)
  // }
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))

// console.log(generateList())
