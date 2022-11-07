#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Obtains name of dinucleotide with maximal absolute deviation of observed frequency from expected frequency in given sequence."""

from argparse import ArgumentParser
from os import stat
from subprocess import check_output

parser = ArgumentParser(description=__import__(__name__).__doc__)
parser.add_argument("sequence", help="input sequence in USA format")
parser.add_argument("-v", "--verbose", action="store_true", help="write data headers in output")
parser.add_argument("-s", "--short", action="store_false", help="write only the name of dinucleotide with maximal deviation and it's value")
args = parser.parse_args()

compseq_initial = check_output("compseq %s -word 2 -calcfreq -stdout -auto" % args.sequence, shell=True)
compseq_lines = compseq_initial.decode("utf-8").splitlines()
compseq_nonempty = list(filter(None, compseq_lines))
compseq_needed = list(filter(lambda x : x[0] != '#', compseq_nonempty))[2:-1]
compseq_splitted = [line.split('\t') for line in compseq_needed]

dinucl_i = 0
max_abs_diff = 0.0
for line_num, line in enumerate(compseq_splitted):
    abs_diff = abs(float(line[3]) - float(line[4]))
    if abs_diff - max_abs_diff > 0.0:
        dinucl_i = line_num
        max_abs_diff = abs_diff

result_headers = "Dinucl.\tAbs. deviation" + "\tObs. frequency\tExp. frequency" * int(args.short) + '\n'
addition = ('\t' + str(compseq_splitted[dinucl_i][3]) + '\t' + str(compseq_splitted[dinucl_i][4])) * int(args.short)
result = compseq_splitted[dinucl_i][0] + '\t' + str(max_abs_diff) + addition
print(result_headers * int(args.verbose) + result)
