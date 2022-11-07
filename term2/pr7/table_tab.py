ecoli = open("ecoli.log", 'r')
ksetae = open("ksetae.log", 'r')
table = open("table.txt", 'w')
except IOError as err:
    print("Input error: {0}".format(err))
    
ecoli_log = ecoli.read()
ksetae_log = ksetae.read()

print("Read file error: {0}".format(err))    
    

ecoli_list = ecoli_log.split("\n")
ksetae_list = ksetae_log.split("\n")
while("" in ecoli_list):
    ecoli_list.remove("")
while("" in ksetae_list):
    ksetae_list.remove("")
    
    
ksetae_dict = {}
ecoli_dict = {}
ksetae_sum = 0
ecoli_sum = 0
for line in ecoli_list:
    tmp = line.split("\t")
    if(tmp[0] == "U"):
        continue
    ecoli_dict[tmp[0]] = int(tmp[1])
    ecoli_sum += int(tmp[1])
for line in ksetae_list:
    tmp = line.split("\t")
    if(tmp[0] == "U"):
        continue
    ksetae_dict[tmp[0]] = int(tmp[1])
    ksetae_sum += int(tmp[1])
    
    
ecoli_prcnt = {}
ksetae_prcnt = {}
for key in ecoli_dict:
    ecoli_prcnt[key] = 100*ecoli_dict[key]/ecoli_sum
for key in ksetae_dict:
    ksetae_prcnt[key] = 100*ksetae_dict[key]/ksetae_sum
    
    
diff = {}
for key in ecoli_prcnt:
    diff[key] = ksetae_prcnt[key] - ecoli_prcnt[key] 
    
sorted(ksetae_dict.items(), key=lambda x: x[1])
table.write("Остаток\tПроцент в K. setae\tПроцент в E. coli\tРазница\n")
for key in ksetae_dict:
    table.write(str(key) + "\t" + str(round(ksetae_prcnt[key], 1)) + "\t" + str(round(ecoli_prcnt[key], 1)) + "\t" + str(round(diff[key], 1)) + "\n")
    
    
ecoli.close()
ksetae.close()
table.close()
