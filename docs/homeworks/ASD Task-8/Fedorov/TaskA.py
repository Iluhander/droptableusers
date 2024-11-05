class LineStorage:
    def __init__(self):
        self.lines = []

    def add_line(self, line):
        self.lines.append(line.split())


class Input:
    def __init__(self, line_storage):
        self.line_storage = line_storage

    def read_lines(self, lines):
        for line in lines:
            self.line_storage.add_line(line)


class CircularShifter:
    def __init__(self, line_storage):
        self.line_storage = line_storage
        self.shifts = []

    def setup(self):
        for line in self.line_storage.lines:
            for word in range(len(line)):
                shifted_line = line[word:] + line[:word]
                self.shifts.append(shifted_line)


class Alphabetizer:
    def __init__(self, circular_shifter):
        self.circular_shifter = circular_shifter
        self.alphabetized_shifts = []

    def alph(self):
        self.alphabetized_shifts = sorted(self.circular_shifter.shifts, key=lambda x: ' '.join(x).lower())


class Output:
    def __init__(self, alphabetizer):
        self.alphabetizer = alphabetizer

    def get_result(self):
        result = []
        for line in self.alphabetizer.alphabetized_shifts:
            result.append(" ".join(line))
        return result


class MasterControl:
    def __init__(self):
        self.line_storage = LineStorage()
        self.input_module = Input(self.line_storage)
        self.circular_shifter = CircularShifter(self.line_storage)
        self.alphabetizer = Alphabetizer(self.circular_shifter)
        self.output_module = Output(self.alphabetizer)

    def run(self, lines):
        self.input_module.read_lines(lines)
        self.circular_shifter.setup()
        self.alphabetizer.alph()
        return self.output_module.get_result()

lines = [
    "KWIC is an acronym for Key Word In Context, the most common format for concordance lines",
    "the free encyclopedia"
]
kwic_system = MasterControl()
result = kwic_system.run(lines)
for line in result:
    print(line)
