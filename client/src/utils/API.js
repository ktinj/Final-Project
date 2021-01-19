import axios from "axios";

export default {
  //saves a reco to the database
  uploadReco: function (recoData) {
    // console.log(recoData)
    return axios.post("/api/uploadRec", recoData);
  },

  // Gets all recs a user uploaded 
  getMyRecos: function () {
    return axios.get("/api/uploadRec");
  },

  // gets all images uploaded 
  getmyImg: function () {
    return axios.get("/api/uploadImg")
  },

  findKeywordRecos: function (searchTerm) {
    return axios.get("/api/uploadRec/" + searchTerm);
  },

  //saves a Reco
  saveReco: function (id) {
    return axios.post("/api/savedRec/" + id);
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
