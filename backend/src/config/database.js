import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.COGNODB_URI;
const USERNAME = process.env.COGNODB_USERNAME;
const PASSWORD = process.env.COGNODB_PASSWORD;

console.log({
  URI: URI ? "Loaded" : "Missing",
  USERNAME: USERNAME ? "Loaded" : "Missing",
  PASSWORD: PASSWORD ? "Loaded" : "Missing",
});


if (!URI || !USERNAME || !PASSWORD){
    throw new Error("CognoDB credentials are missing in .env");
}


const driver = neo4j.driver(
    URI,
    neo4j.auth.basic(USERNAME, PASSWORD)
);

export default driver;




