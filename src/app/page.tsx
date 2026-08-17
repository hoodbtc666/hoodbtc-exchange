const asks = [
  [4438.42, 1.24], [4437.91, 0.62], [4436.80, 2.18], [4435.25, 0.41], [4434.74, 3.02]
];
const bids = [
  [4433.81, 0.94], [4432.60, 1.73], [4431.45, 0.58], [4429.90, 2.31], [4428.55, 1.08]
];

function Header() {
  return <header className="header">
    <div className="brand"><span className="mark">H</span><span>HOODBTC</span></div>
    <nav><a className="active">Trade</a><a>Markets</a><a>Portfolio</a><a>Leaderboard</a></nav>
    <div className="headerActions"><span className="status"><i /> Network live</span><button className="wallet">Connect wallet</button></div>
  </header>;
}

function MarketBar() {
  return <section className="marketBar">
    <div className="pair"><div className="coin">Ξ</div><div><b>ETH-PERP</b><span>Ethereum Perpetual</span></div><span className="chevron">⌄</span></div>
    <div><label>Mark</label><strong>$4,433.81</strong></div>
    <div><label>24h change</label><strong className="positive">+2.84%</strong></div>
    <div><label>24h high</label><strong>$4,512.40</strong></div>
    <div><label>24h low</label><strong>$4,287.11</strong></div>
    <div><label>24h volume</label><strong>$128.4M</strong></div>
    <div><label>Funding / 8h</label><strong>0.0100%</strong></div>
  </section>;
}

function Chart() {
  return <section className="panel chartPanel">
    <div className="panelHead"><div><button className="tab active">Chart</button><button className="tab">Info</button></div><div className="tools">1m&nbsp;&nbsp; 5m&nbsp;&nbsp; <b>15m</b>&nbsp;&nbsp; 1h&nbsp;&nbsp; 4h&nbsp;&nbsp; 1D</div></div>
    <div className="chartMeta"><span>O 4,401.24</span><span>H 4,448.60</span><span>L 4,392.10</span><span className="positive">C 4,433.81 +0.74%</span></div>
    <div className="chart">
      <div className="priceTag">4,433.81</div>
      <svg viewBox="0 0 900 390" preserveAspectRatio="none" aria-label="placeholder market chart">
        <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#28f09a" stopOpacity=".24"/><stop offset="1" stopColor="#28f09a" stopOpacity="0"/></linearGradient></defs>
        <path className="area" d="M0 330 L40 315 L75 322 L110 286 L150 296 L190 260 L225 274 L265 218 L305 231 L345 196 L390 210 L430 169 L470 186 L510 140 L550 151 L590 122 L630 138 L675 91 L715 108 L755 72 L800 87 L845 48 L900 61 L900 390 L0 390Z" />
        <polyline className="line" points="0,330 40,315 75,322 110,286 150,296 190,260 225,274 265,218 305,231 345,196 390,210 430,169 470,186 510,140 550,151 590,122 630,138 675,91 715,108 755,72 800,87 845,48 900,61"/>
      </svg>
    </div>
  </section>;
}

function OrderBook() {
  const rows = (data:number[][], side:string) => data.map(([p,s]) => <div className="bookRow" key={p}><span className={side}>{p.toLocaleString(undefined,{minimumFractionDigits:2})}</span><span>{s.toFixed(3)}</span><span>{(p*s).toLocaleString(undefined,{maximumFractionDigits:0})}</span></div>);
  return <section className="panel bookPanel"><div className="panelHead"><b>Order book</b><span className="muted">0.10 ⌄</span></div><div className="bookHeader"><span>Price (USDC)</span><span>Size (ETH)</span><span>Total</span></div>{rows(asks,"negative")}<div className="mid"><b>4,433.81</b><span>≈ $4,433.81</span></div>{rows(bids,"positive")}</section>;
}

function OrderForm() {
  return <aside className="panel orderPanel">
    <div className="orderTabs"><button className="active">Market</button><button>Limit</button><button>Advanced</button></div>
    <div className="sideSwitch"><button className="long active">Long</button><button className="short">Short</button></div>
    <div className="balance"><span>Available</span><b>— USDC</b></div>
    <label className="fieldLabel">Order size</label><div className="input"><span>0.00</span><b>ETH</b></div>
    <div className="slider"><span /><i/><i/><i/><i/></div><div className="percent"><span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span></div>
    <div className="setting"><span>Leverage</span><button>10× ⌄</button></div><div className="setting"><span>Margin mode</span><button>Cross ⌄</button></div>
    <label className="check"><input type="checkbox"/> Take profit / Stop loss</label>
    <button className="connect">Connect wallet to trade</button>
    <div className="summary"><div><span>Est. liquidation</span><b>—</b></div><div><span>Trading fee</span><b>—</b></div><div><span>Order value</span><b>—</b></div></div>
    <p className="noncustodial">Non-custodial execution · You control your wallet</p>
  </aside>;
}

function Bottom() {
  return <section className="panel bottom"><div className="bottomTabs"><button className="active">Positions <em>0</em></button><button>Open orders <em>0</em></button><button>Order history</button><button>Trade history</button><button>Funding</button></div><div className="empty"><div>◎</div><b>No open positions</b><span>Connect your wallet to view positions and start trading.</span></div></section>;
}

export default function Home() {
  return <main><Header/><MarketBar/><div className="terminal"><div className="workspace"><div className="upper"><Chart/><OrderBook/></div><Bottom/></div><OrderForm/></div><footer><span>HOODBTC</span><span>Decentralized trading interface</span><span className="positive">● Systems operational</span></footer></main>;
}
