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

arrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

getImg = (recos) => {
    var base64Flag = 'data:image/jpeg;base64,';
    let recosArr = recos;
    recosArr.forEach(reco => {
        API.getmyImg(reco.reco_pic)
        .then(picData => {
            var imageStr =
                this.arrayBufferToBase64(picData.data.reco_pic.data.data);
            if(!picData.data._id === reco.reco_pic) {
                return;
            }
            reco.image = base64Flag + imageStr;
            this.setState({recos: recosArr});
        })
    })
};

getSavedRecos = () => {
    API.getSavedRecos()
    .then(res =>
        this.setState({
        recos: res.data
        }, () => this.getImg(this.state.recos))
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
                    pic={reco.image}
                    link={reco.reco_link}
                    description={reco.reco_description}
                    keywords={reco.reco_keywords}
                    date={reco.date}
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