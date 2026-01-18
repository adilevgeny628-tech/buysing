"""
Amazon API Adapter - 亚马逊平台API集成
"""

from typing import Dict, List, Any, Optional
import logging
from core.tools.base_api_adapter import BaseAPIAdapter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AmazonAPIAdapter(BaseAPIAdapter):
    """
    亚马逊API适配器
    """

    def __init__(self, api_key: str, base_url: str = "https://sellingpartnerapi-na.amazon.com", config: Optional[Dict] = None):
        super().__init__(api_key, base_url, config)
        self.marketplace_id = config.get("marketplace_id", "ATVPDKIKX0DER") if config else "ATVPDKIKX0DER"

    async def authenticate(self):
        """认证"""
        logger.info("Authenticating with Amazon API")
        self.is_authenticated = True

    async def get_products(self, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取产品列表
        
        Args:
            params: 查询参数
            
        Returns:
            产品列表
        """
        try:
            response = await self._make_request(
                "GET",
                f"/products/v0/listings/{self.marketplace_id}",
                params=params
            )
            return response.get("payload", [])
        except Exception as e:
            logger.error(f"Failed to get products: {e}")
            return []

    async def create_product(self, product_data: Dict) -> Dict:
        """
        创建产品
        
        Args:
            product_data: 产品数据
            
        Returns:
            创建结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/products/v0/listings/{self.marketplace_id}",
                data=product_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create product: {e}")
            return {"error": str(e)}

    async def update_product(self, product_id: str, product_data: Dict) -> Dict:
        """
        更新产品
        
        Args:
            product_id: 产品ID
            product_data: 产品数据
            
        Returns:
            更新结果
        """
        try:
            response = await self._make_request(
                "PUT",
                f"/products/v0/listings/{self.marketplace_id}/{product_id}",
                data=product_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to update product: {e}")
            return {"error": str(e)}

    async def get_orders(self, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取订单列表
        
        Args:
            params: 查询参数
            
        Returns:
            订单列表
        """
        try:
            response = await self._make_request(
                "GET",
                f"/orders/v0/orders",
                params=params
            )
            return response.get("payload", {}).get("Orders", [])
        except Exception as e:
            logger.error(f"Failed to get orders: {e}")
            return []

    async def get_analytics(self, params: Optional[Dict] = None) -> Dict:
        """
        获取分析数据
        
        Args:
            params: 查询参数
            
        Returns:
            分析数据
        """
        try:
            response = await self._make_request(
                "GET",
                f"/sales/v1/salesMetrics",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get analytics: {e}")
            return {}

    async def get_product_reviews(self, product_id: str, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取产品评论
        
        Args:
            product_id: 产品ID
            params: 查询参数
            
        Returns:
            评论列表
        """
        try:
            response = await self._make_request(
                "GET",
                f"/reviews/v1/reviews",
                params={"asin": product_id, **(params or {})}
            )
            return response.get("reviews", [])
        except Exception as e:
            logger.error(f"Failed to get reviews: {e}")
            return []

    async def get_inventory(self, params: Optional[Dict] = None) -> Dict:
        """
        获取库存信息
        
        Args:
            params: 查询参数
            
        Returns:
            库存数据
        """
        try:
            response = await self._make_request(
                "GET",
                f"/inventory/v1/inventory",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get inventory: {e}")
            return {}

    async def update_inventory(self, sku: str, quantity: int) -> Dict:
        """
        更新库存
        
        Args:
            sku: SKU
            quantity: 数量
            
        Returns:
            更新结果
        """
        try:
            response = await self._make_request(
                "PUT",
                f"/inventory/v1/inventory/{sku}",
                data={"quantity": quantity}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to update inventory: {e}")
            return {"error": str(e)}

    async def get_pricing(self, sku: str) -> Dict:
        """
        获取价格信息
        
        Args:
            sku: SKU
            
        Returns:
            价格数据
        """
        try:
            response = await self._make_request(
                "GET",
                f"/products/pricing/v0/price",
                params={"SellerSKU": sku, "MarketplaceId": self.marketplace_id}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get pricing: {e}")
            return {}

    async def update_pricing(self, sku: str, price: float) -> Dict:
        """
        更新价格
        
        Args:
            sku: SKU
            price: 价格
            
        Returns:
            更新结果
        """
        try:
            response = await self._make_request(
                "PUT",
                f"/products/pricing/v0/price/{sku}",
                data={"StandardPrice": {"Amount": price, "CurrencyCode": "USD"}}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to update pricing: {e}")
            return {"error": str(e)}