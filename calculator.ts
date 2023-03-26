interface Hand {
    meldedTiles: string,
    concealedTiles: string,
    winningTile: string //todo this isnt passed in properly yet, I need to track it somehow
}

function calculateScore(hand: Hand, self_drawn: boolean): string {
    let score: number = 0;

    if (self_drawn) {score += 1}

    let _hand: string[] = [];

    for (var i = 0, len = hand.concealedTiles.length; i < len; i += 2) {
        _hand.push(hand.concealedTiles.substring(i, i + 2));
    };

    const _concealed_hand = _hand;

    let _melded_hand: string[] = []

    for (var i = 0, len = hand.meldedTiles.length; i < len; i += 2) {
        _hand.push(hand.meldedTiles.substring(i, i + 2));
        _melded_hand.push(hand.meldedTiles.substring(i, i + 2));
    };

    //Single-Point Rules
    let double_chows:number = doubleChows();
    let pure_double_chow = double_chows == 1;
    let mixed_double_chow = double_chows == 2;
    let short_straight = shortStraight(_hand);
    let two_terminal_chows = twoTerminalChows();
    let pung_of_terminals_or_honors = pungOfTerminalsOrHonors();
    let melded_kong = meldedKong();
    let one_voided_suit = oneVoidedSuit();
    let no_honor_tiles = noHonorTiles();
    let _flowers = flowers();
    let edge_wait = edgeWait(hand);
    let closed_wait = closedWait(hand);
    let pair_wait = pairWait(hand);

    //Two point rules:
    let dragon_pung = dragonPung();
    let prevailing_wind = prevalentWind();
    let seat_wind = seatWind();
    let no_melded = !hasMelded(hand);
    let concealed_hand = no_melded && !self_drawn
    let all_chows = allChows(no_honor_tiles);
    let tile_hog = tileHog();
    let double_pung = doublePung();
    let two_concealed_pungs = twoConcealedPungs();
    let concealed_kong = concealedKong();
    let all_simples = allSimples(no_honor_tiles);

    //Four Point Rules:
    let outside_hand = outsideHand();
    let fully_concealed_hand = no_melded && self_drawn;
    let two_melded_kongs = twoMeldedKongs(melded_kong);
    let last_of_its_kind = lastOfItsKind();

    //Six Point Rules:
    let all_pungs = allPungs();
    let half_flush = halfFlush(one_voided_suit);
    let mixed_shifted_chows = mixedShiftedChows();
    let all_types = allTypes();
    let melded_hand = meldedHand(pair_wait);
    let two_dragon_pungs = twoDragonPungs(dragon_pung);

    //Eight Point Rules:
    let mixed_straight = mixedStraight();
    let reversible_tiles = reversibleTiles(one_voided_suit);
    let mixed_triple_chow = mixedTripleChow(mixed_double_chow);
    let mixed_shifted_pungs = mixedShiftedPungs();
    let two_concealed_kongs = twoConcealedKongs(two_concealed_pungs, concealed_kong);
    let last_tile_draw = lastTileDraw(self_drawn);
    let last_tile_claim = lastTileClaim();
    let out_with_replacement_tile = outWithReplacementTile(self_drawn);
    let robbing_the_kong = robbingTheKong(last_of_its_kind);
    
    //Twelve Point Rules:
    let lesser_honors_and_knitted_tiles = lesserHonorsAndKnittedTiles(concealed_hand, all_types);
    let knitted_straight = knittedStraight();
    let upper_four = upperFour(no_honor_tiles);
    let lower_four = lowerFour(no_honor_tiles);
    let big_three_winds = bigThreeWinds(pung_of_terminals_or_honors);



    //todo im missing a lot of hands 
    let all_terminals_and_honors = allTerminalsAndHonors(_hand);
    let thirteen_orphans = thirteenOrphans(hand, _concealed_hand, all_terminals_and_honors, no_melded);
    let seven_shifted_pairs = sevenShiftedPairs(hand);
    // todo Chicken Hand is 8 points but is easiest to calculate last, as just if no other points
    // todo score will need to be calculated here.
    let chicken_hand = score == 0;


    if ((big_three_winds && (() => {/* TODO CHECK FOR NON-WIND PUNG HERE */ return true;}))) {pung_of_terminals_or_honors = false}
    if (lesserHonorsAndKnittedTiles) { concealed_hand = false; all_types = false; }
    if (robbing_the_kong) { last_of_its_kind = false; }
    if (last_tile_draw || out_with_replacement_tile) { self_drawn = false; }
    if (two_concealed_kongs) { concealed_kong = false; two_concealed_pungs = false; }
    if (two_dragon_pungs) { dragon_pung = false }
    if (half_flush || reversible_tiles) { one_voided_suit = false }
    if (melded_hand) { pair_wait = false }
    if (all_chows || all_simples || upper_four || lower_four) { no_honor_tiles = false; }
    if (two_melded_kongs) { melded_kong = false; }
    if (thirteen_orphans) { all_terminals_and_honors = false; no_melded = false; }

    return score.toString();
}

