from datetime import datetime
import random
from fastapi import APIRouter,Depends# type: ignore
from typing import Annotated
from pprint import pprint as print
from tools import db,authenticate
from models import UserModel, ProductModel,OrderModel


router = APIRouter(prefix="/product",tags=["Product"])

@router.get('/{productId}')
async def get_product(productId:int):
    result = db.product.find_one({"id":productId,},{"_id": 0})
    return {"details":"successful","data":result}

@router.post('/')
async def create_product(user: Annotated[UserModel,Depends(authenticate)],data:ProductModel):
    highest_id = db.product.find_one(sort=[("id", -1)],projection={"_id":0})["id"] 
    new_product = {
        "id": highest_id+1,
        "user_id": user.id,
        "name": data.name,
        "price": data.price,
        "category": data.category,
        "description": data.description,
        "stock_quantity": data.stock_quantity,
        "images": data.images,
        "status": "pending",
        "reviews_rate": 0,
        "reviews_nbr": 0
    }
    db.product.insert_one(new_product)
    return {"details":"successful"}

@router.get('/category/{category}')
async def category(category:str):
    if category == "trending":
        result = list(db.product.find({"status":"approved"},{"_id":0}).limit(20))
    else:
        result = list(db.product.find({"category":category,"status":"approved"},{"_id":0}))
    return {"details":"successful","data":result}

# ============================================================================================
@router.post('/order')
async def create_order(user: Annotated[UserModel,Depends(authenticate)],data:OrderModel):
    highest_id = db.order.find_one(sort=[("id", -1)],projection={"_id":0})["id"] 
    new_order = {
        "id": highest_id+1,
        "user_id": user.id,
        "products": data.products,
        "total_price": data.total_price,
        "tracking_code": str(random.randint(10000, 99999)),
        "address": data.address,
        "status": "in-transit",
        "date":datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    db.order.insert_one(new_order)
    return {"details":"successful"}
