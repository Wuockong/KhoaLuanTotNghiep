const { Resend } = require('resend');
const resend = new Resend('re_RxahrzuV_EKP58HF9R9vSBaBJgPfZ4zMD'); // đổi bằng key thật


async function sendOTPEmail(toEmail, otpCode) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // dùng tạm vì chưa có domain
      to: toEmail,
      subject: 'Mã OTP xác thực',
      html: `<p>Mã OTP của bạn là: <strong>${otpCode}</strong></p>`,
    });

    console.log('Email sent:', data);
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

module.exports = sendOTPEmail;