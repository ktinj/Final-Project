import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";

function DisplaySavedRecos({ title, pic, link, description, keywords, date, Button }) {
    return (
        <ListItem >
            <Row className="flex-wrap-reverse" border="0">
                <Col size="md-12">
                    <h2>{title}</h2>
                </Col>
                <Col size="md-12">
                    {/* <div className="btn-container">
                        <a className="btn" target="_blank" rel="noopener noreferror" href={link}>
                            See Recommendation
                        </a>
                        <Button />
                    </div> */}
                </Col>
            </Row>
            <Row>
                <Col size="md-6">
                    <p>Created On: {date} </p><br></br>
                    <p>Keywords: {keywords} </p>
                </Col>
            </Row>
            <Row>
                <Col size="12 sm-4 md-2">
                    <img className="img-thumbnail img-fluid w-100" src={pic} alt={title} />
                </Col>
                <Col size="12 sm-8 md-10">
                    <p>{description}</p>
                </Col>
            </Row>

        </ListItem>
    )
}

export default DisplaySavedRecos;
