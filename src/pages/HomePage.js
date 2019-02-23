import React, {Component} from 'react';
import {Button, InputNumber, Modal} from 'antd';
import '../assets/hackerbay.css'
import Box from "./Box";


export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state ={
            visible: true,
            openModal: false,
            boardNumber: 0,
            userInput: 11,
            board:[]
        }
    }

    //set board number as input changes
    onChange = (e) =>{
        this.setState({boardNumber: e})
    }

    onChange2 = (e) =>{
        this.setState({userInput: e})
    }

    //create board game

    createBoard = (e) =>{
        const {boardNumber} = this.state;
        this.setState({visible: false})
         let boardRow = [];
        let boardColumn = []
        for(let i = 0; i <boardNumber; i++ ){
            boardColumn = []
            for(let j = 0; j <boardNumber; j++ ){
                boardColumn.push(<div className="grid-box" id={`${(i+1).toString()}${(j+1).toString()}`}><Box/></div>)
                console.log('hi', `${(i+1).toString()}${(j+1).toString()}`)
            }
            console.log("board", boardColumn)
            boardRow.push(<div className='z-flex'>{boardColumn}</div>)
        }
        this.setState({board: boardRow})
    }

    printInput = (e) => {
        const {userInput} = this.state;

        console.log("input", userInput.toString())
        document.getElementById(userInput.toString()).style.backgroundColor = "#000"
        this.setState({openModal: false})
    }

    showModal =()=>{
        this.setState({openModal: true})
    }


    render() {
        const defaultVal = 8;
        const {visible, board, openModal, userInput} = this.state;
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

                <Modal
                    title="Welcome to hackerbay games"
                    visible={openModal}
                    onOk={e => {this.printInput(e)}}
                    onCancel={this.handleCancel}
                    cancelButtonProps={{ disabled: true }}
                >
                    <p>Please, enter a number</p>

                    <InputNumber min={1} onChange={this.onChange2} />

                </Modal>


                <Button onClick={e=>{this.showModal(e)}}>Set Input</Button>
                <p>input: {userInput}</p>

                {!visible && board.map((drow, i) =>{
                    return(
                        <div className="height-50" key={i}>{drow}
                            <br/></div>
                        /*drow.map((dcol) => {
                            return(
                                <Box/>
                            )
                        })*/
                    )
                })}

            </div>
        )
    }
}
