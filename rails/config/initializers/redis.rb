require 'redis_factory'

$redis = RedisFactory.create(
  namespace: 'app'
)
