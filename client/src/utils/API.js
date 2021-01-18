import axios from "axios";
import Formidable from "formidable";
// import detect from "detect-file-type";
// const {v1: uuidv1} = require("uuid");

export default {
  //saves a reco to the database
  uploadReco: function (recoData) {
    let form = new Formidable.IncomingForm()
    form.parse(recoData, (err, fields, files) => {
      if(err){console.log(err)}
      console.log(`reco_title: ${fields.reco_name}`)
      console.log(`reco_title: ${fields.reco_description}`)
      console.log(`reco_title: ${fields.reco_link}`)
      console.log(`reco_title: ${fields.reco_keywords}`)
      console.log(files.reco_pic.file.name)
    })

    //   //detect file type of the reco_pic by the extension
    //   detect.fromFile( image.reco_pic.path, (err, result) => {
    //     //see image extension
    //     console.log(result.ext)

    //     const pictureName = uuidv1()+"."+result.ext;
    //     console.log(pictureName)

    //     //check if image type is allowed 
    //     const allowedImageTypes =["jpg", "jpeg", "png"];
    //     if( !allowedImageTypes.includes(result.ext) ) {
    //       return res.send("Image type not allowed")
    //     }
    //   })
    // })
    // console.log(recoData)
    return axios.post("/api/uploadRec", recoData);
  },

  // Gets all comments
  getMyRecos: function () {
    return axios.get("/api/uploadRec");
  },

  //gets recos according to search term and keywords
  // getSearchedRecos: function (searchTerm) {
  //   return axios.get("/api/uploadRec", { params: { searchTerm: "reco_keywords:" + searchTerm } });
  // },

  findKeywordRecos: function (searchTerm) {
    return axios.get("/api/uploadRec/" + searchTerm);
  },

  //saves a Reco
  saveReco: function (recoData) {
    return axios.post("/api/savedRec", recoData);
  },

  //gets recos a specific user has saved
  getSavedRecos: function () {
    return axios.get("/api/savedRec");
  },

  //delete a reco a specific user has saved (based off id)
  deleteReco: function (id) {
    return axios.delete("/api/savedRec/" + id);
  }



  // // Gets the comment with the given id
  // getComment: function(id) {
  //   return axios.get("/api/comments/" + id);
  // },
  // // Deletes the comment with the given id
  // deleteComment: function(id) {
  //   return axios.delete("/api/comments/" + id);
  // },

};
