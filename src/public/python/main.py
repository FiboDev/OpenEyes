import cv2
import object_detection as od
import text_detection as td 
import sys

if sys.argv[1] == "r":
    
    frame = cv2.imread("src/public/python/imagen.jpg")

    detector = od.Detector()
    modelo = detector.modelo

    frame = cv2.flip(frame, 1)

    clases, puntajes, cajas = modelo.detect(frame, 0.6, 0.5)
    
    print(detector.obtener_objetos(clases))

elif sys.argv[1] == "t": 
    
    texto = td.DetectorTexto("C:/Program Files/Tesseract-OCR/tesseract.exe")

    texto.obtener_imagen()

    print(texto.detectar_texto())





