'use strict';

const opts = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post .post-title',
  TagsListSelector: '.tags.list',
  CloudClassCount: 5,
  CloudClassPrefix: 'tag-size-',
  AuthorsListSelector: '.list.authors'
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  
  for(const activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleLinkedToClickedElement = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const articleLinkedToClickedLink = document.querySelector(articleLinkedToClickedElement);

  /* add class 'active' to the correct article */
  articleLinkedToClickedLink.classList.add('active');

};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(opts.TitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);

  let html = '';

  for (const article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
        
    /* find the title element */
    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into html variable */
    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  // list with articles
  const links = document.querySelectorAll('.titles a');

  for(const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


const calculateTagsParams = function(tags){
  const arrayWithValues = Object.values(tags);
  const maxValue = Math.max(...arrayWithValues);
  const minValue = Math.min(...arrayWithValues);
  const objWithMarginalValues = {
    min: minValue,
    max: maxValue
  };
  return objWithMarginalValues;
};


function calculateTagClass(count, params){
  // normalization values to range 1-5 in order to assign appropriate class from css file
  let calculatedClassNumber = Math.floor(1 + ((count - params.min) * (opts.CloudClassCount - 1) / (params.max - params.min)));

  return calculatedClassNumber;
}


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll('article');

  /* START LOOP: for every article: */
  for (const article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.ArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');

    /* split tags into array */
    const arrayWithTags = dataTags.split(' ');

    /* START LOOP: for each tag */
    for (const tag of arrayWithTags){
      /* generate HTML of the link */
      const htmlLinkForTag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html += htmlLinkForTag;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.TagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */

    const calculatedClassNumber = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + opts.CloudClassPrefix + calculatedClassNumber + '">' + tag + '</a><span> (' + allTags[tag] + ') </span></li>';

  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}



generateTags();





function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinksWithActiveClass = document.querySelectorAll('.list .active');

  /* START LOOP: for each active tag link */
  for (const activeTagLink of tagLinksWithActiveClass){

    /* remove class active */
    activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinksWithTheSameAttributeHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const tagLink of allTagLinksWithTheSameAttributeHref){

    /* add class active */
    tagLink.classList.add('active');  

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */

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

  const objectWithAuthorsAndNumbersOfArticles = {};

  /* START LOOP: for every article: */
  for (const article of articles){

    const authorWrapper = article.querySelector(opts.ArticleAuthorSelector);

    const dataAuthor = article.getAttribute('data-author');
    
    const htmlForAuthor = '<p class="post-author">by <a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></p>';

    authorWrapper.insertAdjacentHTML('afterend', htmlForAuthor);

    if(!objectWithAuthorsAndNumbersOfArticles[dataAuthor]){
      objectWithAuthorsAndNumbersOfArticles[dataAuthor] = 1; 
    }else{
      objectWithAuthorsAndNumbersOfArticles[dataAuthor]++;
    }
    /* END LOOP: for every article: */
  }

  const listWithAuthorsSelector = document.querySelector(opts.AuthorsListSelector);
  
  const objectWithMinAndMaxValueForAuthors = calculateTagsParams(objectWithAuthorsAndNumbersOfArticles);

  let html = '';

  for (const author in objectWithAuthorsAndNumbersOfArticles){
    const calculatedClass = calculateTagClass(objectWithAuthorsAndNumbersOfArticles[author], objectWithMinAndMaxValueForAuthors);
    const htmlCodeForAuthor = '<li><a href="#author-' + author + '" class="' + opts.CloudClassPrefix + calculatedClass + '">' + author + '</a></li>';
    html += htmlCodeForAuthor;
  }
  listWithAuthorsSelector.innerHTML = html;
}

generateAuthors();



function authorClickHandler(event){
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  
  /* find all tag links with class active */
  const authorLinksWithActiveClass = document.querySelectorAll('.post-author .active');

  /* START LOOP: for each active tag link */
  for (const activeAuthorLink of authorLinksWithActiveClass){

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  //   /* END LOOP: for each active tag link */
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorLinksWithTheSameAttributeHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const authorLink of allAuthorLinksWithTheSameAttributeHref){

    /* add class active */
    authorLink.classList.add('active');  

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


