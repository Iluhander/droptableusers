from reactivex.subject import Subject

class QueenChessBoard:
    def __init__(self):
        self.size = 8
        self.queens = [-1] * self.size
        self.placement_stream = Subject()
        self.removal_stream = Subject()

    def is_safe(self, row, col):
        for r in range(row):
            c = self.queens[r]
            if c == col or abs(c - col) == abs(r - row):
                return False
        return True

    def place_queen(self, row, col):
        self.queens[row] = col
        self.placement_stream.on_next((row, col))

    def remove_queen(self, row):
        self.queens[row] = -1
        self.removal_stream.on_next(row)

    def display_board(self):
        board = [['.' for _ in range(self.size)] for _ in range(self.size)]
        for r in range(self.size):
            if self.queens[r] != -1:
                board[r][self.queens[r]] = 'Q'
        return "\n".join(" ".join(row) for row in board) + "\n"


class QueenLogic:
    def __init__(self, chess_board):
        self.chess_board = chess_board

    def solve(self):
        row = 0
        while row >= 0:
            col = self.chess_board.queens[row] + 1
            placed = False

            while col < self.chess_board.size:
                if self.chess_board.is_safe(row, col):
                    self.chess_board.place_queen(row, col)
                    placed = True
                    break
                col += 1

            if placed:
                if row == self.chess_board.size - 1:
                    self.chess_board.remove_queen(row)
                    row -= 1
                else:
                    row += 1
            else:
                self.chess_board.remove_queen(row)
                row -= 1


class QueenLogicValidator:
    def __init__(self, chess_board):
        self.chess_board = chess_board
        self.chess_board.placement_stream.subscribe(self.check_all_placed)
        self.solution_count = 0

    def check_all_placed(self, position):
        if all(col != -1 for col in self.chess_board.queens):
            self.solution_count += 1
            solution = self.chess_board.display_board()
            with open("solutions.txt", "a") as f:
                f.write(f"Solution #{self.solution_count}:\n{solution}\n")


class ChessBoardLogger:
    def __init__(self, chess_board):
        chess_board.placement_stream.subscribe(self.log_placement)
        chess_board.removal_stream.subscribe(self.log_removal)

    def log_placement(self, position):
        with open("log.txt", "a") as f:
            f.write(f"Queen placed at ({position})\n")

    def log_removal(self, position):
        with open("log.txt", "a") as f:
            f.write(f"Queen removed from row ({position})\n")


# Initialize chessboard, logic, and validator
chess_board = QueenChessBoard()
chess_board_logger = ChessBoardLogger(chess_board)
queen_logic_validator = QueenLogicValidator(chess_board)
queen_logic = QueenLogic(chess_board)
queen_logic.solve()

print("Check created files: log.txt and solutions.txt!")