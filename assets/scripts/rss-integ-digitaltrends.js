var content = document.getElementById('feed-rss');
const rsslink = 'https://techradar.com/feeds.xml';

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        var itemsContainer = document.createElement('DIV');

        if (data.status == 'ok') {
            for (var i = 0, t = data.items.length; i < t; ++i) {
                var item = data.items[i];
                var itemContainer = document.createElement('DIV');
                itemContainer.className = 'rss-item';

                // Título
                var itemTitleElement = document.createElement('H2');
                itemTitleElement.className = 'rss-item-title';

                var itemLinkElement = document.createElement('A');
                itemLinkElement.className = 'rss-item-link';
                itemLinkElement.setAttribute('href', item.link);
                itemLinkElement.innerText = item.title;
                itemTitleElement.appendChild(itemLinkElement);

                itemContainer.appendChild(itemTitleElement);

                // Imagem - várias formas de tentar obter
                var imageUrl = null;
                
                // 1. Tentar pelo enclosure (formato da API)
                if (item.enclosure && item.enclosure.link) {
                    imageUrl = item.enclosure.link;
                } 
                // 2. Tentar pelo enclosure (formato original RSS)
                else if (item.enclosure && item.enclosure.url) {
                    imageUrl = item.enclosure.url;
                }
                // 3. Tentar extrair da descrição
                else if (item.description) {
                    var imgRegex = /<img[^>]+src="([^">]+)"/;
                    var match = imgRegex.exec(item.description);
                    if (match && match[1]) {
                        imageUrl = match[1];
                    }
                }
                // 4. Tentar pelo content:encoded
                else if (item.content && item.content.match(imgRegex)) {
                    var match = item.content.match(imgRegex);
                    imageUrl = match[1];
                }

                // Se encontrou uma imagem, adiciona ao container
                if (imageUrl) {
                    var itemImage = document.createElement('IMG');
                    itemImage.className = 'rss-item-image';
                    
                    // Adiciona proxy de CORS se necessário
                    if (imageUrl.startsWith('http')) {
                        itemImage.crossOrigin = 'anonymous';
                        // Alternativa: usar um proxy CORS
                        // itemImage.src = 'https://cors-anywhere.herokuapp.com/' + imageUrl;
                    }
                    
                    itemImage.src = imageUrl;
                    itemImage.onerror = function() {
                        // Fallback se a imagem não carregar
                        this.style.display = 'none';
                    };
                    itemContainer.appendChild(itemImage);
                }

                // Descrição
                var itemDescriptionElement = document.createElement('P');
                itemDescriptionElement.className = 'rss-item-desc';
                itemDescriptionElement.innerHTML = item.description;
                itemContainer.appendChild(itemDescriptionElement);

                itemsContainer.appendChild(itemContainer);
            }

            var titleElement = document.createElement('H1');
            titleElement.innerText = data.feed.title;

            content.appendChild(titleElement);
            content.appendChild(itemsContainer);
        }
    }
};
xhr.open(
    'GET',
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rsslink)}`,
    true
);
xhr.send();