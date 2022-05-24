import cv2
import object_detection as od

frame = cv2.imread("src/public/python/imagen.jpg")

detector = od.Detector()
modelo = detector.modelo

frame = cv2.flip(frame, 1)

clases, puntajes, cajas = modelo.detect(frame, 0.6, 0.5)

print(detector.obtener_objetos(clases))
