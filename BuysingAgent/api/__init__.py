"""API module"""

from api.amazon.amazon_adapter import AmazonAPIAdapter
from api.tiktok.tiktok_adapter import TikTokAPIAdapter
from api.meta.meta_adapter import MetaAPIAdapter

__all__ = [
    "AmazonAPIAdapter",
    "TikTokAPIAdapter",
    "MetaAPIAdapter"
]