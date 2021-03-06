import cv2 
import json
from collections import Counter

class Detector:
    
    def __init__(self) -> None:
        
        self.CONF_THRESHOLD = 0.5
        self.NMS_THRESHOLD = 0.5

        #lista que contiene las clases de objeto que se pueden detectar
        self._clases = []

        #obtener los nombres de las clases de objetos a clasificar

        with open("src/public/python/classes.txt", "r") as archivo: 
        
            self._clases = [nombre_clase.strip() for nombre_clase in archivo.readlines()]

    
    def __str__(self) -> str:
        
        return "Detector de objetos"
    
    def __repr__(self) -> str:
        
        return f"Modelo de YOLOv4 con parametros de confiabilidad de {self.CONF_THRESHOLD} y supresion no maxima de {self.NMS_THRESHOLD}"
    
    def obtener_objetos(self, clases: list) -> json: 
        
        """
        Devuelve la cantidad de objetos de cada clase detectado
        """
        
        objetos = []
        
        for clase in clases: 
            
            try: 
                
                objetos.append(self._clases[clase])
                
            except IndexError: 
                
                print(f"Ha ocurrido un error de index")
        
        return json.dumps(Counter(objetos))
    
    @property 
    def clases(self) -> list:
        
        return self._clases
    
    @property
    def modelo(self):
        
        #configuracion inicial del modelo YOLO
        red = cv2.dnn.readNet('src/public/python/yolov4-tiny.weights', 'src/public/python/yolov4-tiny.cfg')
        red.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        red.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA_FP16)

        #definir a yolo como modelo de detector en opencv
        modelo = cv2.dnn_DetectionModel(red)
        modelo.setInputParams(size = (416, 416), scale = 1 / 255, swapRB = True)
        
        return modelo
    