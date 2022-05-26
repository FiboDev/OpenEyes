import os 
import sys

os.system(f'python3 -m pip install {sys.argv[1]}')

print(f"{sys.argv[1]} ha sido instalado")