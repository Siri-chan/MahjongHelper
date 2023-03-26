interface Board {
    players: {
        east: string,
        south: string,
        west: string,
        north: string
    },
    roundNumber: number,
    minimumScore: number,
    rounds: Round[]
}

interface Round {
    winningPlayer: string,
    feedingPlayer: string,
    hands: Hand[],
    numberDiscarded: number,
}

interface Hand {
    player: string,
    meldedTiles: string,
    concealedTiles: string,
    winningTile: string
}

const emptyBoard: Board = {
    players: {
        east: "",
        south: "",
        west: "",
        north: "",
    },
    roundNumber: 0,
    minimumScore: 8,
    rounds: [

    ]
};

const emptyRound:Round = {
    winningPlayer: "",
    feedingPlayer: "",
    hands: [
        {
            player: "",
            meldedTiles: "",
            concealedTiles: "",
            winningTile: "",
        }
    ],
    numberDiscarded: 0,
};
const windStrings = ["East", "South", "West", "North"];

let board:Board;

// DOM Elements
let east_player_input:any;
let south_player_input:any;
let west_player_input:any;
let north_player_input:any;
let previousRounds: any;

onload = doLoad;
function doLoad() {
    east_player_input = document.getElementById("eastInput");
    south_player_input = document.getElementById("southInput");
    west_player_input = document.getElementById("westInput");
    north_player_input = document.getElementById("northInput");

    if (typeof(Storage) !== "undefined") {
        if (localStorage.boardState) {
            board = JSON.parse(localStorage.boardState);
        } else {
            board = emptyBoard;
        }
    } else {
        alert("HTML5 localStorage unavailable.\nPlease use a more modern browser.");
    }

    console.log(board);

    east_player_input.value = board.players.east;
    west_player_input.value = board.players.west;
    south_player_input.value = board.players.south;
    north_player_input.value = board.players.north;

    previousRounds = document.getElementById("previousRounds");

    reload();
}

function showPrevRounds() {
    previousRounds.innerHTML = "";
    let hand_idx = 0;
    board.rounds.forEach((round) => {
        let winner;
        let numDiscards;
        let feedingPlayer;
        let winningHand;
        winner = "Winning Player: "+ round.winningPlayer;
        numDiscards = round.numberDiscarded.toString() + " Discarded Tiles";
        let self_drawn = round.feedingPlayer === round.winningPlayer;
        if (self_drawn) {
            feedingPlayer = "Self-Drawn";
        } else {
            feedingPlayer = "Feeding Player: "+round.feedingPlayer;
        }
        var _winnerHand = getHandByPlayer(round.hands, round.winningPlayer);
        //console.log(_winnerHand);
        winningHand = handToUnicode(_winnerHand, self_drawn);
        previousRounds.innerHTML += "<span style='font-size: 1.5rem;'>Round "+ (hand_idx + 1) +":" + "</span><br />" + 
        winner + " | " + numDiscards + " | " +  feedingPlayer + "<br />" +
        //todo the tiles are kinda small maybe make a class that makes the tiles bigger
        winningHand + '<button class="seeMore" onclick="showMoreOfHand(' + (hand_idx++).toString() + ')" ><b>See More</b></button>' + 
        "<br />";
    });
}

function handToUnicode(hand: Hand, self_drawn: boolean): string {
    //todo make this function pretty
    if (hand) {
        return "<span class='tiles'>Melded: " + tilesToUnicode(hand.meldedTiles) + " | Concealed: " + tilesToUnicode(hand.concealedTiles) + "</span><br /><span>Score: "+calculateScore({player: hand.player, meldedTiles: expand(hand.meldedTiles.replaceAll("(", "").replaceAll(")", "")), concealedTiles: expand(hand.concealedTiles.replaceAll("(", "").replaceAll(")", "")), winningTile: "" /* todo find winning tile */}, self_drawn)+"</span>";
    }
}

