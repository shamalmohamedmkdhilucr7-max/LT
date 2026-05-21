import os
import glob
from PIL import Image

def optimize_scroll_animation():
    print("--- OPTIMIZING SCROLL ANIMATION ---")
    source_dir = "scroll animation"
    if not os.path.exists(source_dir):
        print(f"Directory '{source_dir}' not found.")
        return
    
    files = sorted(glob.glob(os.path.join(source_dir, "ezgif-frame-*.jpg")))
    if not files:
        print("No ezgif-frame-*.jpg files found.")
        return
    
    print(f"Found {len(files)} frames. Converting to WebP...")
    
    for idx, filepath in enumerate(files):
        try:
            with Image.open(filepath) as img:
                # Target filename format: frame-001.webp
                frame_num = str(idx + 1).padStart(3, '0') if hasattr(str(idx + 1), 'padStart') else f"{idx + 1:03d}"
                target_filename = f"frame-{frame_num}.webp"
                target_path = os.path.join(source_dir, target_filename)
                
                # Save as WebP with 65% quality
                img.save(target_path, "WEBP", quality=65, method=6)
                
                # Check compression ratio
                original_size = os.path.getsize(filepath)
                new_size = os.path.getsize(target_path)
                ratio = (original_size - new_size) / original_size * 100
                if idx % 10 == 0 or idx == len(files) - 1:
                    print(f"Frame {idx+1}: {filepath} -> {target_path} | Quality 65 | Size: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB (-{ratio:.1f}%)")
        except Exception as e:
            print(f"Error processing frame {filepath}: {e}")

def optimize_main_images():
    print("\n--- OPTIMIZING MAIN SITE IMAGES ---")
    
    mappings = {
        "WhatsApp Image 2026-05-19 at 12.37.30.jpeg": "about-building.webp",
        "WhatsApp Image 2026-05-21 at 10.16.06.jpeg": "architectural-lighting.webp",
        "WhatsApp Image 2026-05-19 at 12.37.31.jpeg": "commercial-installations.webp",
        "tower.jpeg": "tower-illumination.webp",
        "facade.jpeg": "facade-lighting.webp",
        "festive.jpeg": "festive-lighting.webp",
        "event.jpeg": "event-lighting.webp",
        "othman.jpeg": "othman.webp",
        "sheefer.jpeg": "sheefer.webp",
        "logo.png": "logo.webp",
        "logo.jpg": "logo-icon.webp"
    }
    
    for src, dst in mappings.items():
        if not os.path.exists(src):
            print(f"Warning: Source image '{src}' not found. Skipping.")
            continue
        try:
            with Image.open(src) as img:
                # Save as WebP with 75% quality
                img.save(dst, "WEBP", quality=75, method=6)
                original_size = os.path.getsize(src)
                new_size = os.path.getsize(dst)
                ratio = (original_size - new_size) / original_size * 100
                print(f"Converted: {src} -> {dst} | Quality 75 | Size: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB (-{ratio:.1f}%)")
        except Exception as e:
            print(f"Error converting '{src}': {e}")

if __name__ == "__main__":
    optimize_scroll_animation()
    optimize_main_images()
    print("\nAsset optimization completed!")
