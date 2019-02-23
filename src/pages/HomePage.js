import React, {Component} from 'react';
import {InputNumber, Modal, Icon} from 'antd';
import '../assets/hackerbay.css'
import Box from "./Box";


export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state ={
            visible: true,
            boardNumber: 0,
            board:[],
            userPosition: "11",
            playersIndex: []
        }
    }

    //set board number as input changes
    onChange = (e) =>{
        this.setState({boardNumber: e})
    }


    //create board game

    createBoard = (e) =>{
        const {boardNumber} = this.state;
        this.setState({visible: false})
        let boardRow = [];
        let boardColumn = []
        for(let i = 0; i <boardNumber; i++ ){
            boardColumn = []

            //create column boxes for each row
            for(let j = 0; j <boardNumber; j++ ){
                boardColumn.push(<div className="grid-box" id={`${(i+1).toString()}${(j+1).toString()}`}><Box/></div>)
            }

            boardRow.push(<div className='z-flex'>{boardColumn}</div>)
        }

        this.setState({board: boardRow}, () => {
            this.setUser()
        })

    }

    setUser = () => {
        const {boardNumber} = this.state;

        const middlerow = Math.ceil(boardNumber/2)


        document.getElementById(middlerow.toString()+middlerow.toString()).innerHTML = `<div class="box d-flex"><div class="user-div">U</div></div>`
        this.setState({userPosition: middlerow.toString()+middlerow.toString()}, () => {
            this.populateGreenColors()
        })
    }

    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    populateGreenColors = () => {
        const {boardNumber, userPosition} = this.state;

        let ranArray = [];
        for(let i = 0; i < boardNumber; i++){
           let boxPosition = this.getRandomArbitrary((((i+1)*10)+1), (((i+1)*10)+boardNumber))

           boxPosition = Math.floor(boxPosition)

            while (boxPosition === Number(userPosition)){
                boxPosition = this.getRandomArbitrary((((i+1)*10)+1), (((i+1)*10)+boardNumber))
                boxPosition = Math.floor(boxPosition)
            }

            ranArray.push(boxPosition.toFixed(0))
        }
        for(let ids in ranArray){
            document.getElementById(ranArray[ids]).innerHTML = `<div class="box d-flex"><div class="player-div"></div></div>`

        }

        this.setState({playersIndex: ranArray})

        console.log("position", ranArray)
    }

    /*printInput = (e) => {
        const {userInput} = this.state;

        console.log("input", userInput.toString())
        document.getElementById(userInput.toString()).style.backgroundColor = "#000"
        this.setState({openModal: false})
    }*/
    moveUser = (e) => {
        console.log("key", e.keyCode)
    }

    render() {
        const {visible, board} = this.state;
        return (
            <div className="z-flex-div" onKeyPress={e => {this.moveUser(e)}} >
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

                {!visible && board.map((drow, i) =>{
                    return(
                        <div className="height-50" key={i}>{drow}
                            <br/></div>
                    )
                })}

            </div>
        )
    }
}
