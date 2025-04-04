const { default: mongoose } = require("mongoose");
const { app } = require("./app");

async function main() {
    await mongoose.connect(process.env.URI);

    app.listen(process.env.PORT, ()=> {
        console.log(`Server runnig at port: ${process.env.PORT}`);
    });
}

main();