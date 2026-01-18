"""
Orchestrator - 大脑层
负责解析高级指令、任务拆解、Agent协调和执行监控
"""

from typing import Dict, List, Any, Optional
from datetime import datetime
import asyncio
import json
import logging
from enum import Enum

from core.agents.base_agent import BaseAgent, AgentMessage

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TaskStatus(Enum):
    """任务状态枚举"""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class Task:
    """任务类，表示一个可执行的任务单元"""

    def __init__(
        self,
        task_id: str,
        description: str,
        task_type: str,
        parameters: Dict[str, Any],
        priority: int = 5,
        dependencies: Optional[List[str]] = None
    ):
        self.task_id = task_id
        self.description = description
        self.task_type = task_type
        self.parameters = parameters
        self.priority = priority
        self.dependencies = dependencies or []
        self.status = TaskStatus.PENDING
        self.assigned_agent = None
        self.created_at = datetime.now()
        self.started_at = None
        self.completed_at = None
        self.result = None
        self.error = None
        self.subtasks = []

    def to_dict(self) -> Dict:
        return {
            "task_id": self.task_id,
            "description": self.description,
            "task_type": self.task_type,
            "parameters": self.parameters,
            "priority": self.priority,
            "dependencies": self.dependencies,
            "status": self.status.value,
            "assigned_agent": self.assigned_agent,
            "created_at": self.created_at.isoformat(),
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "result": self.result,
            "error": self.error,
            "subtasks": [t.to_dict() for t in self.subtasks]
        }


