from crewai import Agent, Task, Crew, Process
from langchain.tools import tool

@tool
def get_seller_performance(seller_id):
    """احصل على أداء البائع"""
    return {"sales": 150, "rating": 4.5}

class SellerAnalystAgent:
    def __init__(self):
        self.analyst = Agent(
            role='محلل أداء البائعين',
            goal='تحسين أداء البائعين وزيادة المبيعات',
            backstory='خبير في تحليل بيانات التجارة الإلكترونية',
            tools=[get_seller_performance],
            verbose=True
        )
    
    def analyze_seller(self, seller_id):
        task = Task(
            description=f'حلل أداء البائع {seller_id} وقدم توصيات',
            agent=self.analyst
        )
        crew = Crew(
            agents=[self.analyst],
            tasks=[task],
            process=Process.sequential
        )
        return crew.kickoff()
