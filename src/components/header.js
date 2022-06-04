import React, {useState} from "react";

export default function Header(){
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [mine, setMine] = useState(0);
    const [strMinutes, setStrMinutes] = useState('00');
    const [strSeconds, setStrSeconds] = useState('00');
    const [strTenMilli, setStrTenMilli] = useState('00');
    let minutes = 0;
    let seconds = 0;
    let tenMilli = 0;
    const tdArr = document.getElementsByTagName('td');

    let time;

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

    function putMine(mines){
        for(let i = 0; i < tdArr.length; i++){
            if(mines.includes(i)){
                tdArr[i].classList.add('mines');
            }
        }
    }

    function startTime(){
        tenMilli++;
        setStrTenMilli(tenMilli > 9 ? tenMilli.toString() : '0' + tenMilli.toString());
        if(tenMilli > 99){
            seconds++;
            tenMilli=0;
            setStrTenMilli(tenMilli > 9 ? tenMilli.toString() : '0' + tenMilli.toString());
            setStrSeconds(seconds > 9 ? seconds.toString() : '0' + seconds.toString());
        }
        if(seconds > 59){
            minutes++;
            seconds=0;
            setStrSeconds(seconds > 9 ? seconds.toString() : '0' + seconds.toString());
            setStrMinutes(minutes > 9 ? minutes.toString() : '0' + minutes.toString());
        }
        console.log(minutes, seconds, tenMilli);
        console.log(strMinutes, strSeconds, strTenMilli);
    }

    function setStart(){
        if(mine>row*column){
            alert('지뢰 개수가 너무 많습니다!');
            return;
        }
        const mines = setMineNum(mine, row*column);
        makeBoard(row, column);
        putMine(mines);
        time = setInterval(startTime, 10);
    }
    return(
        <header>
            <h6>가로 : </h6><input type="number" onChange={event => setRow(event.target.value)} placeholder="가로"></input>
            <h6>세로 : </h6><input type="number" onChange={event => setColumn(event.target.value)} placeholder="세로"></input>
            <h6>지뢰 개수 : </h6><input type="number" onChange={event => setMine(event.target.value)} placeholder="지뢰 개수"></input>
            <button className="start" onClick={setStart}>시작</button>
            <span className="minutes">{strMinutes}</span>:<span className="seconds">{strSeconds}</span>:<span className="tenMilli">{strTenMilli}</span>
            <div id="board"></div>
        </header>
    )
}