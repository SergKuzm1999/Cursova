import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:12345@localhost/clothes4u_cursova'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'sergiy.kuzmich1999@gmail.com'
    MAIL_PASSWORD = 'eaapwpvctfofxcxd'
    SECRET_KEY = os.urandom(24)
    JWT_SECRET_KEY = os.urandom(24)

