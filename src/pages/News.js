import React, { useState } from 'react'

export default function News() {

  // for CRYPTOCOMPARE use Data, imageurl, title, url, body
  // for NEWSAPI use articles, urlToImage, title, url, description

  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=57`
  const CRYPTOCOMPARE_URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.REACT_APP_CRYPTO_COMPARE}`

  let [value, setValue] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  async function getNews() {
    let response = await fetch(NEWS_API_URL)
    let result = await response.json();
    let data = result.articles.map((newsData) => {
      return (
        <div class="cardView" style={{ maxWidth: 350, maxHeight: 600, padding: 0 }}>
          <img src={newsData.urlToImage} style={{ maxWidth: 350, maxHeight: 300 }} />
          <div style={{ padding: 20 }}>
            <div id="heading" style={{ color: 'black', fontWeight: 600, fontSize: 20 }}>{newsData.title}</div>
            <p id="bodyText">
              {newsData.description}
            </p>
            <a style={{ fontWeight: 500 }} href={newsData.url}>Read more</a>
          </div>
        </div>
      )
    })
    setValue(data);
  }

  React.useEffect(() => {
    getNews();
    setIsLoaded(true);
  }, [isLoaded]);

  return (
    <div className="containerMain">
      <div className='allCoinsLayout'>
        <div className="cardViewWithoutShadow" style={{ padding: 10, display: 'flex', justifyContent: "center", marginTop: 30 }}>
          <div id="heading" style={{ fontSize: 25 }}>Crypto News</div>
        </div>

        <div className="coinsCardContainer">
          {value}
        </div>
        <div style={{ marginTop: 100 }}></div>
      </div>
    </div>
  )
}
