"""
Base API Adapter - 所有API适配器的基类
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional
import logging
import aiohttp
import asyncio
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class BaseAPIAdapter(ABC):
    """
    基础API适配器类
    """

    def __init__(self, api_key: str, base_url: str, config: Optional[Dict] = None):
        self.api_key = api_key
        self.base_url = base_url
        self.config = config or {}
        self.session = None
        self.rate_limit = self.config.get("rate_limit", 100)
        self.request_count = 0
        self.last_request_time = None
        self.is_authenticated = False

    async def initialize(self):
        """初始化API连接"""
        self.session = aiohttp.ClientSession()
        logger.info(f"API adapter initialized: {self.__class__.__name__}")
        await self.authenticate()

    async def authenticate(self):
        """认证"""
        pass

    async def close(self):
        """关闭连接"""
        if self.session:
            await self.session.close()
        logger.info(f"API adapter closed: {self.__class__.__name__}")

    async def _make_request(
        self,
        method: str,
        endpoint: str,
        params: Optional[Dict] = None,
        data: Optional[Dict] = None,
        headers: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        发送HTTP请求
        
        Args:
            method: HTTP方法
            endpoint: API端点
            params: 查询参数
            data: 请求体数据
            headers: 请求头
            
        Returns:
            响应数据
        """
        await self._check_rate_limit()
        
        url = f"{self.base_url}{endpoint}"
        request_headers = headers or {}
        request_headers["Authorization"] = f"Bearer {self.api_key}"
        
        try:
            async with self.session.request(
                method=method,
                url=url,
                params=params,
                json=data,
                headers=request_headers
            ) as response:
                self.request_count += 1
                self.last_request_time = datetime.now()
                
                response_data = await response.json()
                
                if response.status >= 400:
                    logger.error(f"API request failed: {response.status} - {response_data}")
                    raise Exception(f"API Error: {response.status} - {response_data}")
                
                return response_data
                
        except Exception as e:
            logger.error(f"Request failed: {e}")
            raise

    async def _check_rate_limit(self):
        """检查速率限制"""
        if self.last_request_time:
            time_since_last = (datetime.now() - self.last_request_time).total_seconds()
            if time_since_last < 1.0:
                await asyncio.sleep(1.0 - time_since_last)

    @abstractmethod
    async def get_products(self, params: Optional[Dict] = None) -> List[Dict]:
        """获取产品列表"""
        pass

    @abstractmethod
    async def create_product(self, product_data: Dict) -> Dict:
        """创建产品"""
        pass

    @abstractmethod
    async def update_product(self, product_id: str, product_data: Dict) -> Dict:
        """更新产品"""
        pass

    @abstractmethod
    async def get_orders(self, params: Optional[Dict] = None) -> List[Dict]:
        """获取订单列表"""
        pass

    @abstractmethod
    async def get_analytics(self, params: Optional[Dict] = None) -> Dict:
        """获取分析数据"""
        pass

    def get_status(self) -> Dict[str, Any]:
        """获取API状态"""
        return {
            "is_authenticated": self.is_authenticated,
            "request_count": self.request_count,
            "last_request_time": self.last_request_time.isoformat() if self.last_request_time else None,
            "rate_limit": self.rate_limit
        }