/* eslint-env jquery */


function setImage(searchedForText, responseContainer){

    /**
     * 
     * @param {JSON} images 
     */
    function addImage(images) {
        const firstImage = images.results[0];
        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                <img src="${firstImage.urls.small}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`
        );
    }// end addImage()
    // JQuery Ajax
    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers:{
            Authorization: 'Client-ID hyMBtA6_pX0m9dE0fBXqMfPl_PPJpwtGYXzy3BZ62Ck'
        }
    }).done(addImage);

} // end setImage()



function setArticles(searchedForText,responseContainer){

    let artURL = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=
                ${searchedForText}&api-key=WmV9b6aD60b1XDLOJyf01QOLvHwpia6Z`;

    function addArticles(articles){
        // the returned response
        const artData = articles;
        // if artData has content
        if(artData.response && artData.response.docs && artData.response.docs.length > 1){
            // then
            htmlContent = "<ul>" + artData.response.docs.map(article => 
                `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p></li>`).join('') + '</ul>';
        } else {
            // display error
            htmlContent = "<div class='error-no-articles'> no articles available </div>";
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
        responseContainer.insertAdjacentHTML("beforeend", htmlContent);
    }// end addArticles()
        
    // JQuery Ajax
    $.ajax({
        url: artURL,
    }).done(addArticles);

}// end setArticles()


(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        setImage(searchedForText, responseContainer);
        setArticles(searchedForText,responseContainer);



    });
})();
