import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import { Input } from "../components/Form";
import { Container, Col, Row } from "../components/Grid";
import { FormBtn } from "../components/Form";
import { List } from "../components/List";
import DisplayRecos from "../components/DisplayRecos";
import Message from "../components/Message";
import Progress from "../components/Progress";
import axios from 'axios';

function UploadRec({ username }) {

    //setting initial state of recos to render
    const [recoState, setRecoState] = useState({
        recos: [],
        prompt: "You Have Not yet Uploaded a Recommendation!"
    });
    //setting initial state of the form object
    const [formObject, setFormObject] = useState({
        reco_name: "Name",
        // image: "",
        reco_link: "Link",
        reco_description: "Description",
        reco_keywords: "Keywords"
    });
    //setting variables for the image upload
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);


    useEffect(() => {
        //set user after successful component mount
        setFormObject({
            reco_name: "title",
            // reco_pic: {},
            reco_link: "link",
            reco_description: "description",
            reco_keywords: "keywords",
            username: "",
            username
        })

        loadMyRecos();

    }, [username]);

    //image data to base64 function
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    useEffect(() => {
        if (recoState.recos.length > 0) {

            API.getmyImg()
            .then(res => { console.log("I am here", res); return res })
            .then(data => {
                // console.log("inside second one", recoState.recos)
                var base64Flag = 'data:image/jpeg;base64,';
                console.log(data)
                console.log(recoState.recos.length)
                for (let i = 0; i < data.data.length; i++) {
                    
                    var imageStr =
                        arrayBufferToBase64(data.data[i].reco_pic.data.data);
                    
                    //make shallow copy of recos
                    let recos = [...recoState.recos];
                    recos[i].image = base64Flag + imageStr;
                    setRecoState({...recoState, recos});
    
                    // //copy item want to mutate
                    // let reco = { ...recos[i] };
    
                    // //replace preoprty interested in
                    // reco.image = base64Flag + imageStr;
                    // console.log(base64Flag + imageStr)
    
                    // //put back into array
                    // recos[i] = reco;
    
                    // //set state to new copy
                    // setRecoState({ ...recoState, recos });
    
                }})

        }


    }, [recoState.recos.length])

    //load all reco uploads belong to the user who is signed in
    function loadMyRecos() {
        // console.log("load my recos");
        API.getMyRecos()
            //d is the response from the database
            .then(d => { console.log(d); return d })
            .then(res => {
                setRecoState({ ...recoState, recos: res.data });
            })
            .catch(err => console.log(err));
            // .then(() => { API.getmyImg()
            // .then(res => { console.log("I am here", res); return res })
            // .then(data => {
            //     console.log("inside second one", recoState.recos)
            //     var base64Flag = 'data:image/jpeg;base64,';

            //     for (let i = 0; i < recoState.recos.length; i++) {
            //         var imageStr =
            //             arrayBufferToBase64(data[i].reco_pic.data.data);

            //         //make shallow copy of recos
            //         let recos = [...recoState];

            //         //copy item want to mutate
            //         let reco = { ...recos[i] };

            //         //replace preoprty interested in
            //         reco.image = base64Flag + imageStr;

            //         //put back into array
            //         recos[i] = reco;

            //         //set state to new copy
            //         setRecoState({ ...recoState, recos });

            //     }

            // })
    
        
        //transform data to base64, can then fetch it
        //set a state here, so state has an image 


    }

    //Handle input change for form when user is uploading a reco
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    // When form submitted, use API.saveReco method to save reco data
    // function handleFormSubmit(event) {
    //     event.preventDefault();
    //     // if (formObject.body) {
    //     API.uploadReco({
    //         reco_name: formObject.reco_name,
    //         reco_pic: formObject.reco_pic,
    //         reco_link: formObject.reco_link,
    //         reco_description: formObject.reco_description,
    //         reco_keywords: formObject.reco_keywords,
    //         username: formObject.username
    //     })
    //         .then(loadMyRecos)
    //         .then(() => setFormObject({
    //             reco_name: "",
    //             reco_pic: "",
    //             reco_link: "",
    //             reco_description: "",
    //             reco_keywords: "",
    //             username: ""
    //         }))
    //         .catch(err => console.log(err));
    //     // }
    // }

    //on change for the image upload
    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    //on submit for the image upload
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            API.uploadReco({
                reco_name: formObject.reco_name,
                reco_link: formObject.reco_link,
                reco_description: formObject.reco_description,
                reco_keywords: formObject.reco_keywords,
                username: formObject.username
            }).then(function () {
                axios.post('/api/uploadImg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        setUploadPercentage(
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            )
                        );

                        // Clear percentage
                        setTimeout(() => setUploadPercentage(0), 10000);
                    }
                })
            })
                .then(loadMyRecos)
                .then(() => setFormObject({
                    reco_name: "",
                    reco_pic: "",
                    reco_link: "",
                    reco_description: "",
                    reco_keywords: "",
                    username: ""
                }))

        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }

    };

    return (
        <>
            <Container>
                <Row>
                    <Col size='md-12'>
                        <Card>
                            <p1>Give a recommendation</p1>
                            <form>
                                <div className="form-group">
                                    <p>Name your recommendation</p>
                                    <Input value={formObject.reco_name} onChange={handleInputChange} name='reco_name' placeholder='title' />
                                    <p>Why do you recommend it?</p>
                                    <Input className='form-control' value={formObject.reco_description} onChange={handleInputChange} name='reco_description' placeholder='description' />
                                    {/* <Input className='form-control' value={formObject.reco_pic} onChange={handleInputChange} name='reco_pic' placeholder='pic' /> */}
                                    <p>Provide a link to purchase</p>
                                    <Input className='form-control' value={formObject.reco_link} onChange={handleInputChange} name='reco_link' placeholder='link' />
                                    <p>Enter some keywords</p>
                                    <Input className='form-control' value={formObject.reco_keywords} onChange={handleInputChange} name='reco_keywords' placeholder='keywords' />
                                    <p>Upload an image</p>
                                    <div className="file-upload">
                                        {message ? <Message msg={message} /> : null}
                                        <div className='custom-file mb-4'>
                                            <Input
                                                type='file'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                                name="reco-pic"
                                                value={formObject.reco_pic}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                {filename}
                                            </label>
                                        </div>

                                        <Progress percentage={uploadPercentage} />

                                        {uploadedFile ? (
                                            <div className='row mt-5'>
                                                <div className='col-md-6 m-auto'>
                                                    <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </form>
                        </Card>

                        <FormBtn
                            disabled={!formObject.reco_name}
                            onClick={onSubmit}>
                            <a>Upload Recommendation</a>
				</FormBtn>
                    </Col>

                </Row>

                <Row>
                    <Col size="md-12">
                        <Card>
                            {recoState.recos.length > 0 ? (
                                <List>
                                    {recoState.recos.map(result => (
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
                                                    className="button"
                                                    onClick={() => this.handleRecoSave(result._id)}><a>Save &#9829;</a></button>
                                            )}
                                        />
                                    ))}
                                </List>
                            ) : (
                                    <h3 className="text-center">{recoState.prompt}</h3>
                                )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default UploadRec;