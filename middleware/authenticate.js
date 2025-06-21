// middleware/authenticate.js

import admin from "../config/firebase.js";


export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Contains uid, email, etc.
    next();
  } catch (error) {
    console.error('Token verification failed', error);
    res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};


