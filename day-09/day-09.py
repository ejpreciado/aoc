from pprint import pprint
from itertools import accumulate
from operator import mul

sample = """2199943210
3987894921
9856789892
8767896789
9899965678"""


def isLowPoint(heightmap: 'list[list[int]]', x: int, y: int) -> 'bool':
    offsets = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    point = heightmap[x][y]
    if point == 9:
        return False
    if point == 0:
        return True

    # upper edge, no neg x
    if x == 0:
        offsets = [(0, 1), (0, -1), (1, 0)]
    # lower edge, no pos x
    if x == len(heightmap)-1:
        offsets = [(0, 1), (0, -1), (-1, 0)]
    # left edge, no neg y
    if y == 0:
        offsets = [(0, 1), (1, 0), (-1, 0)]
    # right edge, no pos y
    if y == len(heightmap[0])-1:
        offsets = [(0, -1), (1, 0), (-1, 0)]
    # top left, no neg x/y
    if x == 0 and y == 0:
        offsets = [(0, 1), (1, 0)]
    # top right no neg x and no pos y
    if x == 0 and y == len(heightmap[0])-1:
        offsets = [(0, -1), (1, 0)]
    # bottom left no pos x and no neg y
    if x == len(heightmap)-1 and y == 0:
        offsets = [(0, 1), (-1, 0)]
    # bottom right, no pos x/y
    if x == len(heightmap)-1 and y == len(heightmap[0])-1:
        offsets = [(0, -1), (-1, 0)]

    to_check = map(lambda t: heightmap[x+t[0]][y+t[1]], offsets)
    checked = map(lambda a: point <= a, to_check)
    return all(checked)


def basinSize(heightmap: 'list[list[int]]', x: int, y: int) -> int:
    size = 0
    queue = [(x, y)]
    visited = []
    while len(queue) > 0:
        offsets = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        # upper edge, no neg x
        if x == 0:
            offsets = [(0, 1), (0, -1), (1, 0)]
        # lower edge, no pos x
        if x == len(heightmap)-1:
            offsets = [(0, 1), (0, -1), (-1, 0)]
        # left edge, no neg y
        if y == 0:
            offsets = [(0, 1), (1, 0), (-1, 0)]
        # right edge, no pos y
        if y == len(heightmap[0])-1:
            offsets = [(0, -1), (1, 0), (-1, 0)]
        # top left, no neg x/y
        if x == 0 and y == 0:
            offsets = [(0, 1), (1, 0)]
        # top right no neg x and no pos y
        if x == 0 and y == len(heightmap[0])-1:
            offsets = [(0, -1), (1, 0)]
        # bottom left no pos x and no neg y
        if x == len(heightmap)-1 and y == 0:
            offsets = [(0, 1), (-1, 0)]
        # bottom right, no pos x/y
        if x == len(heightmap)-1 and y == len(heightmap[0])-1:
            offsets = [(0, -1), (-1, 0)]
        point = queue.pop(0)
        visited.append(point)
        # print(point)
        size += 1
        for (o_x, o_y) in offsets:
            offset_point = (point[0]+o_x, point[1]+o_y)
            if offset_point not in visited and offset_point[0] < len(heightmap) and offset_point[1] < len(heightmap[0]) and offset_point[0] >= 0 and offset_point[1] >= 0:
                # print((o_x, o_y), offset_point)
                if heightmap[offset_point[0]][offset_point[1]] < 9 and offset_point not in queue:
                    queue.append(offset_point)
    # print()
    return size


def parseInput(inp: str) -> 'list[list[int]]':
    highest = 10
    return [[int(e) for e in row] for row in map(list, inp.split())]


with open("input.txt") as input_data:
    # data = sample
    data = input_data.read()
    heightmap = parseInput(data)
    rowcount = len(data.split())
    colcount = len(data.split()[0])
    # pprint(heightmap)

    # low_points_heights = [heightmap[i][j] for i in range(0, rowcount)
    #                       for j in range(0, colcount) if isLowPoint(heightmap, i, j)]
    # risks = list(map(lambda p: p+1, low_points_heights))
    # print(low_points_heights)
    # print(risks)
    # print(sum(risks))

    low_points_locations = [(i, j) for i in range(0, rowcount)
                            for j in range(0, colcount) if isLowPoint(heightmap, i, j)]
    pprint(low_points_locations)
    low_basin_sizes = list(map(lambda t: basinSize(heightmap, *t), low_points_locations))
    pprint(low_basin_sizes)
    three_largest = sorted(low_basin_sizes, reverse=True)[:3]
    pprint(three_largest)
    product = list(accumulate(three_largest, mul, initial=1))
    pprint(product[-1])