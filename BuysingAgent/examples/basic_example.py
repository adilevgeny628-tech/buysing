"""
Basic Example - 基础示例
演示如何使用多智能体系统
"""

import asyncio
from core.orchestrator.orchestrator import Orchestrator
from core.memory.memory_layer import MemoryLayer
from agents.product.product_selection_agent import ProductSelectionAgent
from agents.marketing.marketing_agent import MarketingAgent
from agents.logistics.logistics_agent import LogisticsAgent
from agents.customer.customer_service_agent import CustomerServiceAgent
from agents.compliance.compliance_agent import ComplianceAgent


async def main():
    """主函数"""
    print("=" * 60)
    print("BuysingAgent - Multi-Agent Cross-Border E-commerce System")
    print("=" * 60)
    print()
    
    # 1. 初始化记忆层
    print("🧠 Initializing Memory Layer...")
    memory = MemoryLayer()
    print("✓ Memory Layer initialized")
    print()
    
    # 2. 创建Orchestrator
    print("🎯 Creating Orchestrator...")
    orchestrator = Orchestrator()
    orchestrator.set_memory(memory)
    print("✓ Orchestrator created")
    print()
    
    # 3. 注册Agent
    print("🤖 Registering Agents...")
    product_agent = ProductSelectionAgent()
    marketing_agent = MarketingAgent()
    logistics_agent = LogisticsAgent()
    customer_agent = CustomerServiceAgent()
    compliance_agent = ComplianceAgent()
    
    orchestrator.register_agent(product_agent)
    orchestrator.register_agent(marketing_agent)
    orchestrator.register_agent(logistics_agent)
    orchestrator.register_agent(customer_agent)
    orchestrator.register_agent(compliance_agent)
    
    print(f"✓ Registered {len(orchestrator.agents)} agents:")
    for agent_id, agent in orchestrator.agents.items():
        print(f"  - {agent.name} ({agent.role})")
    print()
    
    # 4. 示例1: 趋势分析
    print("=" * 60)
    print("📊 Example 1: Trend Analysis")
    print("=" * 60)
    trend_result = await product_agent.process({
        "task_type": "trend_analysis",
        "parameters": {
            "region": "US",
            "timeframe": "30d"
        }
    })
    print(f"Status: {trend_result['status']}")
    print(f"Trending Colors: {trend_result['data']['trending_colors']}")
    print(f"Trending Materials: {trend_result['data']['trending_materials']}")
    print()
    
    # 5. 示例2: 内容生成
    print("=" * 60)
    print("🎨 Example 2: Content Generation")
    print("=" * 60)
    content_result = await marketing_agent.process({
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
    print(f"Headline: {content_result['data']['generated_content']['copy']['headline']}")
    print(f"Hashtags: {content_result['data']['generated_content']['copy']['hashtags']}")
    print()
    
    # 6. 示例3: 库存检查
    print("=" * 60)
    print("📦 Example 3: Inventory Check")
    print("=" * 60)
    inventory_result = await logistics_agent.process({
        "task_type": "inventory_check",
        "parameters": {
            "product_id": "prod_001"
        }
    })
    print(f"Status: {inventory_result['status']}")
    print(f"Total Stock: {inventory_result['data']['total_stock']}")
    print(f"Available Stock: {inventory_result['data']['available_stock']}")
    print(f"Low Stock Alert: {inventory_result['data']['low_stock_alert']}")
    print()
    
    # 7. 示例4: 客服回复
    print("=" * 60)
    print("💬 Example 4: Customer Service Response")
    print("=" * 60)
    service_result = await customer_agent.process({
        "task_type": "message_response",
        "parameters": {
            "customer_id": "cust_001",
            "message": "I received my order but the package was damaged",
            "language": "en",
            "platform": "email"
        }
    })
    print(f"Status: {service_result['status']}")
    print(f"Sentiment: {service_result['data']['sentiment']}")
    print(f"Response: {service_result['data']['response']}")
    print()
    
    # 8. 示例5: 合规检查
    print("=" * 60)
    print("✅ Example 5: Compliance Check")
    print("=" * 60)
    compliance_result = await compliance_agent.process({
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
    print(f"Compliance Status: {compliance_result['data']['compliance_status']}")
    print(f"Violations: {len(compliance_result['data']['violations'])}")
    print()
    
    # 9. 设置业务目标
    print("=" * 60)
    print("🎯 Setting Business Goal")
    print("=" * 60)
    goal = {
        "instruction": "这个月我要把这款鞋在北美市场的销量提升20%",
        "market": "US",
        "product": "shoes",
        "target_increase": 20
    }
    tasks = await orchestrator.set_goal(goal)
    print(f"Goal: {goal['instruction']}")
    print(f"Tasks Created: {len(tasks)}")
    for task in tasks:
        print(f"  - {task.description} ({task.task_type})")
    print()
    
    # 10. 系统状态
    print("=" * 60)
    print("📊 System Status")
    print("=" * 60)
    status = orchestrator.get_system_status()
    print(f"Is Running: {status['is_running']}")
    print(f"Agents Count: {status['agents_count']}")
    print(f"Tasks Total: {status['tasks_total']}")
    print(f"Tasks Pending: {status['tasks_pending']}")
    print()
    
    # 11. 记忆层统计
    print("=" * 60)
    print("🧠 Memory Statistics")
    print("=" * 60)
    memory_stats = memory.get_statistics()
    print(f"Total Memories: {memory_stats['total_memories']}")
    print(f"Agents Count: {memory_stats['agents_count']}")
    print(f"Vector Count: {memory_stats['vector_count']}")
    print(f"Entity Count: {memory_stats['entity_count']}")
    print()
    
    print("=" * 60)
    print("✓ Example completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())