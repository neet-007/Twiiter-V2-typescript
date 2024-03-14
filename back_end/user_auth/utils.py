from django.core.mail import EmailMessage

def mail_user(subject:str, body:str, to:list[str]):
    email = EmailMessage(subject=subject, body=body, to=to)
    email.send()