function doubleChows():number {
    // todo this should check for double chows, but i'm too lazy to make this work
    // * returns 1 for a pure double chow (two identical chows in the same suit) 
    // * and 2 for a mixed double chow (two chows of the same numbers but in different suits)
    // * otherwise returns 0
    return 0;
}

function shortStraight(_hand: string[]):boolean {
    //todo this should look for short straights (a straight of 6 tiles)

    /*
    // If hand does not include at least 1-4 of a given suit, there cannot be a 6-length straight in that straight,
    // as the highest possible straight is 4,5,6,7,8,9.
    let bamboo_straight_possible:boolean = (
        _hand.includes("1B") || _hand.includes("2B") ||
        _hand.includes("3B") || _hand.includes("4B")
    );
    
    let circle_straight_possible:boolean = (
        _hand.includes("1C") || _hand.includes("2C") ||
        _hand.includes("3C") || _hand.includes("4C")
    );

    let character_straight_possible =  (
        _hand.includes("1D") || _hand.includes("2D") ||
        _hand.includes("3D") || _hand.includes("4D")
    )
    */

    // Every possible straight includes a 4, 5 and 6.
    // This is an efficient and effective test that limits the chance of a false straight
    let bamboo_straight_possible:boolean = (
        _hand.includes("4B") && _hand.includes("5B") && 
        _hand.includes("6B")
    );
    
    let circle_straight_possible:boolean = (
        _hand.includes("4C") && _hand.includes("5C") && 
        _hand.includes("6C")
    );

    let character_straight_possible =  (
        _hand.includes("4D") && _hand.includes("5D") && 
        _hand.includes("6D")
    )

    if (
        !(bamboo_straight_possible || circle_straight_possible || character_straight_possible)
    ) { return false }
    
    if (bamboo_straight_possible) {
        if (
            (
                _hand.includes("1B") && _hand.includes("2B") &&
                _hand.includes("3B") 
                // We already know hand is guaranteed to contain these 3
                // && _hand.includes("4B") && _hand.includes("5B") && _hand.includes("6B")
            ) || (
                _hand.includes("2B") && _hand.includes("3B") && 
                _hand.includes("7B")
            ) || (
                _hand.includes("3B") &&
                _hand.includes("7B") && _hand.includes("8B")
            ) || (
                _hand.includes("7B") && 
                _hand.includes("8B") && _hand.includes("9B")
            )
        ) { return true; }
    }

    if (circle_straight_possible) {
        if (
            (
                _hand.includes("1C") && _hand.includes("2C") &&
                _hand.includes("3C") 
            ) || (
                _hand.includes("2C") && _hand.includes("3C") && 
                _hand.includes("7C")
            ) || (
                _hand.includes("3C") && 
                _hand.includes("7C") && _hand.includes("8C")
            ) || (
                _hand.includes("7C") && 
                _hand.includes("8C") && _hand.includes("9C")
            )
        ) { return true; }
    }

    if (character_straight_possible) {
        if (
            (
                _hand.includes("1D") && _hand.includes("2D") &&
                _hand.includes("3D")
            ) || (
                _hand.includes("2D") && _hand.includes("3D") && 
                _hand.includes("7D")
            ) || (
                _hand.includes("3D") &&
                _hand.includes("7D") && _hand.includes("8D")
            ) || (
                _hand.includes("7D") && 
                _hand.includes("8D") && _hand.includes("9D")
            )
        ) { return true; }

        return false;
    }
}

