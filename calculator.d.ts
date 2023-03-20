interface Hand {
    meldedTiles: string;
    concealedTiles: string;
}
declare function calculateScore(hand: Hand): string;
