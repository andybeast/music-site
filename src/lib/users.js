import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

const MAX_FREE_DOWNLOADS = 20;

export async function getUserInfo(email) {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const users = db.collection("users");

  const user = await users.findOne({ email });
  
  if (user) {
    // Ensure downloadCount is initialized if it doesn't exist
    if (typeof user.downloadCount !== 'number') {
      user.downloadCount = 0;
    }

    // Calculate remaining downloads
    user.remainingDownloads = MAX_FREE_DOWNLOADS - user.downloadCount;
  }

  // Convert the returned document to a plain object and ensure ObjectId is converted to string
  const plainUser = JSON.parse(JSON.stringify(user, (key, value) =>
    value instanceof ObjectId ? value.toString() : value
  ));

  return plainUser;
}

export async function updateUserDownloads(email, downloadCount) {
  const client = await clientPromise;
  const db = client.db("your_database_name");
  const users = db.collection("users");

  try {
    const result = await users.findOneAndUpdate(
      { email },
      { 
        $inc: { downloadCount: downloadCount },
        $set: { 
          remainingDownloads: { 
            $max: [{ $subtract: [MAX_FREE_DOWNLOADS, { $add: ['$downloadCount', downloadCount] }] }, 0] 
          }
        }
      },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      console.error(`No user found with email: ${email}`);
      return null;
    }

    // Convert the returned document to a plain object and ensure ObjectId is converted to string
    const plainUser = JSON.parse(JSON.stringify(result.value, (key, value) =>
      value instanceof ObjectId ? value.toString() : value
    ));

    return plainUser;
  } catch (error) {
    console.error(`Error updating user downloads for email ${email}:`, error);
    return null;
  }
}

