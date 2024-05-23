from fastapi import APIRouter, Depends, HTTPException # type: ignore
from tools import authenticate, db
from sendmail import sendEmail,sendMessageEmail
from typing import Annotated
from models import UserModel, EmailContentModel

router = APIRouter(prefix="/dashboard",tags=["Dashboard"])

# (DONE)================================================================
@router.get("/profile")
def get_user(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.user.find({"id":user.id},{"_id":0,"hashed_password":0}))[0]
    return {"details":"fetch successfull","data":result}


# (DONE)================================================================
@router.get("/my-orders")
def get_orders(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.order.find({"user_id":user.id},{"_id":0,}))
    return {"details":"fetch successfull","data":result}

@router.patch("/user")
def update_user(user: Annotated[UserModel,Depends(authenticate)],new_user:UserModel):
    db.user.update_one({"id":user.id},{'$set': {'first_name': new_user.first_name}})
    db.user.update_one({"id":user.id},{'$set': {'last_name': new_user.last_name}})
    db.user.update_one({"id":user.id},{'$set': {'image': new_user.image}})
    return {"details":"Update successful"}

# (DONE)================================================================
@router.get("/my-products")
def get_products(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.product.find({"user_id":user.id},{"_id":0,}))
    return {"details":"fetch successfull","data":result}

@router.delete("/product/{productId}")
def delete_product(user: Annotated[UserModel,Depends(authenticate)],productId:int):
    db.product.delete_one({"id":productId})
    return {"details":"Deletion successful"}

# (DONE) ================================================================
@router.get("/listing-requests")
def get_products(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.product.find({"status":"pending"},{"_id":0,}))
    return {"details":"fetch successfull","data":result}

@router.patch("/listing-requests/approve/{productId}")
def get_products(user: Annotated[UserModel,Depends(authenticate)],productId:int):
    db.product.update_one({"id":productId},{'$set': {'status': "approved"}})
    return {"details":"Update successful"}

@router.patch("/listing-requests/decline/{productId}")
def get_products(user: Annotated[UserModel,Depends(authenticate)],productId:int,emailContent:EmailContentModel):
    db.product.update_one({"id":productId},{'$set': {'status': "declined"}})
    # SEND EMAIL HERE ---------------------------------------------------------------------------------------------------------------
    # owner_id = db.product.find_one({"id":productId},{"_id":0})["user_id"]
    # email = db.user.find_one({"id":owner_id},{"_id":0})["email"]
    productName = db.product.find_one({"id":productId},{"_id":0})["name"]
    email="g3.hamdi.ramdane@gmail.com"
    sendMessageEmail(email=email,message=f"<p>Your Product [ {productName} ] was Declined for the following Reasons: </p><p>{emailContent.content}</p>")
    return {"details":"Update successful"}

# (DONE) ================================================================

@router.get("/manage-products")
def get_products(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.product.find({},{"_id":0,}))
    return {"details":"fetch successfull","data":result}

@router.delete("/manage-products/delete/{productId}")
def delete_product(user: Annotated[UserModel,Depends(authenticate)],productId:int,emailContent:EmailContentModel):
    product = db.product.find_one({"id":productId},{"_id":0})
    db.product.delete_one({"id":productId})
    email="g3.hamdi.ramdane@gmail.com"
    sendMessageEmail(email=email,message=f"<h2>Your Product [{product["name"]}] was deleted for the following Reasons: </h2><p>{emailContent.content}</p>")
    return {"details":"Update successful"}

@router.patch("/manage-products/blacklist/{productId}")
def blacklist_product(user: Annotated[UserModel,Depends(authenticate)],productId:int):
    db.product.update_one({"id":productId},{'$set': {'status': "pending"}})
    email="g3.hamdi.ramdane@gmail.com"
    product = db.product.find_one({"id":productId},{"_id":0})
    sendMessageEmail(email=email,message=f"<h2>Your Product [ {product["name"]} ] was removed from the public shop</h2>")
    return {"details":"Update successful"}

# (Done) ================================================================
@router.get("/manage-orders")
def get_orders(user: Annotated[UserModel,Depends(authenticate)]):
    result = list(db.order.find({"status":"in-transit"},{"_id":0,}))
    return {"details":"fetch successfull","data":result}

@router.patch("/order/cancel/{orderId}")
def get_products(user: Annotated[UserModel,Depends(authenticate)],orderId:int,emailContent:EmailContentModel):
    db.order.update_one({"id":orderId},{'$set': {'status': "canceled"}})
    order = db.order.find_one({"id":orderId},{"_id":0})
    email="g3.hamdi.ramdane@gmail.com"
    sendMessageEmail(email=email,message=f"<h2>Your order [{order["tracking_code"]}] was Canceled for the following Reasons: </h2><p>{emailContent.content}</p>")
    return {"details":"Update successful"}

@router.patch("/order/deliver/{orderId}")
def get_products(user: Annotated[UserModel,Depends(authenticate)],orderId:int,emailContent:EmailContentModel):
    db.order.update_one({"id":orderId},{'$set': {'status': "delivered"}})
    order = db.order.find_one({"id":orderId},{"_id":0})
    email="g3.hamdi.ramdane@gmail.com"
    sendMessageEmail(email=email,message=f"<h2>Your Product [{order["tracking_code"]}] was Delivered, Check the neareset post office! </h2>")
    return {"details":"Update successful"}

# (DONE) ================================================================
@router.get("/manage-users")
def get_all_users(user: Annotated[UserModel,Depends(authenticate)]):
    users = list(db.user.find({},{"_id":0,"hashed_password":0}))
    return {"details":"fetch successfull","data":users}

@router.delete("/manage-users/{userId}")
def ban_user(user: Annotated[UserModel,Depends(authenticate)],userId:int,message:EmailContentModel):
    if userId == user.id:
        raise HTTPException(status_code=409,detail="Can't Ban yourself :)")
    reciever = db.user.find_one({"id":userId},{"_id":0})
    sendMessageEmail(message=f"I'm sorry to inform you that your account [ {reciever["first_name"]} {reciever["last_name"]} ] Has been banned from our platform for the following reason : {message.content} ")
    db.user.delete_one({"id":userId})
    return {"details":"User banned successfull",}


