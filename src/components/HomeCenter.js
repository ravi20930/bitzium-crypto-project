import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import CoinsTable from './CoinsTable';
import { Line } from 'react-chartjs-2';
import CoinGecko from 'coingecko-api';

export default function HomeCenter() {
	const coinGeckoClient = new CoinGecko();
	const [isLoaded] = React.useState(false);
	const [result, setResult] = React.useState({ data: ["id": "sample", "image": "sample", "symbol": "sample", "price_change_percentage_24h": "sample", "current_price": "sample", "market_cap": "sample"] });
	const [buttonDay, setDay] = React.useState(0);

	const dataD = {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	};

	const [data, setData] = React.useState(dataD);
	const [options, setOptions] = React.useState({});

	React.useEffect(() => {
		createChart(1, 2)
		getServerSideProps();
	}, [isLoaded])


	async function getServerSideProps() {
		const params = {
			order: CoinGecko.ORDER.MARKET_CAP_DESC
		};
		const response = await coinGeckoClient.coins.markets({ params });
		setResult(response);
	}

	function createChart(days, density) {

		var ts = Math.round(new Date().getTime() / 1000);
		var tsYesterday = ts - (days * 24 * 3600);
		fetch(`https://coingecko.p.rapidapi.com/coins/bitcoin/market_chart/range?from=${tsYesterday}&vs_currency=usd&to=${ts}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "coingecko.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_RAPID_API
			}
		})
			.then(response => {
				return response.json();
			})
			.then(rawData => {
				rawData = rawData.prices;

				const labels = [];
				for (var i = 0; i < rawData.length; i++) {
					labels.push("");
					i += density;
				}

				const yAxisData = [];
				for (var i = 0; i < rawData.length; i++) {
					yAxisData.push(rawData[i][1])
					i += density;
				}

				const data1 = {
					labels: labels,
					datasets: [
						{
							label: 'Price in USD',
							data: yAxisData,
							fill: false,
							backgroundColor: '#5599ffff',
							borderColor: '#5599ffff',
						},
					],
				};
				setData(data1);

				const options = {
					scales: {
						y: {
							beginAtZero: false
						}
					},
					elements: {
						point: {
							radius: 2
						}
					},
					plugins: {
						legend: {
							display: false
						}
					}
				};

				setOptions(options);

				//chart data done


			}).catch(err => {
				console.log(err);
			});


	}

	function setTimeline(id) {
		var day;
		var density = 2;
		switch (id) {
			case 0:
				day = 1;
				density = 2;
				break;
			case 1:
				day = 7;
				density = 1;
				break;
			case 3:
				day = 180;
				density = 1;
				break;
			case 4:
				day = 365;
				density = 2;
				break;
			default:
				day = 30;
				density = 5;
				break;
		}
		createChart(day, density);
		setDay(id);
	}

	return (
		<>
			<div className="cardViewWithoutShadow">
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<a id="heading">Price History of BTC </a>
					<div>
						<button onClick={() => setTimeline(0)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 0) ? '#003380ff' : '#5599ffff' }}>24 Hours</button>
						<button onClick={() => setTimeline(1)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 1) ? '#003380ff' : '#5599ffff' }}>7 Days</button>
						<button onClick={() => setTimeline(2)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 2) ? '#003380ff' : '#5599ffff' }}>30 Days</button>
						<button onClick={() => setTimeline(3)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 3) ? '#003380ff' : '#5599ffff' }}>6 Months</button>
						<button onClick={() => setTimeline(4)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 4) ? '#003380ff' : '#5599ffff' }}>1 year</button>
					</div>
				</div><br></br>
				<Line data={data} options={options} />
			</div>

			<div className="cardViewWithoutShadow">
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<a id="heading">Top 10 Cyptocurrencies</a>
					<Link to="/all-coins">
						<button className="buttonStyle">Show all</button>
					</Link>
				</div>
				<br></br>
				<CoinsTable result={result} />
			</div>

			<div className="cardViewWithoutShadow">
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<a id="heading">About Cyptocurrencies</a>
					<a href="https://en.wikipedia.org/wiki/Cryptocurrency">
						<button className="buttonStyle">Learn More</button>
					</a>
				</div><br></br>
				A cryptocurrency, crypto-currency, or crypto is a collection of binary data which is designed to work as a medium of exchange. Individual coin ownership records are stored in a ledger, which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. Cryptocurrencies are generally fiat currencies, as they are not backed by or convertible into a commodity.[4] Some crypto schemes use validators to maintain the cryptocurrency. In a proof-of-stake model, owners put up their tokens as collateral. In return, they get authority over the token in proportion to the amount they stake. Generally, these token stakers get additional ownership in the token over time via network fees, newly minted tokens or other such reward mechanisms.
				<br></br><br></br>
				Cryptocurrency does not exist in physical form (like paper money) and is typically not issued by a central authority. Cryptocurrencies typically use decentralized control as opposed to a central bank digital currency (CBDC). When a cryptocurrency is minted or created prior to issuance or issued by a single issuer, it is generally considered centralized. When implemented with decentralized control, each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database.
				<br></br><br></br>
				Bitcoin, first released as open-source software in 2009, is the first decentralized cryptocurrency. Since the release of bitcoin, many other cryptocurrencies have been created.
			</div>
			<div style={{ marginTop: 100 }}></div>
		</>
	);
}