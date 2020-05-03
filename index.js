const cheerioClient = require('cheerio-httpcli')
const {createObjectCsvWriter} = require('csv-writer')
if (process.argv.length < 5) {
  throw new Error('Not enough args')
}
const file = process.argv[2]
const num = Number(process.argv[3])
const q = process.argv.filter((_, i) => i >= 4).join(' ')
const csvfilepath =  __dirname+`/${file}.csv`
const csvWriter = createObjectCsvWriter({
    path: csvfilepath,
    header: ['name', 'href', 'summary'],
    encoding:'utf8',
    append :false, // append : no header if true
})

const searchClearly = async (url, request, clearly) => {
  try {
    const cheerioResult = await cheerioClient.fetch(url, request)
    if (cheerioResult.error) {
      throw new Error(cheerioResult.error)
    }
    return clearly(cheerioResult.$)
  } catch {
    return []
  }
}

const searchClearlyByGoogle = async (request) => {
  return await searchClearly('http://www.google.com/search', request, ($) => {
    const results = []
    $("div[class='g']").each(function (idx) {
      const target = $(this)
      const anchor = target.find('a').eq(0)
      const summary = target.find("span[ class='st']").eq(0)

      results.push({
        name: anchor.text(),
        href: anchor.attr("href"),
        summary: summary.text(),
      })
    })
    return results
  })
}

const main = async () => {
  const request = { q, num }
  const list = await searchClearlyByGoogle(request)
  await csvWriter.writeRecords(list)
}



main()
