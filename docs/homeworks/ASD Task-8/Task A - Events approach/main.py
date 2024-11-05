import threading

# Each unique word is a subscriber, listening for events in a dedicated thread.
class Word:
  def __init__(self, content, eventsContainer):
    self.content = content
    self.occurrences = []
    self.eventsContainer = eventsContainer

    self.thread = threading.Thread(target=self.subscribe)
    self.thread.start()

  def subscribe(self):
    lastReceived = 0

    while True:
      if len(self.eventsContainer) > lastReceived:
        if isinstance(self.eventsContainer[lastReceived], StopEvent):
          break;
        
        if isinstance(self.eventsContainer[lastReceived], WordEvent):
          sentence = self.eventsContainer[lastReceived].content
          idx = sentence.lower().find(self.content)

          if idx >= 0:
            self.occurrences.append((idx, sentence))

        lastReceived += 1

  def listOccurences(self, width):
    padding = max((width - len(self.content)) // 2, 0)

    res = []
    for s in self.occurrences:
      idx = s[0]
      leftPart = s[1][idx - padding:idx]
      rightPart = s[1][idx + len(self.content): idx + len(self.content) + padding]

      res.append(f"...{leftPart}{self.content.upper()}{rightPart}...")

    return res
  
  def getThread(self):
    return self.thread
  
# An event for word appearance.
class WordEvent:
  def __init__(self, content):
    self.content = content

# An event for finishing the process.
class StopEvent:
  def __init__(self):
    pass

# The main application's class, responsible for dispatching events and managing subscribers.
class Concordance:
  def __init__(self):
    self.subscribers = dict()
    self.items = set()

    self.events = []

  def dispatch(self, sentence):
    words = list(map(lambda s:s.lower(), sentence.split()))

    for word in words:
      if word not in self.subscribers:
        self.subscribers[word] = Word(word, self.events)
        self.items.add(word)
    
    self.events.append(WordEvent(sentence))

  def list(self, width = 10):
    res = []
    
    ordered = sorted(self.items)
    for s in ordered:
      res = res + self.subscribers[s].listOccurences(width)

    return res
  
  def stop(self):
    self.events.append(StopEvent())
    for s in self.subscribers.values():
      s.getThread().join()

c = Concordance()

print("Write sentences line by line. To stop the program write and empty line.")

lastSentence = " "
while lastSentence:
  lastSentence = input()
  c.dispatch(lastSentence)

res = c.list(10)

print("RESULT:")
for s in res:
  print(s)

c.stop()

# Test sample:
# Hello world
# I have said hello
# Now I am about to say goodbye to the world
# Goodbye world
