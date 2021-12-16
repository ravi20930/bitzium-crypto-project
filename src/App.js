import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// import pages
import Home from './pages/Home';
import AllCoins from './pages/AllCoins';
import Prediction from './pages/Prediction';
import Rsi from './pages/Rsi.js';
import Guide from './pages/Guide';
import News from './pages/News'
import About from './pages/About'

// import header, footer, sidenav
// keep these out of router so that we don't have
// to copy these components on every page
import Header from "./components/Header";
import SideNav from "./components/sidenav";
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <SideNav active="hello" />
        <div className="content">
          <Switch>
            <Route exact path="/" exact component={Home} />
            <Route exact path="/all-coins" component={AllCoins} />
            <Route exact path="/prediction" component={Prediction} />
            <Route exact path="/rsi" component={Rsi} />
            <Route exact path="/guide" component={Guide} />
            <Route exact path="/news" component={News} />
            <Route exact path="/about" component={About} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;