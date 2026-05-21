import Foundation
import CoreGraphics
import ImageIO

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]

guard let url = CFURLCreateWithFileSystemPath(kCFAllocatorDefault, inputPath as CFString, .cfurlposixPathStyle, false),
      let source = CGImageSourceCreateWithURL(url, nil),
      let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    print("Could not load image")
    exit(1)
}

let width = cgImage.width
let height = cgImage.height
let colorSpace = CGColorSpaceCreateDeviceRGB()
let bytesPerPixel = 4
let bytesPerRow = bytesPerPixel * width
let bitsPerComponent = 8
let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue

var data = [UInt8](repeating: 0, count: width * height * 4)

guard let context = CGContext(data: &data, width: width, height: height,
                              bitsPerComponent: bitsPerComponent,
                              bytesPerRow: bytesPerRow,
                              space: colorSpace,
                              bitmapInfo: bitmapInfo) else {
    print("Could not create context")
    exit(1)
}

context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

// Modify pixels
for i in stride(from: 0, to: data.count, by: 4) {
    let r = data[i]
    let g = data[i+1]
    let b = data[i+2]
    
    // If pixel is very close to white
    if r > 230 && g > 230 && b > 230 {
        data[i] = 0   // R
        data[i+1] = 0 // G
        data[i+2] = 0 // B
        data[i+3] = 0 // Alpha
    }
}

guard let outImage = context.makeImage(),
      let outUrl = CFURLCreateWithFileSystemPath(kCFAllocatorDefault, outputPath as CFString, .cfurlposixPathStyle, false),
      let destination = CGImageDestinationCreateWithURL(outUrl, "public.png" as CFString, 1, nil) else {
    print("Could not create output destination")
    exit(1)
}

CGImageDestinationAddImage(destination, outImage, nil)
CGImageDestinationFinalize(destination)

print("Saved transparent PNG to \(outputPath)")
