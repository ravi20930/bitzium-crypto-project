import React from 'react'

function NewsTable() {
    let [value, setValue] = React.useState("");
    const [isLoaded] = React.useState(false);

    async function getNews() {
        let response = await fetch(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=10`)
        let result = await response.json();
        let data = result.articles.map((newsData) => {
            return (
                <tr>
                    <td style={{ display: "flex", flexDirection: "row" }}>
                        <img src={newsData.urlToImage} style={{ maxWidth: 150, maxHeight: 100, minHeight: 100, minWidth: 150 }} />
                    </td>
                    <td>
                        <div style={{ color: 'black', fontWeight: 400, fontSize: 14 }}>{newsData.title}</div>
                    </td>
                    <td>
                        <a style={{ fontWeight: 400, fontSize: 12 }} href={newsData.url}>Read</a>
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
