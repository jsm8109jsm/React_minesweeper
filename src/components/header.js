import React, {useState} from "react";

export default function Header(){
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [mine, setMine] = useState(0);
    
    function makeBoard(row, column){
        let table = '<table><tbody>';
        for(let i=0; i<column; i++){
            table += '<tr>';
            for(let j=0; j<row; j++){
                table += '<td></td>';
            }
            table += '</tr>';
        }
        table += '</tbody></table>';
        document.getElementById('board').innerHTML = table;
    }

    function setMineNum(mine, size){
        let mines = [];
        for(let i=0; i<mine; i++){
            let randomNum = Math.floor(Math.random() * size);
            if(!mines.includes(randomNum)){
                mines.push(randomNum);
            }
            else{
                i--;
            }
        }
        console.log(mines);
        return mines;
    }

    function setStart(){
        if(mine>row*column){
            alert('지뢰 개수가 너무 많습니다!');
            return;
        }
        makeBoard(row, column);
        setMineNum(mine, row*column);
    }
    return(
        <header>
            <h6>가로 : </h6><input type="number" onChange={event => setRow(event.target.value)} placeholder="가로"></input>
            <h6>세로 : </h6><input type="number" onChange={event => setColumn(event.target.value)} placeholder="세로"></input>
            <h6>지뢰 개수 : </h6><input type="number" onChange={event => setMine(event.target.value)} placeholder="지뢰 개수"></input>
            <button className="start" onClick={setStart}>시작</button>
            <div id="board"></div>
        </header>
    )
}