function tilesToUnicode(tiles:string): string {
    let _tiles = tiles.replaceAll("(", "").replaceAll(")", "");
    _tiles = expand(_tiles);
    _tiles = replaceCharsWithTiles(_tiles);
    return _tiles;
}

function replaceCharsWithTiles(str:string): string{
    // todo i should do this iteratively in a hashmap but im a lazy bones
    return str
    .replaceAll("1B", "🀐").replaceAll("2B", "🀑").replaceAll("3B", "🀒").replaceAll("4B", "🀓").replaceAll("5B", "🀔")
    .replaceAll("6B", "🀕").replaceAll("7B", "🀖").replaceAll("8B", "🀗").replaceAll("9B", "🀘")
    .replaceAll("1C", "🀙").replaceAll("2C", "🀚").replaceAll("3C", "🀛").replaceAll("4C", "🀜").replaceAll("5C", "🀝")
    .replaceAll("6C", "🀞").replaceAll("7C", "🀟").replaceAll("8C", "🀠").replaceAll("9C", "🀡") 
    .replaceAll("1D", "🀇").replaceAll("2D", "🀈").replaceAll("3D", "🀉").replaceAll("4D", "🀊").replaceAll("5D", "🀋")
    .replaceAll("6D", "🀌").replaceAll("7D", "🀍").replaceAll("8D", "🀎").replaceAll("9D", "🀏")
    .replaceAll("EW", "🀀").replaceAll("SW", "🀁").replaceAll("WW", "🀂").replaceAll("NW", "🀃")
    .replaceAll("RD", "🀄").replaceAll("GD", "🀅").replaceAll("WD", "🀆")
    .replaceAll("1F", "🀢").replaceAll("2F", "🀣").replaceAll("3F", "🀤").replaceAll("4F", "🀥")
    .replaceAll("1S", "🀦").replaceAll("2S", "🀧").replaceAll("3S", "🀨").replaceAll("4S", "🀩");
}

function expand(tiles:string): string {

    let split = tiles.split("");
    let arr = [];
    for (let i = 0; i < split.length; i++) {
        const char = split[i];
        if (char == "{"){
            let _arr = [split[++i], split[++i]];
            _arr = _arr.concat(_arr.concat(_arr.concat(_arr)));
            arr.push(..._arr)
            i += 1;
        } else if (char == "[") {
            let _arr = [split[++i], split[++i]];
            _arr = _arr.concat(_arr.concat(_arr));
            arr.push(..._arr)
            i += 1;
        } else {
            arr.push([char])
        }
    }
    return arr.join("");
}

function getHandByPlayer(hands: Hand[], _player: string): Hand {
    //console.log("GetHandByPlayer: " + _player);
    //console.log(hands);
    //?? is this right? isnt this meant to get a player's hand
    for (let i = 0; i < hands.length; i++) {
        const hand = hands[i];
        return hand;
    }
}

function setCurrentPositions(){
    let east_is = windStrings[((board.roundNumber + + Math.floor(board.roundNumber / 4)) % 4)];
    let south_is = windStrings[((board.roundNumber + 1 + + Math.floor(board.roundNumber / 4)) % 4)];
    let west_is = windStrings[((board.roundNumber + 2 + + Math.floor(board.roundNumber / 4)) % 4)];            
    let north_is = windStrings[((board.roundNumber + 3 + + Math.floor(board.roundNumber / 4)) % 4)];
    let currentPositions_div = document.getElementById("currentPositions");
    currentPositions_div.innerHTML = 
        board.players.east + ": " + east_is + "<br />" +
        board.players.south + ": " + south_is + "<br />" +
        board.players.west + ": " + west_is + "<br />" +
        board.players.north + ": " + north_is + "<br />" +
    "";
}

function reload() {
    setCurrentPositions();
    showPrevRounds();
}

function changePlayerInputs() {
    board.players.east = east_player_input.value;
    board.players.west = west_player_input.value;
    board.players.south = south_player_input.value;
    board.players.north = north_player_input.value;
    reload();
}

function genDL() {
    // todo generate an mjb download
}