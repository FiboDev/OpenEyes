nominals = (1000, 500, 100, 50, 20, 5, 1)

amount = int(input('amount = '))

output = {}

for n in nominals:
    
	output[n] = amount // n
	amount %= n
 
for k, v in output.items():
	print(k, v, sep=':')