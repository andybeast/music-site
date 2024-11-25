import { hash } from 'bcryptjs';
import { getDatabase } from '@/src/lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !email.includes('@') || !password) {
      res.status(422).json({ message: 'Invalid Data' });
      return;
    }

    try {
      const db = await getDatabase();

      const existingUser = await db.collection('users').findOne({ email: email });

      if (existingUser) {
        res.status(422).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await hash(password, 12);

      const newUser = {
        email: email,
        password: hashedPassword,
        createdAt: new Date(),
      };

      const result = await db.collection('users').insertOne(newUser);

      res.status(201).json({ message: 'User created', userId: result.insertedId });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

