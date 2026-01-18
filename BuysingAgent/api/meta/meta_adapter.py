"""
Meta API Adapter - Meta (Facebook/Instagram) API集成
"""

from typing import Dict, List, Any, Optional
import logging
from core.tools.base_api_adapter import BaseAPIAdapter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class MetaAPIAdapter(BaseAPIAdapter):
    """
    Meta API适配器
    """

    def __init__(self, api_key: str, base_url: str = "https://graph.facebook.com/v18.0", config: Optional[Dict] = None):
        super().__init__(api_key, base_url, config)
        self.ad_account_id = config.get("ad_account_id") if config else None
        self.page_id = config.get("page_id") if config else None

    async def authenticate(self):
        """认证"""
        logger.info("Authenticating with Meta API")
        self.is_authenticated = True

    async def get_products(self, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取产品列表（通过Commerce Manager）
        
        Args:
            params: 查询参数
            
        Returns:
            产品列表
        """
        try:
            response = await self._make_request(
                "GET",
                f"/{self.page_id}/product_catalogs",
                params=params
            )
            return response.get("data", [])
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
                f"/{self.page_id}/products",
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
                "POST",
                f"/{product_id}",
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
                f"/{self.page_id}/orders",
                params=params
            )
            return response.get("data", [])
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
                f"/{self.ad_account_id}/insights",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get analytics: {e}")
            return {}

    async def create_ad_campaign(self, campaign_data: Dict) -> Dict:
        """
        创建广告活动
        
        Args:
            campaign_data: 广告活动数据
            
        Returns:
            创建结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/{self.ad_account_id}/campaigns",
                data=campaign_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create ad campaign: {e}")
            return {"error": str(e)}

    async def create_ad_set(self, ad_set_data: Dict) -> Dict:
        """
        创建广告组
        
        Args:
            ad_set_data: 广告组数据
            
        Returns:
            创建结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/{self.ad_account_id}/adsets",
                data=ad_set_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create ad set: {e}")
            return {"error": str(e)}

    async def create_ad(self, ad_data: Dict) -> Dict:
        """
        创建广告
        
        Args:
            ad_data: 广告数据
            
        Returns:
            创建结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/{self.ad_account_id}/ads",
                data=ad_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create ad: {e}")
            return {"error": str(e)}

    async def get_ad_performance(self, ad_id: str, params: Optional[Dict] = None) -> Dict:
        """
        获取广告表现数据
        
        Args:
            ad_id: 广告ID
            params: 查询参数
            
        Returns:
            表现数据
        """
        try:
            response = await self._make_request(
                "GET",
                f"/{ad_id}/insights",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get ad performance: {e}")
            return {}

    async def update_ad_bid(self, ad_id: str, bid_amount: float) -> Dict:
        """
        更新广告出价
        
        Args:
            ad_id: 广告ID
            bid_amount: 出价金额
            
        Returns:
            更新结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/{ad_id}",
                data={"bid_amount": bid_amount}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to update ad bid: {e}")
            return {"error": str(e)}

    async def get_audience_insights(self, params: Optional[Dict] = None) -> Dict:
        """
        获取受众洞察
        
        Args:
            params: 查询参数
            
        Returns:
            受众洞察数据
        """
        try:
            response = await self._make_request(
                "GET",
                f"/{self.ad_account_id}/audience_insights",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get audience insights: {e}")
            return {}

    async def create_custom_audience(self, audience_data: Dict) -> Dict:
        """
        创建自定义受众
        
        Args:
            audience_data: 受众数据
            
        Returns:
            创建结果
        """
        try:
            response = await self._make_request(
                "POST",
                f"/{self.ad_account_id}/customaudiences",
                data=audience_data
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create custom audience: {e}")
            return {"error": str(e)}