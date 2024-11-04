# This is a solution to the problem B (I used Method 1: Abstract Data Types (ADTs)).

# Represents an 8×8 board and manages Queen placements.
class ChessBoard:
    def __init__(self, size=8):
        self.size = size
        # Initialize board with no Queens placed.
        self.board = [-1] * size

    def place_queen(self, row, column):
        self.board[row] = column

    def remove_queen(self, row):
        self.board[row] = -1

    # Checks if the placement is safe.
    def is_safe(self, row, col):
        for r in range(row):
            c = self.board[r]
            # Same column or diagonal.
            if c == col or abs(c - col) == abs(row - r):
                return False
        return True

    # Returns a copy of the board state.
    def get_solution(self):
        return self.board[:]


# Controls the backtracking algorithm to solve the puzzle.
class QueenSolver:
    def __init__(self, size=8):
        self.size = size
        self.board = ChessBoard(size)
        self.solutions = Solution()

    # Method to run the algorithm.
    def solve(self):
        self._place_queens(0)
        return self.solutions.get_solutions()

    # Places Queens row by row, using ChessBoard.is_safe method to check if each position is safe.
    def _place_queens(self, row):
        if row == self.size:
            self.solutions.add_solution(self.board.get_solution())
            return
        for col in range(self.size):
            if self.board.is_safe(row, col):
                self.board.place_queen(row, col)
                self._place_queens(row + 1)
                self.board.remove_queen(row)


# Stores solutions and also formats the results for display.
class Solution:
    def __init__(self):
        self.solutions = []

    def add_solution(self, solution):
        self.solutions.append(solution)

    def get_solutions(self):
        return self.solutions


# -----------------------------------------------------------------------------
# Sample execution:
solver = QueenSolver()
solutions = solver.solve()
print(f"Number of found solutions: {len(solutions)}")
for i, solution in enumerate(solutions, start=1):
    print(f"Solution №{i}: {solution}")
# Each index in the list represents a row (0-7) on the board.
# Each value at an index represents a column (0-7) where a Queen is placed in the row.
