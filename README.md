# MahjongHelper

MahjongHelper is a web-app designed to calculate the scores of hands for **Chinese** Mahjong. It tracks winds, automatically calculates scores for hands, and can keep an overall score count over multiple sessions.

## Features

### Expected Features

- [ ] Long-term scoring and wind-tracking that lasts over multiple sessions
  - [ ] Auto-tracking of PC generated scores, as well as manual scoring
  - [ ] Ability to store over multiple sessions (maybe use browser localStorage or export to a file on the local system)
- [ ] Per-game auto-scoring based on the winning hand
  - [ ] Support for just inserting a complete hand, and a number of flowers
  - [ ] Support for score minimums and handling kongs
  - [ ] Support for tracking the feeding player etc

### Possible Features

- [ ] Support for Japanese Mahjong rules as well as Chinese

### Non-Features

- [ ] Full Game Simulation with Online Play
- [ ] Online Synchronisation of Board States with either Cloud Storage, or with other players.

## Specifications

### Infrastructure

Mahjong Helper should be built for the web using Javascript, HTML and CSS, with minimal external library bloat
and should be able to be run on infrastructure like Github Pages, where no user-data is sent to the server.

### Data Structure

The Tiles in a hand should be representable by a string, similar to FEN.

This string format should be in the form:

``` mjb
E<name>,S<name>,W<name>,N<name>;/*representing the initial winds of the players, and giving them pretty names. pretty names must be unique*/
<round number>;/*representing the amount of rounds played*/
<minimum score>;
/* Repeat from here for each round played */
!<name>,<exposed tiles>,<concealed tiles>,<feeding player name (use self name if self-drawn)>; /*description of the winning hand*/
<name>,<exposed tiles>,<concealed tiles>; /* optionally, other players hands for that game */
?<number of discarded tiles, optionally>;
```

Tiles should be Represented as such:

```mjb
1B,2B,3B, ... 9B  - 1-9 of Bamboo
1C,2C,3C, ... 9C  - 1-9 of Circles
1D,2D,3D, ... 9D  - 1-9 of Digits
NW,SW,EW,WW         - Winds (North, South, East, West)
RD, GD, WD          - Dragons (Red, Green, White)
1F,2F,3F,4F         - Flowers (Plum, Orchid, Chrysanthemum, Bamboo)
1S,2S,3S,4S         - Seasons (Spring, Summer, Autumn, Winter)

And should be separated into [Pung], {Kong} and (Chow)
```

Text surrounded by `/* */` is ignored by the parser.
Newlines and spaces are optional and ignored.
This should be saved as a `.mjb` file (for mahjong board).

Here is an example `mjb` string based on the game played at <https://playmahjong.io/games/192302>.

```mjb
EuwuSiri,SMahjongBoyXD,WJamborius,NTheJuicer;4;0;
!TheJuicer,3F(3B4B5B)(5B6B7B),(6D7D8D)(6C7C8C)9C9C,TheJuicer;
uwuSiri,1F(6D7D8D)(4C5C6C),[8C](7B8B9B)3B;
MahjongBoyXD,2F1S[9D][SW](5B6B7B),1B2B5C5C;
Jamborius,2S{2C},(1D2D3D)(7D8D9D)[9B]5C;/* Was very close to a W */
?74;
!MahjongBoyXD,2S(4D5D6D)(5C6C7C)(6D7D8D),7B7B[2D],MahjongBoyXD;
/* Beacuse I am manually generating this, I have decided to cut out other people's hands from now to save time */
?30;
!TheJuicer,1S2S(4D5D6D)(7D8D9D)[3D],[7B]6D6D,uwuSiri;
?53;
!MahjongBoyXD,1F1S2S[9C][2B](3D4D5D),4C4C(7B8B9B),uwuSiri;?48;
```

or minified:

```mjb
EuwuSiri,SMahjongBoyXD,WJamborius,NTheJuicer;4;0;!TheJuicer,3F(3B4B5B)(5B6B7B),(6D7D8D)(6C7C8C)9C9C,TheJuicer;uwuSiri,1F(6D7D8D)(4C5C6C),[8C](7B8B9B)3B;MahjongBoyXD,2F1S[9D][SW](5B6B7B),1B2B5C5C;Jamborius,2S{2C},(1D2D3D)(7D8D9D)[9B]5C;?74;!MahjongBoyXD,2S(4D5D6D)(5C6C7C)(6D7D8D),7B7B[2D],MahjongBoyXD;?30;!TheJuicer,1S2S(4D5D6D)(7D8D9D)[3D],[7B]6D6D,uwuSiri;?53;!MahjongBoyXD,1F1S2S[9C][2B](3D4D5D),4C4C(7B8B9B),uwuSiri;?48;
```

While this isn't the most serialisable format, it should be relatively human readable, which is great for debugging, and potentially porting to other programs.

### Style

MahjongHelper should be consistent in visual style.
The Tile Icons should be consistently the ones by [Martin Persson](http://www.martinpersson.org/). These are licenced under CC-BY 4.0 from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mpu9m.png)

These are mostly named just with the `mjb` notation for the tile, however, the Seasons and Flowers have numbered variants with `<notation>N.png`, ie. Spring is `1S.png`, and Spring with a number is `1SN.png`.
There is also `Concealed.png` which represents a concealed tile in some cases.

These Tiles should be used as high-quality tiles, and smaller representations should use the [Unicode Mahjong Tiles](https://en.wikipedia.org/wiki/Mahjong_Tiles_(Unicode_block))
