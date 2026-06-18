import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'



function App() {

    const [connectivity, setConnectivity] = useState(0)
    const [bestRated, setBestRated] = useState([]);
    const [accData, setAccData] = useState({})
    const [friends, setFriends] = useState([])
    const [favColor, setFavColor] = useState('#191919')
    const [recentlyPlayedXgames, setRecentlyPlayedXgames] = useState([])

    useEffect(() => {
        getBestRated();
        getAccData();
        getFriendsList();
        getRecentlyPlayedXboxGames();
    }, [ ])
    //HR

// Synchronous Functions

function addStyle(ruleset) {

    let styleSheet = document.createElement("style")
    styleSheet.textContent = ruleset
    document.head.appendChild(styleSheet)

}

function fixForStoreURL(str) {
    const rgx = /{\:\s}/gi;
}

// Asynchronous Functions

async function getBestRated() {
    await fetch('https://api.xbl.io/v2/marketplace/best-rated', {
    headers: { 'X-Authorization': 'f195ccb3-d5a4-4cbd-82da-b80e3eab1abf' }
})

    .then((response) => response.json())
    .then((data) => {
    setBestRated([...data.content.productSummaries])
    console.log(data.content.productSummaries)
})
    }

async function getAccData(apiKey) {
    await fetch('https://api.xbl.io/v2/account', {
        headers: { 'X-Authorization': 'f195ccb3-d5a4-4cbd-82da-b80e3eab1abf' }
    })
    .then((response) => response.json())
    .then((data) => {
        setAccData(data)
    })
}

async function getFriendsList () {
    await fetch('https://api.xbl.io/v2/friends', {
        headers: { 'X-Authorization': 'f195ccb3-d5a4-4cbd-82da-b80e3eab1abf' }
    })
    .then((response) => response.json())
    .then((data) => {
        setFriends(data?.content?.people)
    })
    
}

async function getRecentlyPlayedXboxGames () {
    await fetch('https://api.xbl.io/v2/titles', {
        headers: { 'X-Authorization': 'f195ccb3-d5a4-4cbd-82da-b80e3eab1abf' }
    })
    .then((response) => response.json())
    .then((data) => {
        setRecentlyPlayedXgames(data.content.titles)
        console.log(data.content.titles)
    })
    
}

async function getColor() {
    await fetch(data.content.profileUsers[0].settings[5])
        .then((res) => res.json())
        .then((data) => {
            addStyle(`main {background-color: linear-gradient(to bottom, rgb(17,17,17), ${data.primaryColor})}`)
            setFavColor(data.primaryColor)
            addStyle(`.selectedTab {border: 1px solid ${data.primaryColor}`)
        })

}

// Main Return Function

return (
    <>
        <div id='accDetailsMiniTab'>
            <img src={accData?.content?.profileUsers[0].settings[1].value} className='gamerPic' />
            <div id='accDetailsText'>
                <h4>{accData?.content?.profileUsers[0].settings[0].value}</h4>
                <p><strong>G: </strong>{accData?.content?.profileUsers[0].settings[2].value}</p>
            </div>
            
        </div>


        <h2>Recently Played</h2>
        <div id='recentlyPlayedXgamesTab'>
            {recentlyPlayedXgames.map((xGame) => <RecentlyPlayedXboxGameTile gameData={xGame} />)}
        </div>

        <h2>Great Deals</h2>
        <div id='greatDealsTab'>
        {bestRated.map((game) => <GameTile gameData={game} />)}
        </div>

        <h2>Friends</h2>
        <div id='friendsTab'>
            {friends.map((friend) => <FriendTile friendData={friend} />)}
        </div>
        <hr />
    </>
        )
}

// Tile Components Below!!

function GameTile({gameData}) {
    return (
        <a href={'ms-windows-store://pdp/?productid=' + gameData.productId}>
        <div className='gameTile' key={gameData.productId}>
            <img className='gameTileImg' src={gameData.images.boxArt.url} />
            <h3>{gameData.title}</h3>
            <h3>{gameData.specificPrices?.purchaseable[0]?.listPrice == 0 ? 'Free' : gameData.specificPrices?.purchaseable[0]?.listPrice}{gameData.specificPrices?.purchaseable[0]?.listPrice == 0 ? '' : gameData.specificPrices.purchaseable[0]?.currency}</h3>
        </div>
        </a>
    )
}

function RecentlyPlayedXboxGameTile({gameData}) {
    return (
        <div style={{display: gameData.pfn == null ? 'none' : 'unset'}} className='gameTile' key={gameData?.titleId}>
            <img className='gameTileImg' src={gameData?.displayImage} />
            <h3>{gameData?.name}</h3>
        </div>
    )
}

function FriendTile({friendData}) {
    return (
        <div style={{border: '2px solid #' + friendData.preferredColor.primaryColor}} className='friendTile' key={friendData.xuid}>
            <img className='gamerPic' src={friendData.displayPicRaw} />
            <h5 className='friendGamertag'>{friendData.modernGamertag}</h5>
            <h4 className={friendData.presenceState == 'Online' ? 'presenceOnline' : 'presenceOffline'}>{friendData.presenceState}</h4>
        </div>
    )
}

export default App
