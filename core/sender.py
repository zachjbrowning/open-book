from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from smtplib import SMTPException as oops
from .models import CustomUser


def sender(my_address_list, my_subject, my_msg_text, context, my_msg_html=None):
    msg_plain = render_to_string(my_msg_text, context)
    subject_plain = render_to_string(my_subject, context)
    
    send_mail(
            recipient_list = my_address_list,
            subject = subject_plain,
            message = msg_plain,
            from_email = 'openbooknotes.help@gmail.com',
            fail_silently = False,
            html_message = my_msg_html

        )

    #except oops:
    #    print(oops)
    #    return False 
    return True