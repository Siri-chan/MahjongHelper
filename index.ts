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

let _boardState = emptyBoard;
const upload:any = document.getElementById("mjbupload");
const input:any = document.getElementById("insertMJB");
const text:any = document.getElementById("textinput");
function clickUploadButton() {
    let hide:any = document.getElementById("getStarted");
    hide.style.display = "none";
    input.style.display = "inline-block";
}
function handleUpload() {
    //todo write file contents to `input` if file uploaded 
}
function loadMJB() {
    //todo parse MJB file
    let val = text.value.trim();
    let mjb = processMJB(val);
    let playerdef = mjb[0];
    let players = {
        east: playerdef[0].slice(1),
        south: playerdef[1].slice(1),
        west: playerdef[2].slice(1),
        north: playerdef[3].slice(1),
    }
    //todo check if adding these indexes works
    let roundNumber = parseInt(mjb[1][0]);
    let minScore = parseInt(mjb[2][0]);
    let hands = mjb.slice(3);  

    //todo sort out parsing each round from here
    let roundCount = -1;
    let rounds = [/*{
        winningPlayer: "",
        feedingPlayer: "",
        numberDiscarded: 0,
        hands: []
    }*/]
    for (var i = 0; i < hands.length; i++){
        if (roundCount < roundNumber) {
            //todo for now tiles can be strings bc im lazy todo make them not that
            let hand = {
                player: "",
                meldedTiles: "",
                concealedTiles: "",
            };
            let questionMark = false;
            if(hands[i][0].startsWith("?")){
                rounds[roundCount].numberDiscarded = parseInt(hands[i][0].slice(1));
                questionMark = true;
            }
            if(!questionMark) {
                let exclam = false;
                if(hands[i][0].startsWith("!")){
                    exclam = true;
                    hands[i][0] = hands[i][0].slice(1);
                }
                hand.player = hands[i][0];
                hand.meldedTiles = hands[i][1];
                hand.concealedTiles = hands[i][2];
                if(exclam){
                    roundCount++;
                    if (roundCount >= rounds.length - 1) {
                        // ! i dont think this code is right
                        rounds.push(...[{
                            winningPlayer: "",
                            feedingPlayer: "",
                            numberDiscarded: 0,
                            hands: []
                        }]);
                    }
                    rounds[roundCount].winningPlayer = hand.player;
                    rounds[roundCount].feedingPlayer = hands[i][3];
                }
                rounds[roundCount].hands.push(...[hand]);
            }
        }
    }


    _boardState.players = players;
    _boardState.roundNumber = roundNumber;
    _boardState.minimumScore = minScore;
    //_boardState.roundCount = roundCount;
    _boardState.rounds = rounds;
    console.log(_boardState)
    if (typeof(Storage) !== "undefined") {
        //https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/
        localStorage.boardState = JSON.stringify(_boardState);
    } else {
        alert("HTML5 localStorage unavailable.\nPlease use a more modern browser.");
    }
    
    window.location.href = "./board.html"
}

//todo figure out types here idr what this returns
function processMJB(str:string):string[][] {
    //todo update this with the winning tile stat
    let __ = str.replaceAll("\n","").replaceAll(" ","").split(";");
    return splitArr(__, ",")
}

//todo figure out types here idr what this does
function splitArr(str_arr:string[], splitter:string):string[][] {
    let arr:string[][] = [];
    let i = 0;
    str_arr.forEach(str => {
        arr[i++] = str.split(splitter);
    });
    return arr;
}