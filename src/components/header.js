import React, {useEffect, useState} from "react";

export default function Header(){
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [mine, setMine] = useState(0);
    const [strMinutes, setStrMinutes] = useState('00');
    const [strSeconds, setStrSeconds] = useState('00');
    const [strTenMilli, setStrTenMilli] = useState('00');
    const [disable, setDisable] = useState(false);
    const [mineArr, setMineArr] = useState([]);

    const [count, setCount] = useState(0);

    const [flag, setFlag] = useState(false);

    let minutes = 0;
    let seconds = 0;
    let tenMilli = 0;

    const tdArr = document.getElementsByTagName('td');

    const [time, setTime] = useState();

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
        for(let i=0; i<mine; i++){
            let randomNum = Math.floor(Math.random() * size);
            if(!mineArr.includes(randomNum)){
                setMineArr(mineArr.push(randomNum));
            }
            else{
                i--;
            }
        }
    }

    function putMine(){
        for(let i = 0; i < tdArr.length; i++){
            if(mineArr.includes(i)){
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
    }

    const setStart = () => {
        if(mine>row*column){
            alert('지뢰 개수가 너무 많습니다!');
            return;
        }
        makeBoard(row, column);
        setMineArr(setMineNum(mine, row*column));
        putMine();
        setDisable(prev => !prev);
        setTime(setInterval(startTime, 10));
    }



    function tile(mines, targetNum, ...around){
        tdArr[targetNum].addEventListener("click", function(){
            for(let i=0; i<around.length; i++){
                if(mines.includes(around[i])){
                    setCount(count => count+=1);
                }
            }

            if(tdArr[targetNum].className === 'mine'){
                alert("게임 오버");
                clearInterval(time);
            }
            else if(count === 0){
                tdArr[targetNum].style.backgroundColor = "darkcyan";
                for(let i=0; i<around.length; i++){
                    tdArr[around[i]].click();
                }
            }
            else{
                tdArr[targetNum].innerHTML = count;
            }
        })
    }

    return(
        <header>
            <h6>가로 : </h6><input type="number" onChange={event => setRow(event.target.value)} placeholder="가로" min="5"></input>
            <h6>세로 : </h6><input type="number" onChange={event => setColumn(event.target.value)} placeholder="세로" min="5"></input>
            <h6>지뢰 개수 : </h6><input type="number" onChange={event => setMine(event.target.value)} placeholder="지뢰 개수"></input>
            <button className="start" onClick={() =>
                {
                    setStart();
                    setFlag(!flag);
                }} disabled={disable}>시작</button>
            <span className="minutes">{strMinutes}</span>:<span className="seconds">{strSeconds}</span>:<span className="tenMilli">{strTenMilli}</span>
            <div id="board"></div>
        </header>
    )
}