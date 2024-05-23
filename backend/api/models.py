from pydantic import BaseModel , validator, EmailStr  # type: ignore
from datetime import date,datetime
from re import match
from pymongo import MongoClient  # type: ignore
from typing import List

db = MongoClient("localhost:27017").nomady

class UserModel(BaseModel):
    id:int
    first_name:str
    last_name:str
    email:EmailStr
    image:str
    role:str
    creation_date:str
    is_verified:bool = False
    nbr_reviews:int
    nbr_orders:int
    nbr_products_listed:int

    
# Auth ===================================================================
# ========================================================================
class RegisterModel(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str = 'password123'

class LoginModel(BaseModel):
    email:EmailStr
    password:str = 'password123' # ------------------------------------------------------------
class EmailModel(BaseModel):
    email:EmailStr
class VerificationCodeModel(BaseModel):
    code:str
class PasswordResetModel(BaseModel):
    password:str

# Dashboard ==============================================================
# ========================================================================
class EmailContentModel(BaseModel):
    content:str

# Review ================================================================
# ========================================================================

class ReviewModel(BaseModel):
    product_id : int
    rating : int
    comment : str

# Product ================================================================
# ========================================================================

class ProductModel(BaseModel):
    name: str 
    price: int 
    category: str
    description: str
    stock_quantity: int
    images: List[str]

# Product ================================================================
# ========================================================================
class OrderModel(BaseModel):
    products: List[str]
    address: str
    date:str
    total_price:int

# Extra ==================================================================
# ========================================================================
class FeedbackModel(BaseModel):
    fullname:str
    email:EmailStr
    message:str