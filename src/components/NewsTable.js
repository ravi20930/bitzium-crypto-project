import React from 'react'

function NewsTable() {
    let [value, setValue] = React.useState("");
    const [isLoaded] = React.useState(false);

    async function getNews() {
        let response = await fetch("https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=1&time_utc_offset=28800&lang_ID=1", {
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
                <tr>
                    <td style={{ display: "flex", flexDirection: "row" }}>
                        <img src={newsData.related_image_big} style={{ maxWidth: 150, maxHeight: 100, minHeight: 100, minWidth: 150 }} />
                    </td>
                    <td>
                        <div style={{ color: 'black', fontWeight: 400, fontSize: 14 }}>{newsData.HEADLINE}</div>
                    </td>
                    <td>
                        <a style={{ fontWeight: 400, fontSize: 12 }} href={newsData.news_link}>Read</a>
                    </td>
                </tr>

            )
        })
        setValue(data);
    }

    React.useEffect(() => {
        getNews();
    }, [isLoaded])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {value}
            </tbody>
        </table>
    )
}

export default NewsTable
