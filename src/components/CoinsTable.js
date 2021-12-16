import 'bootstrap/dist/css/bootstrap.min.css';

export default function CoinsTable(props) {
  var { data } = props.result;
    data = data.slice(0,10);

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
      <table className="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>

              <td style={{display:"flex", flexDirection:"row", fontWeight: 400}}>
              <img src={coin.image} style={{ width: 25, height: 25, marginRight: 10 }} /> 
              <div style={{textTransform: 'uppercase'}}>{coin.symbol} </div>
              </td>

              <td> 
                <span
                  className={coin.price_change_percentage_24h > 0 ? (
                    'text-success' 
                  ) : 'text-danger'} style={{fontWeight: 500}}>
                {formatPercent(coin.price_change_percentage_24h)}
                </span>
              </td>

              <td style={{fontWeight: 400}}>{formatDollar(coin.current_price, 20)}</td>
              <td style={{fontWeight: 400}}>{formatDollar(coin.market_cap, 12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

