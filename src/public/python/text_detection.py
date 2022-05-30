# Import required packages
import cv2		
import pytesseract
import os.path as path

#pytesseract.pytesseract.tesseract_cmd = '/app/.apt/usr/bin/tesseract'

print(path.exists("/app/vendor/tesseract-ocr/bin/tesseract"))

'''
img = cv2.imread("src/public/python/imagen.jpg")

gray = cv2.cvtColor(img, 6)

ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)

rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))

dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)

contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL,
												cv2.CHAIN_APPROX_NONE)

im2 = img.copy()


for cnt in contours:
    
	x, y, w, h = cv2.boundingRect(cnt)
	
	rect = cv2.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)
	cropped = im2[y:y + h, x:x + w]

	text = pytesseract.image_to_string(cropped)
	
	print(text)
'''
