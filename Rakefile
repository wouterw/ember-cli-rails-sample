require 'rake'

task :run do
  pids = [
    spawn("cd rails && EMBER_PORT=4900 rails s -p 3900"),
    spawn("cd ember && ./node_modules/.bin/ember server --port=4900 --proxy-port=3900"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end
