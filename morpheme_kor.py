from konlpy.tag import Kkma
import sys
import json

kkma = Kkma()

input_json = sys.argv[1]
input_array = json.loads(input_json)
content = ' '.join(input_array)
result = kkma.morphs(content)

print(result)