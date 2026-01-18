"""
Memory Layer - 记忆层
负责存储和检索系统记忆，包括向量存储和知识图谱
"""

from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import json
import logging
from dataclasses import dataclass, asdict
from enum import Enum

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MemoryType(Enum):
    """记忆类型枚举"""
    EPISODIC = "episodic"
    SEMANTIC = "semantic"
    PROCEDURAL = "procedural"
    WORKING = "working"


@dataclass
class MemoryItem:
    """记忆项数据类"""
    memory_id: str
    agent_id: str
    key: str
    value: Any
    memory_type: MemoryType
    created_at: datetime
    expires_at: Optional[datetime] = None
    metadata: Optional[Dict] = None
    importance: float = 1.0
    access_count: int = 0
    last_accessed: Optional[datetime] = None

    def to_dict(self) -> Dict:
        data = asdict(self)
        data["memory_type"] = self.memory_type.value
        data["created_at"] = self.created_at.isoformat()
        data["expires_at"] = self.expires_at.isoformat() if self.expires_at else None
        data["last_accessed"] = self.last_accessed.isoformat() if self.last_accessed else None
        return data

    @classmethod
    def from_dict(cls, data: Dict) -> 'MemoryItem':
        data["memory_type"] = MemoryType(data["memory_type"])
        data["created_at"] = datetime.fromisoformat(data["created_at"])
        data["expires_at"] = datetime.fromisoformat(data["expires_at"]) if data.get("expires_at") else None
        data["last_accessed"] = datetime.fromisoformat(data["last_accessed"]) if data.get("last_accessed") else None
        return cls(**data)


class VectorMemory:
    """
    向量记忆存储 - 用于语义搜索和相似度匹配
    """

    def __init__(self, dimension: int = 768):
        self.dimension = dimension
        self.vectors: Dict[str, List[float]] = {}
        self.metadata: Dict[str, Dict] = {}

    async def store(self, key: str, vector: List[float], metadata: Optional[Dict] = None):
        """
        存储向量
        
        Args:
            key: 向量键
            vector: 向量数据
            metadata: 元数据
        """
        if len(vector) != self.dimension:
            raise ValueError(f"Vector dimension mismatch. Expected {self.dimension}, got {len(vector)}")
        
        self.vectors[key] = vector
        self.metadata[key] = metadata or {}
        logger.debug(f"Stored vector: {key}")

    async def retrieve(self, key: str) -> Optional[List[float]]:
        """
        检索向量
        
        Args:
            key: 向量键
            
        Returns:
            向量数据
        """
        return self.vectors.get(key)

    async def search(self, query_vector: List[float], top_k: int = 5) -> List[Dict[str, Any]]:
        """
        相似度搜索
        
        Args:
            query_vector: 查询向量
            top_k: 返回前k个结果
            
        Returns:
            相似度结果列表
        """
        if len(query_vector) != self.dimension:
            raise ValueError(f"Query vector dimension mismatch")
        
        similarities = []
        for key, vector in self.vectors.items():
            similarity = self._cosine_similarity(query_vector, vector)
            similarities.append({
                "key": key,
                "similarity": similarity,
                "metadata": self.metadata.get(key, {})
            })
        
        similarities.sort(key=lambda x: x["similarity"], reverse=True)
        return similarities[:top_k]

    def _cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """计算余弦相似度"""
        dot_product = sum(a * b for a, b in zip(vec1, vec2))
        norm1 = sum(a * a for a in vec1) ** 0.5
        norm2 = sum(b * b for b in vec2) ** 0.5
        return dot_product / (norm1 * norm2) if norm1 * norm2 > 0 else 0


class KnowledgeGraph:
    """
    知识图谱 - 存储实体和关系
    """

    def __init__(self):
        self.entities: Dict[str, Dict] = {}
        self.relationships: List[Dict] = []

    async def add_entity(self, entity_id: str, entity_type: str, properties: Dict):
        """
        添加实体
        
        Args:
            entity_id: 实体ID
            entity_type: 实体类型
            properties: 实体属性
        """
        self.entities[entity_id] = {
            "type": entity_type,
            "properties": properties,
            "created_at": datetime.now().isoformat()
        }
        logger.debug(f"Added entity: {entity_id}")

    async def add_relationship(self, source: str, target: str, relation_type: str, properties: Optional[Dict] = None):
        """
        添加关系
        
        Args:
            source: 源实体ID
            target: 目标实体ID
            relation_type: 关系类型
            properties: 关系属性
        """
        self.relationships.append({
            "source": source,
            "target": target,
            "type": relation_type,
            "properties": properties or {},
            "created_at": datetime.now().isoformat()
        })
        logger.debug(f"Added relationship: {source} -> {target} ({relation_type})")

    async def get_entity(self, entity_id: str) -> Optional[Dict]:
        """获取实体"""
        return self.entities.get(entity_id)

    async def get_relationships(self, entity_id: str, relation_type: Optional[str] = None) -> List[Dict]:
        """
        获取实体的关系
        
        Args:
            entity_id: 实体ID
            relation_type: 关系类型（可选）
            
        Returns:
            关系列表
        """
        relationships = []
        for rel in self.relationships:
            if rel["source"] == entity_id or rel["target"] == entity_id:
                if relation_type is None or rel["type"] == relation_type:
                    relationships.append(rel)
        return relationships

    async def query(self, query: Dict) -> List[Dict]:
        """
        查询知识图谱
        
        Args:
            query: 查询条件
            
        Returns:
            查询结果
        """
        results = []
        
        if "entity_type" in query:
            for entity_id, entity in self.entities.items():
                if entity["type"] == query["entity_type"]:
                    if all(k in entity["properties"] and entity["properties"][k] == v 
                           for k, v in query.get("properties", {}).items()):
                        results.append({
                            "entity_id": entity_id,
                            "entity": entity
                        })
        
        return results


