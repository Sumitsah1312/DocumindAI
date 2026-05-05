# import google.generativeai as genai
from src.core.config import GEMINI_API_KEY
from openai import OpenAI
from ollama import Client


# In case we use search 
# def build_context(docs):
#     """
#     docs: List[Document] from similarity_search
#     """
#     # keep it simple: join top chunks
#     return "\n\n".join([d.page_content for d in docs])


def generate_answers(query:str,docs):
    context="\n\n\n".join([f"Page Content: {result.page_content}\nPageNumber: {result.metadata['page_label']}\nFile location : {result.metadata['source']}" for result in docs])
    SYSTEM_PROMPT=f"""
    You are a helpful AI Assistant who answered user query based on the available context retrieved from pdf file along with page content and page number.
    You should only answer the user based on following context and navigate the userto open the right page number to know more.
    If answer is not in context Say I don't know answer based on document or document have no context about it.
    Context:
    {context}
    """
    
    
    # openai_client=OpenAI(
    #     api_key=GEMINI_API_KEY,
    #      base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    # )
    
    client =Client()
    response=client.chat(model="gemma:2b",messages=[
        {"role":"system","content":SYSTEM_PROMPT},
            { "role":"user","content":query}
    ])
    return response.message.content

    # response=openai_client.chat.completions.create(
    #     model="gemini-2.5-flash",
    #     messages=[
    #         {"role":"system","content":SYSTEM_PROMPT},
    #         { "role":"user","content":query}
    #     ]
    # )
    # return response.choices[0].message.content
