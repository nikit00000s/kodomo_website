import numpy as np
import pandas as pd
count = np.matrix([
    [62, 5, 28, 5],
    [39, 23, 17, 21],
    [28, 36, 27, 10], 
    [100, 0, 0, 0],
    [0, 0, 0, 100],
    [0, 0, 100, 0],
    [24, 12, 46, 17]
])
colNames = ['-3', '-2', '-1', '1', '2', '3', '4']
rowNames = ['A', 'C', 'G', 'T']
pseudoValue = 10
gcContent = 0.386
gContent = cContent = gcContent / 2
aContent = tContent = (1 - gcContent) / 2
expContent = [aContent, cContent, gContent, tContent]
freqMatrix = (count + pseudoValue) / (100 + pseudoValue)
PWMlist = []
for pos in freqMatrix.tolist():
    modPos = []
    for idx, freq in enumerate(pos):
        modFreq = np.log(freq/expContent[idx])
        modPos.append(modFreq)
    PWMlist.append(modPos)
PWMtr = np.matrix(PWMlist).transpose().tolist()
PWMdf = pd.DataFrame(data=PWMtr,
                    index=rowNames,
                    columns=colNames)
PWMdf.to_csv('output.csv')