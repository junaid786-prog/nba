// cateory seller details budet delivery time
// is pro is online same country
class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
    this.object = {}
    this.total = 0
  }

  search() {
    const keywordForSearch = this.queryStr.keyword
      ? {
          $and: [
            {
              title: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {}
    this.query = this.query.find({ ...keywordForSearch })
    return this
  }
  cInclude(key, val) {
    const options = ["$gt", "$gte", "$lt", "$lte"]
    options.forEach((op) => {
      if (op === key) {
        this.object[`${op}`] = val
      }
    })
  }
  filter() {
    let copyStr = { ...this.queryStr } // this will provide value of object this.queryStr not address
    // For Price And Reviews etc firstly make string so we can make gt to $gt in mongodb
    let queryStr = JSON.stringify(copyStr)
    // in queryStr where you find gt convert it to $gt
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
    queryStr = JSON.parse(queryStr)
    for (let key in queryStr) {
      this.cInclude(key, queryStr[key])
    }
    queryStr["packages.package_price"] =
      this.object == {} ? { $gt: "0" } : this.object
    if (queryStr["status"]) {
      queryStr["gig_seller.status"] = queryStr["status"]
    }

    if (queryStr.category && queryStr.category !== "") {
      queryStr["category"] = {
        $regex: queryStr.category,
        $options: "i",
      }
    } else delete queryStr["category"]

    if (queryStr["gig_rating"]) {
      let val = queryStr["gig_rating"]
      queryStr["gig_rating"] = { $gte: val }
    }

    this.query = this.query.find(queryStr)
    return this
  }

  // RPP -> Result Per Page
  pagenation(RPP) {
    let currentPage = this.queryStr.page || 1 // page is provided in url(query) if not then by default ist page
    let skippedProducts = (currentPage - 1) * RPP // skip how much products are displayed on previous pages

    this.query = this.query.limit(RPP).skip(skippedProducts)
    return this
  }
}

module.exports = APIFeatures
