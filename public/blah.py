import csv

with open('Environment_Temperature_change_E_All_Data_Cleaned.csv', newline='\n') as in_file:
	lines = csv.reader(in_file, delimiter=',')
	sd_avg = [0 for _ in range(2019-1961)]
	cnt = [0 for _ in range(2019-1961)]
	countries = set()
	for line in lines:
		if line[0] == 'Area': continue
		if line[0] == 'World':
			break
		countries.add(line[0])
	countries = list(countries)
	countries.sort()
	print('\",\"'.join(list(countries)))