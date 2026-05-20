import { DIRECTIONS, inBounds, applyMove } from "../gameSessionModules/game.logic.js";
import { easyAi, hardAi, mediumAi } from "./ai.model.js";
// Finding random move for 
export const randomMove = (board) => {
    // Storing all available moves
    const empty = [];
    // Pushing all available squares
    board.forEach((row, r)=>{
        row.forEach((cellMark, c)=>{
            if (cellMark === null) {empty.push({ row: r, col: c })}
        })
    })
    // Choosing a random row, col and returning:
    return empty[Math.floor(Math.random() * empty.length)]
}

// Detecting open line:
export const detectOpenLine = (board, marker, length, requireBothEnds = false) => {
    const size = board.length
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            for (const [dr, dc] of DIRECTIONS) {
                let cells = []
                let nr = r, nc = c

                // collect N consecutive markers
                while (
                    cells.length < length &&
                    inBounds(nr, nc, size) &&
                    board[nr][nc] === marker
                ) {
                    cells.push({ row: nr, col: nc })
                    nr += dr
                    nc += dc
                }

                if (cells.length < length) continue

                // check both ends are open
                const beforeRow = r - dr
                const beforeCol = c - dc
                const afterRow = nr
                const afterCol = nc

                const frontOpen = inBounds(afterRow, afterCol, size) && board[afterRow][afterCol] === null
                const backOpen = inBounds(beforeRow, beforeCol, size) && board[beforeRow][beforeCol] === null

                // if both ends are required, make sure both are open
                // otherwise block whichever end is available
                if (requireBothEnds) {
                    if (frontOpen && backOpen) return { row: afterRow, col: afterCol };
                } else {
                    if (frontOpen) return { row: afterRow, col: afterCol };
                    if (backOpen) return { row: beforeRow, col: beforeCol };
                }
            }
        }
    }
    return null
}

// Detecting fork formation
// detect fork — two crossing 3-mark open lines
export const detectFork = (board, marker) => {
    const size = board.length
    const threatCells = {}

    // find all cells that would block a 3-mark open line
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (board[r][c] !== null) continue
            // simulate placing here
            const simBoard = applyMove(r, c, board, marker)
            // check if this creates an open 3
            for (const [dr, dc] of DIRECTIONS) {
                let count = 1
                // check forward
                let nr = r + dr, nc = c + dc
                while (inBounds(nr, nc, size) && simBoard[nr][nc] === marker) { count++; nr += dr; nc += dc }
                const end1Open = inBounds(nr, nc, size) && simBoard[nr][nc] === null;

                // check backward
                nr = r - dr; nc = c - dc
                while (inBounds(nr, nc, size) && simBoard[nr][nc] === marker) { count++; nr -= dr; nc -= dc }
                const end2Open = inBounds(nr, nc, size) && simBoard[nr][nc] === null;

                if (count >= 3 && end1Open && end2Open) {
                    const key = `${r},${c}`
                    threatCells[key] = (threatCells[key] || 0) + 1
                }
            }
        }
    }

    // a fork exists where 2+ directions form a threat
    const forkCell = Object.entries(threatCells).find(([_, count]) => count >= 2)
    if (forkCell) {
        const [r, c] = forkCell[0].split(',').map(Number)
        return { row: r, col: c }
    }
    return null
}

export const getAiInstance = (aiName) => {
    switch (aiName) {
        case "Michael": return new easyAi();
        case "Bill": return new mediumAi();
        case "John": return new hardAi();
        default: return;
    }
}