function twoTerminalChows():boolean {
    //todo this should look for a set of two terminal chows (hand with any two chows containing terminals)
    return false;
}

function pungOfTerminalsOrHonors():boolean {
    //todo this should check for a pung of terminal tiles or honor tiles
    return false;
}

function meldedKong():boolean {
    //todo this should check for a melded kong
    return false;
}

function oneVoidedSuit():boolean {
    //todo should check for a suit with no tiles in hand
    return false;
}

function noHonorTiles():boolean {
    //todo check if hand contains honor tiles
    return false;
}

// self-drawn is passed in

function flowers():number {
    //todo this needs to count flower/season count in hand  
    return 0;
}

function edgeWait(hand:Hand): boolean {
    if (hand.winningTile != "3B" && hand.winningTile != "3C" && hand.winningTile != "3D" && 
        hand.winningTile != "7B" && hand.winningTile != "7C" && hand.winningTile != "7D") {
            return false;
        }
    //todo this needs to check if we win on a 3 to form a 123 chow, or a 7 to end a 789 chow
}

function closedWait(hand:Hand): boolean {
    //todo this needs to check if the winning tile forms the middle of a chow
    return false;
}

function pairWait(hand:Hand): boolean {
    //todo this needs to check if the winning tile forms a pair
    return false;
}

//Two Point

function dragonPung(): boolean {
    //todo check if pung or kong of dragons
    return false;
}

function prevalentWind(): boolean {
    //todo check if pung or kong of prevalent wind
    return false;
}

function seatWind(): boolean {
    //todo check if pung or kong of player wind
    return false;
}

function allChows(no_honor_tiles:boolean): boolean {
    if (!no_honor_tiles) {return false;}
    //todo check for all chows
}

function tileHog():boolean {
    //todo check if uses all 4 of a tile, without a kong
    return false;
}

function doublePung(): boolean {
    //todo check if two pung/kong of the same number, but different suit
    return false;
}

function twoConcealedPungs(): boolean {
    //todo check for two concealed pungs
    return false;
}

function concealedKong(): boolean {
    //todo check for a concealed kong
    return false;
}

function allSimples(no_honor_tiles:boolean): boolean {
    if (!no_honor_tiles) {return false;}
    //todo check if no honors or terminals
}

// Four Point Hands:
function outsideHand():boolean {
    //todo calculate if each set contains honor/terminal
    return false;
}

function twoMeldedKongs(melded_kong:boolean): boolean {
    if (!melded_kong) { return false; }
    //todo check if two unique melded kongs
    //one of the two can be concealed also and this will still count
}

function lastOfItsKind():boolean {
    //todo unsure how to do this, 
    // should be true when player wins by drawing a tile that has all 3 other versions of the same tile public.
    return false;
}

function allPungs(): boolean {
    // todo check for 4 pungs/kongs and a pair
    return false;
}

function halfFlush(one_voided_suit:boolean): boolean {
    if(!one_voided_suit) { return false; }
    //todo hand composed entirely of honors and one suit
}

function mixedShiftedChows(): boolean {
    //todo three chows in the three suits, all shifted up by one
    return false;
}

function allTypes(): boolean {
    //todo hand contains a bamboo, character, circle, dragon and wind tile
    return false;
}

