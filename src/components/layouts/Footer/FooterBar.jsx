// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";

class FooterBar extends Component {

    FooterStyleUnder = {
        background: '#2c2c2d',
        color: 'white',
        textAlign: 'center',
        height: '75px'
    }

    divBox = {
        height: '500px'
    }

    render() {
        return (
            <div>
                <div style={this.divBox}/>
                <div style={this.FooterStyleUnder}>
                    <Container>
                        <Row>
                            <Col>
                                <p>© 2021 PMS. All Rights Reserved.<br/>MADE WITH ❤ BY CODEWAVE</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default FooterBar;