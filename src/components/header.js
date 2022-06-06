import React, {useState} from "react";

export default function Header(){
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [mine, setMine] = useState(0);
    const [disable, setDisable] = useState(false);
    const [mineArr, setMineArr] = useState([]);

    // const [count, setCount] = useState(0);

    // const [flag, setFlag] = useState(false);

    let minutes = 0;
    let seconds = 0;
    let tenMilli = 0;
    const [strMinutes, setStrMinutes] = useState('00');
    const [strSeconds, setStrSeconds] = useState('00');
    const [strTenMilli, setStrTenMilli] = useState('00');

    const tdArr = document.getElementsByTagName('td');

    // const [time, setTime] = useState();
    let time;

    const makeBoard = (row, column) =>{
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

    const setMineNum = (mine, size) =>{
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

    const putMine = () => {
        for(let i = 0; i < tdArr.length; i++){
            if(mineArr.includes(i)){
                tdArr[i].classList.add('mines');
            }
        }
    }

    const startTime = () => {
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
        time = setInterval(startTime, 10);
        for(let i=0; i<tdArr.length; i++){
            tile(i, getAroundArr(i))
        }
    }

    function getAroundArr(num) {
        //왼쪽 위
        if (num === 0) return [1, row, row + 1];
        //오른쪽 위
        if (num === row - 1) return [row - 2, 2 * row - 2, 2 * row - 1];
        //왼쪽 아래
        if (num === row * (column - 1)) return [row * (column - 2), row * (column - 2) + 1, row * (column - 1) + 1];
        //오른쪽 아래
        if (num === row * column - 1) return [row * (column - 1) - 2, row * (column - 1) - 1, row * column - 2];

        //위쪽 모서리
        if (0 < num && num < row - 1) return [num - 1, num + 1, num + row - 1, num + row, num + row + 1];
        //아래쪽 모서리
        if (row * (column - 1) < num && num < row * column - 1) return [num - row - 1, num - row, num - row + 1, num - 1, num + 1];
        //왼쪽 모서리
        if (num % row === 0) return [num - row, num - row + 1, num + 1, num + row, num + row + 1];
        //오른쪽 모서리
        if (num % row === row - 1) return [num - row - 1, num - row, num - 1, num + row - 1, num + row];

        //나머지
        return [num - row - 1, num - row, num - row + 1, num - 1, num + 1, num + row - 1, num + row, num + row + 1];
    }

    const clickTile = (targetNum, around) => {
        let count = 0;
        if(tdArr[targetNum].style.backgroundColor === "white"){
            return;
        }
        for(let i=0; i<around.length; i++){
            if(mineArr.includes(around[i])){
                count++;
            }
        }
        if(tdArr[targetNum].className === 'mines'){
            alert("게임 오버");
            // document.location.reload();
            clearInterval(time);
        }
        else if(count === 0){
            tdArr[targetNum].style.backgroundColor = "white";
            for(let i=0; i<around.length; i++){
                clickTile(around[i], getAroundArr(around[i]));
            }
        }
        else if(count > 0){
            tdArr[targetNum].style.backgroundColor = "white";
            tdArr[targetNum].innerHTML = count;
        }
    }

    const tile = (targetNum, around) =>{
        tdArr[targetNum].addEventListener("click", function(){
            console.log(around);
            console.log(around.length);
            clickTile(targetNum, around);
        })
    }

    return(
        <header>
            <h6>가로 : </h6><input type="number" onChange={event => setRow(parseInt(event.target.value))} placeholder="가로" min="5" disabled={disable}></input>
            <h6>세로 : </h6><input type="number" onChange={event => setColumn(parseInt(event.target.value))} placeholder="세로" min="5" disabled={disable}></input>
            <h6>지뢰 개수 : </h6><input type="number" onChange={event => setMine(parseInt(event.target.value))} placeholder="지뢰 개수" disabled={disable}></input>
            <button className="start" onClick={() =>
                {
                    setStart();
                }} disabled={disable}>시작</button>
            <span className="minutes">{strMinutes}</span>:<span className="seconds">{strSeconds}</span>:<span className="tenMilli">{strTenMilli}</span>
            <div id="board"></div>
        </header>
    )
}