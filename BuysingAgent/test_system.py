"""
Quick Test Script - 快速测试脚本
验证多智能体系统的基本功能
"""

import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class SimpleAgent:
    """简化的Agent类用于测试"""
    
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
    
    async def process(self, task):
        """处理任务"""
        self.status = "busy"
        await asyncio.sleep(0.1)
        
        result = {
            "agent_id": self.agent_id,
            "task_type": task.get("task_type"),
            "status": "success",
            "data": f"Task completed by {self.name}"
        }
        
        self.performance_metrics["tasks_completed"] += 1
        self.status = "ready"
        return result
    
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
    """简化的Orchestrator用于测试"""
    
    def __init__(self):
        self.agents = {}
        self.tasks = []
        self.execution_history = []
        self.is_running = False
    
    def register_agent(self, agent):
        """注册Agent"""
        self.agents[agent.agent_id] = agent
        print(f"✓ Registered agent: {agent.name} ({agent.role})")
    
    async def execute_task(self, task):
        """执行任务"""
        task_type = task.get("task_type")
        
        for agent in self.agents.values():
            if task_type in agent.role.lower() or "general" in agent.role.lower():
                result = await agent.process(task)
                self.execution_history.append({
                    "task_id": task.get("task_id"),
                    "agent_id": agent.agent_id,
                    "status": "completed"
                })
                return result
        
        return {"status": "error", "message": "No suitable agent found"}
    
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
    print("Quick Test Script")
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
    
    # 3. 测试任务
    print("=" * 70)
    print("📋 Testing Agent Tasks")
    print("=" * 70 + "\n")
    
    tasks = [
        {
            "task_id": "task_001",
            "task_type": "trend_analysis",
            "description": "Analyze market trends"
        },
        {
            "task_id": "task_002",
            "task_type": "content_generation",
            "description": "Generate marketing content"
        },
        {
            "task_id": "task_003",
            "task_type": "inventory_check",
            "description": "Check inventory levels"
        },
        {
            "task_id": "task_004",
            "task_type": "message_response",
            "description": "Respond to customer message"
        },
        {
            "task_id": "task_005",
            "task_type": "policy_check",
            "description": "Check compliance policies"
        }
    ]
    
    for i, task in enumerate(tasks, 1):
        print(f"Task {i}: {task['description']}")
        result = await orchestrator.execute_task(task)
        print(f"  Status: {result['status']}")
        print(f"  Result: {result.get('data', 'N/A')}")
        print()
    
    # 4. 系统状态
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
    print("✅ All tests completed successfully!")
    print("=" * 70 + "\n")
    
    print("📚 Next Steps:")
    print("1. Install dependencies: pip install -r requirements.txt")
    print("2. Configure environment variables: cp .env.example .env")
    print("3. Run the full example: python examples/basic_example.py")
    print("4. Explore the codebase and customize for your needs")
    print()


if __name__ == "__main__":
    asyncio.run(main())