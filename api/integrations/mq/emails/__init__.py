from integrations.mq import MessageQueue
from .callback import exec_send_emails

email_queue_name = 'EMAIL_QUEUE'
email_queue = MessageQueue(queue=email_queue_name, callback=exec_send_emails)
    