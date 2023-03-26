var emptyBoard = {
    players: {
        east: "",
        south: "",
        west: "",
        north: "",
    },
    roundNumber: 0,
    minimumScore: 8,
    rounds: []
};
var _boardState = emptyBoard;
var upload = document.getElementById("mjbupload");
var input = document.getElementById("insertMJB");
var text = document.getElementById("textinput");
function clickUploadButton() {
    var hide = document.getElementById("getStarted");
    hide.style.display = "none";
    input.style.display = "inline-block";
}
function handleUpload() {
}
function loadMJB() {
    var _a;
    var val = text.value.trim();
    var mjb = processMJB(val);
    var playerdef = mjb[0];
    var players = {
        east: playerdef[0].slice(1),
        south: playerdef[1].slice(1),
        west: playerdef[2].slice(1),
        north: playerdef[3].slice(1),
    };
    var roundNumber = parseInt(mjb[1][0]);
    var minScore = parseInt(mjb[2][0]);
    var hands = mjb.slice(3);
    var roundCount = -1;
    var rounds = [];
    for (var i = 0; i < hands.length; i++) {
        if (roundCount < roundNumber) {
            var hand = {
                player: "",
                meldedTiles: "",
                concealedTiles: "",
            };
            var questionMark = false;
            if (hands[i][0].startsWith("?")) {
                rounds[roundCount].numberDiscarded = parseInt(hands[i][0].slice(1));
                questionMark = true;
            }
            if (!questionMark) {
                var exclam = false;
                if (hands[i][0].startsWith("!")) {
                    exclam = true;
                    hands[i][0] = hands[i][0].slice(1);
                }
                hand.player = hands[i][0];
                hand.meldedTiles = hands[i][1];
                hand.concealedTiles = hands[i][2];
                if (exclam) {
                    roundCount++;
                    if (roundCount >= rounds.length - 1) {
                        rounds.push.apply(rounds, [{
                                winningPlayer: "",
                                feedingPlayer: "",
                                numberDiscarded: 0,
                                hands: []
                            }]);
                    }
                    rounds[roundCount].winningPlayer = hand.player;
                    rounds[roundCount].feedingPlayer = hands[i][3];
                }
                (_a = rounds[roundCount].hands).push.apply(_a, [hand]);
            }
        }
    }
    _boardState.players = players;
    _boardState.roundNumber = roundNumber;
    _boardState.minimumScore = minScore;
    _boardState.rounds = rounds;
    console.log(_boardState);
    if (typeof (Storage) !== "undefined") {
        localStorage.boardState = JSON.stringify(_boardState);
    }
    else {
        alert("HTML5 localStorage unavailable.\nPlease use a more modern browser.");
    }
    window.location.href = "./board.html";
}
function processMJB(str) {
    var __ = str.replaceAll("\n", "").replaceAll(" ", "").split(";");
    return splitArr(__, ",");
}
function splitArr(str_arr, splitter) {
    var arr = [];
    var i = 0;
    str_arr.forEach(function (str) {
        arr[i++] = str.split(splitter);
    });
    return arr;
}
//# sourceMappingURL=index.js.map