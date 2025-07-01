import { MongoClient } from 'mongodb';

const TELEGRAM_BOT_TOKEN = "7268532037:AAHsHkUrMXBYupk7orB9LuAVE61lfW0H4w8";
const ADMIN_IDS = ["340294357", "7605424201"];
const MONGODB_URI = 'mongodb+srv://marsfelix00:felix2025@hospitality-felix.fa0ojy3.mongodb.net/?retryWrites=true&w=majority&appName=hospitality-felix';
const DB_NAME = 'Felix-db';

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
🏢 Management: ${data.managementCompany}
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
