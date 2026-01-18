"""
Configuration file for the Multi-Agent Cross-Border E-commerce System
"""

import os
from typing import Dict, Any

class Config:
    """系统配置类"""
    
    def __init__(self):
        self.env = os.getenv("ENV", "development")
        self.debug = os.getenv("DEBUG", "true").lower() == "true"
        
        self.api_keys = {
            "amazon": os.getenv("AMAZON_API_KEY", ""),
            "tiktok": os.getenv("TIKTOK_API_KEY", ""),
            "meta": os.getenv("META_API_KEY", ""),
            "google": os.getenv("GOOGLE_API_KEY", ""),
            "temu": os.getenv("TEMU_API_KEY", "")
        }
        
        self.api_endpoints = {
            "amazon": os.getenv("AMAZON_API_URL", "https://sellingpartnerapi-na.amazon.com"),
            "tiktok": os.getenv("TIKTOK_API_URL", "https://business-api.tiktok.com"),
            "meta": os.getenv("META_API_URL", "https://graph.facebook.com/v18.0"),
            "google": os.getenv("GOOGLE_API_URL", "https://googleads.googleapis.com/v15"),
            "temu": os.getenv("TEMU_API_URL", "https://api.temu.com")
        }
        
        self.memory_config = {
            "vector_dimension": 768,
            "max_memories": 10000,
            "cleanup_interval": 3600,
            "default_expiry": 86400
        }
        
        self.agent_config = {
            "max_concurrent_tasks": 10,
            "task_timeout": 300,
            "retry_attempts": 3,
            "retry_delay": 5
        }
        
        self.orchestrator_config = {
            "task_queue_size": 100,
            "execution_interval": 0.1,
            "max_execution_history": 1000
        }
        
        self.logging_config = {
            "level": "INFO" if self.env == "production" else "DEBUG",
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            "file": "logs/system.log"
        }
        
        self.market_config = {
            "default_market": "US",
            "supported_markets": ["US", "CA", "UK", "EU", "JP", "AU"],
            "market_currencies": {
                "US": "USD",
                "CA": "CAD",
                "UK": "GBP",
                "EU": "EUR",
                "JP": "JPY",
                "AU": "AUD"
            },
            "market_languages": {
                "US": ["en"],
                "CA": ["en", "fr"],
                "UK": ["en"],
                "EU": ["en", "de", "fr", "es", "it"],
                "JP": ["ja"],
                "AU": ["en"]
            }
        }
        
        self.compliance_config = {
            "auto_check_enabled": True,
            "check_interval": 3600,
            "violation_threshold": 3,
            "auto_reject": False
        }
        
        self.marketing_config = {
            "default_budget": 1000,
            "max_daily_budget": 5000,
            "roas_target": 4.0,
            "cpa_target": 20.0,
            "auto_optimization": True
        }
        
        self.logistics_config = {
            "reorder_threshold": 50,
            "safety_stock": 100,
            "lead_time_buffer": 7,
            "auto_reorder": True
        }
        
        self.customer_service_config = {
            "auto_response": True,
            "response_time_target": 300,
            "sentiment_analysis": True,
            "escalation_threshold": 0.3
        }
    
    def get_api_key(self, platform: str) -> str:
        """获取API密钥"""
        return self.api_keys.get(platform, "")
    
    def get_api_endpoint(self, platform: str) -> str:
        """获取API端点"""
        return self.api_endpoints.get(platform, "")
    
    def get_market_config(self, market: str) -> Dict[str, Any]:
        """获取市场配置"""
        return {
            "currency": self.market_config["market_currencies"].get(market, "USD"),
            "languages": self.market_config["market_languages"].get(market, ["en"])
        }
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "env": self.env,
            "debug": self.debug,
            "api_endpoints": self.api_endpoints,
            "memory_config": self.memory_config,
            "agent_config": self.agent_config,
            "orchestrator_config": self.orchestrator_config,
            "logging_config": self.logging_config,
            "market_config": self.market_config,
            "compliance_config": self.compliance_config,
            "marketing_config": self.marketing_config,
            "logistics_config": self.logistics_config,
            "customer_service_config": self.customer_service_config
        }


config = Config()