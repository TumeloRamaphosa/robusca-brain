"""Derive transparent ivory + black marks from the source logo JPEG.

The source is letterboxed with a hard white field, so it cannot be dropped onto
a dark page directly. This trims to the artwork, removes the field, and recolours
the ink while preserving anti-aliasing as alpha.
"""
from PIL import Image
import numpy as np

src = Image.open("deployment/brand_assets/studex_global_markets_logo.jpeg").convert("L")
a = np.array(src)

# Locate the light page inside the letterboxing, then trim to the ink.
light = a > 200
cols = np.where(light.any(axis=0))[0]
rows = np.where(light.any(axis=1))[0]
page = src.crop((cols.min(), rows.min(), cols.max() + 1, rows.max() + 1))

p = np.array(page)
ink = p < 160
icols = np.where(ink.any(axis=0))[0]
irows = np.where(ink.any(axis=1))[0]
pad = 12
mark = page.crop((
    max(icols.min() - pad, 0), max(irows.min() - pad, 0),
    min(icols.max() + 1 + pad, page.width), min(irows.max() + 1 + pad, page.height),
))

alpha = Image.fromarray(np.clip(255.0 - np.array(mark).astype(np.float32), 0, 255).astype(np.uint8))

def write(path, rgb):
    Image.merge("RGBA", (
        Image.new("L", mark.size, rgb[0]),
        Image.new("L", mark.size, rgb[1]),
        Image.new("L", mark.size, rgb[2]),
        alpha,
    )).save(path)

write("studex-site/assets/studex-mark-black.png", (0, 0, 0))
write("studex-site/assets/studex-mark-ivory.png", (242, 240, 233))
print("marks written:", mark.size)
