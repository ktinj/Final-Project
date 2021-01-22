import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";


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
                    <p2><b>Created On:</b> {date}</p2><br></br>
                    <p2><b>Description:</b> {description}</p2><br></br>
                    <p2><b>Keywords:</b> {keywords}</p2><br></br><br></br>
                    <a href={link} target="_blank" rel="noopener noreferrer">Click to purchase</a>
                </Col>
            </Row>
            <Row>
                <Col size="12">
                    <img className="img-thumbnail img-fluid w-100" src={pic} alt={title} />
                </Col>
            </Row>

        </ListItem>
    )
}

export default DisplaySavedRecos;
