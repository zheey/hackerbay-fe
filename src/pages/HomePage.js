import React, {Component} from 'react';
import {InputNumber, Modal} from 'antd';
import '../assets/hackerbay.css'
import Box from "./Box";


export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state ={
            visible: true,
            boardNumber: 0,
            board:[],
            userPosition: "",
            playersIndex: [],
            boardIds: []
        }
    }

    //set board number as input changes
    onChange = (e) =>{
        this.setState({boardNumber: e})
    };

    componentDidMount() {
        window.addEventListener('keyup', this.moveUser.bind(this));
    }


    //create board game

    createBoard = (e) =>{
        const {boardNumber} = this.state;
        this.setState({visible: false})
        let boardRow = [];
        let boardColumn = []
        let boardIds = []
        for(let i = 0; i < boardNumber; i++ ){
            boardColumn = []

            //create column boxes for each row
            for(let j = 0; j < boardNumber; j++ ){

                let boxId =  j+1
                boardColumn.push(<div className="grid-box" id={`${(i+1).toString()}${boxId.toString()}`} key={j}><Box/></div>)
                boardIds.push(`${(i+1).toString()}${boxId.toString()}`)
            }

            console.log("id", boardIds)
            boardRow.push(<div className='z-flex'>{boardColumn}</div>)
        }

        this.setState({board: boardRow, boardIds: boardIds}, () => {
            this.setUser()
        })

    }

    setUser = () => {
        const {boardNumber} = this.state;

        const middlerow = Math.ceil(boardNumber/2)



        let userId = "user"+(middlerow.toString()+middlerow.toString())
        console.log("user", userId)
        document.getElementById(middlerow.toString()+middlerow.toString()).innerHTML = `<div class="box d-flex" ><div class="user-div" id="${userId}">U</div></div>`
        this.setState({userPosition: middlerow.toString()+middlerow.toString()}, () => {
            this.populateGreenColors()
        })
    }

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    populateGreenColors = () => {
        const {boardNumber, userPosition, boardIds} = this.state;

        console.log("boardNe", boardNumber)
        let ranArray = [];
        let boxPosition;
        for(let i = 1; i <= boardNumber; i++){
            let minNum =  `${i.toString()}1`

            let max = boardNumber > 9 ? 9 : boardNumber
            let maxNum =  `${i.toString()}${max.toString()}`
            console.log("min", minNum)
            console.log("max", maxNum)

         boxPosition = this.getRandomArbitrary(Number(minNum), Number(maxNum))
            console.log("max",boxPosition)

             boxPosition = Math.floor(boxPosition)
            console.log("max",boxPosition)
             console.log("bool",  boardIds.includes(boxPosition))
         if(boxPosition === Number(userPosition) || ! boardIds.includes(boxPosition)){
             maxNum =  `${i.toString()}${(Math.floor(boardNumber/2)).toString()}`
             boxPosition = this.getRandomArbitrary(Number(minNum), Number(maxNum))

             boxPosition = Math.floor(boxPosition)
         }


            boxPosition = boxPosition.toFixed(0)
            ranArray.push(boxPosition)
        }
        console.log("ids", ranArray)
        this.setState({playersIndex: ranArray})
        for(let ids in ranArray){
            document.getElementById(ranArray[ids]).innerHTML = `<div class="box d-flex"><div class="player-div"></div></div>`

        }

    }

    /*printInput = (e) => {
        const {userInput} = this.state;

        console.log("input", userInput.toString())
        document.getElementById(userInput.toString()).style.backgroundColor = "#000"
        this.setState({openModal: false})
    }*/
    moveUser = (e) => {
        const { visible, userPosition, playersIndex, boardNumber} = this.state;
        let this_ = this;
        let count = 0

            document.addEventListener('keydown', (event)=> {
                /*console.log("here2", event.key)*/
                /*if(!visible) {
                    document.getElementById("user").style.display = "none"
                    let newIndex;
                    */
                    let newIndex;
                    if (!visible) {
                        if (event && event.key === "ArrowLeft") {

                            let str = userPosition.toString().charAt(0);

                            let firstIndex = ((Number(str) * 10) + 1).toString();
                            if (Number(userPosition) > firstIndex) {
                                newIndex = Number(userPosition) - 1;

                                document.getElementById(userPosition).innerHTML= `<div class="box d-flex" ></div>`;
                                document.getElementById(newIndex.toString()).innerHTML = `<div class="box d-flex" ><div class="user-div" id="user${newIndex}">U</div></div>`;

                                if (playersIndex.includes(newIndex.toString())) {
                                    playersIndex.splice(playersIndex.indexOf(newIndex.toString()), 1)
                                }
                                this_.setState({userPosition: newIndex.toString(), playersIndex}, () => {
                                    this_.resetPlayers()
                                });
                                count = count + 1;
                            }
                        }
                        else if (event && event.key === "ArrowRight") {

                            let str1 = userPosition.toString().charAt(userPosition.length - 1);
                            let str2 = userPosition.toString().charAt(userPosition.length - 2);

                            let lastIndex = boardNumber;
                            /*if (Number(userPosition) > lastIndex) {*/
                                newIndex = Number(userPosition) + 1;

                                document.getElementById(userPosition).innerHTML= `<div class="box d-flex" ></div>`;
                                document.getElementById(newIndex.toString()).innerHTML = `<div class="box d-flex" ><div class="user-div" id="user${newIndex}">U</div></div>`;

                                if (playersIndex.includes(newIndex.toString())) {
                                    console.log("yes");
                                    playersIndex.splice(playersIndex.indexOf(newIndex.toString()), 1)
                                }
                                this_.setState({userPosition: newIndex.toString(), playersIndex}, () => {
                                    this_.resetPlayers()
                                });
                                count = count + 1;
                            /*}*/
                        }
                    }

            });
    }

    resetPlayers = () => {
        const {  playersIndex} = this.state;
        for(let ids in playersIndex){
            document.getElementById(playersIndex[ids]).innerHTML = `<div class="box d-flex"><div class="player-div"></div></div>`

        }
    }

    render() {

        console.log(this.state)
        const {visible, board} = this.state;

        return (
            <div className="z-flex-div">
                <Modal
                    title="Welcome to hackerbay games"
                    visible={this.state.visible}
                    onOk={e => {this.createBoard(e)}}
                    onCancel={this.handleCancel}
                    cancelButtonProps={{ disabled: true }}
                >
                    <p>Please, enter a number</p>

                    <InputNumber min={2}  onChange={this.onChange} />

                </Modal>

                {/*<button onClick={e => {this.moveUser()}}>start</button>*/}
                {!visible && board.map((drow, i) =>{
                    return(
                        <div className="height-50" key={i} >{drow}
                            <br/></div>
                    )
                })}

            </div>
        )
    }
}
