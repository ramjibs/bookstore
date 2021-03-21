function createBook(prop,id) {

    const card = document.createElement("div")
    card.appendChild(createImg(prop.book_image))
    card.id = id
    card.className =  "custom-card"
    return card
}

function createBookSimilar(prop,id) {

    const card = document.createElement("div")
    card.appendChild(createImg(prop.book_image))
    card.id = id
    card.className =  "poped-book"
    return card
}

function createImg(imgsrc) {
    const img = document.createElement("img")
    img.dataset.book = "book"
    img.className = "book-img"
    img.src = imgsrc
    return img
}

function createGenreName(name) {
    const genreName = document.createElement("h5")
    genreName.innerText = name
    genreName.className = "genre-name"
    return genreName
}

function createGenre(genreObj) {

    const genre = document.createElement("div")
    genre.className = "overview-content"
    genre.id = genreObj.list_name_encoded
    const genreBooks = document.createElement("div")
    genreBooks.className = "overview-books"
    genre.appendChild(createGenreName(genreObj.list_name))
    for (let index = 0; index < genreObj.books.length; index++) {
        const element = genreObj.books[index];
        genreBooks.appendChild(createBook(element,index))
    }
    genre.appendChild(genreBooks)
    return genre
}

function renderOverview(genre,renderAt) {
    let genreLength = genre.length
    const overviewSection = document.createElement("section")
    overviewSection.setAttribute("id", "overviewsection")
    for (let index = 0; index < genreLength; index++) {
        const element = genre[index];
        overviewSection.appendChild(createGenre(element))
        let option = document.createElement("option")
        option.value = element.list_id
        option.innerText = element.display_name
        
    }
    renderAt.appendChild(overviewSection)
    return overviewSection
}


function renderGenreInSelect(genre,renderAt){
    let genreLength = genre.length
    let optionDefault = document.createElement("option")
    optionDefault.value = 'all'
    optionDefault.innerText = 'All'
    optionDefault.selected = true
    renderAt.appendChild(optionDefault)
    for (let index = 0; index < genreLength; index++) {
        const element = genre[index];
        let option = document.createElement("option")
        option.value = element.list_name_encoded    
        option.innerText = element.display_name
        renderAt.appendChild(option)
    }
}

function showPopup(popup){
    popup.style.display = "flex"
}

function hidePopUp(popup){
    popup.style.display = "none"
}


function renderBookContent(bookDetails, renderAt){
   
    const popedBook = document.getElementById("popedimg")
    popedBook.src = bookDetails.book_image
    const title = document.getElementById("title")
    title.innerText = bookDetails.title
    const author = document.getElementById("author")
    author.innerText = bookDetails.author
    const contributor = document.getElementById("contributor")
    contributor.innerText = bookDetails.contributor
    const publisher = document.getElementById("publisher")
    publisher.innerText = bookDetails.publisher
    const description = document.getElementById("description")
    description.innerText = bookDetails.description

    const buyLinks = document.getElementById("buylinks")
    buyLinks.innerHTML = ''
    for (let index = 0; index < bookDetails.buy_links.length; index++) {
        const element = bookDetails.buy_links[index];
        let link = document.createElement("a")
        link.innerText = element.name
        link.href = element.url
        link.target = "_blank"
        buyLinks.appendChild(link)
        link = null
        
    }
    
}

function renderReviewContent(reviews,renderAt){
    let len = reviews.num_results
    renderAt.innerHTML = ''
    if(len == 0){
        let defRev = document.createElement("p")
        defRev.className = "default-review"
        defRev.id = "default-review"
        defRev.innerText = "No reviews found for this book"
        renderAt.appendChild(defRev)
    }
    else{
        
        for (let index = 0; index < reviews.results.length; index++) {
            const element = reviews.results[index];
            let byline = document.createElement("label")
            byline.innerText = element.byline
            let summary = document.createElement("p")
            summary.innerText = element.summary
            summary.className = "summary"
            let url = document.createElement("a")
            url.innerText = "Read in detail..."
            url.href = element.url
            url.target = "_blank"
            renderAt.appendChild(byline)
            renderAt.appendChild(summary)
            renderAt.appendChild(url)

        }
    }
}


function renderSimilarBooks(genreObj,renderAt) {

    renderAt.innerHTML = ''
    for (let index = 0; index < genreObj.books.length; index++) {
        const element = genreObj.books[index];
        renderAt.appendChild(createBookSimilar(element,index))
    }
    
}

export {renderOverview,renderGenreInSelect, showPopup, hidePopUp,
    renderBookContent,renderReviewContent ,renderSimilarBooks}