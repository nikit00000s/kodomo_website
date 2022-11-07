"""Obtains name of dinucleotide with maximal absolute deviation of observed frequency from expected frequency in given sequence."""
from argparse import ArgumentParser
from os import system
from subprocess import check_output
parser = ArgumentParser(description="Obtains name of dinucleotide with maximal absolute deviation of observed frequency from expected frequency in given sequence.")
parser.add_argument("sequence", help="input sequence in USA format")
args = parser.parse_args()
log = [s.split('\t') for s in check_output("compseq %s -word 2 -calcfreq -stdout -auto" % args.sequence, shell=True).splitlines() if s and s[0] != '#'][2:-1]
delta = [abs(float(l[3]) - float(l[4])) for l in log]
maximal = delta.index(max(delta))
print("Dinucl.\tObs. frequency\tExp. frequency\tAbs. deviation")
print("%s\t%s\t%s\t%s" % (log[maximal][0], log[maximal][3], log[maximal][4], delta[maximal]))

