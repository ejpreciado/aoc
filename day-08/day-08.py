import itertools

test_input = """be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"""

with open('input.txt') as inF:
    input = [[i.split() for i in line.split(' | ')] for line in inF]

# input = [[i.split() for i in line.split(' | ')] for line in test_input.split('\n')]

def ordered(*opts):
    s = sorted(opts)
    return ''.join(s)

def sort_string(s):
    return ''.join(sorted(s))

def part2(input):
    out = 0
    for x, y in input:
        key_set = set([sort_string(s) for s in x + y])
        for s in itertools.permutations([chr(i + ord('a')) for i in range(7)]):
            a, b, c, d, e, f, g = s
            options = {
                ordered(a, b, c, e, f, g): 0,
                ordered(c, f): 1,
                ordered(a, c, d, e, g): 2,
                ordered(a, c, d, f, g): 3,
                ordered(b, c, d, f): 4,
                ordered(a, b, d, f, g): 5,
                ordered(a, b, d, e, f, g): 6,
                ordered(a, c, f): 7,
                ordered(a, b, c, d, e, f, g): 8,
                ordered(a, b, c, d, f, g): 9 }
            
            if key_set.issubset(options.keys()):
                n = 0
                for val in [sort_string(s) for s in y]:
                    n *= 10
                    n += options[val]
                out += n
                break
    return out


part2(input)