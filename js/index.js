// imports
import NYTBookStore from './nyt.js'
import {
    renderOverview, renderGenreInSelect, showPopup,
    hidePopUp, renderBookContent,renderReviewContent,renderSimilarBooks
} from './overview.js'
// Variables

var genreOverview
var similarGenreOverview
const bookstore = new NYTBookStore();
const closestPublish = document.getElementById("publish_date");
const genresSelect = document.getElementById("genres");
const overviewContainer = document.getElementById("overview-container");
const popup = document.getElementById("popup");
const similarContainer = document.getElementById("similar-container")
// Functions 
function filterGenre(event) {
    let selectedID = event.target.value
    let overviewSection = document.getElementById("overviewsection");
    let childArr = [...overviewSection.childNodes]
    if (selectedID == 'all') {
        childArr.forEach(function (item) {
            item.style.display = "block"
        })
    }
    else {
        childArr.forEach(function (item) {
            if (item.id == selectedID) {
                if (item.style.display == "none") {
                    item.style.display = "block"
                }
            }
            else {
                item.style.display = "none"
            }
        })
    }


}
function publishDateHandler(event) {
    Overview.then(removeOverview => removeOverview())
    Overview = generateOverview(event.target.value)
}
function expandBookHanlder(event) {
    if (event.target.dataset.book !== undefined) {
       
        let bookDetails = getBookDetailsFromOveriew(event)
        renderBookContent(bookDetails, document.getElementById("book-content"))
        let reviews = getReviewOfBook(undefined, undefined, bookDetails.title)
        reviews.then(data => {
            renderReviewContent(data,document.getElementById("review-container"))
        })
        generateSimilarGenreOverview(event.path[3].id)
        showPopup(popup)
    }
}

function expandSimilarBookHanlder(event) {
    if (event.target.dataset.book !== undefined) {
       
        let bookDetails = getBookDetailsSimilarOveriew(event)
        renderBookContent(bookDetails, document.getElementById("book-content"))
        let reviews = getReviewOfBook(undefined, undefined, bookDetails.title)
        reviews.then(data => {
            renderReviewContent(data,document.getElementById("review-container"))
        })
        
    }
}
function generateOverview(date) {
    const removeOverview = bookstore.getGenreOverviewByDate(date)
        .then(data => {
            genreOverview = data.results.lists
            let overviewSection = renderOverview(genreOverview, overviewContainer)
            overviewSection.addEventListener('click', expandBookHanlder)
            renderGenreInSelect(genreOverview, genresSelect)
            return function () {
                genresSelect.innerHTML = ''
                overviewSection.removeEventListener('click', expandBookHanlder)
                overviewContainer.removeChild(overviewSection)
            }
        })
    return Promise.resolve(removeOverview)

}

function generateSimilarGenreOverview(list_name_encoded){
    const similarOverview = bookstore.getGenreByDate(undefined,list_name_encoded)
        .then(data =>{
            similarGenreOverview = data.results
            renderSimilarBooks(similarGenreOverview,similarContainer)
            
        })
}

function hidePopUpHandler(){
    hidePopUp(popup)
}
function getBookDetailsFromOveriew(event) {

    let list_name_encoded = event.path[3].id
    let book_index = event.path[1].id
    let book;
    for (const objGenre of genreOverview) {
        if (objGenre.list_name_encoded == list_name_encoded) {
            book = objGenre.books[book_index]
        }
    }

    return book
}

function getBookDetailsSimilarOveriew(event) {

    let book_index = event.path[1].id
    let book;

    return similarGenreOverview.books[book_index]
}

async function getReviewOfBook(author, isbn, bookName) {
    let reviews = await bookstore.getGenrReview(author, isbn, bookName)
    return reviews
}
let Overview = generateOverview()

closestPublish.addEventListener("change", publishDateHandler);
genresSelect.addEventListener('change', filterGenre)
similarContainer.addEventListener('click',expandSimilarBookHanlder)
document.getElementById("hidePopUp").addEventListener('click', hidePopUpHandler)





