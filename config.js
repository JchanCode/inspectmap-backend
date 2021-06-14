// Common settings for auth


const DB_URI = ( process.env.NODE_ENV === "test" )  
// DB_URI = "postgresql:///capstone2_test" 
  ? "postgresql://postgres:abcd1234@localhost:5432/rest_rating_interactive_map_test"
// DB_URI = "postgresql:///capstone2"  
  : "postgresql://postgres:abcd1234@localhost:5432/rest_rating_interactive_map"

const PORT = +process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI,
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};