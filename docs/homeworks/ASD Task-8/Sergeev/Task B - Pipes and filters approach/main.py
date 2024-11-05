class Queen:
  def __init__(self, row, col):
    self.row = row
    self.col = col

# Subset of available cells
class AvailableCells:
  def __init__(self):
    self.list = []

  def fill(self):
    for row in range(0, 8):
      for col in range(0, 8):
        self.list.append((row, col))

  def copy(target):
    a = AvailableCells()
    for it in target.list:
      a.list.append((it[0], it[1]))

    return a
  
  # Retrieves a subset of available cells for a new queen from a previous set of available cells
  def deriveWithNewQueen(self, q):
    cellsCp = AvailableCells.copy(self)

    i = 0
    while i < len(cellsCp.list):
      curIt = cellsCp.list[i]
      if curIt[0] == q.row or curIt[1] == q.col or (q.row - curIt[0] == q.col - curIt[1]) or (q.row - curIt[0] == curIt[1] - q.col):
        del cellsCp.list[i]
      else:
        i += 1

    return cellsCp

# A node in the solutions tree.
class SolutionNode:
  def __init__(self, q, available):
    self.q = q
    self.available = available.deriveWithNewQueen(q)
    self.children = []

  def build(self):
    prevRow = -1
    for it in self.available.list:
      if prevRow >= 0 and it[0] > prevRow:
        break
      prevRow = it[0]

      self.children.append(SolutionNode(Queen(it[0], it[1]), self.available))
      self.children[-1].build()

  def traverse(self, trace, log):
    if len(self.available.list) == 0 and len(trace) < 7:
      return
    
    if len(trace) < 7:
      for ch in self.children:
        ch.traverse(trace + [self.q], log)
    
    if len(self.available.list) == 0:
      log(list(map(lambda it: (it.row, it.col), trace + [self.q])))


def traverse(curRow = 0):
  base = AvailableCells()
  base.fill()
  nodes = []

  for i in range(0, 8):
    log = lambda arr: print(arr)

    nodes.append(SolutionNode(Queen(curRow, i), base))
    nodes[-1].build()
    nodes[-1].traverse([], log)

print("Possible solutions:")
traverse()
