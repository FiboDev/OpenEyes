# Import required packages
import cv2		
import pytesseract

#Inserta la ruta del archivo del tesseract en tu ordenador.
pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"


img = cv2.imread("src/public/python/imagen.jpg")

gray = cv2.cvtColor(img, 6)

ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)

rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))

dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)

contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL,
												cv2.CHAIN_APPROX_NONE)

for cnt in contours:
    
	x, y, w, h = cv2.boundingRect(cnt)
	
	rect = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
	cropped = img[y:y + h, x:x + w]

	text = pytesseract.image_to_string(cropped)
	
	print(text)

