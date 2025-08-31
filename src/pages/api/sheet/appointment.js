const { google } = require('googleapis');
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Google Sheets API client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    date,
    time,
    timeZone,
    name,
    email,
    company,
    websiteType,
    platform,
    timeline,
    budget,
    additionalNotes,
  } = req.body;

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // ✅ Use the actual sheet name here:
    const range = 'Appointment!A:K';

    const values = [[
      date,
      time,
      timeZone,
      name,
      email,
      company,
      websiteType,
      platform,
      timeline,
      budget,
      additionalNotes,
    ]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });

    // Send confirmation email with Resend
    await resend.emails.send({
      from: 'amiroyk99@gmail.com',
      to: [email, 'amit@homeasy.io'], 
      subject: 'Discovery Call Confirmation',
      html: `
        <p>Hi ${name},</p>
        <p>Your discovery call is confirmed for <strong>${date}</strong> at <strong>${time} (${timeZone})</strong>.</p>
        <p>We'll contact you shortly!</p>
      `,
    });

    return res.status(200).json({ message: 'Data saved successfully', Data: response });
  } catch (error) {
    console.error('❌ Error saving to Google Sheet:', error);
    return res.status(500).json({ message: 'Failed to save data' });
  }
}
