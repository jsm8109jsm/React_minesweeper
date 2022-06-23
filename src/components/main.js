import React, {useState} from "react";

export default function Main(){
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [mine, setMine] = useState(0);

    const [disable, setDisable] = useState(false);
    const [mineArr, setMineArr] = useState([]);


    let openCount = 0;
    // const [count, setCount] = useState(0);

    const color = ["red", "skyblue", "olive", "green", "blue", "purple", "brown", "black"];

    // const [flag, setFlag] = useState(false);

    let minutes = 0;
    let seconds = 0;
    let tenMilli = 0;
    const [strMinutes, setStrMinutes] = useState('00');
    const [strSeconds, setStrSeconds] = useState('00');
    const [strTenMilli, setStrTenMilli] = useState('00');

    const tdArr = document.getElementsByTagName('td');

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
        console.log(mineArr);
        setMineArr([]);
        console.log(mineArr);
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

    const setStartGame = () => {
        if(row < 5){
            alert('가로 개수가 너무 적습니다!');
            return;
        }
        else if(row > 50){
            alert('가로 개수가 너무 많습니다!');
            return;
        }
        else if(column < 5){
            alert('세로 개수가 너무 적습니다!');
            return;
        }
        else if(column > 50){
            alert('세로 개수가 너무 많습니다!');
            return;
        }
        else if(mine < 5){
            alert('지뢰 개수가 너무 적습니다!');
            return;
        }
        else if(mine > row*column){
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


        // if((tdArr[targetNum].className === 'mines' || count > 0) && openCount === 0){
        //     setMineArr(setMineNum(mine, row*column));
        //     console.log("발동");
        //     putMine();
        //     console.log(mineArr);
        // }

        if(tdArr[targetNum].className === 'mines'){
            alert("게임 오버");
            clearInterval(time);
            setDisable(false);
            for(let i=0; i<tdArr.length; i++){
                if(tdArr[i].classList.contains('mines')){
                    tdArr[i].style.backgroundColor = "white";
                    tdArr[i].innerHTML = '🚩';
                }
            }
        }

        else if(count === 0){
            tdArr[targetNum].style.backgroundColor = "white";
            openCount++;
            for(let i=0; i<around.length; i++){
                clickTile(around[i], getAroundArr(around[i]));
            }
        }
        else if(count > 0){
            tdArr[targetNum].style.backgroundColor = "white";
            tdArr[targetNum].innerHTML = count;
            openCount++;
            tdArr[targetNum].style.color = color[count-1];
        }

        let newMinute = minutes > 9 ? minutes.toString() : '0' + minutes.toString()
        let newSecond = seconds > 9 ? seconds.toString() : '0' + seconds.toString()
        let newTen = tenMilli > 9 ? tenMilli.toString() : '0' + tenMilli.toString()

        if(openCount === row*column-mine){
            clearInterval(time);
            alert(`게임 클리어!\n\n게임 클리어 시간 : ${newMinute}:${newSecond}:${newTen}`);
        }
        
    }

    const tile = (targetNum, around) =>{
        tdArr[targetNum].addEventListener("click", function(){
            if(tdArr[targetNum].innerHTML !== '🚩'){
                clickTile(targetNum, around);
            }
        })

        tdArr[targetNum].addEventListener("mousedown", function(event){
            if(event.button === 2){
                document.addEventListener("contextmenu", function(event){
                    event.preventDefault();
                })
                if(tdArr[targetNum].classList.contains('flag')){
                    tdArr[targetNum].classList.remove('flag');
                    tdArr[targetNum].innerHTML = ' ';
                }
                else if(tdArr[targetNum].style.backgroundColor !== "white"){
                    tdArr[targetNum].classList.add('flag');
                    tdArr[targetNum].innerHTML = '🚩';
                }
            }
            else if(tdArr[targetNum].innerHTML !== '🚩' && event.button === 1){
                openTile(targetNum, around);
            }
        })

        tdArr[targetNum].addEventListener("dblclick", function(event){
            openTile(targetNum, around);
        })
    }

    const openTile = (targetNum, around) => {
        let count=0, flagCount = 0;
        for(let i=0; i<around.length; i++){
            if(mineArr.includes(around[i])){
                count++;
            }
        }
        for(let i=0; i<around.length; i++){
            if(tdArr[around[i]].classList.contains('flag')){
                flagCount++;
            }
        }
        if(count === flagCount){
            for(let i=0; i<around.length; i++){
                if(!tdArr[around[i]].classList.contains('flag')){
                    clickTile(around[i], getAroundArr(around[i]));
                }
            }
        }
    }

    const reset = () => {
        setRow("");
        setColumn("");
        setMine("");
        tenMilli = 0;
        seconds = 0;
        minutes = 0;
        setStrMinutes('00');
        setStrSeconds('00');
        setStrTenMilli('00');
    }

    return(
        <header>
            <h1>지뢰찾기</h1>
            <div>
                <span className="input"><h6>가로 : </h6><input type="number" onChange={event => setRow(parseInt(event.target.value))} placeholder="최소 : 5, 최대 : 50" disabled={disable}></input></span>
                <span className="input"><h6>세로 : </h6><input type="number" onChange={event => setColumn(parseInt(event.target.value))} placeholder="최소 : 5, 최대 : 50" disabled={disable}></input></span>
                <span className="input"><h6>지뢰 개수 : </h6><input type="number" onChange={event => setMine(parseInt(event.target.value))} placeholder="최소 : 5" disabled={disable}></input></span>
            </div>
            <div className="btn">
                <button className="start" onClick={setStartGame} disabled={disable}>시작</button>
                <button className="reset" onClick={reset} disabled={disable}>리셋</button>
            </div>
            <div className="time">
                <span className="minutes">{strMinutes}</span>:<span className="seconds">{strSeconds}</span>:<span className="tenMilli">{strTenMilli}</span>
            </div>
            <div id="board"></div>
        </header>
    )
}

//재시작 구현, 리셋 구현, 첫클릭  
