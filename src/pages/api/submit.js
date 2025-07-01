import { MongoClient } from 'mongodb';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_IDS = process.env.TELEGRAM_ADMIN_IDS?.split(',') || [];
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    const collection = db.collection('applications');
    await collection.insertOne(data);
    client.close();

    const message = `
📩 New Job Application:

📌 Job Title: ${data.jobTitle}
📆 Job Type: ${data.jobType}
🗓️ Start Date: ${data.startDate}
📝 Duties: ${data.duties}
📍 Location: ${data.location}
💬 Comments: ${data.comments || '—'}

👤 Contact:
• ${data.firstName} ${data.lastName}
🏨 Company: ${data.hotel}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
✅ Preferred Contact: ${data.respondBy}
    `;

for (const id of ADMIN_IDS) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: id,
      text: message,
    }),
  });
}
    res.status(200).json({ message: 'Application submitted successfully.' });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
