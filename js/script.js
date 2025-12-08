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

const links = document.querySelectorAll('.titles a');

for(const link of links){
  link.addEventListener('click', titleClickHandler);
}

