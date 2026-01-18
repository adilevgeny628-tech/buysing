"""
Full Example - 完整示例
演示多智能体系统的完整功能
"""

import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class SimpleAgent:
    """简化的Agent类"""
    
    def __init__(self, agent_id, name, role):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.status = "ready"
        self.performance_metrics = {
            "tasks_completed": 0,
            "tasks_failed": 0,
            "avg_response_time": 0,
            "success_rate": 1.0
        }
        self.memory = {}
    
    async def process(self, task):
        """处理任务"""
        self.status = "busy"
        task_type = task.get("task_type")
        
        result = await self._execute_task(task_type, task.get("parameters", {}))
        
        self.status = "ready"
        return result
    
    async def _execute_task(self, task_type, parameters):
        """执行具体任务"""
        await asyncio.sleep(0.1)
        
        if task_type == "trend_analysis":
            return {
                "status": "success",
                "data": {
                    "trending_colors": ["beige", "olive_green", "terracotta", "navy_blue"],
                    "trending_materials": ["sustainable_fabric", "recycled_materials", "organic_cotton"],
                    "trending_styles": ["minimalist", "athleisure", "vintage_revival"],
                    "insights": [
                        "Sustainable fashion continues to grow in popularity",
                        "Consumers prefer versatile, multi-purpose items",
                        "Neutral colors dominate current market"
                    ]
                }
            }
        
        elif task_type == "content_generation":
            return {
                "status": "success",
                "data": {
                    "headline": "Sustainable Style Meets Everyday Comfort",
                    "subheadline": "Discover our eco-friendly collection designed for modern living",
                    "body": "Crafted from recycled materials, our products combine style with sustainability. Perfect for conscious consumers who don't want to compromise on quality or design.",
                    "hashtags": ["#SustainableFashion", "#EcoFriendly", "#StyleWithPurpose"],
                    "cta": "Shop Collection Now"
                }
            }
        
        elif task_type == "inventory_check":
            return {
                "status": "success",
                "data": {
                    "total_stock": 150,
                    "available_stock": 120,
                    "reserved_stock": 30,
                    "in_transit": 50,
                    "low_stock_alert": False,
                    "reorder_needed": False
                }
            }
        
        elif task_type == "message_response":
            return {
                "status": "success",
                "data": {
                    "sentiment": "negative",
                    "response": "I'm truly sorry to hear about your experience. I understand how frustrating this must be. Let me help you resolve this issue right away.",
                    "suggested_actions": ["offer_discount", "escalate_to_human"],
                    "follow_up_needed": True
                }
            }
        
        elif task_type == "policy_check":
            return {
                "status": "success",
                "data": {
                    "compliance_status": "compliant",
                    "violations": [],
                    "warnings": [],
                    "recommendations": ["Content is fully compliant"]
                }
            }
        
        return {"status": "error", "message": f"Unknown task type: {task_type}"}
    
    def get_status(self):
        """获取状态"""
        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "role": self.role,
            "status": self.status,
            "performance_metrics": self.performance_metrics
        }


class SimpleOrchestrator:
    """简化的Orchestrator"""
    
    def __init__(self):
        self.agents = {}
        self.tasks = []
        self.execution_history = []
        self.is_running = False
    
    def register_agent(self, agent):
        """注册Agent"""
        self.agents[agent.agent_id] = agent
        print(f"✓ Registered agent: {agent.name} ({agent.role})")
    
    async def execute_task(self, agent_id, task):
        """执行任务"""
        if agent_id in self.agents:
            agent = self.agents[agent_id]
            result = await agent.process(task)
            self.execution_history.append({
                "task_id": task.get("task_id"),
                "agent_id": agent_id,
                "status": "completed"
            })
            return result
        return {"status": "error", "message": "Agent not found"}
    
    def get_system_status(self):
        """获取系统状态"""
        return {
            "is_running": self.is_running,
            "agents_count": len(self.agents),
            "execution_history_count": len(self.execution_history),
            "agents": {aid: agent.get_status() for aid, agent in self.agents.items()}
        }


