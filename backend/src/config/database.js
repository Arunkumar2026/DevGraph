// import neo4j from "neo4j-driver";
// import dotenv from "dotenv";

// dotenv.config();

// const driver = neo4j.driver(
//   process.env.NEO4J_URI,
//   neo4j.auth.basic(
//     process.env.NEO4J_USERNAME,
//     process.env.NEO4J_PASSWORD
//   )
// );

// export default driver;



import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

export default driver;




