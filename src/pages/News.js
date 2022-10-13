import React, { useState } from 'react'

export default function News() {

  // for CRYPTOCOMPARE use Data, imageurl, title, url, body
  // for NEWSAPI use articles, urlToImage, title, url, description
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=10`
  const CRYPTOCOMPARE_URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.REACT_APP_CRYPTO_COMPARE}`
  let [value, setValue] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  async function getNews() {
    let response = await fetch("https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=3&time_utc_offset=28800&lang_ID=1", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
        "x-rapidapi-key": "53c8c1db14msh4bce4dd874042d8p159ccbjsn81b87eabb0c4"
      }
    })
    let result = await response.json();
    let finalData = result.data[0].screen_data.news
    let data = result.data[0].screen_data.news.map((newsData) => {
      return (
        <div class="cardView" style={{ maxWidth: 350, maxHeight: 600, padding: 0 }}>
          <img src={newsData.related_image_big} style={{ maxWidth: 350, maxHeight: 300 }} />
          <div style={{ padding: 20 }}>
            <div id="heading" style={{ color: 'black', fontWeight: 600, fontSize: 20 }}>{newsData.HEADLINE}</div>
            {/* <p id="bodyText">
              {newsData.BODY}
            </p> */}
            <a style={{ fontWeight: 500 }} href={newsData.news_link}>Read more</a>
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
