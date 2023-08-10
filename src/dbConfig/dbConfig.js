import mongoose from "mongoose";



let isConnected = false; // track the connecetion

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);


    if(isConnected){
        console.log("Database already connected!");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, 
            {
                dbName: "auth",
                useNewUrlParser : true,
                useUnifiedTopology: true,
            });

        // const connection = mongoose.connection;

        // connection.on('connected', () => {
        //     console.log("MongoDB connected successfully!");
        // });

        // connection.on('error',(err) => {
        //     console.log("Mongdb connection error" + err);
        //     process.exit();
        // });
        isConnected = true;
        console.log("Mongodb connected");
        
        
    } catch (error) {
        console.log(error);
    }
}