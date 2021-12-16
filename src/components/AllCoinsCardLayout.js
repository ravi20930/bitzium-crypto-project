import React from 'react'

function AllCoinsCardLayout(props) {
    var { data } = props.result;

    const formatPercent = number =>
        `${new Number(number).toFixed(2)}%`

    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits
            })
            .format(number);

    return (
        <>
            <div className="coinsCardContainer">
                {data.map(coin => (
                    <div className="cardView" style={{ minWidth: "350px" }} key={coin.id}>

                        <div style={{ textTransform: 'uppercase', fontWeight: 600, color: '#5599ffff' }} className="coin-label">
                            <div>{coin.name} ({coin.symbol})</div>
                            <img src={coin.image} style={{ width: 25, height: 25, marginRight: 10 }} />
                        </div>

                        <p className="coin-label" >
                            <div >Price</div>
                            {formatDollar(coin.current_price, 20)}
                        </p>
                        <p className="coin-label">
                            <div>Market Cap</div>
                            {formatDollar(coin.market_cap, 12)}
                        </p>
                        <p className="coin-label">
                            <div>Daily Change</div>
                            <div className={coin.price_change_percentage_24h > 0 ? (
                                'text-success'
                            ) : 'text-danger'}>
                                {formatPercent(coin.price_change_percentage_24h)}
                            </div>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllCoinsCardLayout
