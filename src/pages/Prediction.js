import React from 'react';
import '../App.css';

export default function Prediction() {
	return (
		<div className="containerMain">
			<div className="cardViewWithoutShadow">
				<div id="heading">
					What Is The Bitcoin Stock-To-Flow Model?
				</div>
				<br></br>
				The S2F, or stock-to-flow model in full, is a price prediction method that's based on the ratio of the supply (stock) to the the annual production (flow).
				<br></br><br></br>
				The model can be applied on any limited asset, whether that be Bitcoin or metals like gold and silver. It makes use of the fact that assets like these will continue to get scarce as time passes.
				Below is the latest chart for the BTC S2F model.
				<br></br><br></br>
				<div className='cardView'>
					<a href="https://stats.buybitcoinworldwide.com/stock-to-flow/">
						<img src="https://firebasestorage.googleapis.com/v0/b/waego1.appspot.com/o/s2fImage.png?alt=media&token=e16a5c9a-6b30-4ea7-8eba-7c93bd174a6e"
							style={{ cursor: "pointer", maxWidth: "70vw" }}></img>
					</a>
					<br></br><br></br>
					<div id="bodyText">The actual BTC price vs stock-to-flow model predictions | Source:&nbsp;
					<a href="https://stats.buybitcoinworldwide.com/stock-to-flow/">buybitcoinworldwide</a>
					</div>
				</div>
				<br></br>
				As the above graph shows, while there have been some areas of deviation, the model has been overall quite close to the real thing so far.
				<br></br><br></br>
				The floor model, which the earlier predictions were taken from, is a different method from S2F, and it's based on price and on-chain data.
				<br></br><br></br>
				In the replies to the tweet, PlanB explains that stock-to-flow's prediction for this Bitcoin cycle is an “average” price of $100k. Because of this, it's hard to say right now at which level the model might be considered invalidated.

			</div>
			<div style={{ marginTop: 100 }}></div>
		</div>
	);
}