require 'app_manifest'

class LandingController < ApplicationController
  def index
    render html: index_html
  end

  private

  def index_html
    AppManifest.new(params[:manifest_key]).html
  end
end
