import app from "./src/app";
import 'colorts/lib/string'

const PORT = Bun.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.underline);
})