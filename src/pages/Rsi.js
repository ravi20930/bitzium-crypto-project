import React from 'react';
import '../App.css';

export default function Rsi() {
	let [RSIValue, setValue] = React.useState("");
    const [isLoaded] = React.useState(false);

	

	async function getRSI(interval) {
		
	}

	React.useEffect(() => {
        getRSI(1);
    }, [isLoaded])

	return (
		<div className="containerMain">
			<div className="cardView">
			<a id="heading">Relative Strength Index Explained</a><br></br><br></br>
			The Relative Strength Index (RSI) chart is a momentum based visualization for the Bitcoin market. We use the RSI to measure the speed as well as the magnitude of directional price movements in Bitcoin. Depending on how fast a price changes and by how much, an RSI score is given to the month being observed relative to the previous 12 months.
			<br></br><br></br>
			- A high RSI means that price movements are very positive relative to the previous 12 months.
			<br></br>
			- A low RSI means that price movements are very negative relative to the previous 12 months.
			<br></br><br></br>
			Essentially the RSI, when graphed, provides a visual mean to monitor both the current, as well as historical, strength and weakness of a particular market. The strength or weakness is based on closing prices over the duration of a specified trading period creating a reliable metric of price and momentum changes.
			</div>

			<div className="cardView">
			<a id="heading">Bitcoin Relative Strength Index Chart</a><br></br>
			{/* {mValue} */}
			</div>
			<div style={{ marginTop: 100 }}></div>
		</div>
		
	);
}