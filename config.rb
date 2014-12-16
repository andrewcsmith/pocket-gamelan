###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

activate :jasmine
activate :sprockets

sprockets.append_path File.join(File.expand_path(File.dirname(__FILE__)), 'javascripts')

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

configure :development do
  activate :relative_assets
  # set :relative_links, true
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"
end

case ENV['TARGET'].to_s.downcase
when 'acs'
  activate :deploy do |deploy|
    deploy.method = :ftp
    deploy.host = "ftp.andrewchristophersmith.com"
    deploy.user = "u53383158"
    deploy.password = "ker0uac"
    deploy.path = "/talujon"
    deploy.build_before = true    
  end
when 'talujon'
  activate :deploy do |deploy|
    deploy.method = :ftp
    deploy.host = "ftp.talujon.org"
    deploy.user = "andrew@talujon.org"
    deploy.password = "y-FGN%V}3]Hn"
    deploy.path = "/"
    deploy.build_before = false
  end
end
