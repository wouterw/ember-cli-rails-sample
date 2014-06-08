class AppManifest
  def initialize(key=nil)
    @key = key
  end

  def key
    @key || latest_deploy
  end

  def html
    $redis.get("#{key}:index.html")
  end

  def latest_deploy
    $redis.lindex('manifest_ten_deploys', 0)
  end
end
