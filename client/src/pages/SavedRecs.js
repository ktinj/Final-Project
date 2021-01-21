import React, { Component } from "react";
import Card from "../components/Card";
import DisplayRecos from "../components/DisplayRecos";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class SavedRecs extends Component {
state = {
    recos: []
};

getSavedRecos = () => {
    API.getSavedRecos()
    .then(res =>
        this.setState({
        recos: res.data
        })
    )
    .catch(err => console.log(err));
};

componentDidMount() {
    this.getSavedRecos();
}

handleRecoDelete = id => {
    API.deleteReco(id)
        .then(res => this.getSavedRecos());
};

render() {
    return (
    <Container>
        <Row>
        <Col size="md-12">
            <p1>Saved Recommendations</p1>
            <Card>
            {this.state.recos.length > 0 ? (
                <List>
                {this.state.recos.map(reco => (
                    <DisplayRecos
                    key={reco._id}
                    title={reco.reco_name}
                    pic={reco.reco_pic}
                    link={reco.reco_link}
                    description={reco.reco_description}
                    keywords={reco.reco_keywords}
                    date={reco.reco_date}
                    Button={() => (
                        <button
                        onClick={() => this.handleRecoDelete(reco._id)}
                        className="btn"
                        >
                        <a>delete</a>
                        </button>
                    )}
                    />
                ))}
                </List>
            ) : (
                <h2 className="text-center">No Saved Recommendations</h2>
            )}
            </Card>
        </Col>
        </Row>
    </Container>
    );
}
}

export default SavedRecs;