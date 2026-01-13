# Email Setup Guide

## Gmail Configuration

To send emails from your portfolio contact form, you need to configure Gmail with an **App Password**.

### Why App Password?
Gmail doesn't allow third-party apps to use your regular password for security reasons. You need to generate a special "App Password" for this application.

### Steps to Set Up Gmail App Password:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the prompts to enable it

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Portfolio Backend" as the name
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

3. **Set Environment Variables on Render**:
   - Go to your Render dashboard
   - Select your backend service
   - Go to "Environment" tab
   - Add these environment variables:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-16-character-app-password
     ```
   - **Important**: Remove any spaces from the app password when pasting it
   - Click "Save Changes"
   - Redeploy your service

### Testing Email Configuration

After setting up, you can test your email configuration by:

1. **Using the test endpoint**:
   ```bash
   POST https://your-backend-url.onrender.com/api/test-email
   ```

2. **Check Render logs**:
   - Go to your Render dashboard
   - Click on "Logs" tab
   - Look for email-related messages:
     - ✅ "Server is ready to send emails" - Configuration is correct
     - ❌ "Email configuration error" - Check your credentials
     - ❌ "EAUTH" error - You're using regular password instead of App Password

### Common Issues:

1. **"EAUTH" Error**:
   - You're using your regular Gmail password
   - Solution: Generate and use an App Password

2. **"Email timeout"**:
   - Network issues or Gmail blocking the connection
   - Check Render logs for more details

3. **Emails not received**:
   - Check spam folder
   - Verify EMAIL_USER is correct
   - Check Render logs for email sending errors
   - Make sure App Password doesn't have spaces

### Security Notes:

- Never commit your `.env` file or App Password to Git
- App Passwords are safer than regular passwords
- You can revoke App Passwords anytime from Google Account settings
- Each App Password is unique and can be used only for the specified app