class Orchestrator:
    """
    大脑层 - 负责协调所有Agent的工作
    """

    def __init__(self, config: Optional[Dict] = None):
        self.config = config or {}
        self.agents: Dict[str, BaseAgent] = {}
        self.tasks: Dict[str, Task] = {}
        self.task_queue: List[Task] = []
        self.message_bus: List[AgentMessage] = []
        self.memory = None
        self.is_running = False
        self.execution_history = []
        self.goals = []

    def register_agent(self, agent: BaseAgent):
        """注册Agent"""
        self.agents[agent.agent_id] = agent
        agent.set_memory(self.memory)
        logger.info(f"Registered agent: {agent.name} ({agent.role})")

    def unregister_agent(self, agent_id: str):
        """注销Agent"""
        if agent_id in self.agents:
            del self.agents[agent_id]
            logger.info(f"Unregistered agent: {agent_id}")

    def set_memory(self, memory):
        """设置记忆层"""
        self.memory = memory
        for agent in self.agents.values():
            agent.set_memory(memory)

    async def parse_high_level_instruction(self, instruction: str) -> List[Task]:
        """
        解析高级指令为子任务
        
        示例: "这个月我要把这款鞋在北美市场的销量提升20%"
        
        Args:
            instruction: 人类的高级指令
            
        Returns:
            拆解后的任务列表
        """
        logger.info(f"Parsing instruction: {instruction}")
        
        tasks = []
        
        instruction_lower = instruction.lower()
        
        if "销量" in instruction and "提升" in instruction:
            tasks.append(Task(
                task_id=f"task_{datetime.now().timestamp()}",
                description="分析当前销量数据",
                task_type="analysis",
                parameters={"metric": "sales", "market": "north_america"},
                priority=10
            ))
            tasks.append(Task(
                task_id=f"task_{datetime.now().timestamp() + 1}",
                description="制定营销策略",
                task_type="planning",
                parameters={"goal": "increase_sales", "target": 20},
                priority=9
            ))
            tasks.append(Task(
                task_id=f"task_{datetime.now().timestamp() + 2}",
                description="执行广告投放",
                task_type="execution",
                parameters={"platform": "meta", "budget": "auto"},
                priority=8
            ))
            tasks.append(Task(
                task_id=f"task_{datetime.now().timestamp() + 3}",
                description="监控和优化",
                task_type="monitoring",
                parameters={"kpi": "sales", "target_increase": 20},
                priority=7
            ))
        
        for task in tasks:
            self.tasks[task.task_id] = task
            self.task_queue.append(task)
        
        return tasks

    async def decompose_task(self, task: Task) -> List[Task]:
        """
        将复杂任务拆解为子任务
        
        Args:
            task: 要拆解的任务
            
        Returns:
            子任务列表
        """
        logger.info(f"Decomposing task: {task.task_id}")
        
        subtasks = []
        
        if task.task_type == "planning":
            subtasks.append(Task(
                task_id=f"{task.task_id}_1",
                description="市场调研",
                task_type="research",
                parameters={"focus": "market_trends"},
                priority=task.priority,
                dependencies=[]
            ))
            subtasks.append(Task(
                task_id=f"{task.task_id}_2",
                description="竞品分析",
                task_type="analysis",
                parameters={"focus": "competitors"},
                priority=task.priority,
                dependencies=[subtasks[0].task_id]
            ))
            subtasks.append(Task(
                task_id=f"{task.task_id}_3",
                description="策略制定",
                task_type="strategy",
                parameters={},
                priority=task.priority,
                dependencies=[subtasks[1].task_id]
            ))
        
        task.subtasks = subtasks
        for subtask in subtasks:
            self.tasks[subtask.task_id] = subtask
            self.task_queue.append(subtask)
        
        return subtasks

    def find_best_agent(self, task: Task) -> Optional[BaseAgent]:
        """
        为任务找到最合适的Agent
        
        Args:
            task: 要分配的任务
            
        Returns:
            最合适的Agent
        """
        task_type = task.task_type
        
        agent_scores = []
        for agent in self.agents.values():
            score = 0
            if task_type in agent.role.lower():
                score += 10
            if agent.performance_metrics["success_rate"] > 0.9:
                score += 5
            if agent.status == "ready":
                score += 3
            agent_scores.append((agent, score))
        
        if agent_scores:
            best_agent = max(agent_scores, key=lambda x: x[1])
            return best_agent[0]
        return None

    async def execute_task(self, task: Task) -> Dict[str, Any]:
        """
        执行任务
        
        Args:
            task: 要执行的任务
            
        Returns:
            执行结果
        """
        logger.info(f"Executing task: {task.task_id}")
        
        task.status = TaskStatus.IN_PROGRESS
        task.started_at = datetime.now()
        
        agent = self.find_best_agent(task)
        if not agent:
            task.status = TaskStatus.FAILED
            task.error = "No suitable agent found"
            task.completed_at = datetime.now()
            return {"status": "failed", "error": "No suitable agent found"}
        
        task.assigned_agent = agent.agent_id
        agent.status = "busy"
        
        try:
            start_time = datetime.now()
            result = await agent.process({
                "task_id": task.task_id,
                "description": task.description,
                "parameters": task.parameters
            })
            end_time = datetime.now()
            
            response_time = (end_time - start_time).total_seconds()
            agent.update_performance(True, response_time)
            
            task.result = result
            task.status = TaskStatus.COMPLETED
            task.completed_at = datetime.now()
            
            agent.status = "ready"
            agent.last_activity = datetime.now()
            
            self.execution_history.append({
                "task_id": task.task_id,
                "agent_id": agent.agent_id,
                "start_time": start_time.isoformat(),
                "end_time": end_time.isoformat(),
                "duration": response_time,
                "status": "completed"
            })
            
            return result
            
        except Exception as e:
            logger.error(f"Task execution failed: {e}")
            agent.update_performance(False, 0)
            
            task.status = TaskStatus.FAILED
            task.error = str(e)
            task.completed_at = datetime.now()
            
            agent.status = "ready"
            
            return {"status": "failed", "error": str(e)}

    async def run(self):
        """运行Orchestrator主循环"""
        self.is_running = True
        logger.info("Orchestrator started")
        
        while self.is_running:
            if self.task_queue:
                task = self.task_queue.pop(0)
                
                if task.status == TaskStatus.PENDING:
                    await self.execute_task(task)
            
            await asyncio.sleep(0.1)

    async def stop(self):
        """停止Orchestrator"""
        self.is_running = False
        logger.info("Orchestrator stopped")

    def get_system_status(self) -> Dict[str, Any]:
        """获取系统状态"""
        return {
            "is_running": self.is_running,
            "agents_count": len(self.agents),
            "tasks_total": len(self.tasks),
            "tasks_pending": len([t for t in self.tasks.values() if t.status == TaskStatus.PENDING]),
            "tasks_in_progress": len([t for t in self.tasks.values() if t.status == TaskStatus.IN_PROGRESS]),
            "tasks_completed": len([t for t in self.tasks.values() if t.status == TaskStatus.COMPLETED]),
            "tasks_failed": len([t for t in self.tasks.values() if t.status == TaskStatus.FAILED]),
            "execution_history_count": len(self.execution_history),
            "agents": {aid: agent.get_status() for aid, agent in self.agents.items()}
        }

    async def set_goal(self, goal: Dict[str, Any]):
        """
        设置业务目标
        
        Args:
            goal: 目标字典，包含目标类型、指标、目标值等
        """
        self.goals.append(goal)
        logger.info(f"Goal set: {goal}")
        
        tasks = await self.parse_high_level_instruction(goal.get("instruction", ""))
        return tasks