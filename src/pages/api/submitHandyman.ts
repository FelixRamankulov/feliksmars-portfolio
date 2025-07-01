import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    name,
    phone,
    email,
    message,
    serviceDate,
    specificDate,
    streetAddress,
    cityZip,
    easyAccess,
    accessExplanation,
    preferredContactName,
    preferredContactPhone,
    preferredContactEmail,
    preferredContactTime,
  } = req.body;

  const telegramMessage = `
🛠 New Handyman Request


📝 Job Description:
${message}

📅 When service done: ${serviceDate}${serviceDate === 'Specific date' ? ` (on ${specificDate})` : ''}

📍 Location:
${streetAddress}
${cityZip}

🚪 Easy access to area: ${easyAccess}
${easyAccess === 'No' ? `Explanation: ${accessExplanation}` : ''}

📲 Preferred follow-up contact:
Name: ${preferredContactName}
Phone: ${preferredContactPhone}
Email: ${preferredContactEmail}
Preferred time: ${preferredContactTime}
  `;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_ADMIN_IDS = process.env.TELEGRAM_ADMIN_IDS;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_IDS) {
    return res.status(500).json({ message: 'Missing Telegram configuration' });
  }

  const adminIds = TELEGRAM_ADMIN_IDS.split(',').map(id => id.trim());

  try {
    const results = await Promise.all(
      adminIds.map(adminId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: adminId,
            text: telegramMessage,
          }),
        })
      )
    );

    const anyFailed = results.some(r => !r.ok);
    if (anyFailed) {
      return res.status(500).json({ message: 'Failed to send message to one or more admins' });
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ message: 'Telegram Error', error });
  }
}
