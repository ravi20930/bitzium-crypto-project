import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import NewsTable from './NewsTable';

export default function HomeEnd() {

	const [isLoaded, setIsLoaded] = React.useState(false);
	const [rate, setRate] = React.useState(0);
	const dummy_data = {
		market_data:
		{
			current_price:
			{
				usd: 0
			},
			price_change_24h: 0,
			price_change_percentage_24h: 0,
			price_change_percentage_7d: 0,
			price_change_percentage_30d: 0,
			price_change_percentage_1y: 0,
			market_cap_change_percentage_24h: 0
		}
	}
	const [data, setData] = React.useState(dummy_data);
	React.useEffect(() => {

		fetch("https://coingecko.p.rapidapi.com/coins/bitcoin?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "coingecko.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_RAPID_API
			}
		})
			.then(response => {
				console.log(response);
				setIsLoaded(true);
				return response.json();
			})
			.then(data => {
				console.log(data);
				setData(data);
				setRate(data.market_data.current_price.usd)
			})
			.catch(err => {
				console.error(err);
			});
	}, [isLoaded])


	return (
		<>
			{(!isLoaded) ? "Loading"
				: <>
					<div className="cardView">
						<a id="heading">BTC Price Statistics</a>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i class="bi bi-caret-up-fill" style={{ color: "#5599ffff" }}></i>&nbsp;&nbsp;
								Current BTC to USD
							</div>
							{rate}
						</div>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.price_change_24h > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.price_change_24h>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Price Change in 24 hours
							</div>
							{data.market_data.price_change_24h}
						</div>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.price_change_percentage_24h > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.price_change_percentage_24h>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Price Change % in 24 hours
							</div>
							{data.market_data.price_change_percentage_24h} %
						</div>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.price_change_percentage_7d > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.price_change_percentage_7d>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Price Change % in 7 days
							</div>
							{data.market_data.price_change_percentage_7d} %
						</div>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.price_change_percentage_30d > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.price_change_percentage_30d>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Price Change % in 30 days
							</div>
							{data.market_data.price_change_percentage_30d} %
						</div>
						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.price_change_percentage_1y > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.price_change_percentage_1y>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Price Change % in 1 year
							</div>
							{data.market_data.price_change_percentage_1y} %
						</div>

						<div className="coin-label">
							<div style={{ display: "flex", flex: "row" }}>
								<i className={data.market_data.market_cap_change_percentage_24h > 0 ? (
									'bi bi-caret-up-fill'
								) : 'bi bi-caret-down-fill'} style={data.market_data.market_cap_change_percentage_24h>0?({color: '#5599ffff'}):{ color: "red" }}></i>&nbsp;&nbsp;
								Market Cap Change % in 24 hours
							</div>
							{data.market_data.market_cap_change_percentage_24h} %
						</div>

					</div>

					<div>
						<div className="cardView">
							<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
								<a id="heading">Top 10 Headlines</a>
								<Link to="/news">
									<button className="buttonStyle">Show all</button>
								</Link>
							</div>
							<NewsTable />
						</div>
					</div>
				</>
			}
		</>
	);
}