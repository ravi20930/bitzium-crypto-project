import React, { useState } from 'react';
import '../App.css';
import GaugeChart from 'react-gauge-chart'
import FGIChart from '../components/FGIChart';

export default function Guide() {
	const MY_SECRET = process.env.REACT_APP_MY_SECRET

	let [mValue, setValue] = React.useState("");
	let [canClick, setCanClick] = React.useState(true);
	let [RSIValue, setRSIValue] = React.useState("");
	const [result, setResult] = React.useState({ data: ["id": "sample", "image": "sample", "symbol": "sample", "price_change_percentage_24h": "sample", "current_price": "sample", "market_cap": "sample"] });
	const [buttonRSIInterval, setButtonRSIInterval] = React.useState(0);
	const [buttonDay, setDay] = React.useState(2);
	const [FGIChartDays, setFGIChartDays] = React.useState(90);
	const [isLoaded, setIsLoaded] = React.useState(false);

	function startTimer(){
		setInterval(() => {
		setCanClick(true);
		}, 15000);
	}

	async function setRSIInterval(interval) {
		if(canClick)
		{
			let response = await fetch(`https://api.taapi.io/rsi?secret=${MY_SECRET}&exchange=binance&symbol=BTC/USDT&interval=${interval}`)
			setCanClick(false);
			startTimer();
			let result = await response.json();
			setRSIValue(result.value);
			setButtonRSIInterval(interval);
		}
	}
	
	async function getTodaysFGI() {
		let response = await fetch("https://api.alternative.me/fng/?limit=1")
		let result = await response.json();
		let data = result.data.map((todaysRSI) => {
			return (
				<div className="cardView">
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "20px" }}>
						<div id="heading">Bitcoin FGI Meter
							<br></br>
							<div id="bodyText">
								Crpto Market Sentiment Analysis
							</div>
						</div>
						<div id="heading">Now: {todaysRSI.value_classification}</div>
					</div>
					<GaugeChart id="gauge-chart"
						nrOfLevels={420}
						textColor="black"
						formatTextValue={value => value + ''}
						arcsLength={[1, 1, 1]}
						colors={['red', '#F5CD19', '#5BE12C']}
						percent={todaysRSI.value / 100}
						animate={false}
						arcPadding={0.02} />
					<div style={{ fontWeight: 500 }}><i class="bi bi-lightbulb"></i>&nbsp;Tip
						<div id="bodyText">Watch for strong currents of fear. These opportunities are great for investment, provided you stay in for the long haul.</div>
					</div>
				</div>
			)
		})
		setValue(data);
	}

	async function setFGITimeline(id) {
		var day;
		switch (id) {
			case 0:
				day = 7;
				break;
			case 1:
				day = 30;
				break;
			case 3:
				day = 180;
				break;
			case 4:
				day = 365;
				break;
			default:
				day = 90;
				break;
		}
		getFGIChart(day);
		setDay(id);
	}

	function getFGIChart(days) {
		setFGIChartDays(days);
	}

	React.useEffect(() => {
		getTodaysFGI();
		if(canClick)
		{
			setRSIInterval("1h");
			setCanClick(false);
			startTimer();
		}

		setIsLoaded(true);
	}, [isLoaded]);

	return (
		<>
			<div className="content-item-centre">
				<div className="cardViewWithoutShadow">
					<a id="heading">Crypto Fear & Greed Index</a><br></br><br></br>

					Each day, we analyze emotions and sentiments from different sources and crunch them into one simple number: The Fear & Greed Index for Bitcoin and other large cryptocurrencies.
					<br></br><br></br>
					The crypto market behaviour is very emotional. People tend to get greedy when the market is rising which results in FOMO (Fear of missing out). Also, people often sell their coins in irrational reaction of seeing red numbers. With our Fear and Greed Index, we try to save you from your own emotional overreactions. There are two simple assumptions:
					<br></br><br></br>
					<ul>
						<li>Extreme fear can be a sign that investors are too worried. That could be a buying opportunity.</li>
						<li>When Investors are getting too greedy, that means the market is due for a correction.</li>
					</ul>
				</div>

				{/* fgi chart */}
				<div className="cardViewWithoutShadow">
					<a id="heading">Crypto Fear & Greed Index Over Time</a><br></br><br></br>

					This is a plot of the Fear & Greed Index over time, where a value of 0 means "Extreme Fear" while a value of 100 represents "Extreme Greed".
					<br></br><br></br>

					<div>
						<button onClick={() => setFGITimeline(0)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 0) ? '#003380ff' : '#5599ffff' }}>7 Days</button>
						<button onClick={() => setFGITimeline(1)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 1) ? '#003380ff' : '#5599ffff' }}>30 Days</button>
						<button onClick={() => setFGITimeline(2)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 2) ? '#003380ff' : '#5599ffff' }}>3 Months</button>
						<button onClick={() => setFGITimeline(3)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 3) ? '#003380ff' : '#5599ffff' }}>6 Months</button>
						<button onClick={() => setFGITimeline(4)} className="buttonStyle" style={{ backgroundColor: (buttonDay == 4) ? '#003380ff' : '#5599ffff' }}>1 year</button>
					</div>
					<br></br><br></br>
					<FGIChart days={FGIChartDays} /> {/*********************** FGIChart will render here ****************************/}
				</div>
				<div style={{ marginTop: 100 }}></div>
			</div>

			<div className="content-item-end">
				{/* fgi  meter*/}
				{mValue}

				{/* RSI */}
				<div className='cardView'>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<a id="heading">RSI</a>
						<div>
							<button onClick={() => setRSIInterval("1h")} className="buttonStyle" style={{ backgroundColor: (buttonRSIInterval === "1h") ? '#003380ff' : '#5599ffff' }}>1 Hour</button>
							<button onClick={() => setRSIInterval("6h")} className="buttonStyle" style={{ backgroundColor: (buttonRSIInterval === "6h") ? '#003380ff' : '#5599ffff' }}>6 Hours</button>
							<button onClick={() => setRSIInterval("1d")} className="buttonStyle" style={{ backgroundColor: (buttonRSIInterval === "1d") ? '#003380ff' : '#5599ffff' }}>1 Day</button>
							<button onClick={() => setRSIInterval("1w")} className="buttonStyle" style={{ backgroundColor: (buttonRSIInterval === "1w") ? '#003380ff' : '#5599ffff' }}>1 Week</button>
						</div>
					</div><br></br>


					<GaugeChart id="gauge-chart-2"
						nrOfLevels={20}
						textColor="black"
						formatTextValue={value => value + ''}
						arcsLength={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
						colors={['#5BE12C', '#F5CD19', '#EA4228']}
						percent={RSIValue / 100}
						cornerRadius={3}
						animate={false}
						arcPadding={0.02} />
					<br></br>
					<div id='bodyText'>
						The Relative Strength Index (RSI) chart is a momentum based visualization for the Bitcoin market. We use the RSI to measure the speed as well as the magnitude of directional price movements in Bitcoin. Depending on how fast a price changes and by how much, an RSI score is given to the month being observed relative to the previous 12 months.
						<br></br><br></br>
						<ul>
							<li>High RSI means that price movements are very positive.</li>
							<li>Low RSI means that price movements are very negative.</li>
						</ul>
					</div>
				</div>
				<div style={{ marginTop: 100 }}></div>
			</div>

		</>
	);
}

