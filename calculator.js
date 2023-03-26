function calculateScore(hand, self_drawn) {
    var score = 0;
    if (self_drawn) {
        score += 1;
    }
    var _hand = [];
    for (var i = 0, len = hand.concealedTiles.length; i < len; i += 2) {
        _hand.push(hand.concealedTiles.substring(i, i + 2));
    }
    ;
    var _concealed_hand = _hand;
    var _melded_hand = [];
    for (var i = 0, len = hand.meldedTiles.length; i < len; i += 2) {
        _hand.push(hand.meldedTiles.substring(i, i + 2));
        _melded_hand.push(hand.meldedTiles.substring(i, i + 2));
    }
    ;
    var double_chows = doubleChows();
    var pure_double_chow = double_chows == 1;
    var mixed_double_chow = double_chows == 2;
    var short_straight = shortStraight(_hand);
    var two_terminal_chows = twoTerminalChows();
    var pung_of_terminals_or_honors = pungOfTerminalsOrHonors();
    var melded_kong = meldedKong();
    var one_voided_suit = oneVoidedSuit();
    var no_honor_tiles = noHonorTiles();
    var _flowers = flowers();
    var edge_wait = edgeWait(hand);
    var closed_wait = closedWait(hand);
    var pair_wait = pairWait(hand);
    var dragon_pung = dragonPung();
    var prevailing_wind = prevalentWind();
    var seat_wind = seatWind();
    var no_melded = !hasMelded(hand);
    var concealed_hand = no_melded && !self_drawn;
    var all_chows = allChows(no_honor_tiles);
    var tile_hog = tileHog();
    var double_pung = doublePung();
    var two_concealed_pungs = twoConcealedPungs();
    var concealed_kong = concealedKong();
    var all_simples = allSimples(no_honor_tiles);
    var outside_hand = outsideHand();
    var fully_concealed_hand = no_melded && self_drawn;
    var two_melded_kongs = twoMeldedKongs(melded_kong);
    var last_of_its_kind = lastOfItsKind();
    var all_pungs = allPungs();
    var half_flush = halfFlush(one_voided_suit);
    var mixed_shifted_chows = mixedShiftedChows();
    var all_types = allTypes();
    var melded_hand = meldedHand(pair_wait);
    var two_dragon_pungs = twoDragonPungs(dragon_pung);
    var mixed_straight = mixedStraight();
    var reversible_tiles = reversibleTiles(one_voided_suit);
    var mixed_triple_chow = mixedTripleChow(mixed_double_chow);
    var mixed_shifted_pungs = mixedShiftedPungs();
    var two_concealed_kongs = twoConcealedKongs(two_concealed_pungs, concealed_kong);
    var last_tile_draw = lastTileDraw(self_drawn);
    var last_tile_claim = lastTileClaim();
    var out_with_replacement_tile = outWithReplacementTile(self_drawn);
    var robbing_the_kong = robbingTheKong(last_of_its_kind);
    var lesser_honors_and_knitted_tiles = lesserHonorsAndKnittedTiles(concealed_hand, all_types);
    var knitted_straight = knittedStraight();
    var upper_four = upperFour(no_honor_tiles);
    var lower_four = lowerFour(no_honor_tiles);
    var big_three_winds = bigThreeWinds(pung_of_terminals_or_honors);
    var all_terminals_and_honors = allTerminalsAndHonors(_hand);
    var thirteen_orphans = thirteenOrphans(hand, _concealed_hand, all_terminals_and_honors, no_melded);
    var seven_shifted_pairs = sevenShiftedPairs(hand);
    var chicken_hand = score == 0;
    if ((big_three_winds && (function () { return true; }))) {
        pung_of_terminals_or_honors = false;
    }
    if (lesserHonorsAndKnittedTiles) {
        concealed_hand = false;
        all_types = false;
    }
    if (robbing_the_kong) {
        last_of_its_kind = false;
    }
    if (last_tile_draw || out_with_replacement_tile) {
        self_drawn = false;
    }
    if (two_concealed_kongs) {
        concealed_kong = false;
        two_concealed_pungs = false;
    }
    if (two_dragon_pungs) {
        dragon_pung = false;
    }
    if (half_flush || reversible_tiles) {
        one_voided_suit = false;
    }
    if (melded_hand) {
        pair_wait = false;
    }
    if (all_chows || all_simples || upper_four || lower_four) {
        no_honor_tiles = false;
    }
    if (two_melded_kongs) {
        melded_kong = false;
    }
    if (thirteen_orphans) {
        all_terminals_and_honors = false;
        no_melded = false;
    }
    return score.toString();
}
function doubleChows() {
    return 0;
}
function shortStraight(_hand) {
    var bamboo_straight_possible = (_hand.includes("4B") && _hand.includes("5B") &&
        _hand.includes("6B"));
    var circle_straight_possible = (_hand.includes("4C") && _hand.includes("5C") &&
        _hand.includes("6C"));
    var character_straight_possible = (_hand.includes("4D") && _hand.includes("5D") &&
        _hand.includes("6D"));
    if (!(bamboo_straight_possible || circle_straight_possible || character_straight_possible)) {
        return false;
    }
    if (bamboo_straight_possible) {
        if ((_hand.includes("1B") && _hand.includes("2B") &&
            _hand.includes("3B")) || (_hand.includes("2B") && _hand.includes("3B") &&
            _hand.includes("7B")) || (_hand.includes("3B") &&
            _hand.includes("7B") && _hand.includes("8B")) || (_hand.includes("7B") &&
            _hand.includes("8B") && _hand.includes("9B"))) {
            return true;
        }
    }
    if (circle_straight_possible) {
        if ((_hand.includes("1C") && _hand.includes("2C") &&
            _hand.includes("3C")) || (_hand.includes("2C") && _hand.includes("3C") &&
            _hand.includes("7C")) || (_hand.includes("3C") &&
            _hand.includes("7C") && _hand.includes("8C")) || (_hand.includes("7C") &&
            _hand.includes("8C") && _hand.includes("9C"))) {
            return true;
        }
    }
    if (character_straight_possible) {
        if ((_hand.includes("1D") && _hand.includes("2D") &&
            _hand.includes("3D")) || (_hand.includes("2D") && _hand.includes("3D") &&
            _hand.includes("7D")) || (_hand.includes("3D") &&
            _hand.includes("7D") && _hand.includes("8D")) || (_hand.includes("7D") &&
            _hand.includes("8D") && _hand.includes("9D"))) {
            return true;
        }
        return false;
    }
}
function twoTerminalChows() {
    return false;
}
function pungOfTerminalsOrHonors() {
    return false;
}
function meldedKong() {
    return false;
}
function oneVoidedSuit() {
    return false;
}
function noHonorTiles() {
    return false;
}
function flowers() {
    return 0;
}
function edgeWait(hand) {
    if (hand.winningTile != "3B" && hand.winningTile != "3C" && hand.winningTile != "3D" &&
        hand.winningTile != "7B" && hand.winningTile != "7C" && hand.winningTile != "7D") {
        return false;
    }
}
function closedWait(hand) {
    return false;
}
function pairWait(hand) {
    return false;
}
function dragonPung() {
    return false;
}
function prevalentWind() {
    return false;
}
function seatWind() {
    return false;
}
function allChows(no_honor_tiles) {
    if (!no_honor_tiles) {
        return false;
    }
}
function tileHog() {
    return false;
}
function doublePung() {
    return false;
}
function twoConcealedPungs() {
    return false;
}
function concealedKong() {
    return false;
}
function allSimples(no_honor_tiles) {
    if (!no_honor_tiles) {
        return false;
    }
}
function outsideHand() {
    return false;
}
function twoMeldedKongs(melded_kong) {
    if (!melded_kong) {
        return false;
    }
}
function lastOfItsKind() {
    return false;
}
function allPungs() {
    return false;
}
function halfFlush(one_voided_suit) {
    if (!one_voided_suit) {
        return false;
    }
}
function mixedShiftedChows() {
    return false;
}
function allTypes() {
    return false;
}
function meldedHand(pair_wait) {
    if (!pair_wait) {
        return false;
    }
}
function twoDragonPungs(dragon_pung) {
    if (!dragon_pung) {
        return false;
    }
}
function mixedStraight() {
    return false;
}
function reversibleTiles(one_voided_suit) {
    if (!one_voided_suit) {
        return false;
    }
}
function mixedTripleChow(mixed_double_chow) {
    if (!mixed_double_chow) {
        return false;
    }
}
function mixedShiftedPungs() {
    return false;
}
function twoConcealedKongs(two_concealed_pungs, concealed_kong) {
    if (!(twoConcealedPungs || concealed_kong)) {
        return false;
    }
}
function lastTileDraw(self_drawn) {
    if (!self_drawn) {
        return false;
    }
}
function lastTileClaim() {
    return false;
}
function outWithReplacementTile(self_drawn) {
    if (!self_drawn) {
        return false;
    }
}
function robbingTheKong(last_of_its_kind) {
    if (!lastOfItsKind) {
        return false;
    }
}
function lesserHonorsAndKnittedTiles(concealed_hand, all_types) {
    if (!(concealed_hand && all_types)) {
        return false;
    }
}
function knittedStraight() {
    return false;
}
function upperFour(no_honor_tiles) {
    if (!no_honor_tiles) {
        return false;
    }
}
function lowerFour(no_honor_tiles) {
    if (!no_honor_tiles) {
        return false;
    }
}
function bigThreeWinds(pung_of_terminals_or_honors) {
    if (!pung_of_terminals_or_honors) {
        return false;
    }
}
function allTerminalsAndHonors(_hand) {
    return (_hand.includes("2B") || _hand.includes("3B") ||
        _hand.includes("4B") || _hand.includes("5B") ||
        _hand.includes("6B") || _hand.includes("7B") ||
        _hand.includes("8B") ||
        _hand.includes("2C") || _hand.includes("3C") ||
        _hand.includes("4C") || _hand.includes("5C") ||
        _hand.includes("6C") || _hand.includes("7C") ||
        _hand.includes("8C") ||
        _hand.includes("2D") || _hand.includes("3D") ||
        _hand.includes("4D") || _hand.includes("5D") ||
        _hand.includes("6D") || _hand.includes("7D") ||
        _hand.includes("8D"));
}
function thirteenOrphans(hand, _hand, all_terminals_or_honors, concealedHand) {
    if (!concealedHand || !all_terminals_or_honors) {
        return false;
    }
    if (_hand.includes("1B") && _hand.includes("9B") &&
        _hand.includes("1C") && _hand.includes("9C") &&
        _hand.includes("1D") && _hand.includes("9D") &&
        _hand.includes("RD") && _hand.includes("GD") &&
        _hand.includes("WD") &&
        _hand.includes("NW") && _hand.includes("SW") &&
        _hand.includes("WW") && _hand.includes("EW")) {
        return true;
    }
    return false;
}
function sevenShiftedPairs(hand) {
    return false;
}
function hasMelded(hand) {
    return (hand.meldedTiles !== "");
}
//# sourceMappingURL=calculator.js.map