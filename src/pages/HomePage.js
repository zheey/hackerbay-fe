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
            currentPosition: "11"
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
        this.setState({currentPosition: middlerow.toString()+middlerow.toString()})
    }

    /*printInput = (e) => {
        const {userInput} = this.state;

        console.log("input", userInput.toString())
        document.getElementById(userInput.toString()).style.backgroundColor = "#000"
        this.setState({openModal: false})
    }*/

    render() {
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
