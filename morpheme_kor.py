from konlpy.tag import Kkma
import sys
import os
import json

kkma = Kkma()
os.environ["JAVA_HOME"] = "/Library/Java/JavaVirtualMachines/jdk-1.8.jdk"

#input_json = sys.argv[1]
#input_array = json.loads(input_json)
input_array = ["쓰였다."]
content = ' '.join(input_array)
result = kkma.morphs(content)

print(result)