import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			dbName: "laundry", // Set the database name here
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export { connectToDatabase };
