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

// Algorithm to find the text and erase it
var state = 0 // 0 = before graphic, 1 = in graphic, 2 = after graphic (erasing)
var emptyRowCount = 0
let gapThreshold = Int(Double(height) * 0.02) // 2% of image height as gap

for y in 0..<height {
    // Check if row is empty
    var rowIsEmpty = true
    for x in 0..<width {
        let i = (y * bytesPerRow) + (x * bytesPerPixel)
        let a = data[i+3]
        if a > 10 { // Non-transparent pixel found
            rowIsEmpty = false
            break
        }
    }
    
    if state == 0 {
        if !rowIsEmpty {
            state = 1
        }
    } else if state == 1 {
        if rowIsEmpty {
            emptyRowCount += 1
            if emptyRowCount >= gapThreshold {
                state = 2 // We reached the gap!
            }
        } else {
            emptyRowCount = 0
        }
    }
    
    // If we are in state 2, erase the entire row (and all subsequent rows)
    if state == 2 {
        for x in 0..<width {
            let i = (y * bytesPerRow) + (x * bytesPerPixel)
            data[i] = 0   // R
            data[i+1] = 0 // G
            data[i+2] = 0 // B
            data[i+3] = 0 // A
        }
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

print("Saved image without text to \(outputPath)")
