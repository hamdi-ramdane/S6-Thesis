from models import RegisterModel, LoginModel, EmailModel,VerificationCodeModel,PasswordResetModel
from fastapi import APIRouter, Depends, HTTPException  # type: ignore
from tools import db,hasher, createToken, validateEmail
from datetime import datetime
from sendmail import sendResetCode, sendVerifyEmail
import random
router = APIRouter(prefix="/auth",tags=["Authentication"])

# ====================================================================================

@router.post('/login')
async def login(data: LoginModel):
    user = db.user.find_one({"email": data.email},{"_id":0})
    if not user or not hasher.verify(data.password,user.get("hashed_password")) :
        raise HTTPException(status_code=401,detail="Invalid Credentials")
    token = createToken(id=user["id"],email=user["email"])
    return {"detail":"Logged In!","token":token,"is_admin":user["role"] == "admin"} 

# ====================================================================================
@router.post('/register')
async def register(data: RegisterModel):
    highest_id = db.user.find_one(sort=[("id", -1)],projection={"_id":0})["id"] 
    # Create New User In DB 
    new_user = {
        "id":highest_id+1,
        "email":data.email,
        "first_name":data.first_name,
        "last_name":data.last_name,
        "hashed_password":hasher.hash(data.password),
        "image":"/users/user_0.png",
        "role":"user",
        "is_verified": False,
        "creation_date":datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "nbr_reviews":0,
        "nbr_orders":0,
        "nbr_products_listed":0,
    }
    db.user.insert_one(new_user)
    # send verification email
    sendVerifyEmail(email=data.email,userId=new_user["id"])
    # JWT TOKEN
    token = createToken(id=new_user["id"],email=new_user["email"])
    return {"details":"Registration Successful","token":token,"is_admin":False}; 

@router.post('/register/email')
async def checkEmail(data:EmailModel):
    # check if already used
    if db.user.find_one({"email":data.email}):
        raise HTTPException(status_code=409,detail="Email Already Used")
    # check if its a real email 
    is_valid = validateEmail(data.email)
    if not is_valid:
        raise HTTPException(status_code=401,detail="Email Does Not Exist")
    return {"details":"Valid Email"}

@router.post('/register/verify-email/{userId}')
async def checkEmail(userId:int):
    user =  db.user.update_one({"id":userId},{'$set': {'is_verified':True}})
    print(user)
    print(userId)
    print(db.user.find_one({"id":userId},{"_id":0}))
    return {"detail": "Email verified!"}
# ====================================================================================
codes = ["aaaaa", "3vkpz", "bfw4d", "nqx8e", "y6prt", "j9slk", "c2awq", "xz5he", "i7dFj", "m1utp"]
@router.post('/forgot-password/check-email')
async def check_email(data:EmailModel):
    # check if already used
    user = db.user.find_one({"email":data.email},{"_id":0})
    if not user: 
        raise HTTPException(status_code=401,detail="No Account with this Email")
    sendResetCode(email=data.email,code=random.choice(codes))
    return {"details":"Reset code is sent","email":user["email"]}

@router.post('/forgot-password/check-code')
async def check_code(data:VerificationCodeModel):
    if data.code not in codes:
        raise HTTPException(status_code=401,detail="Invalid Code")
    return {"details","Valid Code!"}

@router.patch('/forgot-password/reset/{email}')
async def reset_password(data:PasswordResetModel,email:str):
    db.user.update_one({"email":email},{'$set': {'hashed_password': hasher.hash(data.password)}})
    return {"details","Password Reseted!"}

# ====================================================================================
@router.post('/verify-email/{userId}')
async def checkEmail(userId:str):
    return {"details","yaaaaa!","id",userId}  
# ====================================================================================
@router.post('/logout')
async def logout():
    return {"message":"logged out!!"} 

