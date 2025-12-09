'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event)

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    console.log(activeLinks);
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    console.log(activeArticles);
    for(const activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    console.log(clickedElement.getAttribute('href'));
    const articleLinkedToClickedElement = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const articleLinkedToClickedLink = document.querySelector(articleLinkedToClickedElement);
    console.log(articleLinkedToClickedLink);

    /* add class 'active' to the correct article */
    articleLinkedToClickedLink.classList.add('active');

}
// list with articles
// const links = document.querySelectorAll('.titles a');
// console.log('links:', links);
// for(const link of links){
//   link.addEventListener('click', titleClickHandler);
// }


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (const article of articles){
        console.log(article);

        /* get the article id */
        const articleId = article.getAttribute('id');
        console.log(articleId);
        
        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

        // titleList.innerHTML = titleList.innerHTML + linkHTML;

        /* insert link into html variable */
        html = html + linkHTML;
        // console.log('html', html);
    }

    titleList.innerHTML = html;

    // list with articles
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
    for(const link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();
