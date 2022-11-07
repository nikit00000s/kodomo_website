count_lines=$(cat input.txt | wc -l)
echo $count_lines
filename='input.txt'
n=1
while read line; do
echo $line

IFS=' ' read -r -a array <<< "$line"

seqret "sw:${array[0]}" "${array[0]}.fasta" -auto

seqret "sw:${array[1]}" "${array[1]}.fasta" -auto

needle "${array[0]}.fasta" "${array[1]}.fasta" -out "${array[0]}_${array[1]}.needle" -auto

n=$((n+1))
done < $filename
