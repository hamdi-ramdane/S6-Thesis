from fastapi import APIRouter, Depends, HTTPException # type: ignore
from tools import authenticate, db
from sendmail import sendEmail,sendMessageEmail
from typing import Annotated
from models import FeedbackModel

router = APIRouter(tags=["Extra"])

@router.post("/feedback")
async def send_feedback(data:FeedbackModel):
    email="g3.hamdi.ramdane@gmail.com"
    content= f"<h2>Feedback from {data.email}</h2><p>{data.message}</p>"
    sendMessageEmail(email=email,message=content)
    return {"detail":"Feedback sent successfully"}