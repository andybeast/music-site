import { MongoClient, Db, Collection, Document, MongoClientOptions, UpdateFilter } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Define the User interface
interface User {
  email: string;
  name?: string;
  age?: number;
  favoriteMusic?: string;
  createdAt: Date;
  updatedAt: Date;
  downloadCount: number;
  remainingDownloads: number;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const MAX_FREE_DOWNLOADS = 20;

async function getConnectedClient(): Promise<MongoClient> {
  try {
    if (!client) {
      console.log('Creating new MongoDB client');
      client = await clientPromise;
    }
    
    // Perform a simple command to check the connection
    await client.db().command({ ping: 1 });
    
    console.log('MongoDB client is connected');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function getUserInfo(email: string): Promise<User | null> {
  console.log(`Attempting to get user info for email: ${email}`);
  try {
    const client = await getConnectedClient();
    console.log('Got connected client');
    
    const db: Db = client.db("your_database_name");
    const users: Collection<User> = db.collection("users");

    console.log(`Attempting to find user with email: ${email}`);
    const user = await users.findOne({ email });
    
    if (user) {
      console.log(`User found for email: ${email}`);
      if (typeof user.downloadCount !== 'number') {
        user.downloadCount = 0;
      }
      user.remainingDownloads = MAX_FREE_DOWNLOADS - user.downloadCount;
      return user;
    } else {
      console.log(`No user found for email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error(`Error in getUserInfo for email ${email}:`, error);
    throw error;
  }
}

export async function updateUserInfo(email: string, updateData: Partial<User>): Promise<User | null> {
  console.log(`Attempting to update user info for email: ${email}`);
  try {
    const client = await getConnectedClient();
    const db: Db = client.db("your_database_name");
    const users: Collection<User> = db.collection("users");

    const allowedFields: (keyof User)[] = ['age', 'name', 'favoriteMusic'];
    const filteredUpdateData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key as keyof User))
      .reduce((obj, key) => {
        if (updateData[key as keyof User] !== undefined) {
            (obj as any)[key as keyof User] = updateData[key as keyof User];
        }
        return obj;
      }, {} as Partial<User>);

    console.log(`Updating user with data:`, filteredUpdateData);
    const result = await users.findOneAndUpdate(
      { email },
      { $set: filteredUpdateData },
      { returnDocument: 'after' }
    );

    return result;
  } catch (error) {
    console.error(`Error in updateUserInfo for email ${email}:`, error);
    throw error;
  }
}

export async function saveUserInfo(userData: Partial<User> & { email: string }): Promise<User | null> {
  console.log(`Attempting to save user info:`, userData);
  try {
    const client = await getConnectedClient();
    const db: Db = client.db("your_database_name");
    const users: Collection<User> = db.collection("users");

    const { email, ...updateFields } = userData;

    if (!email) {
      throw new Error('Email is required for saving user info');
    }

    const setFields: Partial<User> = {
      ...updateFields,
      updatedAt: new Date()
    };

    // Remove undefined fields
    Object.keys(setFields).forEach(key => setFields[key as keyof User] === undefined && delete setFields[key as keyof User]);

    const setOnInsertFields: Partial<User> = {
      createdAt: new Date(),
      downloadCount: 0,
      remainingDownloads: MAX_FREE_DOWNLOADS
    };

    console.log(`Saving user info for email: ${email}`);
    const result = await users.findOneAndUpdate(
      { email },
      { 
        $set: setFields,
        $setOnInsert: setOnInsertFields
      },
      { upsert: true, returnDocument: 'after' }
    );

    return result;
  } catch (error) {
    console.error(`Error in saveUserInfo for email ${userData.email}:`, error);
    throw error;
  }
}

export async function updateUserDownloads(email: string, downloadCount: number): Promise<User | null> {
  console.log(`Attempting to update download count for email: ${email}`);
  try {
    const client = await getConnectedClient();
    const db: Db = client.db("your_database_name");
    const users: Collection<User> = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return null;
    }

    const update: UpdateFilter<User> = {
      $inc: { downloadCount: downloadCount },
      $set: {
        remainingDownloads: Math.max(MAX_FREE_DOWNLOADS - (user.downloadCount + downloadCount), 0)
      }
    };

    const result = await users.findOneAndUpdate(
      { email },
      update,
      { returnDocument: 'after' }
    );

    if (result) {
      console.log(`Successfully updated download count for email: ${email}`);
      return result;
    } else {
      console.log(`No user found with email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error(`Error in updateUserDownloads for email ${email}:`, error);
    throw error;
  }
}

