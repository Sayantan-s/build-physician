import pika
import json
from config import RABBIT_MQ_URI
from typing import Callable

url_params = pika.URLParameters(RABBIT_MQ_URI)
connection = pika.BlockingConnection(url_params)

class Producer:
    def publish():
        channel = connection.channel()
        channel.basic_publish(exchange='', routing_key='admin', body="Hello world!")

class Consumer:
    def consume():
        channel = connection.channel()
        channel.queue_declare(queue='admin')
        channel.basic_consume(queue='admin', on_message_callback=listener)
        channel.start_consuming()
    
def listener(char, method, properties, body):
        print('Received from admin:: ')
        print(body)


class MessageQueue:
    __urL_params = pika.URLParameters(RABBIT_MQ_URI)
    __connection = pika.BlockingConnection(__urL_params)
    __queue: str
    __callback:Callable
    def __init__(self, queue: str, callback: Callable) -> None:
        self.channel = MessageQueue.__connection.channel()
        self.__queue = queue
        self.__callback = callback
    def publish(self, data) -> None:
        self.channel.basic_publish(exchange='', routing_key=self.__queue, body=json.dumps(data))
    def consume(self) -> None:
        self.channel.queue_declare(queue=self.__queue)
        self.channel.basic_consume(queue=self.__queue, on_message_callback=self.__callback)
        self.channel.start_consuming()


email_queue_name = 'EMAIL_QUEUE'
email_queue = MessageQueue(queue=email_queue_name, callback=listener)
