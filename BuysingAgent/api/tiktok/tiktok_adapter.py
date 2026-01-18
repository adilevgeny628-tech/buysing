"""
TikTok API Adapter - TikTok平台API集成
"""

from typing import Dict, List, Any, Optional
import logging
from core.tools.base_api_adapter import BaseAPIAdapter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TikTokAPIAdapter(BaseAPIAdapter):
    """
    TikTok API适配器
    """

    def __init__(self, api_key: str, base_url: str = "https://business-api.tiktok.com", config: Optional[Dict] = None):
        super().__init__(api_key, base_url, config)
        self.advertiser_id = config.get("advertiser_id") if config else None

    async def authenticate(self):
        """认证"""
        logger.info("Authenticating with TikTok API")
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
                "/open_api/v1.3/product/list/",
                params=params
            )
            return response.get("data", {}).get("list", [])
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
                "/open_api/v1.3/product/create/",
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
                f"/open_api/v1.3/product/update/",
                data={"product_id": product_id, **product_data}
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
                "/open_api/v1.3/order/list/",
                params=params
            )
            return response.get("data", {}).get("list", [])
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
                "/open_api/v1.3/report/integrated/get/",
                params=params
            )
            return response
        except Exception as e:
            logger.error(f"Failed to get analytics: {e}")
            return {}

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
                "/open_api/v1.3/ad/create/",
                data={"advertiser_id": self.advertiser_id, **ad_data}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to create ad: {e}")
            return {"error": str(e)}

    async def get_ads(self, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取广告列表
        
        Args:
            params: 查询参数
            
        Returns:
            广告列表
        """
        try:
            response = await self._make_request(
                "GET",
                "/open_api/v1.3/ad/get/",
                params={"advertiser_id": self.advertiser_id, **(params or {})}
            )
            return response.get("data", {}).get("list", [])
        except Exception as e:
            logger.error(f"Failed to get ads: {e}")
            return []

    async def update_ad(self, ad_id: str, ad_data: Dict) -> Dict:
        """
        更新广告
        
        Args:
            ad_id: 广告ID
            ad_data: 广告数据
            
        Returns:
            更新结果
        """
        try:
            response = await self._make_request(
                "PUT",
                "/open_api/v1.3/ad/update/",
                data={"advertiser_id": self.advertiser_id, "ad_id": ad_id, **ad_data}
            )
            return response
        except Exception as e:
            logger.error(f"Failed to update ad: {e}")
            return {"error": str(e)}

    async def get_trending_hashtags(self, region: str = "US") -> List[Dict]:
        """
        获取热门话题标签
        
        Args:
            region: 地区
            
        Returns:
            热门标签列表
        """
        try:
            response = await self._make_request(
                "GET",
                "/open_api/v1.3/trending/hashtags/",
                params={"region": region}
            )
            return response.get("data", {}).get("hashtags", [])
        except Exception as e:
            logger.error(f"Failed to get trending hashtags: {e}")
            return []

    async def get_creator_list(self, params: Optional[Dict] = None) -> List[Dict]:
        """
        获取创作者列表
        
        Args:
            params: 查询参数
            
        Returns:
            创作者列表
        """
        try:
            response = await self._make_request(
                "GET",
                "/open_api/v1.3/creator/list/",
                params=params
            )
            return response.get("data", {}).get("list", [])
        except Exception as e:
            logger.error(f"Failed to get creator list: {e}")
            return []