import * as dotenv from "dotenv"
dotenv.config()
import app from "./server";

app.listen(5001, () => {
  console.log("Hello app listening on http://localhost:5001");
});
