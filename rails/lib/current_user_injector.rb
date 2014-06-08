class CurrentUserInjector
  attr_reader :html, :user

  def initialize(html, user)
    @html = html
    @user = user
  end

  def inject
    html.insert(
      head_position,
      "<meta name='current-user' content='#{user_json}'>"
    )
  end

  private

  def user_json
    Rack::Utils.escape_html(
      UserSerializer.new(user).to_json
    )
  end

  def head_position
    html.index('>', html.index('<head')) + 1
  end
end
