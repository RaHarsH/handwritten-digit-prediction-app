import numpy as np
from PIL import Image, ImageOps
import io
import base64

def preprocess_image(image: Image.Image) -> np.ndarray:
    img = image.convert('L')
    img = ImageOps.invert(img)
    img = img.resize((28, 28))
    img_array = np.array(img) / 255.0
    return img_array.reshape(1, 28, 28, 1)

def base64_to_image(base64_str: str) -> Image.Image:
    header, data = base64_str.split(',', 1)
    image_data = base64.b64decode(data)
    return Image.open(io.BytesIO(image_data))
