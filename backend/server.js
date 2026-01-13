import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5175",
  "https://portfolio-seven-teal-32.vercel.app",
];

// Custom CORS middleware to ensure headers are always set
const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  let isAllowed = false;
  if (!origin) {
    // Allow requests with no origin (like Postman, curl, etc.)
    isAllowed = true;
  } else {
    const originClean = origin.replace(/\/$/, "");
    isAllowed = allowedOrigins.some((allowed) => {
      const allowedClean = allowed.replace(/\/$/, "");
      return (
        originClean === allowedClean || originClean.includes(".vercel.app")
      );
    });
  }

  // Set CORS headers
  if (isAllowed) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    } else {
      // For requests without origin, allow all (but can't use credentials)
      res.setHeader("Access-Control-Allow-Origin", "*");
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.setHeader(
      "Access-Control-Expose-Headers",
      "Content-Length, Content-Type"
    );
    res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
  }

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    if (isAllowed) {
      res.status(200).end();
    } else {
      res.status(403).json({ error: "CORS policy: Origin not allowed" });
    }
    return;
  }

  next();
};

// Apply CORS middleware first
app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter configuration with timeout
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error.message);
    console.error("Full error:", error);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error(
        "⚠️  WARNING: EMAIL_USER or EMAIL_PASS environment variables are not set!"
      );
    }
  } else {
    console.log("✅ Server is ready to send emails");
    console.log("📧 Email configured for:", process.env.EMAIL_USER);
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Krish Portfolio Backend API is running!",
    endpoints: {
      contact: "POST /api/contact",
      health: "GET /api/health",
    },
  });
});

// Health check endpoint (used by Render to keep service alive)
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Keep-alive endpoint for Render free tier
app.get("/api/keepalive", (req, res) => {
  res.json({
    message: "Server is awake",
    timestamp: new Date().toISOString(),
  });
});

// Test email endpoint (for debugging)
app.post("/api/test-email", async (req, res) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      success: false,
      message:
        "Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.",
    });
  }

  try {
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email from Portfolio Backend",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your portfolio backend.</p>
        <p>If you received this, your email configuration is working correctly!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    };

    const info = await transporter.sendMail(testEmail);
    console.log("✅ Test email sent:", info.messageId);

    res.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
      details: error.toString(),
    });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("📨 Contact form submission received:", { name, email, subject });

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields (name, email, message)",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Set response timeout (30 seconds)
  res.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(504).json({
        success: false,
        message: "Request timeout. Please try again.",
      });
    }
  });

  // Check if email is configured before responding
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email not configured: EMAIL_USER or EMAIL_PASS missing");
    return res.status(500).json({
      success: false,
      message:
        "Email service not configured. Please contact the administrator.",
    });
  }

  // Send emails and wait for them (but with timeout protection)
  try {
    console.log("📧 Attempting to send emails...");
    console.log("📧 From:", process.env.EMAIL_USER);
    console.log("📧 To owner:", process.env.EMAIL_USER);
    console.log("📧 To sender:", email);

    // Email to you (portfolio owner)
    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || "New Message from " + name}`,
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                       color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Contact Form Submission!</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${
                  subject
                    ? `
                <div class="field">
                  <div class="label">📝 Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                `
                    : ""
                }
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
              <div class="footer">
                <p>Received at ${new Date().toLocaleString()}</p>
                <p>This email was sent from your portfolio contact form</p>
              </div>
            </div>
          </body>
          </html>
        `,
    };

    // Auto-reply to sender
    const mailToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for reaching out! 🎉",
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                       color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .message { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thanks for Getting in Touch! 🚀</h1>
              </div>
              <div class="content">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
                
                <div class="message">
                  <h3>Your Message:</h3>
                  <p>${message.replace(/\n/g, "<br>")}</p>
                </div>
                
                <p>I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly.</p>
                
                <p>Looking forward to connecting!</p>
                
                <p>Best regards,<br><strong>Krish Bagaria</strong></p>
              </div>
              <div class="footer">
                <p>This is an automated response from the portfolio contact form</p>
              </div>
            </div>
          </body>
          </html>
        `,
    };

    // Send both emails sequentially with timeout
    const sendEmailWithTimeout = (mailOptions, emailType, timeout = 20000) => {
      return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(`Email timeout after ${timeout}ms for ${emailType}`)
              ),
            timeout
          )
        ),
      ]);
    };

    console.log("📤 Sending email to owner...");
    const ownerResult = await sendEmailWithTimeout(mailToOwner, "owner");
    console.log("✅ Email to owner sent successfully!");
    console.log("   Message ID:", ownerResult.messageId);
    console.log("   Response:", ownerResult.response);

    console.log("📤 Sending auto-reply to sender...");
    const senderResult = await sendEmailWithTimeout(mailToSender, "sender");
    console.log("✅ Auto-reply email sent successfully!");
    console.log("   Message ID:", senderResult.messageId);
    console.log("   Response:", senderResult.response);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Error sending email:");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error response:", error.response);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", JSON.stringify(error, null, 2));

    // Common Gmail errors
    if (error.code === "EAUTH") {
      console.error(
        "⚠️  Authentication failed. Make sure you're using an App Password, not your regular Gmail password."
      );
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      console.error(
        "⚠️  Connection timeout. Check your internet connection or Gmail service status."
      );
    } else if (error.response) {
      console.error("⚠️  Gmail API error:", error.response);
    }

    // Still respond to user (don't reveal internal errors)
    res.status(500).json({
      success: false,
      message:
        "Failed to send message. Please try again later or contact me directly via email.",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
