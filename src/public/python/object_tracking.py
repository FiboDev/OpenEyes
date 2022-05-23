import cv2
import numpy as np
import object_detection as od

frame = cv2.imread("")

detector = od.Detector()
modelo = detector.modelo

frame = cv2.flip(frame, 1)
frame = cv2.resize(frame, (300, 300))

clases, puntajes, cajas = modelo.detect(frame, 0.6, 0.5)

for (clases_id, puntaje, caja) in zip(clases, puntajes, cajas):
    
    cv2.rectangle(frame, caja, (0, 255, 0), 1)
    print(clases_id)








