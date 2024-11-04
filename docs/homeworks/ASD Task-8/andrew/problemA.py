# This is a solution to the problem A (I used Method 3: Pipes-and-Filters).

# Reads and stores lines.
def input_filter(lines):
    return lines


# Generates circular shifts for each line.
def circular_shift_filter(lines):
    shifts = []
    for line in lines:
        words = line.split()
        for i in range(len(words)):
            shifts.append(" ".join(words[i:] + words[:i]))
    return shifts


# Sorts the circular shifts alphabetically.
def alphabet_filter(shifts):
    return sorted(shifts)


# Prints the sorted shifts.
def output_filter(sorted_shifts):
    for shift in sorted_shifts:
        print(shift)


# Main function to run filters.
def kwic_pipeline(lines):
    lines = input_filter(lines)
    shifts = circular_shift_filter(lines)
    sorted_shifts = alphabet_filter(shifts)
    output_filter(sorted_shifts)


# -----------------------------------------------------------------------------
# Sample execution:
lines = ["the quick brown fox", "jumps over the lazy dog"]
kwic_pipeline(lines)
