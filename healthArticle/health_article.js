var xhr = new XMLHttpRequest();
var newxhr = new XMLHttpRequest();
var url = './health_article.json';
var newurl = './news_article.json';

xhr.open('GET', url, true);
newxhr.open('GET', newurl, true);

xhr.responseType = 'json';
newxhr.responseType = 'json';

xhr.onload = function() {
	var articles = xhr.response.articles;
	var articlesDiv = document.getElementById('articles');

	articles.forEach(function(article) {
		var articleDiv = document.createElement('div');
		articleDiv.classList.add('article');

		var title = document.createElement('h2');
		title.textContent = article.title;

		var description = document.createElement('p');
		description.textContent = article.description;

		var waysHeader = document.createElement('h3');
		waysHeader.textContent = 'Ways to Achieve:';

		var waysList = document.createElement('ul');
		article.ways_to_achieve.forEach(function(way) {
			var listItem = document.createElement('li');
			listItem.textContent = way;
			waysList.appendChild(listItem);
		});

		var benefitsHeader = document.createElement('h3');
		benefitsHeader.textContent = 'Benefits:';

		var benefitsList = document.createElement('ul');
		article.benefits.forEach(function(benefit) {
			var listItem = document.createElement('li');
			listItem.textContent = benefit;
			benefitsList.appendChild(listItem);
		});

		articleDiv.appendChild(title);
		articleDiv.appendChild(description);
		articleDiv.appendChild(waysHeader);
		articleDiv.appendChild(waysList);
		articleDiv.appendChild(benefitsHeader);
		articleDiv.appendChild(benefitsList);

		articlesDiv.appendChild(articleDiv);
	});
};

xhr.send();

newxhr.onload = function() {
    var newsArticles = newxhr.response.articles;
    var newsArticlesDiv = document.getElementById('news-articles');

    newsArticles.forEach(function(article) {
        var articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        var title = document.createElement('h2');
        title.textContent = article.title;

        var description = document.createElement('p');
        description.textContent = article.description;

        var category = document.createElement('p');
        category.textContent = 'Category: ' + article.category;

        var publishedDate = document.createElement('p');
        publishedDate.textContent = 'Published Date: ' + article.published_date;

        var source = document.createElement('p');
        source.textContent = 'Source: ' + article.source;

        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(category);
        articleDiv.appendChild(publishedDate);
        articleDiv.appendChild(source);

        newsArticlesDiv.appendChild(articleDiv);
    });
};

newxhr.send();
