import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Nodemailer Transporter ────────────────────────────────────────────────
// Uses Gmail SMTP with an App Password (set in .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.warn('⚠️  Email transporter not ready:', error.message);
    console.warn('   → Make sure EMAIL_APP_PASSWORD is set correctly in server/.env');
  } else {
    console.log('✅ Email transporter ready — contact form emails will be delivered.');
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ message: "Abdullah Kazmi's Portfolio API", status: 'Running' });
});

// ─── POST /api/contact ────────────────────────────────────────────────────
// Receives contact form data, validates it, and emails it to Abdullah
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  console.log(`📬 New contact message from ${name} <${email}>`);

  // ── Email to Abdullah (notification) ──────────────────────────────────
  const notificationMail = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,       // ← replying goes straight to the sender
    subject: `📬 Portfolio Contact: ${subject || 'New Message'} — from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f3f4f6; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 24px 32px;">
          <h2 style="margin: 0; color: white; font-size: 1.4rem;">📬 New Portfolio Message</h2>
          <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 0.9rem;">Someone reached out via your portfolio contact form.</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 0.85rem; width: 100px; vertical-align: top;">FROM</td>
              <td style="padding: 10px 0; color: #f3f4f6; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 0.85rem; vertical-align: top;">EMAIL</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 0.85rem; vertical-align: top;">SUBJECT</td>
              <td style="padding: 10px 0; color: #f3f4f6;">${subject || '(No subject)'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 0.85rem; margin: 0 0 12px;">MESSAGE</p>
          <div style="background: rgba(255,255,255,0.04); border-left: 3px solid #8b5cf6; border-radius: 6px; padding: 16px 20px; color: #f3f4f6; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your message')}" 
               style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 0.95rem;">
              Reply to ${name} →
            </a>
          </div>
        </div>
        <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
          <p style="margin: 0; color: #6b7280; font-size: 0.8rem;">Abdullah Kazmi — Portfolio · abdullahkazmi4458@gmail.com</p>
        </div>
      </div>
    `,
  };

  // ── Auto-reply to the sender ───────────────────────────────────────────
  const autoReplyMail = {
    from: `"Abdullah Kazmi" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name}! 👋`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f3f4f6; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #06b6d4); padding: 24px 32px;">
          <h2 style="margin: 0; color: white;">Hey ${name}! 👋</h2>
        </div>
        <div style="padding: 32px;">
          <p style="color: #f3f4f6; font-size: 1rem; line-height: 1.7;">Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within 24 hours.</p>
          <div style="background: rgba(255,255,255,0.04); border-left: 3px solid #06b6d4; border-radius: 6px; padding: 16px 20px; margin: 24px 0; color: #9ca3af; font-size: 0.9rem; line-height: 1.7; white-space: pre-wrap;"><em>Your message:</em><br/><br/>${message}</div>
          <p style="color: #9ca3af; font-size: 0.9rem;">Cheers,<br/><strong style="color: #f3f4f6;">Abdullah Kazmi</strong><br/>Software Engineer · Air University Islamabad</p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(notificationMail),
      transporter.sendMail(autoReplyMail),
    ]);

    console.log(`✅ Emails sent — notification to ${process.env.EMAIL_TO}, auto-reply to ${email}`);
    res.status(200).json({
      success: true,
      message: `Thanks ${name}! Your message has been sent. I'll get back to you shortly.`,
    });
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Could not send your message right now. Please email me directly at abdullahkazmi4458@gmail.com',
    });
  }
});

// ─── Error Handler ─────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