function meldedHand(pair_wait:boolean): boolean {
    if (!pair_wait) { return false; }
    //todo check if hand is four melded sets and won by discard
}

function twoDragonPungs(dragon_pung:boolean):boolean {
    if (!dragon_pung) { return false; }
    //todo check if there is a second dragon pung
}

function mixedStraight():boolean {
    //todo check for a chow of 123, 456, 789 with one chow in each suit
    return false;
}

function reversibleTiles(one_voided_suit:boolean):boolean {
    if (!one_voided_suit) { return false; }
    //todo check if there are non-reversable tiles in hand
}

function mixedTripleChow(mixed_double_chow:boolean):boolean {
    if (!mixed_double_chow) { return false; }
    //todo check for three chows of the same numbers, one in each suit
}

function mixedShiftedPungs() {
    //todo check for an ascending set of three pungs, one in each suit
    return false;
}

function twoConcealedKongs(two_concealed_pungs:boolean, concealed_kong:boolean) :boolean {
    if (!(twoConcealedPungs || concealed_kong)) { return false; }
    //todo check for two concealed kongs
}

function lastTileDraw (self_drawn:boolean):boolean {
    if (!self_drawn) { return false; }
    //todo figue out how to check this
}

function lastTileClaim ():boolean {
    //todo fgure out how to know if won by last tile discard
    return false;
}

function outWithReplacementTile (self_drawn:boolean):boolean {
    if (!self_drawn) { return false; }
    //todo figure out how to know if player won by drawing a replacement tile after points
}

function robbingTheKong(last_of_its_kind:boolean):boolean {
    if (!lastOfItsKind) { return false; }
    //todo figureout if the kong had been robbed
}

// ! Bool delcs end here

function lesserHonorsAndKnittedTiles(concealed_hand:boolean, all_types:boolean):boolean {
    if (!(concealed_hand && all_types)) { return false; }
    // TODO Check if the hand is entirely composed of unpaired honors and single tiles from different knitted sequences; the player can win without the standard 4 triples and a pair in this case.
    // Knitted Sequences are 1,4,7; 2,5,8 and 3,6,9
}

function knittedStraight(): boolean {
    // TODO Check for 1,4,7; 2,5,8 and 3,6,9 in the three different suits. These count as 3 chows if you get them in a hand.
    return false;
}

function upperFour(no_honor_tiles: boolean):boolean {
    if (!no_honor_tiles) { return false; }
    //TODO check if hand only has suit tiles of value 6 or greater.
}

function lowerFour(no_honor_tiles: boolean):boolean {
    if (!no_honor_tiles) { return false; }
    //TODO check if hand only has suit tiles of value 4 or less.
}

function bigThreeWinds(pung_of_terminals_or_honors:boolean):boolean {
    if (!pung_of_terminals_or_honors) {
        // ! This specific one is not incompatible if hand also includes a non-wind pung
        return false;
    }
    // todo check for pung/kongs of 3/4 of the winds.
}





































function allTerminalsAndHonors(_hand:string[]):boolean {
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
            _hand.includes("8D")
            )
}

function thirteenOrphans(hand:Hand, _hand:string[], all_terminals_or_honors:boolean, concealedHand:boolean): boolean {
    if (!concealedHand || !all_terminals_or_honors) {
        return false;
    }

    if (_hand.includes("1B") && _hand.includes("9B") &&
        _hand.includes("1C") && _hand.includes("9C") &&
        _hand.includes("1D") && _hand.includes("9D") &&
        _hand.includes("RD") && _hand.includes("GD") && 
        _hand.includes("WD") &&
        _hand.includes("NW") && _hand.includes("SW") && 
        _hand.includes("WW") && _hand.includes("EW") ){
            return true;
    }
    return false;
}

function sevenShiftedPairs(hand:Hand): boolean {
    //todo detect seven shifted pairs
    return false;
}

function hasMelded(hand:Hand): boolean {
    return (hand.meldedTiles !== "");
}