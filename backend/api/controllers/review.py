from fastapi import APIRouter, Depends # type: ignore
from typing import Annotated
from tools import db,authenticate
from datetime import datetime
from models import UserModel,ReviewModel

router = APIRouter(prefix="/review",tags=["Review"])

@router.get('/{productId}')
async def get_product_reviews(productId:int):
    reviews = list(db.review.find({"product_id":productId},{"_id": 0}))
    for review in reviews:
        user = db.user.find_one({"id":review["user_id"]},{"_id":0})
        review["user_fullname"] = user["first_name"] +" "+ user["last_name"]
        review["user_image"] = user["image"]
        review["user_email"] = user["email"]

    return {"details":"successful","data":reviews}

@router.post('/{productId}')
async def create_review(user: Annotated[UserModel,Depends(authenticate)],review:ReviewModel,productId:int):
    return "done"
    highest_id = db.product.find_one(sort=[("id", -1)],projection={"_id":0})["id"] 
    new_review = {
        "id":highest_id+1,
        "user_id":user.id,
        "product_id":productId,
        "rating":review.rating,
        "comment":review.comment,
        "date":datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    db.review.insert_one(new_review)
    return {"details":"successful"}
