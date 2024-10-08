import redis as r
from config import REDIS_HOST, REDIS_PORT, REDIS_PASSWORD

redis = r.Redis(
  host=REDIS_HOST,
  port=REDIS_PORT,
  password=REDIS_PASSWORD,
  ssl=True
)