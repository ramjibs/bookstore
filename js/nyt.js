class NYTBookStore {
    #apikey
    constructor() {
        // nyt apis
        this.#apikey = "api-key=Np3DBpRsd74o0ZrDG4NVtaKGVkHNybTR"

    }
    /**
     * Fuction used to fetch data from NYT
     * @param {URL} api 
     * 
     */
    async #fetchData(api) {
        const response = await fetch(api)
        if (response.ok) {
            return response.json()
        }

        return response.json().then(err => {
            return Promise.reject({
                status: response.status,
                statusText: response.statusText,
                erroMessage: err
            })
        })
    }
    /**
     * Get Best Sellers list. If no date is provided returns the latest list.
     * @param {string} genre - Genre of the books
     * @param {Date} [bestsellerDate] - The week-ending date for the sales reflected on list-name. 
     * @param {Date} [publishedDate] - The date the best sellers list was published on NYTimes.com 
     * @param {number} [offset] - Sets the starting point of the result set (0, 20, ...). Used to paginate thru books 
     *  @returns {Promise} Promise object represents the response
     */

    async getGenreByBestSellers(genre = "hardcover-fiction", bestsellerDate, publishedDate, offset) {
        let api = `https://api.nytimes.com/svc/books/v3/lists.json?${this.#apikey}&list=${genre}`
        bestsellerDate ? api += `&bestsellers-date=${bestsellerDate}` : api
        publishedDate ? api += `&published-date=${publishedDate}` : api
        offset ? api += `&offset=${offset}` : api
        return this.#fetchData(api)

    }


    /**
     * Get Best Sellers Genre names.
     *  @returns {Promise} Promise object represents the response 
     */

    async getGenreAll() {

        let api = `https://api.nytimes.com/svc/books/v3/lists/names.json?${this.#apikey}`
        return this.#fetchData(api)


    }

    /**
     * Get Best Sellers Genre by date.
     * @param {date} date - The date the best sellers list was published on NYTimes.com. Default "current" to get latest list.
     * @param {string} genre - Genre of the books
     * @param {number} [offset] - Sets the starting point of the result set (0, 20, ...). Used to paginate thru books 
     * @returns {Promise} Promise object represents the response
     * 
     */

    async getGenreByDate(date = "current", genre = "hardcover-fiction", offset) {
        let api = `https://api.nytimes.com/svc/books/v3/lists/${date}/${genre}.json?${this.#apikey}`
        offset ? api += `&offset=${offset}` : api
        return this.#fetchData(api)


    }
    /**
     * Get Best Sellers Genre history.
     * @param {string} [ageGroup] - The target age group for the best seller.
     * @param {string} [author] - The author of the best seller. 
     * @param {string} [contributor] - The author of the best seller, as well as other contributors such as the illustrator 
     * @param {string} [isbn] - International Standard Book Number, 10 or 13 digits
     * @param {string} [price] - The publisher's list price of the best seller, including decimal point.
     * @param {string} [publisher] - The standardized name of the publisher
     * @param {string} [title] - The title of the best seller.
     * @param {number} [offset] - Sets the starting point of the result set (0, 20, ...). Used to paginate thru books 
     * 
     */

    async getGenreByHistory(ageGroup, author, contributor, isbn, offset, price, publisher, title) {
        let api = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?${this.#apikey}`
        ageGroup ? api += `&age-group=${ageGroup}` : api
        author ? api += `&author=${author}` : api
        contributor ? api += `&contributor=${contributor}` : api
        isbn ? api += `&isbn=${isbn}` : api
        offset ? api += `&offset=${offset}` : api
        price ? api += `&price=${price}` : api
        publisher ? api += `&publisher=${publisher}` : api
        title ? api += `&title=${title}` : api
        return this.#fetchData(api)
    }

    /**
    * Get top 5 books for all the Best Sellers lists for specified date.
     * @param {string} [publisher_date] - The best-seller list publication date. You do not have to specify the exact date the list was published
    * 
    */

    async getGenreOverviewByDate(published_date) {
        let api = `https://api.nytimes.com/svc/books/v3/lists/overview.json?${this.#apikey}`
        published_date ? api += `&published_date=${published_date}` : api
        return this.#fetchData(api)
    }

    /**
    * Get top 5 books for all the Best Sellers lists for specified date.
    * @param {string} [author] - The author of the best seller. 
    * @param {string} [isbn] - International Standard Book Number, 10 or 13 digits
    * @param {string} [title] - The title of the best seller.
    * 
    */

    async getGenrReview(author,isbn,title) {
        let api = `https://api.nytimes.com/svc/books/v3/reviews.json?${this.#apikey}`
        author ? api += `&author=${author}` : api
        isbn ? api += `&isbn=${isbn}` : api
        title ? api += `&title=${title}` : api
        return this.#fetchData(api)
    }
}


export default NYTBookStore


