import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class GeminiService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_product_description(self, product_info):
        prompt = f"اكتب وصفًا تسويقيًا جذابًا لهذا المنتج بالعربية: {product_info}"
        response = self.model.generate_content(prompt)
        return response.text
    
    async def analyze_sentiment(self, reviews):
        prompt = f"حلل آراء العملاء هذه وأعط تقييمًا من 5: {reviews}"
        response = self.model.generate_content(prompt)
        return response.text