async def main():
    """主函数"""
    print("\n" + "=" * 70)
    print("BuysingAgent - Multi-Agent Cross-Border E-commerce AGI System")
    print("Full Example - Complete Demonstration")
    print("=" * 70 + "\n")
    
    # 1. 创建Orchestrator
    print("🎯 Creating Orchestrator...")
    orchestrator = SimpleOrchestrator()
    print("✓ Orchestrator created\n")
    
    # 2. 注册Agent
    print("🤖 Registering Agents...")
    agents = [
        SimpleAgent("product_selection", "Product Selection Agent", "智能选品与研发"),
        SimpleAgent("marketing", "Marketing Agent", "营销与内容"),
        SimpleAgent("logistics", "Logistics Agent", "物流与供应链"),
        SimpleAgent("customer_service", "Customer Service Agent", "客户服务"),
        SimpleAgent("compliance", "Compliance Agent", "合规与风险")
    ]
    
    for agent in agents:
        orchestrator.register_agent(agent)
    
    print(f"✓ Registered {len(agents)} agents\n")
    
    # 3. 示例1: 趋势分析
    print("=" * 70)
    print("📊 Example 1: Trend Analysis")
    print("=" * 70 + "\n")
    
    trend_result = await orchestrator.execute_task("product_selection", {
        "task_id": "task_001",
        "task_type": "trend_analysis",
        "parameters": {
            "region": "US",
            "timeframe": "30d"
        }
    })
    
    print(f"Status: {trend_result['status']}")
    if trend_result['status'] == 'success':
        data = trend_result['data']
        print(f"\n📈 Trending Colors: {', '.join(data['trending_colors'])}")
        print(f"🧵 Trending Materials: {', '.join(data['trending_materials'])}")
        print(f"👗 Trending Styles: {', '.join(data['trending_styles'])}")
        print(f"\n💡 Key Insights:")
        for insight in data['insights']:
            print(f"   • {insight}")
    print()
    
    # 4. 示例2: 内容生成
    print("=" * 70)
    print("🎨 Example 2: Content Generation")
    print("=" * 70 + "\n")
    
    content_result = await orchestrator.execute_task("marketing", {
        "task_id": "task_002",
        "task_type": "content_generation",
        "parameters": {
            "product": {
                "id": "prod_001",
                "name": "Eco-Friendly Running Shoes",
                "category": "footwear"
            },
            "market": "US",
            "content_type": "all"
        }
    })
    
    print(f"Status: {content_result['status']}")
    if content_result['status'] == 'success':
        data = content_result['data']
        print(f"\n📝 Headline: {data['headline']}")
        print(f"📄 Subheadline: {data['subheadline']}")
        print(f"\n📖 Body: {data['body']}")
        print(f"\n🏷️  Hashtags: {', '.join(data['hashtags'])}")
        print(f"🔗 CTA: {data['cta']}")
    print()
    
    # 5. 示例3: 库存检查
    print("=" * 70)
    print("📦 Example 3: Inventory Check")
    print("=" * 70 + "\n")
    
    inventory_result = await orchestrator.execute_task("logistics", {
        "task_id": "task_003",
        "task_type": "inventory_check",
        "parameters": {
            "product_id": "prod_001"
        }
    })
    
    print(f"Status: {inventory_result['status']}")
    if inventory_result['status'] == 'success':
        data = inventory_result['data']
        print(f"\n📊 Total Stock: {data['total_stock']}")
        print(f"✅ Available Stock: {data['available_stock']}")
        print(f"🔒 Reserved Stock: {data['reserved_stock']}")
        print(f"🚚 In Transit: {data['in_transit']}")
        print(f"\n⚠️  Low Stock Alert: {data['low_stock_alert']}")
        print(f"🔄 Reorder Needed: {data['reorder_needed']}")
    print()
    
    # 6. 示例4: 客服回复
    print("=" * 70)
    print("💬 Example 4: Customer Service Response")
    print("=" * 70 + "\n")
    
    service_result = await orchestrator.execute_task("customer_service", {
        "task_id": "task_004",
        "task_type": "message_response",
        "parameters": {
            "customer_id": "cust_001",
            "message": "I received my order but package was damaged",
            "language": "en",
            "platform": "email"
        }
    })
    
    print(f"Status: {service_result['status']}")
    if service_result['status'] == 'success':
        data = service_result['data']
        print(f"\n😊 Sentiment: {data['sentiment']}")
        print(f"\n💬 Response: {data['response']}")
        print(f"\n📋 Suggested Actions: {', '.join(data['suggested_actions'])}")
        print(f"📞 Follow-up Needed: {data['follow_up_needed']}")
    print()
    
    # 7. 示例5: 合规检查
    print("=" * 70)
    print("✅ Example 5: Compliance Check")
    print("=" * 70 + "\n")
    
    compliance_result = await orchestrator.execute_task("compliance", {
        "task_id": "task_005",
        "task_type": "policy_check",
        "parameters": {
            "platform": "amazon",
            "market": "US",
            "content": {
                "type": "product_listing",
                "title": "Eco-Friendly Running Shoes"
            }
        }
    })
    
    print(f"Status: {compliance_result['status']}")
    if compliance_result['status'] == 'success':
        data = compliance_result['data']
        print(f"\n✓ Compliance Status: {data['compliance_status']}")
        print(f"⚠️  Violations: {len(data['violations'])}")
        print(f"⚡ Warnings: {len(data['warnings'])}")
        print(f"\n💡 Recommendations:")
        for rec in data['recommendations']:
            print(f"   • {rec}")
    print()
    
    # 8. 系统状态
    print("=" * 70)
    print("📊 System Status")
    print("=" * 70 + "\n")
    
    status = orchestrator.get_system_status()
    print(f"Is Running: {status['is_running']}")
    print(f"Agents Count: {status['agents_count']}")
    print(f"Execution History: {status['execution_history_count']}\n")
    
    print("Agent Performance:")
    for agent_id, agent_status in status['agents'].items():
        print(f"\n  {agent_status['name']}:")
        print(f"    Status: {agent_status['status']}")
        print(f"    Tasks Completed: {agent_status['performance_metrics']['tasks_completed']}")
        print(f"    Success Rate: {agent_status['performance_metrics']['success_rate'] * 100}%")
    
    print("\n" + "=" * 70)
    print("✅ Full Example Completed Successfully!")
    print("=" * 70 + "\n")
    
    print("🎉 All 5 agents demonstrated their capabilities:")
    print("   1. Product Selection Agent - Market trend analysis")
    print("   2. Marketing Agent - Content generation")
    print("   3. Logistics Agent - Inventory management")
    print("   4. Customer Service Agent - Customer support")
    print("   5. Compliance Agent - Policy compliance")
    print()
    print("📚 Next Steps:")
    print("   1. Explore the codebase structure")
    print("   2. Customize agents for your specific needs")
    print("   3. Integrate with real APIs (Amazon, TikTok, Meta)")
    print("   4. Connect to LLM models (GLM-4.7)")
    print("   5. Deploy to production environment")
    print()


if __name__ == "__main__":
    asyncio.run(main())