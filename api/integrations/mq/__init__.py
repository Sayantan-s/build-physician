import pika
import json
from config import RABBIT_MQ_URI
from typing import Callable


class MessageQueue:
    __queue: str
    callback: Callable

    def __init__(self, queue: str, callback: Callable) -> None:
        self.__urL_params = pika.URLParameters(RABBIT_MQ_URI)
        self.__connection = pika.BlockingConnection(self.__urL_params)
        self.channel = self.__connection.channel()
        self.__queue = queue
        MessageQueue.callback = callback

    def publish(self, data) -> None:
        self.channel.basic_publish(exchange='', routing_key=self.__queue, body=json.dumps(data))

    def consume(self) -> None:
        self.channel.queue_declare(queue=self.__queue)
        self.channel.basic_consume(queue=self.__queue, on_message_callback=MessageQueue.cb)
        self.channel.start_consuming()

    @staticmethod
    def cb(ch, method, properties: pika.BasicProperties, body: bytes):
        parsed_result = json.loads(body.decode())
        MessageQueue.callback(parsed_result)
