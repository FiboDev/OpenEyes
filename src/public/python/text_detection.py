# Import required packages
import cv2		

class DetectorTexto: 
    
    pytesseract = __import__("pytesseract") 
    
    def __init__(self, ruta) -> None:
        
        """
        Construye  todo lo necesario para detectar texto
        
        Parametros: 
        
        ruta: ruta del archivo tesseract.exe (ruta absoluta)
        """
        self.pytesseract.pytesseract.tesseract_cmd = ruta
        self.img = None  
    
    def obtener_imagen(self) -> None: 
        
        """
        Crea la imagen para detectar texto
        """
        
        self.img = cv2.imread("src/public/python/texto.jpg")
    
    def detectar_texto(self) -> str: 
        
        """
        Devuelve el texto detectado en una imagen
        """
        gray = cv2.cvtColor(self.img, 6)
        
        texto = ""
        
        ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
        
        rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))
        
        dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)
        
        contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        
        for cnt in contours:
            
            x, y, w, h = cv2.boundingRect(cnt)
            
            rect = cv2.rectangle(self.img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            
            cropped = self.img[y:y + h, x:x + w]
            
            texto += self.pytesseract.image_to_string(cropped)
        
        return texto
