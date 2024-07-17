import app from "./src/app";
import "colorts/lib/string";
import { mongoConnect, mongoDisconnect } from "./src/utils/mongo";
const PORT = Bun.env.PORT || 8000;

try {
  await mongoDisconnect();
  await mongoConnect().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.green.underline);
    });
  });
} catch (error) {
  console.error(`Server connection error: ${error}`.red.inverse);
}