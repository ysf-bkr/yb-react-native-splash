require "json"

package = JSON.parse(File.read(File.join(__dir__, "..", "package.json")))

Pod::Spec.new do |s|
  s.name         = "yb-react-native-splash"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/ysf-bkr/yb-react-native-splash-screen.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  
  s.dependency "React-Core"

  # React Native Core dependencies
  s.dependency "React"
  s.dependency "React-Core"
  s.dependency "React-Core/DevSupport"
  s.dependency "React-Core/RCTWebSocket"
  s.dependency "React-RCTActionSheet"
  s.dependency "React-RCTAnimation"
  s.dependency "React-RCTBlob"
  s.dependency "React-RCTImage"
  s.dependency "React-RCTLinking"
  s.dependency "React-RCTNetwork"
  s.dependency "React-RCTSettings"
  s.dependency "React-RCTText"
  s.dependency "React-RCTVibration"
end