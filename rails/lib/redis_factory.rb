require 'yaml'

class RedisFactory
  def self.create(namespace: 'app')
    config = self.config

    options = {
      host: config['host'],
      port: config['port'],
      db:   config['db']
    }

    if config['password']
      options[:password] = config['password']
    end

    Redis::Namespace.new(namespace, redis: Redis.new(options))
  end

  def self.config
    @config ||= YAML.load(
      ERB.new(File.new("#{Rails.root}/config/redis.yml").read).result
    )[Rails.env]
  end
end
