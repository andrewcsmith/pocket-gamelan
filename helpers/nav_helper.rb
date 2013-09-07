require 'psych'

module NavHelper
  def build_nav_menu
    @@nav = Psych.load(File.read('source/nav.yaml'))
    nav_list @@nav, '#/', :id_suffix => "main-menu"
  end
  
  def build_island_menu island
    nav_list @@nav[island]["sub"], "#/#{@@nav[island]["href"]}/", {:id_suffix => "island-menu"}
  end
  
  # Helpers for my helpers
  private
  
  def nav_list nav, tree = '#/', options = {}
    # print nav
    content_tag :ul, :class => "nav-links" do
      nav.inject("") do |memo, obj|
        memo << nav_list_item(obj, tree, options)
      end
    end
  end
  
  def nav_list_item obj, tree, options = {}
    out = obj[1]["sub"] ? nav_list(obj[1]["sub"], tree + obj[1]["href"] + "/", options) : ""
    out << link_to(obj[0], tree + obj[1]["href"], :rel => "local", :class => "active")
    id = [tree.gsub(/[#\/]/,''), obj[1]["href"], options[:id_suffix]].reject {|x| x.nil? || x == "" }.join('-')
    klass = ["nav-link", options[:class], obj[1]["class"]]
    content_tag :li, out, :class => klass.flatten.compact.uniq.join(' '), :id => id
  end
end
