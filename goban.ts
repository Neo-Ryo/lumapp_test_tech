export enum Status {
    WHITE = 1,
    BLACK = 2,
    EMPTY = 3,
    OUT = 4,
}

interface Position {
    x: number
    y: number
}

export class Goban {
    private board: string[]

    constructor(board: string[]) {
        this.board = board
    }

    public print() {
        console.log(this.board.join('\n'))
    }

    public getStatus(x: number, y: number): Status {
        if (
            !this.board ||
            x < 0 ||
            y < 0 ||
            y >= this.board.length ||
            x >= this.board[0].length
        ) {
            return Status.OUT
        } else if (this.board[y][x] === '.') {
            return Status.EMPTY
        } else if (this.board[y][x] === 'o') {
            return Status.WHITE
        } else if (this.board[y][x] === '#') {
            return Status.BLACK
        }
        throw new Error(`Unknown goban value ${this.board[y][x]}`)
    }
    // here we check only one direction at a time
    public checkIsBlockedDirection(
        x: number,
        y: number,
        direction: string,
        // stoneStatus is the initial stone (the team we are in)
        stoneStatus: Status,
        checkedPosition: Array<Position>
    ): boolean | Position | null {
        // prevent out of boundaries check
        if (direction === 'N' && y > 0) {
            // in case of larger board, check if the current stone has been already checked
            if (checkedPosition.find((cp) => cp.x === x && cp.y === y - 1)) {
                return null
            }
            const status = this.getStatus(x, y - 1)
            if (status === Status.EMPTY) {
                return false
            } else if (status === stoneStatus) {
                return { x: x, y: y - 1 }
            } else {
                return true
            }
        }
        if (direction === 'E' && x < this.board[0].length) {
            if (checkedPosition.find((cp) => cp.x === x + 1 && cp.y === y)) {
                return null
            }
            const status = this.getStatus(x + 1, y)
            if (status === Status.EMPTY) {
                return false
            } else if (status === stoneStatus) {
                return { x: x + 1, y: y }
            } else {
                return true
            }
        }
        if (direction === 'S' && y < this.board.length) {
            if (checkedPosition.find((cp) => cp.x === x && cp.y === y + 1)) {
                return null
            }
            const status = this.getStatus(x, y + 1)
            if (status === Status.EMPTY) {
                return false
            } else if (status === stoneStatus) {
                return { x: x, y: y + 1 }
            } else {
                return true
            }
        }
        if (direction === 'W' && x > 0) {
            if (checkedPosition.find((cp) => cp.x === x - 1 && cp.y === y)) {
                return null
            }
            const status = this.getStatus(x - 1, y)
            if (status === Status.EMPTY) {
                return false
            } else if (status === stoneStatus) {
                return { x: x - 1, y: y }
            } else {
                return true
            }
        }
        return null
    }

    public isTaken(x: number, y: number): boolean {
        const status = this.getStatus(x, y)
        // throw an error if empty or out of boundaries
        if (status === Status.EMPTY || status === Status.OUT) {
            throw new Error('Empty or out of boundaries')
        }
        const checkedPositions: Array<Position> = []
        const positionsToCheck: Array<Position> = [{ x: x, y: y }]
        while (positionsToCheck.length) {
            // North, East, South, West
            const directions = ['N', 'E', 'S', 'W']
            for (const dir of directions) {
                const result = this.checkIsBlockedDirection(
                    positionsToCheck[0].x,
                    positionsToCheck[0].y,
                    dir,
                    status,
                    checkedPositions
                )
                if (result === false) {
                    return false
                } else if (result === true || result === null) {
                    continue
                } else {
                    // checkIsBlockedDirection function returning a position means
                    // another stone of our Status has been detected so we push it
                    // in positionsToCheck array
                    positionsToCheck.push(result as Position)
                }
                // pushing the current position in checkedPositions array
                // to avoid checking  it again and infinite loop
                checkedPositions.push({
                    x: positionsToCheck[0].x,
                    y: positionsToCheck[0].y,
                })
            }
            // remove the newly checked stone
            positionsToCheck.shift()
        }
        // in case none of the above, the stone is taken
        return true
    }
}
