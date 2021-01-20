import React, { Component } from "react";
import API from "../utils/API";
import { List } from "../components/List";
import Card from "../components/Card";
import { Form } from "../components/Form";
import DisplayRecos from "../components/DisplayRecos";
import { Container, Row, Col } from "../components/Grid";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// class Search extends Component {
//     state = {
//         recoResults: [],
//         searchTerm: "",
//         prompt: "Search For a Product"
//     }


//     handleInputChange = event => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     };

//     handleFormSubmit = event => {
//         event.preventDefault();
//         console.log("clicked");
//         this.getSearchedRecos();
//     };

//     getSearchedRecos = () => {
//         API.findKeywordRecos(this.state.searchTerm)
//             .then(res =>
//                 this.setState({
//                     recoResults: res
//                 })
//             )
//             .catch(() =>
//                 this.setState({
//                     recoResults: [],
//                     prompt: "Please try again"
//                 })
//             );
//     };

//     handleRecoSave = id => {
//         const reco = this.state.recoResults.find(reco => reco.id === id);

//         API.saveReco({
//             reco_Id: reco.reco_id,
//             reco_name: reco.reco_name,
//             reco_pic: reco.reco_pic,
//             reco_description: reco.reco_description,
//             reco_link: reco.reco_link,
//             reco_keywords: reco.reco_keywords,
//             date: reco.reco_date
//         }).then(() => this.getSearchedRecos())
//     }

//     render() {
//         return (
//             <Container>
//                 <Row class="center">
//                     <p>
//                         <button><Link to={"/uploadRec"}>Make a recommendation</Link></button>
//                     </p>
//                 </Row>
//                 <Row>
//                     <p>
//                         <button><Link to={"/savedRecs"}>View Saved Recommendations</Link></button>
//                     </p>
//                 </Row>
//                 <Row class="mx-auto">
//                     <Col size="my-auto">
//                         <Card>
//                             <Form
//                                 handleInputChange={this.handleInputChange}
//                                 handleFormSubmit={this.handleFormSubmit}
//                                 searchTerm={this.state.searchTerm}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col size='md-12'>
//                         <Card title="Search Results">
//                             {this.state.recoResults.length > 0 ? (
//                                 <List>
//                                     {this.state.recoResults.map(result => (
//                                         <DisplayRecos
//                                             key={result._id}
//                                             title={result.reco_name}
//                                             pic={result.reco_pic}
//                                             link={result.reco_link}
//                                             description={result.reco_description}
//                                             keywords={result.reco_keywords}
//                                             date={result.reco_date}
//                                             Button={() => (
//                                                 <button
//                                                     className="btn btn-dark ml-2"
//                                                     onClick={() => this.handleRecoSave(result._id)}>Save Recommendation</button>
//                                             )}
//                                         />
//                                     ))}
//                                 </List>
//                             ) : (
//                                     <h3 className="text-center">{this.state.prompt}</h3>
//                                 )}
//                         </Card>
//                     </Col>
//                 </Row>
//             <Footer />
//         </Container>
            
//         )
//     }
// }

class Search extends Component {
    state = {
        recoResults: [],
        searchTerm: "",
        prompt: "search results here"
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

    getSearchedRecos = () => {
        API.findKeywordRecos(this.state.searchTerm)
            .then(res =>
                this.setState({
                    recoResults: res
                })
            )
            .catch(() =>
                this.setState({
                    recoResults: [],
                    prompt: "Please try again"
                })
            );
    };

    handleRecoSave = id => {
        const reco = this.state.recoResults.find(reco => reco.id === id);

        API.saveReco({
            reco_Id: reco.reco_id,
            reco_name: reco.reco_name,
            reco_pic: reco.reco_pic,
            reco_description: reco.reco_description,
            reco_link: reco.reco_link,
            reco_keywords: reco.reco_keywords,
            date: reco.reco_date
        }).then(() => this.getSearchedRecos())
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Card>
                            <Form
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                searchTerm={this.state.searchTerm}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col size='md-12'>
                        <Card>
                            {this.state.recoResults.length > 0 ? (
                                <List>
                                    {this.state.recoResults.map(result => (
                                        <DisplayRecos
                                            key={result._id}
                                            title={result.reco_name}
                                            pic={result.reco_pic}
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
                <Row>
                    <p class="center">
                        <button><Link to={"/uploadRec"}>Give A Recommendation </Link></button>
                    </p><br></br><br></br>
                {/* </Row>
                <Row> */}
                    <p class="center">
                        <button><Link to={"/savedRecs"}>Saved Recommendations</Link></button>
                    </p>
                </Row>
                <Footer />
            </Container>
        )
    }
}

export default Search;