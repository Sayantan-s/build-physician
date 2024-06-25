import pika

url_params = pika.URLParameters('amqps://emsrbylr:GDX2u_5BTN0CVpdyTgrBtVrzxh3poawK@puffin.rmq2.cloudamqp.com/emsrbylr')
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