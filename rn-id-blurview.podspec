require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name          = "rn-id-blurview"
  s.version       = package["version"]
  s.source_files  = "ios/*.{h,m}"
  s.ios.deployment_target = '11.0'
  s.tvos.deployment_target = '9.0'
  s.authors       = { "SAKHI Idris" => "idrisssakhi@gmail.com" }
  s.license       = "MIT"
  s.summary       = "Component implementation for UIVisualEffectView's blur and vibrancy effect."
  s.homepage      = "https://github.com/idrisssakhi/blurView#blurview"
  s.source        = { :git => "https://github.com/idrisssakhi/blurView.git" }

  s.dependency 'React'
end