"""
Base Agent Class - 所有Agent的基类
定义了Agent的核心接口和通用功能
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional
from datetime import datetime
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BaseAgent(ABC):
    """
    基础Agent类，定义了所有专业Agent必须实现的接口
    """

    def __init__(self, agent_id: str, name: str, role: str, config: Optional[Dict] = None):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.config = config or {}
        self.memory = None
        self.tools = []
        self.status = "idle"
        self.created_at = datetime.now()
        self.last_activity = None
        self.performance_metrics = {
            "tasks_completed": 0,
            "tasks_failed": 0,
            "avg_response_time": 0,
            "success_rate": 1.0
        }

    @abstractmethod
    async def process(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """
        处理任务的核心方法，每个Agent必须实现
        
        Args:
            task: 任务字典，包含任务类型、参数等信息
            
        Returns:
            处理结果字典
        """
        pass

    @abstractmethod
    async def think(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Agent的思考过程，基于上下文进行推理和决策
        
        Args:
            context: 当前上下文信息
            
        Returns:
            思考结果，包含决策和推理过程
        """
        pass

    async def act(self, action: Dict[str, Any]) -> Dict[str, Any]:
        """
        执行具体动作
        
        Args:
            action: 动作描述
            
        Returns:
            执行结果
        """
        logger.info(f"Agent {self.name} executing action: {action}")
        return {"status": "success", "message": "Action executed"}

    def set_memory(self, memory):
        """设置记忆层引用"""
        self.memory = memory

    def add_tool(self, tool):
        """添加工具到Agent"""
        self.tools.append(tool)

    async def remember(self, key: str, value: Any):
        """存储信息到记忆层"""
        if self.memory:
            await self.memory.store(self.agent_id, key, value)

    async def recall(self, key: str) -> Any:
        """从记忆层检索信息"""
        if self.memory:
            return await self.memory.retrieve(self.agent_id, key)
        return None

    async def collaborate(self, other_agent: 'BaseAgent', message: Dict[str, Any]) -> Dict[str, Any]:
        """
        与其他Agent协作
        
        Args:
            other_agent: 目标Agent
            message: 协作消息
            
        Returns:
            协作结果
        """
        logger.info(f"Agent {self.name} collaborating with {other_agent.name}")
        return await other_agent.process(message)

    def update_performance(self, success: bool, response_time: float):
        """更新性能指标"""
        if success:
            self.performance_metrics["tasks_completed"] += 1
        else:
            self.performance_metrics["tasks_failed"] += 1
        
        total_tasks = self.performance_metrics["tasks_completed"] + self.performance_metrics["tasks_failed"]
        self.performance_metrics["success_rate"] = self.performance_metrics["tasks_completed"] / total_tasks if total_tasks > 0 else 1.0
        
        avg_time = self.performance_metrics["avg_response_time"]
        self.performance_metrics["avg_response_time"] = (avg_time * (total_tasks - 1) + response_time) / total_tasks

    def get_status(self) -> Dict[str, Any]:
        """获取Agent状态"""
        return {
            "agent_id": self.agent_id,
            "name": self.name,
            "role": self.role,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "last_activity": self.last_activity.isoformat() if self.last_activity else None,
            "performance_metrics": self.performance_metrics,
            "tools_count": len(self.tools)
        }

    async def initialize(self):
        """初始化Agent"""
        logger.info(f"Initializing agent: {self.name}")
        self.status = "ready"

    async def shutdown(self):
        """关闭Agent"""
        logger.info(f"Shutting down agent: {self.name}")
        self.status = "stopped"

    def __repr__(self):
        return f"BaseAgent(id={self.agent_id}, name={self.name}, role={self.role})"


class AgentCapability:
    """
    Agent能力描述类
    """

    def __init__(self, name: str, description: str, input_schema: Dict, output_schema: Dict):
        self.name = name
        self.description = description
        self.input_schema = input_schema
        self.output_schema = output_schema

    def to_dict(self) -> Dict:
        return {
            "name": self.name,
            "description": self.description,
            "input_schema": self.input_schema,
            "output_schema": self.output_schema
        }


class AgentMessage:
    """
    Agent间通信的消息格式
    """

    def __init__(self, sender: str, receiver: str, content: Dict[str, Any], message_type: str = "request"):
        self.sender = sender
        self.receiver = receiver
        self.content = content
        self.message_type = message_type
        self.timestamp = datetime.now()
        self.id = f"{sender}_{receiver}_{self.timestamp.timestamp()}"

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "sender": self.sender,
            "receiver": self.receiver,
            "content": self.content,
            "message_type": self.message_type,
            "timestamp": self.timestamp.isoformat()
        }

    @classmethod
    def from_dict(cls, data: Dict) -> 'AgentMessage':
        return cls(
            sender=data["sender"],
            receiver=data["receiver"],
            content=data["content"],
            message_type=data.get("message_type", "request")
        )