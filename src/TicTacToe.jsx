import React, { useRef, useState, useEffect } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
    const canvasRef = useRef(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const drawBoard = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        for (let i = 1; i <= 2; i++) {
            ctx.moveTo((ctx.canvas.width / 3) * i, 0);
            ctx.lineTo((ctx.canvas.width / 3) * i, ctx.canvas.height);
            ctx.moveTo(0, (ctx.canvas.height / 3) * i);
            ctx.lineTo(ctx.canvas.width, (ctx.canvas.height / 3) * i);

        }
        ctx.strokeStyle = "#5D6D7E";
        ctx.stroke();
    }
    const drawX = (ctx, x, y) => {
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 10);
        ctx.lineTo(x + ctx.canvas.width / 3 - 10, y + ctx.canvas.height / 3 - 10);
        ctx.moveTo(x + ctx.canvas.width / 3 - 10, y + 10);
        ctx.lineTo(x + 10, y + ctx.canvas.height / 3 - 10);
        ctx.strokeStyle = "#CD6155";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    const DrawO = (ctx, x, y) => {
        ctx.beginPath();
        ctx.arc(
            x + ctx.canvas.width / 6, y + ctx.canvas.height / 6, ctx.canvas.width / 6 - 10, 0, 2 * Math.PI
        )
        ctx.strokeStyle = "#633974";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
    const drawMove = (ctx, move, index) => {
        const x = (index % 3) * (ctx.canvas.width / 3);
        const y = Math.floor(index / 3) * (ctx.canvas.height / 3);
        if (move === 'x') drawX(ctx, x, y)
        if (move === 'o') DrawO(ctx, x, y)
    }

    const drawGame = (ctx) => {
        drawBoard(ctx);
        board.forEach((move, index) => {
            if (move) drawMove(ctx, move, index);
        })
    }
    const handleClick = (e) => {
        const canvas = canvasRef.current;
        const rectangle = canvas.getBoundingClientRect();
        const x = e.clientX - rectangle.left;
        const y = e.clientY - rectangle.top;
        const index = Math.floor(x / (canvas.width / 3)) + 3 * Math.floor(y / (canvas.height / 3));
        if (board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'x' : 'o';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        setWinner(calculateWinner(newBoard));

    }
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawGame(context)
    }, [board])
    return (
        <div>
            <canvas ref={canvasRef} onClick={handleClick} width={300} height={300} />
            {winner && <div className="winner">Winner : {winner}</div>}
        </div>
    )
}

export default TicTacToe;







