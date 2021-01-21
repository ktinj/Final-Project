import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";
import { ExternalLink } from 'react-external-link';

function DisplaySavedRecos({ title, pic, link, description, keywords, date, Button }) {

    return (
        <ListItem >
            <Row className="flex-wrap-reverse">
                <Col size="md-12">
                    <p1>{title}</p1>
                </Col>
                <Col size="md-12">
                    <div className="btn-container">
                        {/* <a className="btn" target="_blank" rel="noopener noreferror" href={link}>
                            See Recommendation
                        </a> */}
                        <Button />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                    <p>Created On: {date}</p><br></br>
                    <p>Description: {description}</p>
                    <p>Keywords: {keywords}</p>
                    <a href={link}>Click to purchase</a>
                </Col>
            </Row>
            <Row>
                <Col size="12 sm-4 md-2">
                    <img className="img-thumbnail img-fluid w-100" src={pic} alt={title} />
                </Col>
            </Row>

        </ListItem>
    )
}

export default DisplaySavedRecos;
