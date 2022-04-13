const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { user } = require("../models");
const {
  generateAccessToken,
  isAuthorized,
} = require("../controller/tokenFunction");

module.exports = {
  validateEmail: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.json({ message: "필수 항목을 입력하세요." });
    }
    const USER = await user.findOne({ where: { email } });
    if (USER) {
      return res.json({ message: "이미 사용중인 이메일입니다." });
    } else {
      let transporter = nodemailer.createTransport({
        service: "Naver",
        host: "smtp.naver.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const redirectURL = "http://localhost:4000";
      let info = await transporter.sendMail({
        from: `"no-reply@GameStates Admin" <${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "[GameStates] 이메일 인증을 위한 안내 메일 입니다.",
        html: `
                <style>
                    .btn-grad {
                        background-image: linear-gradient(to right, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%);
                        margin: 10px;
                        padding: 15px 45px;
                        text-align: center;
                        text-transform: uppercase;
                        transition: 0.5s;
                        background-size: 200% auto;
                        color: white;            
                        box-shadow: 0 0 20px #eee;
                        border-radius: 10px;
                        display: block;
                    }
                    .btn-grad:hover {
                        background-position: right center;
                        color: #fff;
                        text-decoration: none;
                    }
                </style>
                <div bgcolor="#fafafa" marginheight="0" marginwidth="0" style="width:100%!important;min-width:100%;background-color:#fafafa;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;text-align:center;line-height:20px;font-size:14px;margin:0;padding:0">
                    <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:center;height:100%;width:100%;background-color:#fafafa;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0" bgcolor="#fafafa">
                        <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                            <td align="center" valign="top" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0">
                            <center style="width:100%;min-width:580px">
                            <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:center;width:100%;padding:0px">
                        <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                        <td align="center" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0" valign="top">
                            <center style="width:100%;min-width:580px">
                            <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:inherit;width:580px;margin:0 auto;padding:0">
                            <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                              <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0 0px 0 0" align="center" valign="top">
                                <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:center;width:540px;margin:0 auto;padding:0">
                                  <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                                    <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0px 0px 10px" align="center" valign="top">
                              
                                    </td>
                                    <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;width:0px;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0" align="center" valign="top"></td>
                                  </tr></tbody>
                                </table>
                              </td>
                            </tr></tbody>
                          </table>
                        </center>
                      </td>
                    </tr></tbody>
                  </table>
                  
                  <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:inherit;width:580px;margin:0 auto;padding:0">
                    <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                      <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0" align="center" valign="top">
                        <table style="border-spacing:0;border-collapse:collapse;text-align:center;width:100%;display:block;padding:0px">
                          <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                            <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0 0px 0 0" align="center" valign="top">
                              <div style="background-color:#ffffff;border-radius:3px;padding:20px;border:1px solid #dddddd">
                                <table style="border-spacing:0;border-collapse:collapse;vertical-align:top;text-align:center;width:540px;margin:0 auto;padding:0">
                                  <tbody><tr style="vertical-align:top;text-align:center;padding:0" align="center">
                                    <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0px 0px 0" align="center" valign="top">
                                      <div>
                                        <h1 style="color:#333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:300;text-align:center;line-height:1.2;word-break:normal;font-size:24px;margin:10px 0 25px;padding:0" align="center">
                                        Welcome to <strong style="color: rgb(255, 94, 0);">GameStates</style=></strong>
                                        </h1>
                                        <hr style="color:#d9d9d9;background-color:#d9d9d9;height:1px;margin:20px 0;border:none">
                                        <p style="word-wrap:normal;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;color:#333;line-height:20px;text-align:left;margin:15px 0 5px;padding:0" align="left">
                                          안녕하세요! <br>
                                          회원님의 <strong>${email}</strong> 계정으로 회원가입을 위한 인증 메일을 보내드립니다. <br><br>
                                          아래의 버튼을 클릭하시면 GameStates의 페이지로 이동합니다.<br>
                                        </p>
                                        <div style="text-align:center;color:#ffffff;padding:20px 0 25px" align="center">
                                        <a href=${redirectURL} class="btn-grad" style="background-image: linear-gradient(to right, #f1b084 0%, #eb7d17  51%, #ff8800  100%);display:inline-block;color:#fff;font-size:14px;font-weight:600;text-decoration:none;width:auto!important;text-align:center;border-radius:5px;letter-spacing:normal;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin:0 auto;padding:6px 12px"  target="_blank"">123345</a>
                                        
                                        </div>
                                        <p style="word-wrap:normal;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:normal;color:#333;line-height:20px;text-align:left;margin:15px 0 5px;padding:0" align="left">
                                          <strong>Note:</strong>If you were not expecting this login email, you can ignore this email.
                                        </p>
                                        <hr style="color:#d9d9d9;background-color:#d9d9d9;height:1px;margin:20px 0;border:none">
                                        <p style="word-wrap:normal;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;color:#777777;line-height:20px;text-align:left;margin:15px 0 5px;padding:0" align="left">
                                          <strong>Getting a 404 error?</strong> Make sure you’re signed in as <strong>${email}</strong>.
                                        </p>
                                        <p style="word-wrap:normal;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;font-weight:normal;color:#777777;line-height:20px;text-align:left;margin:15px 0 5px;padding:0" align="left">
                                          <strong>Button not working?</strong> Copy and paste this link into your browser:
                                          <br><a href=${redirectURL} style="color:#4183c4;text-decoration:none" target="_blank"">${redirectURL}</a>
                                        </p>
                                      </div>
                                    </td>
                                    <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top;text-align:center;width:0px;color:#333333;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:normal;line-height:20px;font-size:14px;margin:0;padding:0" align="center" valign="top"></td>
                                  </tr></tbody>
                                </table>
                              </div>
                            </td>
                          </tr></tbody>
                        </table>
                      </td>
                    </tr></tbody>
                  </table>
                </center>
              </td>
            </tr></tbody>
          </table>
        </div>`,
      });
      res.end("success");
    }
  },
};
