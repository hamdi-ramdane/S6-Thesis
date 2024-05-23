from fastapi import HTTPException, Depends # type: ignore
from pymongo import MongoClient # type: ignore
from passlib.context import CryptContext # type: ignore
from fastapi.security import OAuth2PasswordBearer #type: ignore
from datetime import datetime
import jwt # type: ignore
from models import UserModel
from validate_email import validate_email # type: ignore


db = MongoClient("localhost:27017").nomady

# Password Hasher ===================================================================
hasher = CryptContext(schemes=["bcrypt"],deprecated="auto")
SECRET_KEY="If_you_snitch_youre_gay_:)"
def createToken(id,email):
    token = jwt.encode(payload={"email":email},key=SECRET_KEY)
    db.token.insert_one({"jwt":token,"user_id":id,"creation_date":datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
    return token

# JWT TOKEN =========================================================================
auth_scheme = OAuth2PasswordBearer(tokenUrl="token")
def authenticate(token:str = Depends(auth_scheme)) -> UserModel:
    db_token = db.token.find_one({'jwt':token},{"_id":0})
    if not db_token:
        raise HTTPException(status_code=401,detail='Invalid Token')
    user = db.user.find_one({"id":db_token["user_id"]},{"_id":0,"hashed_password":0})
    return UserModel(**user)

# Email Validator ===================================================================
def validateEmail(email):
    return validate_email(
        email_address=email,
        check_format=True,
        check_blacklist=True,
        check_dns=True,
        dns_timeout=10,
        check_smtp=True,
        smtp_timeout=10,
        smtp_helo_host='my.host.name',
        smtp_from_address='my@from.addr.ess',
        smtp_skip_tls=False,
        smtp_tls_context=None,
        smtp_debug=False)    
