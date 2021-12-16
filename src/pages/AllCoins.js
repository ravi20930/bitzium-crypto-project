import React from 'react';
import '../App.css';
import CoinGecko from 'coingecko-api';
import AllCoinsCardLayout from '../components/AllCoinsCardLayout';

export default function AllCoins() {
    const [isLoaded] = React.useState(false);
    const coinGeckoClient = new CoinGecko();
    const [result, setResult] = React.useState({ data: ["id": "sample", "image": "sample", "symbol": "sample", "price_change_percentage_24h": "sample", "current_price": "sample", "market_cap": "sample"] });
    const [filteredResult, setFilteredResult] = React.useState({ data: ["id": "sample", "image": "sample", "symbol": "sample", "price_change_percentage_24h": "sample", "current_price": "sample", "market_cap": "sample"] });
    async function getServerSideProps() {
        const params = {
            order: CoinGecko.ORDER.MARKET_CAP_DESC
        };
        var response = await coinGeckoClient.coins.markets({ params });
        setResult(response);
        setFilteredResult(response);
    }

    React.useEffect(() => {
        getServerSideProps();
    }, [isLoaded])

    function setSearchValue(event) {
        if (event.target.value != "") {
            const filteredResponse = result.data.filter(coin => {
                return coin.name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            setFilteredResult({ data: filteredResponse });
        }
        else {
            setFilteredResult(result);
        }
    }


    return (
        <div className="containerMain">

            <div className='allCoinsLayout'>
                <div className="cardViewWithoutShadow" style={{ padding: 10, display: 'flex', justifyContent: "center", marginTop: 30 }}>
                    <div id="heading" style={{ fontSize: 25 }}>All Cryptocurrencies</div>
                </div>

                <div className="cardViewWithoutShadow" style={{ display: 'flex', justifyContent: "center" }}>
                    <div class="input-group rounded" style={{ maxWidth: 400 }}>
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" onChange={setSearchValue} />
                        <span class="input-group-text border-0" id="search-addon">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>

                <AllCoinsCardLayout result={filteredResult} />
                <div style={{ marginTop: 100 }}></div>
            </div>

        </div>
    );
}
