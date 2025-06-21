from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Any
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
import torch

app = FastAPI(title="Question Answering API")

# ======= Load Model =======
MODEL_PATH = "DatTran0509/Finetune_XLM_R_large_QA"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForQuestionAnswering.from_pretrained(MODEL_PATH)
model.eval()

# ======= Request Schema =======
class QARequest(BaseModel):
    context: Any
    question: Any

# ======= Get Answer =======
def get_answer(question: str, context: str, max_length=384, stride=128) -> str | None:
    inputs = tokenizer(
        question,
        context,
        return_tensors="pt",
        truncation="only_second",
        max_length=max_length,
        stride=stride,
        return_overflowing_tokens=True,
        return_offsets_mapping=True,
        padding="max_length"
    )

    offset_mappings = inputs.pop("offset_mapping")
    input_ids = inputs["input_ids"]
    attention_mask = inputs["attention_mask"]

    best_answer = ""
    best_score = float("-inf")

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        start_logits = outputs.start_logits
        end_logits = outputs.end_logits 

    for i in range(len(start_logits)):
        start_idx = torch.argmax(start_logits[i])
        end_idx = torch.argmax(end_logits[i]) + 1

        if end_idx <= start_idx or end_idx >= len(offset_mappings[i]):
            continue

        offsets = offset_mappings[i]

        if offsets[start_idx] is None or offsets[end_idx - 1] is None:
            continue

        try:
            start_char = offsets[start_idx][0].item()
            end_char = offsets[end_idx - 1][1].item()
            answer = context[start_char:end_char].strip()
            score = start_logits[i][start_idx] + end_logits[i][end_idx - 1]
        except:
            continue

        if answer and score > best_score:
            best_answer = answer
            best_score = score

    return best_answer if best_answer else None

# ======= API Endpoint =======
@app.post("/answer")
def answer_question(data: QARequest):
    question = data.question
    context = data.context

    if not question or not context:
        raise HTTPException(status_code=400, detail="⚠️ Vui lòng nhập đầy đủ context và question.")

    answer = get_answer(question, context)
    if answer is None:
        return {
            "question": question,
            "answer": "⚠️ Câu hỏi không nằm trong đoạn văn đã cho."
        }

    return {"question": question, "answer": answer}