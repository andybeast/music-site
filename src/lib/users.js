import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function saveUserInfo(userInfo) {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const users = db.collection("users");

  // Remove any fields that might cause serialization issues
  const sanitizedUserInfo = { ...userInfo };
  delete sanitizedUserInfo._id;

  const result = await users.findOneAndUpdate(
    { email: userInfo.email },
    { $set: sanitizedUserInfo },
    { upsert: true, returnDocument: 'after' }
  );

  // Convert the returned document to a plain object and ensure ObjectId is converted to string
  const plainUser = JSON.parse(JSON.stringify(result.value, (key, value) =>
    value instanceof ObjectId ? value.toString() : value
  ));

  return plainUser;
}

export async function getUserInfo(email) {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const users = db.collection("users");

  const user = await users.findOne({ email });
  
  // Convert the returned document to a plain object and ensure ObjectId is converted to string
  const plainUser = JSON.parse(JSON.stringify(user, (key, value) =>
    value instanceof ObjectId ? value.toString() : value
  ));

  return plainUser;
}

