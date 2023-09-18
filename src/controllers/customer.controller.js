require("dotenv").config();
const { errorResponseFormat, successResponseFormat} = require("../functions/responseFunctions");


exports.save = async (req, res) => {
    const { email, password } = req.body;
  
    try {
    
    } catch (error) {
      console.error(error);
      res.status(500).send(errorResponseFormat('An error occurred'));
    }
  };
