'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  /*console.log('Link was clicked!');
  console.log(event);*/

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  //console.log(activeLinks);
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  /*console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);*/
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  //console.log(activeArticles);
  for(const activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  //console.log(clickedElement.getAttribute('href'));
  const articleLinkedToClickedElement = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const articleLinkedToClickedLink = document.querySelector(articleLinkedToClickedElement);
  //console.log(articleLinkedToClickedLink);

  /* add class 'active' to the correct article */
  articleLinkedToClickedLink.classList.add('active');

};
// list with articles
// const links = document.querySelectorAll('.titles a');
// console.log('links:', links);
// for(const link of links){
//   link.addEventListener('click', titleClickHandler);
// }


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-title';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (const article of articles){
    //console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
        
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    // titleList.innerHTML = titleList.innerHTML + linkHTML;

    /* insert link into html variable */
    html = html + linkHTML;
    // console.log('html', html);
  }

  titleList.innerHTML = html;

  // list with articles
  const links = document.querySelectorAll('.titles a');
  //console.log('links:', links);
  for(const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();



function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('article');
  //console.log(articles);

  /* START LOOP: for every article: */
  for (const article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    //console.log(dataTags);

    /* split tags into array */
    const arrayWithTags = dataTags.split(' ');
    //console.log(arrayWithTags);

    /* START LOOP: for each tag */
    for (const tag of arrayWithTags){
      //console.log(tag);
      /* generate HTML of the link */
      const htmlLinkForTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html += htmlLinkForTag;

      /* END LOOP: for each tag */
    }
    //console.log(html);
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

}

generateTags();





function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag);
  /* find all tag links with class active */
  const tagLinksWithActiveClass = document.querySelectorAll('.list .active');
  console.log('tagLinksWithActiveClass', tagLinksWithActiveClass);

  /* START LOOP: for each active tag link */
  for (const activeTagLink of tagLinksWithActiveClass){

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinksWithTheSameAttributeHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTagLinksWithTheSameAttributeHref);

  /* START LOOP: for each found tag link */
  for (const tagLink of allTagLinksWithTheSameAttributeHref){

    /* add class active */
    tagLink.classList.add('active');  
    console.log(tagLink);
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  //console.log(linksToTags);
  for (const link of linksToTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();



function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll('article');
  //console.log(articles);

  /* START LOOP: for every article: */
  for (const article of articles){

    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log(authorWrapper);

    const dataAuthor = article.getAttribute('data-author');
    //console.log(dataAuthor);
    const htmlForAuthor = '<p class="post-author">by <a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></p>';
    console.log(htmlForAuthor);
    authorWrapper.insertAdjacentHTML('afterend', htmlForAuthor);

    /* END LOOP: for every article: */
  }
}

generateAuthors();



function authorClickHandler(event){
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  
  /* find all tag links with class active */
  const authorLinksWithActiveClass = document.querySelectorAll('.post-author .active');
  console.log('authorLinksWithActiveClass', authorLinksWithActiveClass);

  /* START LOOP: for each active tag link */
  for (const activeAuthorLink of authorLinksWithActiveClass){

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  //   /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorLinksWithTheSameAttributeHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allAuthorLinksWithTheSameAttributeHref);

  /* START LOOP: for each found tag link */
  for (const authorLink of allAuthorLinksWithTheSameAttributeHref){

    /* add class active */
    authorLink.classList.add('active');  
    console.log(authorLink);
  //   /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('a[href^="#author-"]');
  for (const author of authors){
    author.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();