class MemoryLayer:
    """
    记忆层 - 统一的记忆管理接口
    """

    def __init__(self, config: Optional[Dict] = None):
        self.config = config or {}
        self.memories: Dict[str, MemoryItem] = {}
        self.vector_memory = VectorMemory(dimension=self.config.get("vector_dimension", 768))
        self.knowledge_graph = KnowledgeGraph()
        self.agent_memories: Dict[str, List[str]] = {}

    async def store(
        self,
        agent_id: str,
        key: str,
        value: Any,
        memory_type: MemoryType = MemoryType.EPISODIC,
        expires_in: Optional[int] = None,
        metadata: Optional[Dict] = None,
        importance: float = 1.0
    ) -> str:
        """
        存储记忆
        
        Args:
            agent_id: Agent ID
            key: 记忆键
            value: 记忆值
            memory_type: 记忆类型
            expires_in: 过期时间（秒）
            metadata: 元数据
            importance: 重要性
            
        Returns:
            记忆ID
        """
        memory_id = f"{agent_id}_{key}_{datetime.now().timestamp()}"
        
        expires_at = None
        if expires_in:
            expires_at = datetime.now() + timedelta(seconds=expires_in)
        
        memory_item = MemoryItem(
            memory_id=memory_id,
            agent_id=agent_id,
            key=key,
            value=value,
            memory_type=memory_type,
            created_at=datetime.now(),
            expires_at=expires_at,
            metadata=metadata,
            importance=importance
        )
        
        self.memories[memory_id] = memory_item
        
        if agent_id not in self.agent_memories:
            self.agent_memories[agent_id] = []
        self.agent_memories[agent_id].append(memory_id)
        
        logger.info(f"Stored memory: {memory_id}")
        return memory_id

    async def retrieve(self, agent_id: str, key: str, memory_type: Optional[MemoryType] = None) -> Optional[Any]:
        """
        检索记忆
        
        Args:
            agent_id: Agent ID
            key: 记忆键
            memory_type: 记忆类型（可选）
            
        Returns:
            记忆值
        """
        for memory_id in self.agent_memories.get(agent_id, []):
            memory = self.memories.get(memory_id)
            if memory and memory.key == key:
                if memory_type is None or memory.memory_type == memory_type:
                    if memory.expires_at is None or memory.expires_at > datetime.now():
                        memory.access_count += 1
                        memory.last_accessed = datetime.now()
                        return memory.value
        return None

    async def search(self, query: str, agent_id: Optional[str] = None, top_k: int = 5) -> List[MemoryItem]:
        """
        搜索记忆
        
        Args:
            query: 搜索查询
            agent_id: Agent ID（可选）
            top_k: 返回前k个结果
            
        Returns:
            记忆项列表
        """
        results = []
        
        for memory_id, memory in self.memories.items():
            if agent_id is None or memory.agent_id == agent_id:
                if query.lower() in memory.key.lower() or query.lower() in str(memory.value).lower():
                    results.append(memory)
        
        results.sort(key=lambda x: (x.importance, x.access_count), reverse=True)
        return results[:top_k]

    async def delete(self, memory_id: str):
        """
        删除记忆
        
        Args:
            memory_id: 记忆ID
        """
        if memory_id in self.memories:
            memory = self.memories[memory_id]
            if memory.agent_id in self.agent_memories:
                self.agent_memories[memory.agent_id].remove(memory_id)
            del self.memories[memory_id]
            logger.info(f"Deleted memory: {memory_id}")

    async def cleanup_expired(self):
        """清理过期记忆"""
        now = datetime.now()
        expired_ids = [
            memory_id for memory_id, memory in self.memories.items()
            if memory.expires_at and memory.expires_at < now
        ]
        
        for memory_id in expired_ids:
            await self.delete(memory_id)
        
        logger.info(f"Cleaned up {len(expired_id)} expired memories")

    async def get_agent_memories(self, agent_id: str) -> List[MemoryItem]:
        """
        获取Agent的所有记忆
        
        Args:
            agent_id: Agent ID
            
        Returns:
            记忆项列表
        """
        memories = []
        for memory_id in self.agent_memories.get(agent_id, []):
            if memory_id in self.memories:
                memories.append(self.memories[memory_id])
        return memories

    def get_statistics(self) -> Dict[str, Any]:
        """获取记忆层统计信息"""
        return {
            "total_memories": len(self.memories),
            "agents_count": len(self.agent_memories),
            "vector_count": len(self.vector_memory.vectors),
            "entity_count": len(self.knowledge_graph.entities),
            "relationship_count": len(self.knowledge_graph.relationships),
            "memory_types": {
                "episodic": len([m for m in self.memories.values() if m.memory_type == MemoryType.EPISODIC]),
                "semantic": len([m for m in self.memories.values() if m.memory_type == MemoryType.SEMANTIC]),
                "procedural": len([m for m in self.memories.values() if m.memory_type == MemoryType.PROCEDURAL]),
                "working": len([m for m in self.memories.values() if m.memory_type == MemoryType.WORKING])
            }
        }