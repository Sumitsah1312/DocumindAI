# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from src.core.config import GEMINI_API_KEY

# embedding_model=GoogleGenerativeAIEmbeddings(
#     model="embedding-001",
#     google_api_key=GEMINI_API_KEY
# )

# from google import genai
# from src.core.config import GEMINI_API_KEY

# client = genai.Client(api_key=GEMINI_API_KEY)

# def embed_texts(texts: list[str]):
#     response = client.models.embed_content(
#         model="text-embedding-004",
#         contents=texts
#     )
#     return [e.values for e in response.embeddings]


# def embed_query(text: str):
#     return embed_texts([text])[0]

from langchain_ollama import OllamaEmbeddings

embedding_model = OllamaEmbeddings(
    model="nomic-embed-text"
)