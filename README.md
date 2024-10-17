# Lumapps Goban Technical test

## How to launch the project

To setup and launch tests:

```sh
git clone https://github.com/lumapps/test-goban-ts.git
cd test-goban-ts
npm install
npm test
```

## Technical Test

The theme of this test is the game of go.

The goal is to write a function that determines whether the stone at an x, y position on a goban is taken or not.

Vocabulary:

- Goban: the board on which stones are placed to play
- Shape: a group of one or more adjacent stones of the same color (adjacent: stones that are left, right, top, bottom of each other, diagonals do not count)
- Freedom: empty space adjacent to a shape

Reminder of the rules:

1. The goban has an indefinite size
2. There are two players and everyone plays a stone color: black or white
3. The stones are laid one after the other each turn
4. When a form has no more freedom it is taken

The objective of the test is to write an `isTaken` function which takes in parameter `x`, `y` and which returns true if the stone with the position `x`, `y`, is taken there and false otherwise. To do this function we use a function `getStatus(x, y)` which returns:

- Status.BLACK: when the stone at position `x`, `y` is black
- Status.WHITE: when the stone at the position `x`, `y` is white
- Status.EMPTY: when there is no stone at position `x`, `y`
- Status.OUT: when the position `x`, `y` is out of the goban

Complete the `isTaken` function with your solution. You can add parameters to the method if needed. This one must respect the good practices of TypeScript. You can test your solution at any time with `npm test`. The tests are in the file goban.spec.ts.

Examples:

```text
# = black
o = white
. = empty


. #.
# o # <= o is taken because she has no freedom, she has no adjacent empty space
. #.


...
# o # <= o is not taken because she has a freedom over
. #.


o # <= o is taken because she has no freedom (the top and the left are out of the goban so they are not freedoms)
#.


oo.
## o <= the form # is taken because it has no freedom
o o #
.o.


oo.
##. <= the form # is not taken because it has a freedom in x = 2, y = 1 (0, 0 on the top left)
o o #
.o.
```
