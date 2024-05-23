import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def template(children):
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
    <title>HTML Email</title>
    <style>
        .container {{
      		font-family:arial;
      		color:white;
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #1C1917;
            text-align: center;
      		border:3px solid #E11D48;
        }}
        .button {{
            display: inline-block;
            background-color: #E11D48;; /* Green */
      		font-weight:bold;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
      		transition: all 300ms;
        }}
      	.button:hover{{
      		background-color:orange;
      	}}
      	.title{{
      		color:#E11D48;
      	}}
        .reset-code{{
      		background-color:#E11D48;
      		padding:10px 0;
      	}}
      	
    </style>
    </head>
    <body>
    <div class="container">
        <h1 class="title">Nomady</h1>
        <h3>Thank you for using our website</h3>
        {children}
    </form>
    </div>
    </body>
    </html>
    """

def sendEmail(email="g3.hamdi.ramdane@gmail.com",html_content="Empty Message"):
    # Email addresses
    sender_email = "llill.education.lliill@gmail.com"
    receiver_email = email 
    # Create a multipart message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "Nomady Update"
    # Attach HTML content to the message
    message.attach(MIMEText(html_content, "html"))
    # Connect to the SMTP server (e.g., Gmail's SMTP server)
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = "lliill.education.lliill@gmail.com"
    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX PASSWORD HAS BEEN REMOVE BEFORE PUSHING TO GITHUB XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Projects wont work without a  password XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    smtp_password = "" 
    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    # Establish a secure connection with the SMTP server
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    # Login to your email account
    server.login(smtp_username, smtp_password)
    # Send the email
    server.sendmail(sender_email, receiver_email, message.as_string())
    # Quit the SMTP server
    server.quit()
    print("Email sent successfully!")

def sendResetCode(email="g3.hamdi.ramdane@gmail.com",code="aaaaa"):
    html_content = template(f"""
        <h4>Your password reset code is:</h4>
        <h1 class="reset-code">{code}</h1>
    """)
    sendEmail(email=email,html_content=html_content)

def sendVerifyEmail(email="g3.hamdi.ramdane@gmail.com",userId=1):
    html_content = template(f"""
        <form action="http://localhost:8000/auth/register/verify-email/{userId}" method="post">
                <input type="submit" class="button" value="verify">
        </form>
    """) 
    sendEmail(email=email,html_content=html_content)

def sendMessageEmail(email="g3.hamdi.ramdane@gmail.com",message=""):
    html_content = template(f"""
        <p> {message} </p>
    """) 
    sendEmail(email=email,html_content=html_content)
