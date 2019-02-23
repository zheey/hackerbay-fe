import React, {Component} from 'react';
import '../assets/hackerbay.css'
import {Col, Row} from "antd";


export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            boardNumber: 0,
            board: []
        }
    }

    render() {
        return(
            <div className="box grid-box">
                <Row className="grid-box">
                    <Col span={24}>

                    </Col>
                </Row>
            </div>
        )
    }
}