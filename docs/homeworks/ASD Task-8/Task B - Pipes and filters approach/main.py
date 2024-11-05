class Queen:
  def __init__(self, row, col):
    self.row = row
    self.col = col

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
  
  def deriveWithNewQueen(self, q):
    cellsCp = AvailableCells.copy(self)

    i = 0
    while i < len(cellsCp.list):
      curIt = cellsCp.list[i]
      if curIt[0] == q.row or curIt[1] == q.col or (q.row - curIt[0] == q.col - curIt[1]):
        del cellsCp.list[i]
      else:
        i += 1

    return cellsCp

class SolutionNode:
  def __init__(self, q, available):
    self.q = q
    self.available = available.deriveWithNewQueen(q)
    self.children = []

  def build(self):
    for it in self.available.list:
      self.children.append(SolutionNode(Queen(it[0], it[1]), self.available))
      self.children[-1].build()

  def traverse(self, trace):
    if len(self.available.list) == 0 and len(trace) < 8:
      return
    
    if len(trace) < 8:
      for ch in self.children:
        ch.traverse(trace + [self.q])
    
    if len(self.available.list) == 0:
      print(trace)


def traverse(curRow = 0):
  base = AvailableCells()
  base.fill()
  nodes = []

  for i in range(0, 8):
    nodes.append(SolutionNode(Queen(curRow, i), base))
    nodes[-1].build()
    print(f"Subtree for first queen in {curRow} {i} built")
    nodes[-1].traverse([])

print("Possible solutions:")
traverse()
