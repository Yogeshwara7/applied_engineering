/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

const feedbackSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().min(10)
});

const recentreq = new Map();

app.post('/feedback', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
    const date = Date.now();
    if (recentreq.has(ip) && date - recentreq.get(ip) < 10000) {
      return res.status(429).json({ error: 'too many requests' });
    }
    recentreq.set(ip, date);
    const data = feedbackSchema.parse(req.body);
    console.log('Parsed data:', data);
    const docref = await db.collection('feedback').add({
      ...data,
      createdAt: new Date()
    });
    return res.status(201).json({ message: 'feedback stored', id: docref.id });
  } catch (err) {
    console.error('Error details:', err);
    if (err && err.name === 'ZodError') {
      return res.status(400).json({ err: err.errors });
    }
    logger.error(err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

exports.api = onRequest(app);

