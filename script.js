const apiUrl = 'http://servicodados.ibge.gov.br/api/v3/noticias/';

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar notícias');
        }
        const news = await response.json();
        displayNews(news.items);
    } catch (error) {
        document.getElementById('news-container').innerHTML = `
            <p>Não foi possível carregar as notícias. Tente novamente mais tarde.</p>
        `;
        console.error(error);
    }
}

function displayNews(newsItems) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    newsItems.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <h2>${news.titulo}</h2>
            <p>${news.introducao}</p>
            <a href="${news.link}" target="_blank">Leia mais</a>
        `;
        container.appendChild(newsCard);
    });
}

fetchNews();
