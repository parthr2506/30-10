import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Mongo database connected successfully")
        })

        connection.on("error", (error) => {
            console.log("A mongodb error occured check db connection", +error)
            process.exit()
        })
    } catch (error) {
        console.log("An unknown error occurred")
        console.log(error)

    }
}