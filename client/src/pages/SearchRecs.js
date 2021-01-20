import React, { Component, useEffect, useState } from "react";
import API from "../utils/API";
import { List } from "../components/List";
import Card from "../components/Card";
import { Form } from "../components/Form";
import DisplayRecos from "../components/DisplayRecos";
import { Container, Row, Col } from "../components/Grid";
import { Link } from "react-router-dom";


class Search extends Component {
    state = {
        recoResults: [],
        searchTerm: "",
        prompt: "Search For a Product Recommendation"
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("clicked");
        this.getSearchedRecos();
    };

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    getSearchedRecos = () => {
        API.findKeywordRecos(this.state.searchTerm)
            .then(recoData => {
                const recos = [];
                var base64Flag = 'data:image/jpeg;base64,';
                recoData.data.forEach(reco => {
                    const reco_pic_id = reco.reco_pic
                    API.getmyImg(reco_pic_id)
                    .then(picData => {
                        var imageStr = this.arrayBufferToBase64(picData.data.reco_pic.data.data);
                        reco.image = base64Flag + imageStr;
                    })
                    recos.push(reco)
                })
                return recos
            })
            .then(finalRecoData => {
                console.log(finalRecoData)
                this.setState({...this.state, recoResults: finalRecoData});
            })
            .catch(() =>
                this.setState({
                    recoResults: [],
                    prompt: "Please try again"
                })
            );
    };

    handleRecoSave = id => {
        // const reco = this.state.recoResults.find(reco => reco.id === id);
        console.log(id)
        API.saveReco(id).then(() => this.getSearchedRecos())
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Card title="Search For a Book">
                            <Form
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                searchTerm={this.state.searchTerm}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <p>Upload your own:
                        <button><Link to={"/uploadRec"}>Upload</Link></button>
                    </p>
                </Row>
                <Row>
                    <p>Or view your saved recommendations:
                        <button><Link to={"/savedRecs"}>Saved</Link></button>
                    </p>
                </Row>
                <Row>
                    <Col size='md-12'>
                        <Card title="Search Results">
                            {this.state.recoResults.length > 0 ? (
                                <List>
                                    {this.state.recoResults.map(result => (
                                        <DisplayRecos
                                            key={result._id}
                                            title={result.reco_name}
                                            pic={result.image}
                                            link={result.reco_link}
                                            description={result.reco_description}
                                            keywords={result.reco_keywords}
                                            date={result.reco_date}
                                            Button={() => (
                                                <button
                                                    className="btn btn-dark ml-2"
                                                    onClick={() => this.handleRecoSave(result._id)}>Save Recommendation</button>
                                            )}

                                        />
                                    ))}
                                </List>
                            ) : (
                                    <h3 className="text-center">{this.state.prompt}</h3>
                                )}
                        </Card>


                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search;