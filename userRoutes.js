const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const db = require("./db");
const User = require("./model/users");
const { BCRYPT_WORK_FACTOR } = require("./config");
const ExpressError = require("./expressError");
const { ensureLogin } = require("./middleware/middleware");
const jsonschema = require("jsonschema");
const userSchema = require("./schema/userSchema.json");

router.post("/login",async (request, response, next)=>{
  try {

    const { username, password } = request.body;

    if ( !username || !password ) {
      throw new ExpressError("Username and Password required!", 400);
    } ;

    const userJSONWebToken = await User.login(username, password);

    response.send({jsonWebToken: userJSONWebToken}) 
  } catch (error) {
    return next(error)
  }

});

router.post("/register", async (request, response, next ) => {
  try {
    const validator = jsonschema.validate(request.body, userSchema);
    if ( !validator.valid ) {
      const listOfErrors = validator.errors.map(error=> error.stack);
      const error = new ExpressError(listOfErrors, 400);
      return next(error);
    }    

    const { firstname, lastname, username, email, password } = request.body;
    const userJSONWebToken = await User.register(firstname, lastname, username, email, password);
    console.log("/register route token", userJSONWebToken)
    return response.send({jsonWebToken: userJSONWebToken});
  } catch (error) {
    // this error code is coming from PG.
    // if (error.code === "23505") {
    //   return next(new ExpressError("Username taken, Please pick another!", 400));
    // }
    return next(error)
  }
})

router.get("/:username", ensureLogin, async (req,res,next) => {
  try {
    const user = await User.get(req.params.username)
    return res.json({user})
  } catch (error) {
    return next(error)
  }
})

router.get("/logout",(request, response)=> {
  response.send("Logout page")
});


module.exports = router;