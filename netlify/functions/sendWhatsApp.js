const twilio = require("twilio");

exports.handler = async (event) => {
  try {
    // Get Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const to = process.env.WHATSAPP_TO_NUMBER; // Your registered WhatsApp number

    const client = twilio(accountSid, authToken);

    const response = await client.messages.create({
      from: "whatsapp:+14155238886", // Twilio Sandbox Number
      body: "🚀 The deployment is live! 🎉 Check it out now.",
      to: `whatsapp:${to}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: response.sid }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
