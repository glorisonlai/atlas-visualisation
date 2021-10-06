import csv

with open('Environment_Temperature_change_E_All_Data_Cleaned.csv', newline='\n') as in_file:
	lines = csv.reader(in_file, delimiter=',')
	sd_avg = [0 for _ in range(2019-1961)]
	cnt = [0 for _ in range(2019-1961)]
	for line in lines:
		if line[0] == 'Area': continue
		if line[0] == 'World':
			break
		if line[1] == '7020' and line[2] == '6078':
			for e_i in range(len(sd_avg)):
				try:
					sd_avg[e_i] += float(line[3+e_i])	
					cnt[e_i] += 1
				except ValueError:
					continue
	for e_i in range(len(sd_avg)):
		sd_avg[e_i] /= cnt[e_i]
	print(cnt)
	print(sd_avg)