from konlpy.tag import Kkma
import sys
import json
import os
import pandas as pd
import re

kkma = Kkma()
os.environ["JAVA_HOME"] = "/Library/Java/JavaVirtualMachines/jdk-1.8.jdk"

excel_file_path = '빈도자료.xls'

input_json = sys.argv[1]
input_array = json.loads(input_json)
result = [kkma.morphs(word) for word in input_array]

# 모든 시트를 담을 딕셔너리
dfs = pd.read_excel(excel_file_path, sheet_name=None)

# 결과를 저장할 3차원 배열
final_result = []

# 결과 분석
for words_list in result:
    frequency_list = []
    for word in words_list:
        # 항목에서 숫자와 특수문자 제거
        cleaned_word = re.sub('[^가-힣]', '', word)
        # 초기값을 -1로 설정
        word_frequency = -1  
        best_match_frequency = 0

        for sheet_name, df in dfs.items():
            # 모든 시트에서 cleaned_word 찾기
            matching_items = df[df['항목'].apply(lambda x: re.sub('[^가-힣]', '', x)).str.contains(cleaned_word)]
            if not matching_items.empty:
                # cleaned_word가 일치하는 경우 빈도와 항목의 갯수를 가져와 업데이트
                total_frequency = matching_items['빈도'].sum()  # 항목별 빈도를 합산
                total_items = len(matching_items)  # 항목의 갯수 업데이트

                # 빈도가 1이면서 겹치는 항목이 여러 개인 경우 무시
                if total_frequency == 1 and total_items > 1:
                    continue

                # 빈도가 더 크거나 겹치는 항목이 없었던 경우 업데이트
                if total_frequency > best_match_frequency or best_match_frequency == 0:
                    word_frequency = total_frequency / total_items  # 평균 빈도 계산
                    best_match_frequency = total_frequency

        frequency_list.append([word, word_frequency])

    final_result.append(frequency_list)

print(final_result)