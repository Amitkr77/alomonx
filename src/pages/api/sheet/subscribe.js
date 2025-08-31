const { google } = require('googleapis');

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
   email
  } = req.body;

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // ✅ Use the actual sheet name here:
    const range = 'Subscriber!A:K';

    const values = [[
    email
    ]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });

    return res.status(200).json({ message: 'Data saved successfully', Data: response });
  } catch (error) {
    console.error('❌ Error saving to Google Sheet:', error);
    return res.status(500).json({ message: 'Failed to save data' });
  }
}
